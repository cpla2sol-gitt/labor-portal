/* ══════════════════════════════════════════════════
   FE (Form Editor) — 서식 편집 모드
   
   사용법:
   FE.toggle()  — 편집 모드 켜기/끄기 (툴바 버튼)
   FE.save()    — 현재 편집 내용 저장 (localStorage)
   FE.discard() — 저장 전 상태로 되돌리기
   
   수정 가능한 요소 (SELECTORS):
   텍스트를 더 편집하고 싶으면 SELECTORS 배열에 CSS 선택자 추가
   ══════════════════════════════════════════════════ */
var FE = (function() {

  /* 편집 가능하게 만들 CSS 선택자 목록
     여기에 추가하면 편집 대상 요소가 늘어납니다          */
  var SELECTORS = [
    '.doc-title',       /* 서식 제목 */
    '.doc-law',         /* 법령 근거 */
    '.ft .lbl',         /* 테이블 라벨 셀 */
    '.ft .lbl2',        /* 테이블 보조 라벨 */
    '.ft th',           /* 테이블 헤더 */
    '.body-text',       /* 본문 텍스트 */
    '.block-box',       /* 박스 텍스트 */
    '.sec-label',       /* 섹션 레이블 */
    '.sign-block .s-lbl', /* 서명란 레이블 */
    '.ap-box-name',     /* 결재란 직급 */
    '.ap-label',        /* 결재란 "결재" 텍스트 */
    '.receipt-cut',     /* 수령확인 절취선 텍스트 */
  ];

  var active  = false;   /* 편집 모드 활성 여부 */
  var backup  = '';      /* 되돌리기용 HTML 백업 */
  var formId  = null;    /* 현재 서식 ID */

  /* ── 내부: A4 용지 DOM 가져오기 ── */
  function paper() { return document.getElementById('a4-paper'); }

  /* ── 내부: 배너 표시/숨김 ── */
  function setBar(show) {
    var bar = document.getElementById('fe-bar');
    if (bar) bar.style.display = show ? 'flex' : 'none';
  }

  /* ── 내부: 툴바 버튼 상태 ── */
  function setBtn(on) {
    var btn = document.getElementById('btn-edit-mode');
    if (!btn) return;
    if (on) { btn.textContent = '✏ 편집 중…'; btn.classList.add('fe-on'); }
    else    { btn.textContent = '✏ 서식 편집'; btn.classList.remove('fe-on'); }
  }

  /* ── 내부: contenteditable 설정/해제 ── */
  function setEditable(el, on) {
    if (on) {
      el.setAttribute('contenteditable', 'true');
      el.setAttribute('spellcheck', 'false');
      el.setAttribute('data-fe-editable', '');
    } else {
      el.removeAttribute('contenteditable');
      el.removeAttribute('spellcheck');
      el.removeAttribute('data-fe-editable');
    }
  }

  /* ── 내부: 해당 요소가 편집 불가 컨테이너인지 확인 ── */
  function hasInput(el) {
    return el.querySelector('input,select,textarea') ||
           ['INPUT','SELECT','TEXTAREA'].indexOf(el.tagName) >= 0;
  }

  /* ── 내부: 열 너비 조절 (th 우측 가장자리 감지 방식)
     border-collapse:collapse 테이블에서 absolute 핸들이
     신뢰성 없게 동작하는 문제를 해결하기 위해
     th 자체의 mousemove 이벤트로 커서 근처 감지           */
  function addHandle(th) {
    if (th.dataset.feHandle) return;
    th.dataset.feHandle = '1';

    th.addEventListener('mousemove', function(e) {
      var rect = th.getBoundingClientRect();
      /* 우측 5px 이내면 리사이즈 커서 */
      if (rect.right - e.clientX <= 6) {
        th.style.cursor = 'col-resize';
      } else {
        th.style.cursor = '';
      }
    });

    th.addEventListener('mousedown', function(e) {
      var rect = th.getBoundingClientRect();
      if (rect.right - e.clientX > 6) return; /* 가장자리 아닌 곳은 무시 */
      e.preventDefault();

      var sx  = e.clientX;
      var sw  = th.offsetWidth;
      var idx = Array.from(th.parentNode.children).indexOf(th);
      var tbl = th.closest('table');

      /* 드래그 중 표시용 세로선 */
      var line = document.createElement('div');
      line.style.cssText = 'position:fixed;top:0;bottom:0;width:2px;background:#c8a354;opacity:.7;z-index:9999;pointer-events:none;left:' + rect.right + 'px';
      document.body.appendChild(line);

      function mv(e) {
        var nw = Math.max(28, sw + e.clientX - sx);
        th.style.width = nw + 'px';
        line.style.left = (rect.left + nw) + 'px';
        /* 같은 열 td 너비도 동기화 */
        if (tbl) tbl.querySelectorAll('tr').forEach(function(r) {
          var c = r.cells[idx];
          if (c && c.tagName === 'TD') c.style.width = nw + 'px';
        });
      }
      function up() {
        line.remove();
        document.removeEventListener('mousemove', mv);
        document.removeEventListener('mouseup', up);
      }
      document.addEventListener('mousemove', mv);
      document.addEventListener('mouseup', up);
    });
  }

  /* ── 내부: 플로팅 행 버튼 (테이블 구조 밖에 렌더링)
     border-collapse 테이블에서 td 안 absolute가 셀 내부로
     들어가는 문제를 해결하기 위해 document.body에 붙이는 방식 사용 */

  /* 플로팅 패널 생성 (페이지 당 1개만) */
  var _floatPanel = null;
  var _floatTarget = null;  /* 현재 패널이 붙어있는 tr */
  var _floatTimer  = null;

  function getFloatPanel() {
    if (_floatPanel) return _floatPanel;
    var p = document.createElement('div');
    p.id = 'fe-float-panel';
    p.style.cssText = [
      'position:fixed',
      'z-index:9999',
      'display:none',
      'flex-direction:column',
      'gap:2px',
      'pointer-events:auto'
    ].join(';');

    var addB = document.createElement('button');
    addB.className = 'fe-row-btn add';
    addB.textContent = '+';
    addB.title = '아래에 행 추가';
    addB.addEventListener('mousedown', function(e) { e.stopPropagation(); });
    addB.addEventListener('click', function(e) {
      e.stopPropagation();
      if (!_floatTarget) return;
      var nr = _floatTarget.cloneNode(true);
      nr.querySelectorAll('input,textarea').forEach(function(i){ i.value=''; });
      addRowBtns(nr);
      _floatTarget.parentNode.insertBefore(nr, _floatTarget.nextSibling);
      /* 새 행도 contenteditable 적용 */
      nr.querySelectorAll(SELECTORS.join(',')).forEach(function(el){
        if (!el.querySelector('input,select,textarea') &&
            ['INPUT','SELECT','TEXTAREA'].indexOf(el.tagName) < 0) {
          el.setAttribute('contenteditable','true');
          el.setAttribute('spellcheck','false');
          el.setAttribute('data-fe-editable','');
        }
      });
      hideFloatPanel();
    });

    var delB = document.createElement('button');
    delB.className = 'fe-row-btn del';
    delB.textContent = '×';
    delB.title = '이 행 삭제';
    delB.addEventListener('mousedown', function(e) { e.stopPropagation(); });
    delB.addEventListener('click', function(e) {
      e.stopPropagation();
      if (!_floatTarget) return;
      var allRows = _floatTarget.parentNode
        ? _floatTarget.parentNode.querySelectorAll('tr') : [];
      if (allRows.length <= 1) { alert('마지막 행은 삭제할 수 없습니다.'); return; }
      if (confirm('이 행을 삭제하겠습니까?')) {
        _floatTarget.remove();
        hideFloatPanel();
      }
    });

    p.appendChild(addB);
    p.appendChild(delB);
    document.body.appendChild(p);
    _floatPanel = p;
    return p;
  }

  function showFloatPanel(tr) {
    clearTimeout(_floatTimer);
    _floatTarget = tr;
    var rect = tr.getBoundingClientRect();
    var p = getFloatPanel();
    p.style.top    = (rect.top + rect.height/2 - 22) + 'px';
    p.style.left   = (rect.right + 4) + 'px';
    p.style.display = 'flex';
  }

  function hideFloatPanel() {
    _floatTimer = setTimeout(function() {
      if (_floatPanel) _floatPanel.style.display = 'none';
      _floatTarget = null;
    }, 120);
  }

  function addRowBtns(tr) {
    if (tr.dataset.feRow) return;
    tr.dataset.feRow = '1';

    tr.addEventListener('mouseenter', function() { showFloatPanel(tr); });
    tr.addEventListener('mouseleave', function() { hideFloatPanel(); });
  }

  /* 플로팅 패널 위에 마우스가 있을 때는 패널 유지 */
  document.addEventListener('mouseover', function(e) {
    if (_floatPanel && _floatPanel.contains(e.target)) {
      clearTimeout(_floatTimer);
    }
  });

  /* ── 공개: 편집 모드 켜기 ── */
  function enter() {
    var p = paper();
    if (!p) { console.error('a4-paper를 찾을 수 없습니다'); return; }

    active = true;
    formId = (typeof S !== 'undefined') ? S.currentForm : null;
    backup = p.innerHTML;

    /* 정적 텍스트 요소 → contenteditable */
    SELECTORS.forEach(function(sel) {
      p.querySelectorAll(sel).forEach(function(el) {
        if (!hasInput(el)) setEditable(el, true);
      });
    });

    /* 열 핸들 */
    p.querySelectorAll('th').forEach(addHandle);

    /* 행 버튼 */
    p.querySelectorAll('tr').forEach(addRowBtns);

    setBtn(true);
    setBar(true);
  }

  /* ── 공개: 편집 모드 끄기 ── */
  function exit(keep) {
    var p = paper();
    if (!p) return;

    active = false;

    if (!keep && backup) {
      p.innerHTML = backup;
      backup = '';
      setBtn(false);
      setBar(false);
      return;
    }

    /* 편집 UI 요소 제거 */
    p.querySelectorAll('.fe-col-handle').forEach(function(el){ el.remove(); });
    /* 플로팅 패널 숨기기 */
    hideFloatPanel();
    if (_floatPanel) { _floatPanel.style.display = 'none'; }
    /* tr 이벤트 리스너는 dataset 초기화로 재등록 가능하게 */
    p.querySelectorAll('[data-fe-row]').forEach(function(el){ delete el.dataset.feRow; });
    p.querySelectorAll('[data-fe-editable]').forEach(function(el){ setEditable(el, false); });

    setBtn(false);
    setBar(false);
    backup = '';
  }

  /* ── 공개: 토글 ── */
  function toggle() {
    active ? exit(false) : enter();
  }

  /* ── 공개: 저장 ── */
  function save() {
    var p = paper();
    if (!p || !formId) return;

    /* 저장용 클론 — UI 요소 제거 후 저장 */
    var clone = p.cloneNode(true);
    clone.querySelectorAll('.fe-col-handle,.fe-row-btns').forEach(function(el){ el.remove(); });
    clone.querySelectorAll('[data-fe-editable]').forEach(function(el){ setEditable(el, false); });

    var key = 'fe_' + formId;
    try {
      localStorage.setItem(key, clone.innerHTML);
    } catch(e) {
      alert('저장 오류: ' + e.message); return;
    }

    /* 백업 갱신 */
    backup = clone.innerHTML;

    /* 버튼 피드백 */
    var btn = document.getElementById('fe-save-btn');
    if (btn) {
      var orig = btn.textContent;
      btn.textContent = '✔ 저장됨!';
      btn.style.background = '#1a6630';
      setTimeout(function(){ btn.textContent = orig; btn.style.background = ''; }, 1800);
    }

    /* 사이드바 배지 */
    showBadge(formId, true);
  }

  /* ── 공개: 되돌리기 ── */
  function discard() {
    if (!confirm('편집한 내용을 되돌리겠습니까?')) return;
    exit(false);
  }

  /* ── 공개: 저장된 편집본 로드 ── */
  function load(id) {
    try {
      var saved = localStorage.getItem('fe_' + id);
      if (saved) {
        var p = paper();
        if (p) { p.innerHTML = saved; return true; }
      }
    } catch(e) {}
    return false;
  }

  /* ── 내부: 사이드바 배지 — 비활성화 (표시 없음)
     편집 내용은 localStorage에만 조용히 저장됩니다.
     표시를 원하면 아래 return; 을 지우면 됩니다.      */
  function showBadge(id, show) {
    return; /* 배지 표시 안 함 */
  }

  /* ── 초기화: 배지 복원 비활성화 (showBadge가 빈 함수이므로 불필요) ── */

  /* ── go() / resetCurrentForm() 오버라이드 ──
     기존 함수를 감싸서 편집 모드 연동 처리        */
  var _go   = window.go;
  var _reset = window.resetCurrentForm;

  window.go = function(id) {
    if (active) exit(false);         /* 편집 모드 자동 종료 */
    if (_go) _go(id);                /* 원본 실행 */
    load(id);                        /* 저장된 편집본 자동 로드 */
  };

  window.resetCurrentForm = function() {
    var id = (typeof S !== 'undefined') ? S.currentForm : null;
    if (id) {
      var has = localStorage.getItem('fe_' + id);
      if (has) {
        if (!confirm('저장된 편집본이 있습니다.\n[확인] → 삭제 후 기본 서식으로 초기화\n[취소] → 취소')) return;
        localStorage.removeItem('fe_' + id);
        showBadge(id, false);
      }
    }
    if (active) exit(false);
    if (_reset) _reset();
  };

  /* ── 공개 API 반환 ── */
  return { toggle: toggle, save: save, discard: discard, enter: enter, exit: exit, load: load };

})(); /* FE 모듈 끝 */
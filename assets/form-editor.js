/* ══════════════════════════════════════════════════
   FE (Form Editor) — 서식 편집 모드 v2
   
   사용법:
   FE.toggle()  — 편집 모드 켜기/끄기 (툴바 버튼)
   FE.save()    — 현재 편집 내용 저장 (localStorage + 이력 기록)
   FE.discard() — 저장 전 상태로 되돌리기
   
   신규 기능:
   ① 셀 클릭 시 포맷 툴바 표시
      - 글자 크기 (pt) 조절
      - 굵게 / 기울임 / 밑줄 (선택 텍스트에 적용)
      - 텍스트 정렬 (좌/중/우)
      - 셀 배경색
      - 행 높이 (px) 조절
      - 열 추가 (왼쪽/오른쪽) / 열 삭제
   ② 행 높이 드래그 (tr 하단 경계선 드래그)
   ③ 편집 저장 시 FE_HISTORY에 이력 자동 기록
   ══════════════════════════════════════════════════ */
var FE = (function() {

  /* 편집 가능하게 만들 CSS 선택자 목록 */
  var SELECTORS = [
    '.doc-title',
    '.doc-law',
    '.ft .lbl',
    '.ft .lbl2',
    '.ft th',
    '.body-text',
    '.block-box',
    '.sec-label',
    '.sign-block .s-lbl',
    '.ap-box-name',
    '.ap-label',
    '.receipt-cut',
  ];

  var active  = false;
  var backup  = '';
  var formId  = null;

  /* ── 내부: 기본 DOM 헬퍼 ── */
  function paper() { return document.getElementById('a4-paper'); }

  function setBar(show) {
    var bar = document.getElementById('fe-bar');
    if (!bar) return;
    if (show) {
      /* fe-bar를 세로 방향(컬럼)으로 전환 — 포맷 행 추가를 위해 */
      bar.style.display        = 'flex';
      bar.style.flexDirection  = 'column';
      bar.style.alignItems     = 'stretch';
      bar.style.gap            = '0';
    } else {
      bar.style.display = 'none';
    }
  }

  function setBtn(on) {
    var btn = document.getElementById('btn-edit-mode');
    if (!btn) return;
    if (on) { btn.textContent = '✏ 편집 중…'; btn.classList.add('fe-on'); }
    else    { btn.textContent = '✏ 서식 편집'; btn.classList.remove('fe-on'); }
  }

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

  function hasInput(el) {
    return el.querySelector('input,select,textarea') ||
           ['INPUT','SELECT','TEXTAREA'].indexOf(el.tagName) >= 0;
  }


  /* ══════════════════════════════════════════════════
     포맷 툴바 (fe-bar 내부 두 번째 행)
     ══════════════════════════════════════════════════ */
  var _fmtBar   = null;   /* 포맷 툴바 DOM */
  var _fmtCell  = null;   /* 현재 포커스된 td/th 또는 편집 요소 */
  var _barRow1  = null;   /* fe-bar 첫 번째 행 (기존 내용) */

  /* 버튼 공통 인라인 스타일 */
  function bs(extra) {
    return 'background:#fff;border:1px solid #d0c090;color:#5a3e10;' +
           'padding:2px 7px;border-radius:3px;font-size:11.5px;cursor:pointer;' +
           'height:22px;white-space:nowrap;font-family:inherit;line-height:1;' + (extra || '');
  }
  function bsDel() { return bs('color:#c0392b;border-color:#e0b0a8'); }
  function bsActive() { return bs('background:#faecc0;font-weight:700'); }

  /* ── 포맷 툴바 생성 (최초 1회) ── */
  function ensureFmtBar() {
    if (_fmtBar) return _fmtBar;

    /* fe-bar 기존 직계 자식들을 Row1 wrapper로 묶기 */
    var feBar = document.getElementById('fe-bar');
    if (feBar) {
      var row1 = document.createElement('div');
      row1.id = 'fe-bar-row1';
      row1.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap';
      /* 기존 자식 이동 */
      while (feBar.firstChild) row1.appendChild(feBar.firstChild);
      feBar.appendChild(row1);
      _barRow1 = row1;
    }

    /* Row2: 포맷 툴바 */
    var bar = document.createElement('div');
    bar.id = 'fe-fmt-bar';
    bar.style.cssText = [
      'display:none',
      'align-items:center',
      'flex-wrap:wrap',
      'gap:4px',
      'padding:5px 0 3px 0',
      'margin-top:5px',
      'border-top:1px solid rgba(200,163,84,.4)',
      'user-select:none',
    ].join(';');

    /* ── 섹션 1: 글자 크기 ── */
    bar.innerHTML =
      /* 레이블 */
      '<span style="font-size:10px;color:#888;flex-shrink:0">글자크기</span>' +
      '<button id="fe-fs-dn" style="' + bs('min-width:22px') + '" title="작게">−</button>' +
      '<input id="fe-fs-val" type="number" min="6" max="72" step="0.5"' +
        ' style="width:38px;text-align:center;border:1px solid #ccc;border-radius:3px;' +
        'font-size:11.5px;padding:1px 3px;height:22px" title="글자 크기 (pt)">' +
      '<span style="font-size:10px;color:#999">pt</span>' +
      '<button id="fe-fs-up" style="' + bs('min-width:22px') + '" title="크게">+</button>' +

      '<div style="width:1px;height:18px;background:#ddd;margin:0 3px;flex-shrink:0"></div>' +

      /* ── 섹션 2: 텍스트 스타일 ── */
      '<span style="font-size:10px;color:#888;flex-shrink:0">스타일</span>' +
      '<button id="fe-bold"      style="' + bs('min-width:24px;font-weight:900') + '" title="굵게 (Ctrl+B)"><b>B</b></button>' +
      '<button id="fe-italic"    style="' + bs('min-width:24px;font-style:italic') + '" title="기울임 (Ctrl+I)"><i>I</i></button>' +
      '<button id="fe-underline" style="' + bs('min-width:24px;text-decoration:underline') + '" title="밑줄 (Ctrl+U)"><u>U</u></button>' +

      '<div style="width:1px;height:18px;background:#ddd;margin:0 3px;flex-shrink:0"></div>' +

      /* ── 섹션 3: 정렬 ── */
      '<span style="font-size:10px;color:#888;flex-shrink:0">정렬</span>' +
      '<button id="fe-al-l" style="' + bs('min-width:28px') + '" title="왼쪽 정렬">≡L</button>' +
      '<button id="fe-al-c" style="' + bs('min-width:28px') + '" title="가운데 정렬">≡C</button>' +
      '<button id="fe-al-r" style="' + bs('min-width:28px') + '" title="오른쪽 정렬">≡R</button>' +

      '<div style="width:1px;height:18px;background:#ddd;margin:0 3px;flex-shrink:0"></div>' +

      /* ── 섹션 4: 셀 배경색 ── */
      '<span style="font-size:10px;color:#888;flex-shrink:0">셀배경</span>' +
      '<input id="fe-cell-bg" type="color" title="셀 배경색"' +
        ' style="width:28px;height:22px;border:1px solid #ccc;border-radius:3px;cursor:pointer;padding:1px;flex-shrink:0">' +
      '<button id="fe-cell-bg-clear" style="' + bs() + '" title="배경 제거">✕</button>' +

      '<div style="width:1px;height:18px;background:#ddd;margin:0 3px;flex-shrink:0"></div>' +

      /* ── 섹션 5: 행 높이 ── */
      '<span style="font-size:10px;color:#888;flex-shrink:0">행높이</span>' +
      '<button id="fe-rh-dn" style="' + bs('min-width:22px') + '" title="높이 감소">−</button>' +
      '<input id="fe-rh-val" type="number" min="10" max="300"' +
        ' style="width:40px;text-align:center;border:1px solid #ccc;border-radius:3px;' +
        'font-size:11.5px;padding:1px 3px;height:22px" title="행 높이 (px)">' +
      '<span style="font-size:10px;color:#999">px</span>' +
      '<button id="fe-rh-up" style="' + bs('min-width:22px') + '" title="높이 증가">+</button>' +

      '<div style="width:1px;height:18px;background:#ddd;margin:0 3px;flex-shrink:0"></div>' +

      /* ── 섹션 6: 열 조작 ── */
      '<span style="font-size:10px;color:#888;flex-shrink:0">열</span>' +
      '<button id="fe-col-add-l" style="' + bs() + '" title="현재 열 왼쪽에 열 추가">← +열</button>' +
      '<button id="fe-col-add-r" style="' + bs() + '" title="현재 열 오른쪽에 열 추가">+열 →</button>' +
      '<button id="fe-col-del"   style="' + bsDel() + '" title="현재 열 삭제">− 열 삭제</button>';

    /* mousedown 시 포커스 유지 (contenteditable 블러 방지) */
    bar.addEventListener('mousedown', function(e) { e.preventDefault(); });

    /* 이벤트 연결 */
    bar.querySelector('#fe-fs-dn').onclick     = function() { changeFontSize(-0.5); };
    bar.querySelector('#fe-fs-up').onclick     = function() { changeFontSize(+0.5); };
    bar.querySelector('#fe-fs-val').onchange   = function() { setFontSize(parseFloat(this.value)); };
    bar.querySelector('#fe-fs-val').oninput    = function() { setFontSize(parseFloat(this.value)); };

    bar.querySelector('#fe-bold').onclick      = function() { execFmt('bold'); };
    bar.querySelector('#fe-italic').onclick    = function() { execFmt('italic'); };
    bar.querySelector('#fe-underline').onclick = function() { execFmt('underline'); };

    bar.querySelector('#fe-al-l').onclick = function() { applyAlign('left'); };
    bar.querySelector('#fe-al-c').onclick = function() { applyAlign('center'); };
    bar.querySelector('#fe-al-r').onclick = function() { applyAlign('right'); };

    bar.querySelector('#fe-cell-bg').oninput   = function() { applyCellBg(this.value); };
    bar.querySelector('#fe-cell-bg-clear').onclick = function() { applyCellBg(''); };

    bar.querySelector('#fe-rh-dn').onclick     = function() { changeRowHeight(-2); };
    bar.querySelector('#fe-rh-up').onclick     = function() { changeRowHeight(+2); };
    bar.querySelector('#fe-rh-val').onchange   = function() { setRowHeight(parseInt(this.value) || 20); };

    bar.querySelector('#fe-col-add-l').onclick = function() { addColumn('left'); };
    bar.querySelector('#fe-col-add-r').onclick = function() { addColumn('right'); };
    bar.querySelector('#fe-col-del').onclick   = function() { deleteColumn(); };

    if (feBar) feBar.appendChild(bar);
    _fmtBar = bar;
    return bar;
  }

  /* ── 포맷 툴바 표시 ── */
  function showFmtBar(el) {
    _fmtCell = el;
    ensureFmtBar().style.display = 'flex';
    refreshFmtBar();
  }

  /* ── 포맷 툴바 숨김 ── */
  function hideFmtBar() {
    if (_fmtBar) _fmtBar.style.display = 'none';
    _fmtCell = null;
  }

  /* ── 포맷 툴바 상태 갱신 (현재 셀 값 반영) ── */
  function refreshFmtBar() {
    if (!_fmtBar || !_fmtCell) return;
    var el = _fmtCell;
    var cs = window.getComputedStyle(el);

    /* 글자 크기 — px → pt */
    var fsPx = parseFloat(cs.fontSize) || 12;
    var fsPt = Math.round(fsPx * 0.75 * 10) / 10;
    var fsIn = _fmtBar.querySelector('#fe-fs-val');
    if (fsIn) fsIn.value = fsPt;

    /* 정렬 활성 표시 */
    var align = (el.style.textAlign || cs.textAlign || 'left').toLowerCase();
    var aMap  = { left: 'l', center: 'c', right: 'r', start: 'l', end: 'r' };
    ['l','c','r'].forEach(function(a) {
      var btn = _fmtBar.querySelector('#fe-al-' + a);
      if (btn) btn.style.background = (aMap[align] === a) ? '#faecc0' : '#fff';
    });

    /* 셀 배경 */
    var bgPicker = _fmtBar.querySelector('#fe-cell-bg');
    if (bgPicker) {
      var bg = el.style.backgroundColor;
      bgPicker.value = bg ? rgbToHex(bg) : '#ffffff';
    }

    /* 행 높이 */
    var tr = el.tagName === 'TR' ? el : (el.closest ? el.closest('tr') : null);
    if (tr) {
      var rhIn = _fmtBar.querySelector('#fe-rh-val');
      if (rhIn) {
        var rh = parseFloat(tr.style.height) || Math.round(tr.getBoundingClientRect().height);
        rhIn.value = Math.round(rh);
      }
    }

    /* 열 조작 버튼 — td/th일 때만 활성화 */
    var isTableCell = el.tagName === 'TD' || el.tagName === 'TH';
    ['fe-col-add-l','fe-col-add-r','fe-col-del',
     'fe-cell-bg','fe-cell-bg-clear',
     'fe-rh-dn','fe-rh-up','fe-rh-val'].forEach(function(id) {
      var btn = _fmtBar.querySelector('#' + id);
      if (btn) {
        btn.disabled = !isTableCell;
        btn.style.opacity = isTableCell ? '1' : '0.4';
      }
    });
  }


  /* ══════════════════════════════════════════════════
     포맷 조작 함수들
     ══════════════════════════════════════════════════ */

  /* ── 글자 크기 변경 ── */
  function changeFontSize(deltaPt) {
    var el = _fmtCell;
    if (!el) return;
    var cs  = window.getComputedStyle(el);
    var cur = parseFloat(cs.fontSize) || 12;
    var pt  = Math.round((cur * 0.75 + deltaPt) * 10) / 10;
    setFontSize(Math.max(6, pt));
  }

  function setFontSize(pt) {
    var el = _fmtCell;
    if (!el || isNaN(pt)) return;
    pt = Math.max(6, Math.min(72, pt));
    el.style.fontSize = pt + 'pt';
    /* 안의 input/textarea에도 적용 */
    el.querySelectorAll('input, textarea, select').forEach(function(i) {
      i.style.fontSize = pt + 'pt';
    });
    var fsIn = _fmtBar && _fmtBar.querySelector('#fe-fs-val');
    if (fsIn) fsIn.value = pt;
  }

  /* ── 텍스트 서식 (execCommand — 선택 텍스트에만 적용) ── */
  function execFmt(cmd) {
    document.execCommand(cmd, false, null);
  }

  /* ── 정렬 ── */
  function applyAlign(align) {
    var el = _fmtCell;
    if (!el) return;
    el.style.textAlign = align;
    /* 안의 입력 요소에도 */
    el.querySelectorAll('input, textarea').forEach(function(i) {
      i.style.textAlign = align;
    });
    refreshFmtBar();
  }

  /* ── 셀 배경색 ── */
  function applyCellBg(color) {
    if (!_fmtCell) return;
    _fmtCell.style.backgroundColor = color || '';
  }

  /* ── 행 높이 변경 ── */
  function changeRowHeight(deltaPx) {
    var cell = _fmtCell || focusedCell();
    if (!cell) return;
    var tr = cell.closest ? cell.closest('tr') : null;
    if (!tr) return;
    var cur = Math.round(tr.getBoundingClientRect().height);
    setRowHeight(Math.max(14, cur + deltaPx), tr);
  }

  function setRowHeight(px, tr) {
    if (!tr) {
      var cell = _fmtCell || focusedCell();
      if (!cell) return;
      tr = cell.closest ? cell.closest('tr') : null;
    }
    if (!tr) return;
    px = Math.max(14, Math.round(px));
    tr.style.height = px + 'px';
    Array.from(tr.cells).forEach(function(c) {
      c.style.height    = px + 'px';
      c.style.minHeight = px + 'px';
    });
    var rhIn = _fmtBar && _fmtBar.querySelector('#fe-rh-val');
    if (rhIn) rhIn.value = px;
  }

  /* ── 현재 포커스된 셀 가져오기 ── */
  function focusedCell() {
    var ae = document.activeElement;
    if (!ae) return null;
    if (ae.tagName === 'TD' || ae.tagName === 'TH') return ae;
    return ae.closest ? ae.closest('td,th') : null;
  }


  /* ══════════════════════════════════════════════════
     열 조작
     ══════════════════════════════════════════════════ */

  function getColIndex(cell) {
    if (!cell || !cell.parentNode) return -1;
    /* colspan을 고려한 실제 열 인덱스 계산 */
    var idx = 0;
    var siblings = Array.from(cell.parentNode.children);
    for (var i = 0; i < siblings.length; i++) {
      if (siblings[i] === cell) break;
      idx += (parseInt(siblings[i].getAttribute('colspan') || '1'));
    }
    return idx;
  }

  function addColumn(direction) {
    if (!_fmtCell) return;
    var rawIdx = Array.from(_fmtCell.parentNode.children).indexOf(_fmtCell);
    if (rawIdx < 0) return;
    var tbl = _fmtCell.closest ? _fmtCell.closest('table') : null;
    if (!tbl) return;

    tbl.querySelectorAll('tr').forEach(function(tr) {
      var cells = Array.from(tr.querySelectorAll('th, td'));
      if (!cells[rawIdx]) return;
      var ref = cells[rawIdx];

      /* 새 셀 생성 — ref와 같은 태그 사용 */
      var newCell = document.createElement(ref.tagName);
      /* 기본 스타일 복사 */
      if (ref.className) newCell.className = ref.className;
      newCell.style.cssText = ref.style.cssText || '';
      newCell.style.width   = '';   /* 너비는 초기화 */
      newCell.innerHTML = '';

      /* 편집 모드 적용 */
      if (!hasInput(newCell)) {
        newCell.setAttribute('contenteditable', 'true');
        newCell.setAttribute('spellcheck', 'false');
        newCell.setAttribute('data-fe-editable', '');
      }

      if (direction === 'left') {
        tr.insertBefore(newCell, ref);
      } else {
        tr.insertBefore(newCell, ref.nextSibling);
      }
    });

    /* 새 열의 th에 핸들 추가 */
    tbl.querySelectorAll('th').forEach(addHandle);
  }

  function deleteColumn() {
    if (!_fmtCell) return;
    var rawIdx = Array.from(_fmtCell.parentNode.children).indexOf(_fmtCell);
    if (rawIdx < 0) return;
    var tbl = _fmtCell.closest ? _fmtCell.closest('table') : null;
    if (!tbl) return;

    /* 열이 1개밖에 없으면 거부 */
    var firstRow = tbl.querySelector('tr');
    if (firstRow && firstRow.querySelectorAll('th, td').length <= 1) {
      alert('마지막 열은 삭제할 수 없습니다.'); return;
    }
    if (!confirm('이 열을 삭제하겠습니까?')) return;

    tbl.querySelectorAll('tr').forEach(function(tr) {
      var cells = Array.from(tr.querySelectorAll('th, td'));
      if (cells[rawIdx]) cells[rawIdx].remove();
    });

    _fmtCell = null;
    hideFmtBar();
  }

  /* ── RGB 문자열 → HEX ── */
  function rgbToHex(rgb) {
    if (!rgb || rgb === 'transparent' || /^rgba.*0\)$/.test(rgb)) return '#ffffff';
    var m = rgb.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
    if (!m) return '#ffffff';
    return '#' + [m[1], m[2], m[3]].map(function(n) {
      return ('0' + parseInt(n).toString(16)).slice(-2);
    }).join('');
  }


  /* ══════════════════════════════════════════════════
     셀 클릭 → 포맷 툴바 업데이트
     ══════════════════════════════════════════════════ */
  function _onPaperClick(e) {
    if (!active) return;
    /* 포맷바 자체 클릭은 무시 */
    if (_fmtBar && _fmtBar.contains(e.target)) return;

    var cell = null;
    /* td/th 우선 */
    if (e.target.tagName === 'TD' || e.target.tagName === 'TH') {
      cell = e.target;
    } else if (e.target.closest) {
      cell = e.target.closest('td, th');
    }

    if (cell) {
      showFmtBar(cell);
      return;
    }

    /* 비 셀 편집 요소 */
    var editable = e.target.closest ? e.target.closest('[data-fe-editable]') : null;
    if (editable) {
      showFmtBar(editable);
    }
  }


  /* ══════════════════════════════════════════════════
     열 너비 드래그 핸들 (th 오른쪽 경계)
     ══════════════════════════════════════════════════ */
  function addHandle(th) {
    if (th.dataset.feHandle) return;
    th.dataset.feHandle = '1';

    th.addEventListener('mousemove', function(e) {
      if (!active) return;
      var rect = th.getBoundingClientRect();
      th.style.cursor = (rect.right - e.clientX <= 6) ? 'col-resize' : '';
    });

    th.addEventListener('mousedown', function(e) {
      if (!active) return;
      var rect = th.getBoundingClientRect();
      if (rect.right - e.clientX > 6) return;
      e.preventDefault();

      var sx  = e.clientX;
      var sw  = th.offsetWidth;
      var idx = Array.from(th.parentNode.children).indexOf(th);
      var tbl = th.closest ? th.closest('table') : null;

      /* 드래그 안내선 */
      var line = document.createElement('div');
      line.style.cssText = 'position:fixed;top:0;bottom:0;width:2px;background:#c8a354;' +
        'opacity:.7;z-index:9999;pointer-events:none;left:' + rect.right + 'px';
      document.body.appendChild(line);

      function mv(e) {
        var nw = Math.max(28, sw + e.clientX - sx);
        th.style.width = nw + 'px';
        line.style.left = (rect.left + nw) + 'px';
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


  /* ══════════════════════════════════════════════════
     행 높이 드래그 (tr 하단 경계)
     ══════════════════════════════════════════════════ */
  function addRowHeightDrag(tr) {
    if (tr.dataset.feRowH) return;
    tr.dataset.feRowH = '1';

    tr.addEventListener('mousemove', function(e) {
      if (!active) return;
      /* 포맷바 내부는 무시 */
      if (_fmtBar && _fmtBar.contains(e.target)) return;
      var rect = tr.getBoundingClientRect();
      var atBottom = rect.bottom - e.clientY <= 5;
      /* th의 col-resize 커서와 충돌하지 않도록 */
      if (e.target.tagName === 'TH' || e.target.tagName === 'TD') {
        var cr = e.target.getBoundingClientRect();
        if (cr.right - e.clientX > 6) { /* 열 리사이즈 핸들 아닌 경우만 */
          tr.style.cursor = atBottom ? 'row-resize' : '';
          e.target.style.cursor = atBottom ? 'row-resize' : '';
        }
      }
    });

    tr.addEventListener('mousedown', function(e) {
      if (!active) return;
      var rect = tr.getBoundingClientRect();
      if (rect.bottom - e.clientY > 5) return;
      /* 열 리사이즈와 충돌 방지 */
      if (e.target.tagName === 'TH') {
        var cr = e.target.getBoundingClientRect();
        if (cr.right - e.clientX <= 6) return;
      }
      e.preventDefault();

      var sy = e.clientY;
      var sh = tr.offsetHeight;

      /* 드래그 안내선 */
      var line = document.createElement('div');
      line.style.cssText = 'position:fixed;left:0;right:0;height:2px;background:#c8a354;' +
        'opacity:.7;z-index:9999;pointer-events:none;top:' + rect.bottom + 'px';
      document.body.appendChild(line);

      function mv(e) {
        var nh = Math.max(14, sh + e.clientY - sy);
        tr.style.height = nh + 'px';
        Array.from(tr.cells).forEach(function(c) {
          c.style.height    = nh + 'px';
          c.style.minHeight = nh + 'px';
        });
        line.style.top = (rect.top + nh) + 'px';
        /* 포맷바 높이 값 실시간 갱신 */
        if (_fmtBar && _fmtCell && tr.contains(_fmtCell)) {
          var rhIn = _fmtBar.querySelector('#fe-rh-val');
          if (rhIn) rhIn.value = Math.round(nh);
        }
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


  /* ══════════════════════════════════════════════════
     행 추가/삭제 — 플로팅 버튼 패널
     ══════════════════════════════════════════════════ */
  var _floatPanel = null;
  var _floatTarget = null;
  var _floatTimer  = null;

  function getFloatPanel() {
    if (_floatPanel) return _floatPanel;
    var p = document.createElement('div');
    p.id = 'fe-float-panel';
    p.style.cssText = 'position:fixed;z-index:9999;display:none;flex-direction:column;gap:2px;pointer-events:auto';

    function mkBtn(label, title, style) {
      var b = document.createElement('button');
      b.className = 'fe-row-btn ' + (label === '+' ? 'add' : 'del');
      b.textContent = label;
      b.title = title;
      b.style.cssText = style || [
        'width:22px;height:22px;border-radius:3px;border:1px solid',
        label === '+' ? '#2a7a4a;background:#2a7a4a;color:#fff' : '#c0392b;background:#c0392b;color:#fff',
        ';font-size:14px;line-height:1;cursor:pointer;font-family:sans-serif;padding:0'
      ].join(';');
      return b;
    }

    var addB = mkBtn('+', '아래에 행 추가');
    addB.addEventListener('mousedown', function(e) { e.stopPropagation(); });
    addB.addEventListener('click', function(e) {
      e.stopPropagation();
      if (!_floatTarget) return;
      var nr = _floatTarget.cloneNode(true);
      nr.querySelectorAll('input, textarea').forEach(function(i) { i.value = ''; });
      /* 새 행에 편집 기능 부여 */
      addRowBtns(nr);
      addRowHeightDrag(nr);
      SELECTORS.forEach(function(sel) {
        nr.querySelectorAll(sel).forEach(function(el) {
          if (!hasInput(el)) {
            el.setAttribute('contenteditable', 'true');
            el.setAttribute('spellcheck', 'false');
            el.setAttribute('data-fe-editable', '');
          }
        });
      });
      _floatTarget.parentNode.insertBefore(nr, _floatTarget.nextSibling);
      hideFloatPanel();
    });

    var delB = mkBtn('×', '이 행 삭제');
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
    p.style.top    = (rect.top + rect.height / 2 - 23) + 'px';
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

  /* 플로팅 패널 위에 마우스가 있으면 유지 */
  document.addEventListener('mouseover', function(e) {
    if (_floatPanel && _floatPanel.contains(e.target)) clearTimeout(_floatTimer);
  });


  /* ══════════════════════════════════════════════════
     편집 모드 진입
     ══════════════════════════════════════════════════ */
  function enter() {
    var p = paper();
    if (!p) { console.error('a4-paper를 찾을 수 없습니다'); return; }

    active = true;
    formId = (typeof S !== 'undefined') ? S.currentForm : null;
    backup = p.innerHTML;

    /* contenteditable 적용 */
    SELECTORS.forEach(function(sel) {
      p.querySelectorAll(sel).forEach(function(el) {
        if (!hasInput(el)) setEditable(el, true);
      });
    });

    /* 열 핸들 */
    p.querySelectorAll('th').forEach(addHandle);

    /* 행 버튼 + 행 높이 드래그 */
    p.querySelectorAll('tr').forEach(function(tr) {
      addRowBtns(tr);
      addRowHeightDrag(tr);
    });

    /* 셀 클릭 → 포맷 툴바 */
    p.addEventListener('click', _onPaperClick);

    setBtn(true);
    setBar(true);
    ensureFmtBar(); /* DOM 미리 생성 */
  }


  /* ══════════════════════════════════════════════════
     편집 모드 종료
     ══════════════════════════════════════════════════ */
  function exit(keep) {
    var p = paper();
    if (!p) return;

    active = false;
    p.removeEventListener('click', _onPaperClick);

    if (!keep && backup) {
      p.innerHTML = backup;
      backup = '';
      setBtn(false);
      setBar(false);
      hideFmtBar();
      return;
    }

    /* UI 요소 정리 */
    p.querySelectorAll('.fe-col-handle').forEach(function(el) { el.remove(); });
    hideFloatPanel();
    if (_floatPanel) _floatPanel.style.display = 'none';
    p.querySelectorAll('[data-fe-row]').forEach(function(el) { delete el.dataset.feRow; });
    p.querySelectorAll('[data-fe-row-h]').forEach(function(el) { delete el.dataset.feRowH; });
    p.querySelectorAll('[data-fe-editable]').forEach(function(el) { setEditable(el, false); });

    setBtn(false);
    setBar(false);
    hideFmtBar();
    backup = '';
  }

  /* ── 토글 ── */
  function toggle() { active ? exit(false) : enter(); }


  /* ══════════════════════════════════════════════════
     저장 (localStorage + FE_HISTORY 이력 기록)
     ══════════════════════════════════════════════════ */
  function save() {
    var p = paper();
    if (!p || !formId) return;

    /* 저장용 클론 생성 — UI 요소 제거 */
    var clone = p.cloneNode(true);
    clone.querySelectorAll('.fe-col-handle, .fe-row-btns').forEach(function(el) { el.remove(); });
    clone.querySelectorAll('[data-fe-editable]').forEach(function(el) { setEditable(el, false); });

    var html = clone.innerHTML;
    var key  = 'fe_' + formId;

    try {
      localStorage.setItem(key, html);
    } catch(e) {
      alert('저장 오류: ' + e.message); return;
    }

    backup = html;

    /* ★ 편집 이력 기록 ★ */
    if (typeof FE_HISTORY !== 'undefined') {
      FE_HISTORY.push(formId, html);
    }

    /* 저장 버튼 피드백 */
    var btn = document.getElementById('fe-save-btn');
    if (btn) {
      var orig = btn.textContent;
      btn.textContent = '✔ 저장됨!';
      btn.style.background = '#1a6630';
      setTimeout(function() { btn.textContent = orig; btn.style.background = ''; }, 1800);
    }

    showBadge(formId, true);
  }

  /* ── 되돌리기 ── */
  function discard() {
    if (!confirm('편집한 내용을 되돌리겠습니까?')) return;
    exit(false);
  }

  /* ── 저장된 편집본 로드 ── */
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

  /* ── 사이드바 배지 (비활성화 — 표시 없음) ── */
  function showBadge(id, show) { return; }


  /* ══════════════════════════════════════════════════
     go() / resetCurrentForm() 오버라이드
     ══════════════════════════════════════════════════ */
  var _go    = window.go;
  var _reset = window.resetCurrentForm;

  window.go = function(id) {
    if (active) exit(false);
    hideFmtBar();
    if (_go) _go(id);
    load(id);
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


  /* ══════════════════════════════════════════════════
     공개 API
     ══════════════════════════════════════════════════ */
  return {
    toggle  : toggle,
    save    : save,
    discard : discard,
    enter   : enter,
    exit    : exit,
    load    : load,
  };

})(); /* FE 모듈 끝 */

/* ══════════════════════════════════════════════════════════════
   FE_HISTORY — 서식 편집 이력 관리
   
   저장 구조 (localStorage):
   키: 'fe_history_[서식ID]'
   값: JSON 배열 [{ ts, label, html }, ...] (최신순, 최대 10개)
   
   사용:
   FE_HISTORY.push(id, html)   — 새 버전 저장
   FE_HISTORY.openPanel()      — 이력 패널 열기
   FE_HISTORY.restore(id, idx) — idx번째 버전으로 복원
   ══════════════════════════════════════════════════════════════ */
var FE_HISTORY = (function() {

  var MAX_VERSIONS = 10; /* 서식당 최대 보관 버전 수 */
  var currentFormId = null;

  /* ── 이력 불러오기 */
  function load(formId) {
    try {
      var raw = localStorage.getItem('fe_history_' + formId);
      return raw ? JSON.parse(raw) : [];
    } catch(e) { return []; }
  }

  /* ── 이력 저장 */
  function saveHistory(formId, list) {
    try {
      localStorage.setItem('fe_history_' + formId, JSON.stringify(list));
    } catch(e) {
      console.warn('이력 저장 실패:', e);
    }
  }

  /* ── 새 버전 추가 */
  function push(formId, htmlContent) {
    var list = load(formId);
    var now  = new Date();
    var label = now.getFullYear() + '. '
      + String(now.getMonth()+1).padStart(2,'0') + '. '
      + String(now.getDate()).padStart(2,'0') + '.  '
      + String(now.getHours()).padStart(2,'0') + ':'
      + String(now.getMinutes()).padStart(2,'0') + ':'
      + String(now.getSeconds()).padStart(2,'0');

    /* 동일 내용 연속 저장 방지 */
    if (list.length > 0 && list[0].html === htmlContent) return;

    list.unshift({ ts: now.getTime(), label: label, html: htmlContent });

    /* 최대 버전 수 초과 시 오래된 것 제거 */
    if (list.length > MAX_VERSIONS) list = list.slice(0, MAX_VERSIONS);

    saveHistory(formId, list);
  }

  /* ── 패널 열기 */
  function openPanel() {
    currentFormId = (typeof S !== 'undefined') ? S.currentForm : null;
    if (!currentFormId) {
      alert('서식을 먼저 열어주세요.');
      return;
    }

    var overlay = document.getElementById('history-overlay');
    var panel   = document.getElementById('history-panel');
    var sub     = document.getElementById('history-panel-sub');
    var list    = document.getElementById('history-list');

    /* 현재 서식명 표시 */
    var formTitle = document.getElementById('ftb-title');
    if (sub) sub.textContent = formTitle ? formTitle.textContent : currentFormId;

    /* 이력 목록 렌더링 */
    renderList(list, currentFormId);

    overlay.style.display = 'block';
    panel.style.display   = 'flex';
  }

  /* ── 패널 닫기 */
  function closePanel() {
    document.getElementById('history-overlay').style.display = 'none';
    document.getElementById('history-panel').style.display   = 'none';
    /* 미리보기 해제 */
    if (_previewing) cancelPreview();
  }

  /* ── 이력 목록 렌더링 */
  function renderList(container, formId) {
    var list = load(formId);
    container.innerHTML = '';

    if (list.length === 0) {
      container.innerHTML = '<div style="text-align:center;padding:32px;color:#aaa;font-size:13px">저장된 이력이 없습니다.<br><span style="font-size:11px">편집 후 💾 저장하면 이력이 기록됩니다.</span></div>';
      return;
    }

    /* 현재 저장본 표시 */
    var currentHtml = '';
    try { currentHtml = localStorage.getItem('fe_' + formId) || ''; } catch(e) {}

    list.forEach(function(item, idx) {
      var isCurrent = (item.html === currentHtml);
      var row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;padding:10px 16px;border-bottom:1px solid #f0f0f0;gap:10px;cursor:pointer;transition:background .1s';
      row.onmouseenter = function() { this.style.background = '#f5f8ff'; };
      row.onmouseleave = function() { this.style.background = ''; };

      var versionNum = list.length - idx; /* 버전 번호 (오래된 것이 1) */

      row.innerHTML =
        '<div style="width:32px;height:32px;background:' + (isCurrent ? '#0d2137' : '#eee') + ';border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:' + (isCurrent ? '#fff' : '#666') + ';flex-shrink:0">v' + versionNum + '</div>'
        + '<div style="flex:1;min-width:0">'
        +   '<div style="font-size:13px;font-weight:' + (isCurrent ? '600' : '400') + ';color:' + (isCurrent ? '#0d2137' : '#333') + '">'
        +     item.label
        +     (isCurrent ? ' <span style="font-size:10px;background:#e6f4ea;color:#2a6a3a;padding:1px 6px;border-radius:10px;margin-left:5px">현재</span>' : '')
        +   '</div>'
        +   '<div style="font-size:11px;color:#aaa;margin-top:2px">버전 ' + versionNum + ' / 전체 ' + list.length + '개</div>'
        + '</div>'
        + '<div style="display:flex;gap:6px;flex-shrink:0">'
        +   '<button onclick="FE_HISTORY.preview(\'' + formId + '\',' + idx + ')" style="background:#f0f4f8;border:1px solid #ccd;color:#2a4a6a;padding:4px 10px;border-radius:4px;font-size:11.5px;cursor:pointer;font-family:sans-serif">미리보기</button>'
        +   '<button onclick="FE_HISTORY.restore(\'' + formId + '\',' + idx + ')" style="background:#0d2137;border:none;color:#fff;padding:4px 10px;border-radius:4px;font-size:11.5px;cursor:pointer;font-family:sans-serif">복원</button>'
        + '</div>';

      container.appendChild(row);
    });
  }

  /* ── 미리보기 */
  var _previewing = false;
  var _previewBackup = '';

  function preview(formId, idx) {
    var list = load(formId);
    if (!list[idx]) return;

    if (!_previewing) {
      var p = document.getElementById('a4-paper');
      _previewBackup = p ? p.innerHTML : '';
    }
    _previewing = true;

    var p = document.getElementById('a4-paper');
    if (p) p.innerHTML = list[idx].html;

    /* 미리보기 배너 표시 */
    showPreviewBanner(formId, idx, list);
  }

  function showPreviewBanner(formId, idx, list) {
    var existing = document.getElementById('history-preview-bar');
    if (!existing) {
      existing = document.createElement('div');
      existing.id = 'history-preview-bar';
      existing.style.cssText = 'position:sticky;top:var(--toolbar-h);z-index:99;background:#fff3cd;border-bottom:2px solid #f0ad4e;border-left:4px solid #f0ad4e;padding:8px 16px;font-size:11.5px;color:#856404;display:flex;align-items:center;justify-content:space-between;gap:1rem';
      var bar = document.querySelector('.notice-bar');
      if (bar && bar.parentNode) bar.parentNode.insertBefore(existing, bar.nextSibling);
    }
    var versionNum = list.length - idx;
    existing.innerHTML = '👁 <strong>미리보기 모드</strong> — v' + versionNum + ' (' + list[idx].label + ')  &nbsp;'
      + '<div style="display:flex;gap:6px">'
      + '<button onclick="FE_HISTORY.restore(\'' + formId + '\',' + idx + ')" style="background:#856404;color:#fff;border:none;padding:4px 12px;border-radius:3px;font-size:11.5px;cursor:pointer;font-family:sans-serif">✔ 이 버전으로 복원</button>'
      + '<button onclick="FE_HISTORY.cancelPreview()" style="background:transparent;border:1px solid #c0983a;color:#856404;padding:4px 10px;border-radius:3px;font-size:11.5px;cursor:pointer;font-family:sans-serif">✕ 미리보기 취소</button>'
      + '</div>';
    existing.style.display = 'flex';
  }

  function cancelPreview() {
    _previewing = false;
    var p = document.getElementById('a4-paper');
    if (p && _previewBackup) p.innerHTML = _previewBackup;
    _previewBackup = '';
    var bar = document.getElementById('history-preview-bar');
    if (bar) bar.style.display = 'none';
  }

  /* ── 버전 복원 */
  function restore(formId, idx) {
    var list = load(formId);
    if (!list[idx]) return;

    if (!confirm('v' + (list.length - idx) + ' (' + list[idx].label + ') 버전으로 복원하겠습니까?\n현재 내용은 새 버전으로 저장됩니다.')) return;

    /* 복원 전 현재 상태를 이력에 저장 */
    var p = document.getElementById('a4-paper');
    if (p) {
      var clone = p.cloneNode(true);
      clone.querySelectorAll('.fe-col-handle,.fe-row-btns').forEach(function(el){ el.remove(); });
      push(formId, clone.innerHTML);
    }

    /* 복원 */
    var restoredHtml = list[idx].html;
    if (p) p.innerHTML = restoredHtml;
    try { localStorage.setItem('fe_' + formId, restoredHtml); } catch(e) {}

    /* 미리보기 해제 */
    _previewing = false;
    _previewBackup = '';
    var bar = document.getElementById('history-preview-bar');
    if (bar) bar.style.display = 'none';

    /* 패널 목록 갱신 */
    var listEl = document.getElementById('history-list');
    if (listEl) renderList(listEl, formId);

    /* 피드백 */
    alert('복원 완료!');
    closePanel();
  }

  /* ── 전체 이력 삭제 */
  function clearAll() {
    if (!currentFormId) return;
    if (!confirm('이 서식의 모든 편집 이력을 삭제하겠습니까?')) return;
    try { localStorage.removeItem('fe_history_' + currentFormId); } catch(e) {}
    var listEl = document.getElementById('history-list');
    if (listEl) renderList(listEl, currentFormId);
  }

  /* ── 공개 API */
  return { push: push, openPanel: openPanel, closePanel: closePanel, restore: restore, preview: preview, cancelPreview: cancelPreview, clearAll: clearAll };

})();
/* ═══════════════════════════════════════════════
   app.js — 메인 앱 로직
   ═══════════════════════════════════════════════ */

// ── STATE ───────────────────────────────────────
const S = {
  company: '', ceo: '', bizno: '', phone: '', addr: '',
  defaultAp: 3,
  currentForm: null,
  currentAp: 3
};

const AP_LABELS = {
  1: ['대표'],
  2: ['팀장', '대표'],
  3: ['담당', '팀장', '대표'],
  4: ['담당', '팀장', '본부장', '대표']
};
const AP_ALL = ['담당', '팀장', '본부장', '대표'];

// ── APPROVAL ─────────────────────────────────────
function renderApproval(n) {
  const labels = AP_LABELS[n] || [];
  let html = `<table class="ap-table"><tr>
    <td class="ap-label" rowspan="2">결재</td>`;
  labels.forEach(l => {
    html += `<td class="ap-box"><div class="ap-box-name">${l}</div><div class="ap-box-space"></div></td>`;
  });
  html += `</tr></table>`;
  return html;
}

function setFormAp(n) {
  S.currentAp = n;
  // update toggle buttons
  document.querySelectorAll('.ap-toggle-group button').forEach((btn, i) => {
    btn.classList.toggle('active', i === n);
  });
  // re-render approval in paper
  const wrap = document.getElementById('ap-container');
  if (!wrap) return;
  if (n === 0) { wrap.innerHTML = ''; wrap.style.display = 'none'; }
  else { wrap.innerHTML = renderApproval(n); wrap.style.display = ''; }
}

// ── NAVIGATION ───────────────────────────────────
function showHome() {
  document.getElementById('screen-home').classList.add('active');
  document.getElementById('screen-form').classList.remove('active');
  document.querySelectorAll('.sb-item').forEach(el => el.classList.remove('active'));
  S.currentForm = null;
}

function go(id) {
  const def = FORMS[id];
  if (!def) return;

  S.currentForm = id;
  S.currentAp = def.hasApproval ? S.defaultAp : 0;

  // screens
  document.getElementById('screen-home').classList.remove('active');
  document.getElementById('screen-form').classList.add('active');

  // sidebar
  document.querySelectorAll('.sb-item').forEach(el => el.classList.remove('active'));
  const mi = document.getElementById('m-' + id);
  if (mi) { mi.classList.add('active'); mi.scrollIntoView({ block: 'nearest' }); }

  // toolbar
  document.getElementById('ftb-title').textContent = def.title;
  document.getElementById('ftb-sub').textContent = def.sub || '';

  // approval toggle visibility
  const apWrap = document.getElementById('ap-select-wrap');
  apWrap.style.display = def.hasApproval ? 'flex' : 'none';

  // set active approval button
  document.querySelectorAll('.ap-toggle-group button').forEach((btn, i) => {
    btn.classList.toggle('active', i === S.currentAp);
  });

  // notice bar
  const nb = document.getElementById('notice-bar');
  if (def.notice) {
    nb.innerHTML = def.notice.replace(/\n/g, '<br>');
    nb.style.display = '';
  } else {
    nb.style.display = 'none';
  }

  // render paper
  const paper = document.getElementById('a4-paper');
  let apHTML = def.hasApproval && S.currentAp > 0
    ? `<div class="ap-wrap" id="ap-container">${renderApproval(S.currentAp)}</div>`
    : `<div id="ap-container" style="display:none"></div>`;

  paper.innerHTML = apHTML + def.html();

  // apply saved company info
  applyCompanyToForm();

  // scroll to top
  document.getElementById('main-wrap').scrollTo(0, 0);
}

function resetCurrentForm() {
  if (!S.currentForm) return;
  go(S.currentForm);
}

// ── SETTINGS ─────────────────────────────────────
function openModal(id) {
  // sync inputs
  document.getElementById('s-company').value = S.company;
  document.getElementById('s-ceo').value = S.ceo;
  document.getElementById('s-bizno').value = S.bizno;
  document.getElementById('s-phone').value = S.phone;
  document.getElementById('s-addr').value = S.addr;
  pickApproval(S.defaultAp, true);
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function pickApproval(n, silent) {
  S.defaultAp = n;
  document.querySelectorAll('.ap-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.n) === n);
  });
}

function saveSettings() {
  S.company = document.getElementById('s-company').value.trim();
  S.ceo = document.getElementById('s-ceo').value.trim();
  S.bizno = document.getElementById('s-bizno').value.trim();
  S.phone = document.getElementById('s-phone').value.trim();
  S.addr = document.getElementById('s-addr').value.trim();

  // badge
  const chip = document.getElementById('company-chip');
  chip.textContent = S.company
    ? S.company + (S.ceo ? ' / 대표 ' + S.ceo : '')
    : '회사 정보 미설정';

  // apply to current form if open
  if (S.currentForm) applyCompanyToForm();

  closeModal('modal-settings');
}

function applyCompanyToForm() {
  if (!S.company && !S.ceo && !S.addr) return;
  const paper = document.getElementById('a4-paper');
  if (S.company) paper.querySelectorAll('.c-company').forEach(el => { if (!el.value) el.value = S.company; });
  if (S.ceo)     paper.querySelectorAll('.c-ceo').forEach(el => { if (!el.value) el.value = S.ceo; });
  if (S.addr)    paper.querySelectorAll('.c-addr').forEach(el => { if (!el.value) el.value = S.addr; });
}

// ── PRINT ALL ────────────────────────────────────
function printAll() {
  // Collect CSS from the page
  const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .map(l => `<link rel="stylesheet" href="${l.href}">`)
    .join('\n');

  const AP_LABELS_ALL = { 1:['대표'], 2:['팀장','대표'], 3:['담당','팀장','대표'], 4:['담당','팀장','본부장','대표'] };

  function apHTML(n) {
    if (!n || n === 0) return '';
    const labels = AP_LABELS_ALL[n] || [];
    let h = `<div class="ap-wrap"><table class="ap-table"><tr><td class="ap-label" rowspan="2">결재</td>`;
    labels.forEach(l => { h += `<td class="ap-box"><div class="ap-box-name">${l}</div><div class="ap-box-space"></div></td>`; });
    h += `</tr></table></div>`;
    return h;
  }

  const formIds = Object.keys(FORMS);
  let body = '';
  formIds.forEach((id, i) => {
    const def = FORMS[id];
    const ap = def.hasApproval ? apHTML(S.defaultAp) : '';
    body += `
      <div class="a4-paper print-page" ${i > 0 ? 'style="page-break-before:always"' : ''}>
        ${ap}
        ${def.html()}
      </div>`;
  });

  const win = window.open('', '_blank', 'width=900,height=700');
  win.document.write(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
${cssLinks}
<style>
  body { background: #ccc; margin: 0; padding: 16px; }
  .a4-paper { width: 794px; min-height: 1122px; background: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,.2); padding: 28mm 22mm;
    margin: 0 auto 20px; }
  @media print {
    body { background: #fff; padding: 0; }
    .a4-paper { box-shadow: none; margin: 0; padding: 0; width: 100%; min-height: 0; }
    .print-page { page-break-before: always; }
    .print-page:first-child { page-break-before: auto; }
    @page { size: A4 portrait; margin: 20mm 22mm; }
  }
  .print-toolbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    background: #0d2137; color: #fff; padding: 10px 20px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .print-toolbar button {
    background: #c8a354; color: #0d2137; border: none; padding: 8px 20px;
    font-size: 14px; font-weight: 700; cursor: pointer; border-radius: 4px;
    font-family: 'Noto Sans KR', sans-serif;
  }
  .print-toolbar span { font-size: 13px; }
  @media print { .print-toolbar { display: none !important; } }
  body { padding-top: 54px; }
</style>
</head>
<body>
<div class="print-toolbar">
  <span>노무 서식 포털 — 전체 서식 ${formIds.length}종 미리보기</span>
  <button onclick="window.print()">🖨 PDF로 저장 / 인쇄</button>
</div>
${body}
</body></html>`);
  win.document.close();
}
────
(function init() {
  // Load saved settings from localStorage if available
  try {
    const saved = localStorage.getItem('laborPortalSettings');
    if (saved) {
      const d = JSON.parse(saved);
      Object.assign(S, d);
      if (S.company || S.ceo) {
        document.getElementById('company-chip').textContent =
          S.company + (S.ceo ? ' / 대표 ' + S.ceo : '');
      }
    }
  } catch(e) {}

  // Auto-show first form
  go('employed');
})();

// Save on unload
window.addEventListener('beforeunload', () => {
  try { localStorage.setItem('laborPortalSettings', JSON.stringify(S)); } catch(e) {}
});

/* ═══════════════════════════════════════════════════════════════
   editor.js — 실시간 디자인 편집기
   
   이 파일이 하는 일:
   ① 오른쪽 슬라이드 패널 UI 제어 (열기·닫기)
   ② 색상·크기·로고 변경 → CSS 변수에 즉시 반영
   ③ 변경 내용 localStorage 저장/불러오기
   ④ 기본값으로 초기화
   ⑤ CSS 스니펫 내보내기 (코드 직접 수정 참고용)
   
   사용법:
   - 헤더의 [🎨 디자인 편집] 버튼 클릭 → 패널 열림
   - 항목 변경 시 서식 화면에 즉시 반영됨
   - [저장] 버튼으로 브라우저에 영구 저장
   - [초기화] 버튼으로 기본값으로 복원
   ═══════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────────────────
   ① 기본값 정의 (DEFAULT_DESIGN)
   
   모든 디자인 속성의 기본값입니다.
   초기화 버튼을 누르면 이 값으로 복원됩니다.
   코드로 기본값을 바꾸고 싶다면 여기서 수정하세요.
   ───────────────────────────────────────────────────────────── */
const DEFAULT_DESIGN = {
  /* ── 색상 ── */
  navyDk:    '#0d2137',   /* 헤더·주요 버튼 배경색 */
  navy:      '#1b3a5c',   /* 사이드바 배경색 */
  gold:      '#c8a354',   /* 강조 색상 (활성 항목·구분선) */
  bg:        '#eae6de',   /* 페이지 배경색 */
  tblLblBg:  '#ede9e2',   /* 서식 테이블 라벨 셀 배경 */
  tblHeadBg: '#e6e1d9',   /* 서식 테이블 헤더 배경 */
  apBg:      '#e8e3db',   /* 결재란 배경색 */
  textColor: '#1a1a18',   /* 서식 본문 텍스트 색상 */

  /* ── 서식 크기 ── */
  formFont:  9.5,          /* 서식 기본 폰트 크기 (pt) */
  titleFont: 18,           /* 서식 제목 폰트 크기 (pt) */
  cellPadV:  4,            /* 테이블 셀 상하 패딩 (pt) — 값이 클수록 셀이 높아짐 */
  signW:     150,          /* 서명란 입력칸 너비 (pt) */
  docBorder: 2,            /* 서식 제목 하단 구분선 두께 (pt) */

  /* ── A4 여백 ── */
  a4PadV:    28,           /* A4 용지 상하 여백 (mm) */
  a4PadH:    22,           /* A4 용지 좌우 여백 (mm) */

  /* ── 로고 ── */
  logoText:  '노무 서식 포털',     /* 헤더 로고 텍스트 */
  logoSub:   'HR Document Portal', /* 헤더 로고 부제목 */
  logoMark:  '',                   /* 로고 이미지 (base64 또는 빈 문자열 = 기본 '勞' 텍스트) */
  logoMarkText: '勞',              /* 이미지 없을 때 표시할 텍스트 */
};


/* ─────────────────────────────────────────────────────────────
   ② 현재 디자인 상태
   
   이 객체가 변경되면 applyDesign()을 호출하여 즉시 반영합니다.
   ───────────────────────────────────────────────────────────── */
let DESIGN = Object.assign({}, DEFAULT_DESIGN);


/* ─────────────────────────────────────────────────────────────
   ③ CSS 변수 적용 함수
   
   DESIGN 객체의 값을 document.documentElement의 CSS 변수로 반영합니다.
   색상·크기 슬라이더 변경 시 이 함수가 즉시 호출됩니다.
   ───────────────────────────────────────────────────────────── */
function applyDesign(d) {
  const r = document.documentElement.style; /* :root 인라인 스타일 */

  /* 색상 */
  r.setProperty('--navy-dk',     d.navyDk);
  r.setProperty('--navy',        d.navy);
  r.setProperty('--navy-lt',     lighten(d.navyDk, 20));  /* 헤더 버튼 호버 = 약간 밝게 */
  r.setProperty('--gold',        d.gold);
  r.setProperty('--gold-lt',     lighten(d.gold, 70));    /* 강조색 연한 버전 */
  r.setProperty('--bg',          d.bg);
  r.setProperty('--tray',        darken(d.bg, 8));        /* 트레이 = 배경보다 약간 어둡게 */
  r.setProperty('--tbl-lbl-bg',  d.tblLblBg);
  r.setProperty('--tbl-head-bg', d.tblHeadBg);
  r.setProperty('--tbl-lbl2-bg', lighten(d.tblLblBg, 10));
  r.setProperty('--ap-bg',       d.apBg);
  r.setProperty('--text',        d.textColor);

  /* 크기 (단위 포함하여 설정) */
  r.setProperty('--form-font',   d.formFont  + 'pt');
  r.setProperty('--title-font',  d.titleFont + 'pt');
  r.setProperty('--cell-pad-v',  d.cellPadV  + 'pt');
  r.setProperty('--sign-w',      d.signW     + 'pt');
  r.setProperty('--doc-border',  d.docBorder + 'pt');
  r.setProperty('--a4-pad-v',    d.a4PadV    + 'mm');
  r.setProperty('--a4-pad-h',    d.a4PadH    + 'mm');

  /* 로고 */
  applyLogo(d);
}


/* ─────────────────────────────────────────────────────────────
   ④ 로고 적용 함수
   
   헤더의 .logo-mark 와 .logo-name, .logo-sub 요소를 직접 업데이트합니다.
   ───────────────────────────────────────────────────────────── */
function applyLogo(d) {
  const mark = document.querySelector('.logo-mark');
  const name = document.querySelector('.logo-name');
  const sub  = document.querySelector('.logo-sub');

  if (mark) {
    if (d.logoMark) {
      /* 이미지가 있으면 배경이미지로 표시 */
      mark.style.backgroundImage = `url(${d.logoMark})`;
      mark.style.backgroundSize  = 'cover';
      mark.style.backgroundPosition = 'center';
      mark.textContent = '';
    } else {
      /* 이미지 없으면 텍스트 */
      mark.style.backgroundImage = '';
      mark.textContent = d.logoMarkText || '勞';
    }
    /* 로고 배경색도 강조색으로 */
    mark.style.background = d.logoMark ? 'transparent' : d.gold;
    mark.style.color = d.navyDk;
  }
  if (name) name.textContent = d.logoText;
  if (sub)  sub.textContent  = d.logoSub;
}


/* ─────────────────────────────────────────────────────────────
   ⑤ 색상 유틸리티 함수
   
   16진수 색상을 밝게/어둡게 조정합니다.
   @param {string} hex — '#rrggbb' 형식
   @param {number} pct — 밝기 조정 퍼센트 (양수=밝게, 음수=어둡게)
   @returns {string} — 조정된 '#rrggbb'
   ───────────────────────────────────────────────────────────── */
function lighten(hex, pct) {
  return adjustColor(hex, pct);
}
function darken(hex, pct) {
  return adjustColor(hex, -pct);
}
function adjustColor(hex, pct) {
  try {
    const n = parseInt(hex.replace('#',''), 16);
    const r = Math.min(255, Math.max(0, (n >> 16) + Math.round(255 * pct / 100)));
    const g = Math.min(255, Math.max(0, ((n >> 8) & 0xFF) + Math.round(255 * pct / 100)));
    const b = Math.min(255, Math.max(0, (n & 0xFF) + Math.round(255 * pct / 100)));
    return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
  } catch(e) {
    return hex; /* 파싱 실패 시 원본 반환 */
  }
}


/* ─────────────────────────────────────────────────────────────
   ⑥ 편집기 패널 열기/닫기
   ───────────────────────────────────────────────────────────── */
function openEditor() {
  /* 패널을 열기 전에 현재 DESIGN 값을 UI 컨트롤에 동기화 */
  syncEditorUI();
  document.getElementById('editor-panel').classList.add('open');
  document.getElementById('editor-overlay').classList.add('open');
}

function closeEditor() {
  document.getElementById('editor-panel').classList.remove('open');
  document.getElementById('editor-overlay').classList.remove('open');
}


/* ─────────────────────────────────────────────────────────────
   ⑦ UI 컨트롤 → DESIGN 값 동기화
   
   편집기 패널을 열 때 현재 DESIGN 값을 각 input에 반영합니다.
   ───────────────────────────────────────────────────────────── */
function syncEditorUI() {
  /* 색상 피커 */
  setVal('ed-navyDk',    DESIGN.navyDk);
  setVal('ed-navy',      DESIGN.navy);
  setVal('ed-gold',      DESIGN.gold);
  setVal('ed-bg',        DESIGN.bg);
  setVal('ed-tblLblBg',  DESIGN.tblLblBg);
  setVal('ed-tblHeadBg', DESIGN.tblHeadBg);
  setVal('ed-apBg',      DESIGN.apBg);
  setVal('ed-textColor', DESIGN.textColor);

  /* 크기 슬라이더 + 숫자 표시 */
  setSlider('ed-formFont',  DESIGN.formFont,  'ed-formFont-v',  'pt');
  setSlider('ed-titleFont', DESIGN.titleFont, 'ed-titleFont-v', 'pt');
  setSlider('ed-cellPadV',  DESIGN.cellPadV,  'ed-cellPadV-v',  'pt');
  setSlider('ed-signW',     DESIGN.signW,     'ed-signW-v',     'pt');
  setSlider('ed-docBorder', DESIGN.docBorder, 'ed-docBorder-v', 'pt');
  setSlider('ed-a4PadV',    DESIGN.a4PadV,    'ed-a4PadV-v',    'mm');
  setSlider('ed-a4PadH',    DESIGN.a4PadH,    'ed-a4PadH-v',    'mm');

  /* 로고 텍스트 */
  setVal('ed-logoText',     DESIGN.logoText);
  setVal('ed-logoSub',      DESIGN.logoSub);
  setVal('ed-logoMarkText', DESIGN.logoMarkText);

  /* 로고 미리보기 */
  updateLogoPreview();
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}
function setSlider(sliderId, val, displayId, unit) {
  const el = document.getElementById(sliderId);
  const dsp = document.getElementById(displayId);
  if (el)  el.value = val;
  if (dsp) dsp.textContent = val + unit;
}


/* ─────────────────────────────────────────────────────────────
   ⑧ 편집기 컨트롤 변경 핸들러 (각 input에서 oninput으로 호출)
   
   @param {string} key   — DESIGN 객체의 속성 이름
   @param {string} value — 새 값 (문자열)
   @param {string} type  — 'color' | 'number' | 'text'
   ───────────────────────────────────────────────────────────── */
function edChange(key, value, type) {
  /* 타입에 따라 변환 */
  DESIGN[key] = (type === 'number') ? parseFloat(value) : value;

  /* 슬라이더인 경우 옆 숫자 표시 갱신 */
  const unitMap = {
    formFont:  'pt', titleFont: 'pt', cellPadV: 'pt',
    signW:     'pt', docBorder: 'pt', a4PadV:   'mm', a4PadH: 'mm'
  };
  if (unitMap[key]) {
    const dspEl = document.getElementById('ed-' + key + '-v');
    if (dspEl) dspEl.textContent = value + unitMap[key];
  }

  /* 즉시 화면에 반영 */
  applyDesign(DESIGN);
}


/* ─────────────────────────────────────────────────────────────
   ⑨ 로고 이미지 업로드 핸들러
   
   파일 선택 → FileReader로 base64 변환 → DESIGN.logoMark에 저장
   → 헤더에 즉시 반영
   ───────────────────────────────────────────────────────────── */
function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  /* 이미지 파일 타입 검사 */
  if (!file.type.startsWith('image/')) {
    alert('이미지 파일만 업로드 가능합니다 (PNG, JPG, SVG 등)');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    DESIGN.logoMark = e.target.result; /* base64 데이터 URL */
    applyDesign(DESIGN);
    updateLogoPreview();
  };
  reader.readAsDataURL(file);
}


/* ─────────────────────────────────────────────────────────────
   ⑩ 로고 미리보기 갱신
   ───────────────────────────────────────────────────────────── */
function updateLogoPreview() {
  const preview = document.getElementById('ed-logo-preview');
  if (!preview) return;

  if (DESIGN.logoMark) {
    preview.innerHTML = `<img src="${DESIGN.logoMark}" style="width:40px;height:40px;object-fit:contain;border-radius:4px;background:#eee;"/>
      <button onclick="clearLogo()" style="margin-left:8px;font-size:11px;padding:3px 8px;cursor:pointer;border:1px solid #ccc;border-radius:3px;background:white">✕ 제거</button>`;
  } else {
    preview.innerHTML = `<div style="width:40px;height:40px;background:${DESIGN.gold};border-radius:4px;display:flex;align-items:center;justify-content:center;font-family:'Noto Serif KR',serif;font-size:16px;font-weight:700;color:${DESIGN.navyDk}">${DESIGN.logoMarkText || '勞'}</div>`;
  }
}


/* ─────────────────────────────────────────────────────────────
   ⑪ 로고 이미지 제거
   ───────────────────────────────────────────────────────────── */
function clearLogo() {
  DESIGN.logoMark = '';
  document.getElementById('ed-logo-file').value = '';
  applyDesign(DESIGN);
  updateLogoPreview();
}


/* ─────────────────────────────────────────────────────────────
   ⑫ 저장 (localStorage)
   ───────────────────────────────────────────────────────────── */
function saveDesign() {
  try {
    localStorage.setItem('laborPortalDesign', JSON.stringify(DESIGN));
    /* 저장 완료 피드백 */
    const btn = document.getElementById('ed-save-btn');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = '✔ 저장됨';
      btn.style.background = '#2a6a3a';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
      }, 1500);
    }
  } catch(e) {
    alert('저장 중 오류가 발생했습니다: ' + e.message);
  }
}


/* ─────────────────────────────────────────────────────────────
   ⑬ 기본값으로 초기화
   ───────────────────────────────────────────────────────────── */
function resetDesign() {
  if (!confirm('모든 디자인 설정을 기본값으로 초기화하겠습니까?')) return;
  DESIGN = Object.assign({}, DEFAULT_DESIGN);
  applyDesign(DESIGN);
  syncEditorUI();
  /* localStorage에서도 삭제 */
  try { localStorage.removeItem('laborPortalDesign'); } catch(e) {}
}


/* ─────────────────────────────────────────────────────────────
   ⑭ CSS 스니펫 내보내기
   
   현재 디자인 설정을 :root CSS 변수 형태로 내보냅니다.
   style.css의 :root {} 블록을 이 내용으로 교체하면 됩니다.
   ───────────────────────────────────────────────────────────── */
function exportCSS() {
  const snippet = `:root {
  /* ── 브랜드 색상 ── */
  --navy-dk:     ${DESIGN.navyDk};
  --navy:        ${DESIGN.navy};
  --navy-lt:     ${lighten(DESIGN.navyDk, 20)};
  --gold:        ${DESIGN.gold};
  --gold-lt:     ${lighten(DESIGN.gold, 70)};
  --bg:          ${DESIGN.bg};
  --tray:        ${darken(DESIGN.bg, 8)};
  --text:        ${DESIGN.textColor};

  /* ── 서식 테이블 색상 ── */
  --tbl-lbl-bg:  ${DESIGN.tblLblBg};
  --tbl-head-bg: ${DESIGN.tblHeadBg};
  --tbl-lbl2-bg: ${lighten(DESIGN.tblLblBg, 10)};
  --ap-bg:       ${DESIGN.apBg};

  /* ── 서식 크기 ── */
  --form-font:   ${DESIGN.formFont}pt;
  --title-font:  ${DESIGN.titleFont}pt;
  --cell-pad-v:  ${DESIGN.cellPadV}pt;
  --sign-w:      ${DESIGN.signW}pt;
  --doc-border:  ${DESIGN.docBorder}pt;

  /* ── A4 여백 ── */
  --a4-pad-v:    ${DESIGN.a4PadV}mm;
  --a4-pad-h:    ${DESIGN.a4PadH}mm;
}`;

  /* 클립보드 복사 */
  navigator.clipboard.writeText(snippet).then(() => {
    alert('CSS 스니펫이 클립보드에 복사되었습니다.\nstyle.css의 :root {} 블록을 이 내용으로 교체하세요.');
  }).catch(() => {
    /* 클립보드 API 실패 시 텍스트에어리어로 표시 */
    const ta = document.createElement('textarea');
    ta.value = snippet;
    ta.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;height:300px;z-index:9999;font-family:monospace;font-size:12px;padding:1rem;';
    document.body.appendChild(ta);
    ta.select();
    alert('아래 텍스트를 복사하여 style.css의 :root {} 에 붙여넣으세요.\n(닫으려면 Escape)');
    ta.addEventListener('keydown', e => { if(e.key === 'Escape') ta.remove(); });
  });
}


/* ─────────────────────────────────────────────────────────────
   ⑮ 초기화 (페이지 로드 시 자동 실행)
   
   localStorage에 저장된 디자인이 있으면 불러오고,
   없으면 DEFAULT_DESIGN을 그대로 사용합니다.
   ───────────────────────────────────────────────────────────── */
(function initDesign() {
  try {
    const saved = localStorage.getItem('laborPortalDesign');
    if (saved) {
      /* 저장된 값을 DEFAULT와 병합 (새 항목이 추가돼도 누락 없이) */
      DESIGN = Object.assign({}, DEFAULT_DESIGN, JSON.parse(saved));
    }
  } catch(e) {
    console.warn('디자인 설정 불러오기 실패:', e);
  }
  /* CSS 변수 적용 */
  applyDesign(DESIGN);
})();


/* ─────────────────────────────────────────────────────────────
   ⑯ 색상 프리셋 적용
   
   @param {string} name — 프리셋 이름
   ───────────────────────────────────────────────────────────── */
const COLOR_PRESETS = {
  /* 기본 네이비 (원래 설정) */
  navy: {
    navyDk: '#0d2137', navy: '#1b3a5c', gold: '#c8a354',
    bg: '#eae6de', tblLblBg: '#ede9e2', tblHeadBg: '#e6e1d9', apBg: '#e8e3db'
  },
  /* 포레스트 그린 */
  forest: {
    navyDk: '#0d3320', navy: '#1a5c35', gold: '#a8c86a',
    bg: '#e8ede4', tblLblBg: '#dde8d8', tblHeadBg: '#d4e2ce', apBg: '#d8e5d4'
  },
  /* 버건디 */
  burgundy: {
    navyDk: '#3a0d1a', navy: '#6b1a2e', gold: '#d4a44c',
    bg: '#ede8e4', tblLblBg: '#f0e8e5', tblHeadBg: '#e8ddd9', apBg: '#e5d8d4'
  },
  /* 슬레이트 (다크 블루그레이) */
  slate: {
    navyDk: '#1a1f2e', navy: '#2a3244', gold: '#7ca8d4',
    bg: '#e4e8ee', tblLblBg: '#dce2ea', tblHeadBg: '#d4dce6', apBg: '#d8dfe8'
  },
  /* 모노크롬 */
  mono: {
    navyDk: '#1a1a1a', navy: '#2e2e2e', gold: '#888888',
    bg: '#eeece8', tblLblBg: '#e8e6e2', tblHeadBg: '#e0deda', apBg: '#e4e2de'
  }
};

function applyPreset(name) {
  const preset = COLOR_PRESETS[name];
  if (!preset) return;

  /* DESIGN 객체에 프리셋 색상 적용 */
  Object.assign(DESIGN, preset);

  /* CSS 즉시 반영 */
  applyDesign(DESIGN);

  /* 편집기 UI 컨트롤 동기화 */
  syncEditorUI();
}

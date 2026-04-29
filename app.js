/* ═══════════════════════════════════════════════════════════════
   app.js — 노무 서식 포털 메인 앱 로직
   
   이 파일이 하는 일:
   ① 전역 상태(회사 정보·결재단계) 관리
   ② 결재란 HTML 생성 및 렌더링
   ③ 서식 화면 전환 (사이드바 → 본문)
   ④ 회사 설정 저장/불러오기 (localStorage)
   ⑤ 전체 서식 일괄 PDF 출력
   ═══════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────────────────
   ① 전역 상태 객체
   - 이 객체의 값이 바뀌면 반드시 saveSettings() 또는
     applyCompanyToForm()도 같이 호출해야 화면에 반영됩니다.
   ───────────────────────────────────────────────────────────── */
const S = {
  company: '',    // 회사명 (법인명) — 모든 서식 c-company 필드에 자동 입력
  ceo:     '',    // 대표자명        — 모든 서식 c-ceo 필드에 자동 입력
  bizno:   '',    // 사업자등록번호  — 현재 표시용 (서식 직접 입력 필요)
  phone:   '',    // 대표 연락처     — 현재 표시용
  addr:    '',    // 사업장 소재지   — c-addr 필드에 자동 입력
  defaultAp: 3,   // 기본 결재단계 (1~4, 0=없음) — 서식별로 개별 변경 가능
  currentForm: null, // 현재 열려있는 서식 ID (예: 'employed', 'dismiss')
  currentAp:   3     // 현재 서식의 결재단계 (서식 전환 시 defaultAp로 초기화)
};


/* ─────────────────────────────────────────────────────────────
   ② 결재단계별 레이블 정의
   
   키(숫자) = 결재 단계 수
   값(배열) = 결재란에 표시할 직급 순서
   
   수정 방법: 레이블 텍스트를 바꾸거나 5단계 이상 추가하려면
   아래 객체에 새 항목을 추가하세요.
   예) 5: ['담당','팀장','본부장','대표이사','회장']
   ───────────────────────────────────────────────────────────── */
const AP_LABELS = {
  1: ['대표'],
  2: ['팀장', '대표'],
  3: ['담당', '팀장', '대표'],
  4: ['담당', '팀장', '본부장', '대표']
};

/* 전체 출력용 별도 복사본 (printAll 함수에서 사용) */
const AP_LABELS_ALL = {
  1: ['대표'],
  2: ['팀장', '대표'],
  3: ['담당', '팀장', '대표'],
  4: ['담당', '팀장', '본부장', '대표']
};


/* ─────────────────────────────────────────────────────────────
   ③ 결재란 HTML 생성 함수
   
   @param {number} n — 결재 단계 수 (0이면 빈 문자열 반환)
   @returns {string} — <table> 형태의 결재란 HTML 문자열
   
   생성된 HTML 구조:
     <table class="ap-table">
       <tr>
         <td class="ap-label">결재</td>  ← 항상 표시
         <td class="ap-box">담당</td>    ← n 개수만큼 생성
         ...
       </tr>
     </table>
   ───────────────────────────────────────────────────────────── */
function renderApproval(n) {
  const labels = AP_LABELS[n] || [];
  let html = `<table class="ap-table"><tr>
    <td class="ap-label" rowspan="2">결재</td>`;
  labels.forEach(l => {
    html += `<td class="ap-box">
      <div class="ap-box-name">${l}</div>
      <div class="ap-box-space"></div>
    </td>`;
  });
  html += `</tr></table>`;
  return html;
}


/* ─────────────────────────────────────────────────────────────
   ④ 결재단계 변경 함수 (서식 툴바의 토글 버튼에서 호출)
   
   @param {number} n — 새로운 결재 단계 (0=없음, 1~4)
   
   동작:
   1. S.currentAp 업데이트
   2. 툴바 버튼 활성화 표시 갱신
   3. 현재 서식의 결재란(#ap-container) 재렌더링
   ───────────────────────────────────────────────────────────── */
function setFormAp(n) {
  S.currentAp = n;

  /* 툴바 버튼 스타일 갱신 (0=없음, 1~4=단계) */
  document.querySelectorAll('.ap-toggle-group button').forEach((btn, i) => {
    btn.classList.toggle('active', i === n);
  });

  /* 서식 내부의 결재란 컨테이너 갱신 */
  const wrap = document.getElementById('ap-container');
  if (!wrap) return;

  if (n === 0) {
    /* 결재란 없음 — 숨기고 내용 비움 */
    wrap.innerHTML = '';
    wrap.style.display = 'none';
  } else {
    /* 결재란 있음 — renderApproval()로 HTML 생성 후 교체 */
    wrap.innerHTML = renderApproval(n);
    wrap.style.display = '';
  }
}


/* ─────────────────────────────────────────────────────────────
   ⑤ 홈 화면으로 이동
   
   사이드바의 "홈" 버튼 또는 로고 클릭 시 호출.
   서식 화면을 숨기고 홈 화면을 표시합니다.
   ───────────────────────────────────────────────────────────── */
function showHome() {
  document.getElementById('screen-home').classList.add('active');
  document.getElementById('screen-form').classList.remove('active');

  /* 사이드바 활성 항목 초기화 */
  document.querySelectorAll('.sb-item').forEach(el => el.classList.remove('active'));

  S.currentForm = null;
}


/* ─────────────────────────────────────────────────────────────
   ⑥ 서식 화면 전환 함수 (사이드바 항목 클릭 시 호출)
   
   @param {string} id — forms.js의 FORMS 객체 키값
                        예: 'employed', 'dismiss', 'resign'
   
   처리 순서:
   1. FORMS[id] 에서 서식 정의 가져오기
   2. 화면 전환 (홈 → 서식)
   3. 사이드바 활성 항목 변경
   4. 툴바 제목·부제목·결재 토글 설정
   5. 공지 배너 표시/숨김
   6. A4 용지 영역에 HTML 렌더링
   7. 저장된 회사 정보 자동 입력
   8. 스크롤 최상단으로 이동
   ───────────────────────────────────────────────────────────── */
function go(id) {
  const def = FORMS[id];
  if (!def) return; /* 정의되지 않은 ID면 무시 */

  /* 현재 상태 저장 */
  S.currentForm = id;
  /* hasApproval=true인 서식은 기본 결재단계, false면 0(없음) */
  S.currentAp = def.hasApproval ? S.defaultAp : 0;

  /* --- 화면 전환 --- */
  document.getElementById('screen-home').classList.remove('active');
  document.getElementById('screen-form').classList.add('active');

  /* --- 사이드바 활성화 --- */
  document.querySelectorAll('.sb-item').forEach(el => el.classList.remove('active'));
  const menuItem = document.getElementById('m-' + id);
  if (menuItem) {
    menuItem.classList.add('active');
    /* 사이드바에서 현재 항목이 보이도록 스크롤 */
    menuItem.scrollIntoView({ block: 'nearest' });
  }

  /* --- 툴바 업데이트 --- */
  document.getElementById('ftb-title').textContent = def.title;
  document.getElementById('ftb-sub').textContent = def.sub || '';

  /* 결재 토글 — hasApproval이 false인 서식(증명서류 등)은 숨김 */
  const apWrap = document.getElementById('ap-select-wrap');
  apWrap.style.display = def.hasApproval ? 'flex' : 'none';

  /* 툴바 결재 버튼 활성화 상태 반영 */
  document.querySelectorAll('.ap-toggle-group button').forEach((btn, i) => {
    btn.classList.toggle('active', i === S.currentAp);
  });

  /* --- 공지 배너 --- */
  const nb = document.getElementById('notice-bar');
  if (def.notice) {
    nb.innerHTML = def.notice.replace(/\n/g, '<br>');
    nb.style.display = '';
  } else {
    nb.style.display = 'none';
  }

  /* --- A4 용지 렌더링 ---
     결재란 컨테이너(#ap-container) + 서식 본문 순서로 삽입 */
  const paper = document.getElementById('a4-paper');
  const apHTML = (def.hasApproval && S.currentAp > 0)
    ? `<div class="ap-wrap" id="ap-container">${renderApproval(S.currentAp)}</div>`
    : `<div id="ap-container" style="display:none"></div>`;

  paper.innerHTML = apHTML + def.html();

  /* --- 저장된 회사 정보를 빈 필드에만 자동 입력 --- */
  applyCompanyToForm();

  /* --- 스크롤 초기화 --- */
  document.getElementById('main-wrap').scrollTo(0, 0);
}


/* ─────────────────────────────────────────────────────────────
   ⑦ 현재 서식 초기화 (툴바 '↺ 초기화' 버튼에서 호출)
   
   서식을 다시 렌더링하여 모든 입력값을 초기화합니다.
   회사 정보(c-company, c-ceo, c-addr)는 다시 자동 입력됩니다.
   ───────────────────────────────────────────────────────────── */
function resetCurrentForm() {
  if (!S.currentForm) return;
  go(S.currentForm); /* go()를 다시 호출하면 서식이 재렌더링됨 */
}


/* ─────────────────────────────────────────────────────────────
   ⑧ 설정 모달 열기 (헤더 '⚙ 설정' 버튼에서 호출)
   
   모달을 열기 전에 현재 S 객체의 값을 입력 필드에 반영합니다.
   ───────────────────────────────────────────────────────────── */
function openModal(id) {
  /* 현재 저장된 설정값을 모달 입력 필드에 동기화 */
  document.getElementById('s-company').value = S.company;
  document.getElementById('s-ceo').value     = S.ceo;
  document.getElementById('s-bizno').value   = S.bizno;
  document.getElementById('s-phone').value   = S.phone;
  document.getElementById('s-addr').value    = S.addr;

  /* 결재단계 버튼 활성화 상태 동기화 */
  pickApproval(S.defaultAp, true);

  /* 모달 표시 */
  document.getElementById(id).classList.add('open');
}


/* ─────────────────────────────────────────────────────────────
   ⑨ 설정 모달 닫기
   ───────────────────────────────────────────────────────────── */
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}


/* ─────────────────────────────────────────────────────────────
   ⑩ 결재단계 버튼 선택 (모달 내 버튼 클릭 시 호출)
   
   @param {number} n      — 선택한 결재 단계
   @param {boolean} silent — true이면 S.defaultAp만 변경 (버튼 스타일 갱신 포함)
   ───────────────────────────────────────────────────────────── */
function pickApproval(n, silent) {
  S.defaultAp = n;
  /* 모달 내 결재단계 버튼 활성화 스타일 갱신 */
  document.querySelectorAll('.ap-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.n) === n);
  });
}


/* ─────────────────────────────────────────────────────────────
   ⑪ 설정 저장 (모달 '저장 및 전체 적용' 버튼에서 호출)
   
   동작:
   1. 모달 입력값을 S 객체에 반영
   2. 헤더 회사명 뱃지 텍스트 갱신
   3. 현재 열려있는 서식에 즉시 적용
   4. localStorage에 영구 저장
   5. 모달 닫기
   ───────────────────────────────────────────────────────────── */
function saveSettings() {
  /* 입력값 읽기 (앞뒤 공백 제거) */
  S.company = document.getElementById('s-company').value.trim();
  S.ceo     = document.getElementById('s-ceo').value.trim();
  S.bizno   = document.getElementById('s-bizno').value.trim();
  S.phone   = document.getElementById('s-phone').value.trim();
  S.addr    = document.getElementById('s-addr').value.trim();

  /* 헤더 뱃지 갱신 */
  const chip = document.getElementById('company-chip');
  chip.textContent = S.company
    ? S.company + (S.ceo ? ' / 대표 ' + S.ceo : '')
    : '회사 정보 미설정';

  /* 현재 열려있는 서식에 즉시 반영 */
  if (S.currentForm) applyCompanyToForm();

  /* localStorage에 저장 — 브라우저를 닫아도 유지됨 */
  try {
    localStorage.setItem('laborPortalSettings', JSON.stringify(S));
  } catch(e) {
    console.warn('설정 저장 실패:', e);
  }

  closeModal('modal-settings');
}


/* ─────────────────────────────────────────────────────────────
   ⑫ 현재 서식에 회사 정보 자동 입력
   
   동작: A4 용지 안에서 class별로 필드를 찾아 빈 경우에만 입력
   - .c-company → S.company (회사명)
   - .c-ceo     → S.ceo     (대표자명)
   - .c-addr    → S.addr    (사업장 소재지)
   
   주의: 이미 입력된 값은 덮어쓰지 않습니다 (if (!el.value)).
   ───────────────────────────────────────────────────────────── */
function applyCompanyToForm() {
  /* 저장된 값이 없으면 실행하지 않음 */
  if (!S.company && !S.ceo && !S.addr) return;

  const paper = document.getElementById('a4-paper');
  if (!paper) return;

  if (S.company) {
    paper.querySelectorAll('.c-company').forEach(el => {
      if (!el.value) el.value = S.company;
    });
  }
  if (S.ceo) {
    paper.querySelectorAll('.c-ceo').forEach(el => {
      if (!el.value) el.value = S.ceo;
    });
  }
  if (S.addr) {
    paper.querySelectorAll('.c-addr').forEach(el => {
      if (!el.value) el.value = S.addr;
    });
  }
}


/* ─────────────────────────────────────────────────────────────
   ⑬ 전체 서식 일괄 PDF 출력
   
   동작:
   1. 새 창(팝업)을 열어 26종 서식을 A4 용지 단위로 모두 렌더링
   2. 각 서식 사이에 page-break-before: always 삽입
   3. 팝업 상단 툴바의 [PDF로 저장/인쇄] 버튼으로 출력
   
   주의: 팝업 차단 설정이 켜져 있으면 동작하지 않습니다.
   브라우저에서 이 사이트의 팝업을 허용해 주세요.
   ───────────────────────────────────────────────────────────── */
function printAll() {
  /* 현재 페이지의 CSS 링크를 그대로 가져와 팝업에 적용 */
  const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .map(l => `<link rel="stylesheet" href="${l.href}">`)
    .join('\n');

  /* 결재란 HTML 생성 (팝업 내부용 독립 함수) */
  function apHTML(n) {
    if (!n || n === 0) return '';
    const labels = AP_LABELS_ALL[n] || [];
    let h = `<div class="ap-wrap"><table class="ap-table"><tr>
      <td class="ap-label" rowspan="2">결재</td>`;
    labels.forEach(l => {
      h += `<td class="ap-box">
        <div class="ap-box-name">${l}</div>
        <div class="ap-box-space"></div>
      </td>`;
    });
    h += `</tr></table></div>`;
    return h;
  }

  /* forms.js의 FORMS 객체 키 순서대로 모든 서식 렌더링 */
  const formIds = Object.keys(FORMS);
  let body = '';
  formIds.forEach((id, i) => {
    const def = FORMS[id];
    const ap = def.hasApproval ? apHTML(S.defaultAp) : '';
    /* 첫 번째 서식 제외하고 페이지 나누기 삽입 */
    body += `
      <div class="a4-paper print-page" ${i > 0 ? 'style="page-break-before:always"' : ''}>
        ${ap}
        ${def.html()}
      </div>`;
  });

  /* 팝업 창 열기 */
  const win = window.open('', '_blank', 'width=900,height=700');
  if (!win) {
    alert('팝업이 차단되었습니다.\n브라우저에서 이 사이트의 팝업을 허용한 후 다시 시도해 주세요.');
    return;
  }

  win.document.write(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
${cssLinks}
<style>
  /* 팝업 미리보기 전용 스타일 */
  body { background: #ccc; margin: 0; padding: 16px; }
  .a4-paper {
    width: 794px; min-height: 1122px;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,.2);
    padding: 28mm 22mm;
    margin: 0 auto 20px;
  }
  /* 인쇄 시 배경·그림자 제거, 여백은 @page로 제어 */
  @media print {
    body { background: #fff; padding: 0; }
    .a4-paper {
      box-shadow: none; margin: 0; padding: 0;
      width: 100%; min-height: 0;
    }
    .print-page { page-break-before: always; }
    .print-page:first-child { page-break-before: auto; }
    @page { size: A4 portrait; margin: 20mm 22mm; }
  }
  /* 팝업 상단 툴바 — 인쇄 시 자동 숨김 */
  .print-toolbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    background: #0d2137; color: #fff;
    padding: 10px 20px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .print-toolbar button {
    background: #c8a354; color: #0d2137;
    border: none; padding: 8px 20px;
    font-size: 14px; font-weight: 700;
    cursor: pointer; border-radius: 4px;
    font-family: 'Noto Sans KR', sans-serif;
  }
  @media print { .print-toolbar { display: none !important; } }
  /* 툴바 높이만큼 본문 상단 여백 */
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


/* ─────────────────────────────────────────────────────────────
   ⑭ 초기화 (페이지 로드 시 자동 실행)
   
   동작:
   1. localStorage에서 이전 설정 불러오기
   2. 헤더 뱃지 갱신
   3. 기본 서식(재직증명서) 자동 표시
   ───────────────────────────────────────────────────────────── */
(function init() {
  /* localStorage에 저장된 설정 불러오기 */
  try {
    const saved = localStorage.getItem('laborPortalSettings');
    if (saved) {
      const d = JSON.parse(saved);
      /* S 객체에 저장된 값 병합 */
      Object.assign(S, d);
      /* 헤더 뱃지 갱신 */
      if (S.company || S.ceo) {
        document.getElementById('company-chip').textContent =
          S.company + (S.ceo ? ' / 대표 ' + S.ceo : '');
      }
    }
  } catch(e) {
    console.warn('설정 불러오기 실패:', e);
  }

  /* 페이지 로드 시 기본으로 재직증명서 표시 */
  go('employed');
})();


/* ─────────────────────────────────────────────────────────────
   ⑮ 페이지 닫기 전 자동 저장
   
   브라우저 탭을 닫거나 새로고침할 때 현재 S 상태를 저장합니다.
   ───────────────────────────────────────────────────────────── */
window.addEventListener('beforeunload', () => {
  try {
    localStorage.setItem('laborPortalSettings', JSON.stringify(S));
  } catch(e) {
    /* 저장 실패 시 무시 */
  }
});

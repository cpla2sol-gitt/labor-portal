/* ══════════════════════════════════════════════════════════════
   exportWordAll() — 전체 34종 서식을 Word 파일 1개로 저장
   
   각 서식 사이에 페이지 나누기 삽입
   저장된 편집본이 있으면 편집본 사용 (localStorage 'fe_서식ID')
   ══════════════════════════════════════════════════════════════ */
function exportWordAll() {
  if (typeof docx === 'undefined') {
    alert('Word 라이브러리 로딩 중입니다. 잠시 후 다시 시도해 주세요.');
    return;
  }

  var formIds = Object.keys(FORMS);
  if (!formIds.length) { alert('서식 정보를 찾을 수 없습니다.'); return; }

  /* 진행 상태 표시 */
  var btn = document.querySelector('[onclick="exportWordAll()"]');
  if (btn) { btn._orig = btn.textContent; btn.textContent = '⏳ 생성 중...'; btn.disabled = true; }

  var MARGIN = 1134;
  var sections = [];

  /* 임시 렌더링용 숨김 컨테이너 */
  var tempDiv = document.createElement('div');
  tempDiv.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:794px;';
  document.body.appendChild(tempDiv);

  formIds.forEach(function(id, idx) {
    var def = FORMS[id];
    if (!def) return;

    /* 저장된 편집본 or 기본 렌더링 */
    var formHtml = '';
    try {
      var saved = localStorage.getItem('fe_' + id);
      if (saved) {
        var tmp = document.createElement('div');
        tmp.innerHTML = saved;
        /* ap-container 제거 (결재란은 별도 처리) */
        var apCont = tmp.querySelector('#ap-container');
        if (apCont) apCont.remove();
        formHtml = tmp.innerHTML;
      }
    } catch(e) {}

    /* 결재란 HTML */
    var apHtml = def.hasApproval ? renderApprovalHtml(S.defaultAp) : '';

    /* 임시 DOM 렌더링 */
    tempDiv.innerHTML = apHtml + (formHtml || def.html());

    /* 회사 정보 자동 입력 */
    if (S.company) tempDiv.querySelectorAll('.c-company').forEach(function(el) { if (!el.value) el.value = S.company; });
    if (S.ceo)     tempDiv.querySelectorAll('.c-ceo').forEach(function(el)     { if (!el.value) el.value = S.ceo; });
    applyRecipientSuffix(tempDiv);

    /* DOM → docx 변환 */
    var children = buildDocxContent(tempDiv, def.title);

    var sectionProps = {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN }
      }
    };

    /* 첫 서식 이외 페이지 나누기 */
    if (idx > 0) {
      sectionProps.type = docx.SectionType ? docx.SectionType.NEXT_PAGE : undefined;
    }

    sections.push({ properties: sectionProps, children: children });
  });

  document.body.removeChild(tempDiv);

  /* 문서 생성 */
  var doc = new docx.Document({
    styles: {
      default: {
        document: { run: { font: 'Malgun Gothic', size: 22 } }
      }
    },
    sections: sections
  });

  docx.Packer.toBlob(doc).then(function(blob) {
    var today = new Date();
    var dateStr = today.getFullYear() + ('0'+(today.getMonth()+1)).slice(-2) + ('0'+today.getDate()).slice(-2);
    var fileName = 'Word 전체 출력' + dateStr + '.docx';

    if (typeof saveAs !== 'undefined') {
      saveAs(blob, fileName);
    } else {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = fileName; a.click();
      setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
    }

    if (btn) { btn.textContent = btn._orig || 'Word 전체'; btn.disabled = false; }

  }).catch(function(err) {
    alert('Word 파일 생성 오류: ' + err.message);
    if (btn) { btn.textContent = btn._orig || 'Word 전체'; btn.disabled = false; }
  });
}

/* 결재란 HTML 생성 (buildDocxContent에서 ap-wrap 감지용) */
function renderApprovalHtml(n) {
  if (!n || n === 0) return '';
  var labels = {1:['대표'],2:['팀장','대표'],3:['담당','팀장','대표'],4:['담당','팀장','본부장','대표']};
  var lbls = labels[n] || [];
  var h = '<div class="ap-wrap"><table class="ap-table"><tr><td class="ap-label">결재</td>';
  lbls.forEach(function(l) {
    h += '<td class="ap-box"><div class="ap-box-name">' + l + '</div><div class="ap-box-space"></div></td>';
  });
  h += '</tr></table></div>';
  return h;
}

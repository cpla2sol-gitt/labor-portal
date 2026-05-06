/* ══════════════════════════════════════════════════════════════
   exportWord() — 현재 서식을 Word(.docx) 파일로 저장
   
   동작 순서:
   1. a4-paper DOM 파싱 → 요소별 docx 객체 변환
   2. docx.Packer.toBlob()으로 .docx 생성
   3. FileSaver.js로 다운로드
   
   변환 대상 요소:
   - .doc-title    → 제목 (굵게, 가운데 정렬, 하단 테두리)
   - .ft           → 서식 테이블
   - .body-text    → 본문 단락
   - .block-box    → 박스형 텍스트
   - .sign-area    → 서명란
   - .ap-wrap      → 결재란 (우측 정렬 테이블)
   ══════════════════════════════════════════════════════════════ */

function exportWord() {
  /* docx 라이브러리 로드 확인 */
  if (typeof docx === 'undefined') {
    alert('Word 라이브러리 로딩 중입니다. 잠시 후 다시 시도해 주세요.');
    return;
  }

  var paper = document.getElementById('a4-paper');
  if (!paper) return;

  /* 현재 서식명 */
  var formTitle = document.getElementById('ftb-title');
  var titleText = formTitle ? formTitle.textContent.trim() : '서식';

  try {
    var children = buildDocxContent(paper, titleText);

    /* A4 설정 (DXA: 1440 = 1inch, A4 = 11906 x 16838) */
    var MARGIN = 1134; /* 20mm */
    var doc = new docx.Document({
      styles: {
        default: {
          document: {
            run: { font: 'Malgun Gothic', size: 22 } /* 11pt */
          }
        }
      },
      sections: [{
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN }
          }
        },
        children: children
      }]
    });

    docx.Packer.toBlob(doc).then(function(blob) {
      var fileName = titleText.replace(/\s+/g, '_') + '.docx';
      if (typeof saveAs !== 'undefined') {
        saveAs(blob, fileName);
      } else {
        /* FileSaver 없을 때 fallback */
        var url = URL.createObjectURL(blob);
        var a   = document.createElement('a');
        a.href  = url;
        a.download = fileName;
        a.click();
        setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
      }
    }).catch(function(err) {
      alert('Word 파일 생성 오류: ' + err.message);
    });

  } catch(err) {
    alert('변환 오류: ' + err.message);
    console.error(err);
  }
}


/* ── DOM → docx 요소 변환 ─────────────────────────────────── */
function buildDocxContent(paper, titleText) {
  var { Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, BorderStyle, WidthType, ShadingType,
        VerticalAlign, HeightRule } = docx;

  var CONTENT_W = 9638; /* 11906 - 1134*2 */
  var children  = [];

  /* 공통 테두리 */
  var border    = { style: BorderStyle.SINGLE, size: 4,  color: '888070' };
  var borders   = { top: border, bottom: border, left: border, right: border };
  var thickBorder = { style: BorderStyle.SINGLE, size: 8, color: '888070' };
  var thickBorders = { top: thickBorder, bottom: thickBorder, left: thickBorder, right: thickBorder };

  /* 셀 배경 */
  var LBL_BG  = 'EDE9E2';
  var HEAD_BG = 'E6E1D9';

  /* 텍스트 가져오기 (input/textarea 값 포함) */
  function getText(el) {
    if (!el) return '';
    /* input/textarea 값 우선 */
    var inputs = el.querySelectorAll('input, textarea');
    if (inputs.length === 1 && el.children.length <= 2) {
      var v = inputs[0].value || inputs[0].placeholder || '';
      /* 앞뒤 텍스트와 합치기 */
      var raw = el.textContent.replace(inputs[0].value || inputs[0].placeholder || '', '').trim();
      return (v + (raw ? ' ' + raw : '')).trim();
    }
    /* 여러 입력이 있으면 순서대로 */
    var result = [];
    el.childNodes.forEach(function(node) {
      if (node.nodeType === 3) { /* 텍스트 노드 */
        var t = node.textContent.trim();
        if (t) result.push(t);
      } else if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
        result.push(node.value || node.placeholder || '');
      } else if (node.tagName === 'SELECT') {
        result.push(node.value || '');
      } else if (node.tagName === 'SPAN' && node.classList.contains('stamp')) {
        result.push('[' + node.textContent + ']');
      } else {
        var t2 = getText(node);
        if (t2) result.push(t2);
      }
    });
    return result.join(' ').replace(/\s+/g, ' ').trim();
  }

  /* 결재란 변환 */
  function buildApTable(apWrap) {
    var boxes = apWrap.querySelectorAll('.ap-box-name');
    if (!boxes.length) return null;
    var labels = Array.from(boxes).map(function(b) { return b.textContent.trim(); });
    var colW = 900;
    var labelW = 600;
    var totalW = labelW + colW * labels.length;

    var nameRow = [new TableCell({
      borders, rowSpan: 2,
      width: { size: labelW, type: WidthType.DXA },
      shading: { fill: HEAD_BG, type: ShadingType.CLEAR },
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 60, bottom: 60, left: 80, right: 80 },
      children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: '결재', bold: true, size: 20, font: 'Malgun Gothic' })]
      })]
    })];
    labels.forEach(function(lbl) {
      nameRow.push(new TableCell({
        borders,
        width: { size: colW, type: WidthType.DXA },
        shading: { fill: HEAD_BG, type: ShadingType.CLEAR },
        margins: { top: 40, bottom: 40, left: 80, right: 80 },
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: lbl, size: 18, font: 'Malgun Gothic' })]
        })]
      }));
    });

    var signRow = [];
    labels.forEach(function() {
      signRow.push(new TableCell({
        borders,
        width: { size: colW, type: WidthType.DXA },
        margins: { top: 40, bottom: 40, left: 80, right: 80 },
        children: [new Paragraph({ children: [new TextRun({ text: '', size: 36 })] })]
      }));
    });

    return new Table({
      float: { horizontalAnchor: docx.TableAnchorType ? docx.TableAnchorType.MARGIN : undefined,
               relativeHorizontalPosition: docx.RelativeHorizontalPosition ? docx.RelativeHorizontalPosition.RIGHT : undefined,
               absoluteHorizontalPosition: 0 },
      width: { size: totalW, type: WidthType.DXA },
      columnWidths: [labelW, ...labels.map(function(){ return colW; })],
      rows: [
        new TableRow({ children: nameRow }),
        new TableRow({ children: signRow })
      ]
    });
  }

  /* 서식 테이블 변환 */
  function buildFormTable(ftEl) {
    var rows = ftEl.querySelectorAll('tr');
    if (!rows.length) return null;

    /* 컬럼 너비 분석 */
    var firstRow = rows[0];
    var cells0 = firstRow.querySelectorAll('th, td');
    var totalCells = cells0.length;
    var colW = Math.floor(CONTENT_W / Math.max(totalCells, 1));

    var tableRows = Array.from(rows).map(function(tr) {
      var cells = tr.querySelectorAll('th, td');
      var rowCells = Array.from(cells).map(function(cell) {
        var isLbl  = cell.classList.contains('lbl') || cell.classList.contains('lbl2') || cell.tagName === 'TH';
        var text   = getText(cell);
        var colSpan = parseInt(cell.getAttribute('colspan') || '1');
        var rowSpan = parseInt(cell.getAttribute('rowspan') || '1');
        var bg     = isLbl ? LBL_BG : 'FFFFFF';
        var cellW  = colW * colSpan;

        return new TableCell({
          borders,
          columnSpan: colSpan > 1 ? colSpan : undefined,
          rowSpan: rowSpan > 1 ? rowSpan : undefined,
          width: { size: cellW, type: WidthType.DXA },
          shading: { fill: bg, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 100, right: 100 },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({
            alignment: isLbl ? AlignmentType.CENTER : AlignmentType.LEFT,
            children: [new TextRun({
              text: text, bold: isLbl, size: 22,
              font: 'Malgun Gothic'
            })]
          })]
        });
      });
      return new TableRow({ children: rowCells });
    }).filter(function(r) { return r; });

    if (!tableRows.length) return null;

    var colWidths = [];
    for (var i = 0; i < totalCells; i++) colWidths.push(colW);

    return new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      columnWidths: colWidths,
      rows: tableRows
    });
  }

  /* 서명란 변환 */
  function buildSignArea(signArea) {
    var items = [];
    /* 날짜 */
    var dateEl = signArea.querySelector('.sign-date');
    if (dateEl) {
      items.push(new Paragraph({
        spacing: { before: 120 },
        children: [new TextRun({ text: getText(dateEl), size: 22, font: 'Malgun Gothic' })]
      }));
    }
    /* 서명 행들 */
    var signRows = signArea.querySelectorAll('.sign-row');
    signRows.forEach(function(row) {
      if (row.closest('.sr-ceo-row') && row.style.display === 'none') return;
      var text = getText(row);
      if (text.trim()) {
        items.push(new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888070', space: 2 } },
          children: [new TextRun({ text: text, size: 22, font: 'Malgun Gothic' })]
        }));
      }
    });
    return items;
  }

  /* ── 메인: paper DOM 순회 ── */
  var apHandled = false;
  var apTable   = null;

  Array.from(paper.children).forEach(function(el) {
    /* 결재란 */
    if (el.classList.contains('ap-wrap') || el.id === 'ap-container') {
      var inner = el.classList.contains('ap-wrap') ? el : el.querySelector('.ap-wrap');
      if (inner) {
        apTable = buildApTable(inner);
      }
      return;
    }

    /* fe-bar, sign-mode-bar 등 UI 요소 스킵 */
    if (el.id === 'fe-bar' || el.id === 'history-preview-bar') return;
    if (el.classList.contains('sign-mode-bar')) return;

    /* 서식 제목 */
    if (el.classList.contains('doc-title')) {
      /* 결재란이 있으면 같은 줄에 (실제론 별도 float 테이블로 처리) */
      if (apTable) {
        children.push(apTable);
        apHandled = true;
        apTable   = null;
      }
      children.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 280 },
        border: { bottom: { style: BorderStyle.THICK, size: 12, color: '1a1a18', space: 6 } },
        children: [new TextRun({
          text: el.textContent.trim(),
          bold: true, size: 44, font: 'Malgun Gothic'
        })]
      }));
      return;
    }

    /* 서식 테이블 */
    if (el.classList.contains('ft') || el.tagName === 'TABLE') {
      var tbl = buildFormTable(el);
      if (tbl) children.push(tbl);
      children.push(new Paragraph({ children: [new TextRun({ text: '' })] })); /* 간격 */
      return;
    }

    /* 본문 텍스트 */
    if (el.classList.contains('body-text') || el.classList.contains('block-box')) {
      var text = getText(el);
      if (text.trim()) {
        children.push(new Paragraph({
          alignment: el.classList.contains('body-text') ? AlignmentType.CENTER : AlignmentType.LEFT,
          spacing: { before: 120, after: 120 },
          border: el.classList.contains('block-box') ? {
            top: border, bottom: border, left: border, right: border
          } : undefined,
          children: [new TextRun({ text: text.trim(), size: 22, font: 'Malgun Gothic' })]
        }));
      }
      return;
    }

    /* 섹션 레이블 */
    if (el.classList.contains('sec-label')) {
      children.push(new Paragraph({
        spacing: { before: 160, after: 80 },
        children: [new TextRun({ text: el.textContent.trim(), bold: true, size: 20, font: 'Malgun Gothic', color: '5c5850' })]
      }));
      return;
    }

    /* 서명 영역 */
    if (el.classList.contains('sign-area')) {
      children.push(new Paragraph({ spacing: { before: 240 }, children: [new TextRun({ text: '' })] }));
      /* 가로선 */
      children.push(new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: 'bbb5a8', space: 1 } },
        children: [new TextRun({ text: '' })]
      }));
      var signItems = buildSignArea(el);
      signItems.forEach(function(item) { children.push(item); });
      return;
    }

    /* textarea 단독 (block-box 아닌 것) */
    if (el.tagName === 'TEXTAREA' || (el.querySelector && el.querySelector('textarea'))) {
      var ta = el.tagName === 'TEXTAREA' ? el : el.querySelector('textarea');
      if (ta) {
        var val = ta.value || ta.placeholder || '';
        if (val.trim()) {
          children.push(new Paragraph({
            spacing: { before: 80, after: 80 },
            border: borders,
            children: [new TextRun({ text: val.trim(), size: 22, font: 'Malgun Gothic' })]
          }));
        }
      }
      return;
    }

    /* 수령확인서 */
    if (el.classList.contains('receipt')) {
      var text = getText(el);
      if (text.trim()) {
        children.push(new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: '' })] }));
        children.push(new Paragraph({
          spacing: { before: 120, after: 120 },
          border: { top: border, bottom: border, left: border, right: border },
          children: [new TextRun({ text: text.replace(/\s+/g, ' ').trim(), size: 22, font: 'Malgun Gothic' })]
        }));
      }
      return;
    }
  });

  /* 결재란이 처리 안 됐으면 맨 앞에 추가 */
  if (!apHandled && apTable) {
    children.unshift(apTable);
  }

  /* 빈 경우 기본 단락 */
  if (!children.length) {
    children.push(new Paragraph({ children: [new TextRun({ text: titleText })] }));
  }

  return children;
}
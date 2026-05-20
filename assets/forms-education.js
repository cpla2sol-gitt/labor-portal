/* forms-교육.js — [교육] 서식 */
if (typeof window.FORMS === 'undefined') window.FORMS = {};
Object.assign(window.FORMS, {

'harassment-edu': {
  title: '성희롱 예방 교육일지',
  sub: '남녀고용평등법 제13조 — 연 1회 이상 의무 실시',
  hasApproval: false,
  notice: '※ 남녀고용평등법 제13조에 따라 사업주는 직장 내 성희롱 예방교육을 매년 1회 이상 실시해야 합니다.\n※ 위반 시 500만원 이하의 과태료가 부과됩니다. 교육 자료 3년간 보존 의무.',
  html: () => `
    <div class="doc-title">직장 내 성희롱 예방 교육일지</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><td class="lbl">작성일자</td><td class="val"><input class="di" placeholder="2025. 01. 10."/></td>
          <td class="lbl">작 성 자</td><td class="val"><input class="di" placeholder="인사팀 홍길동"/></td></tr>
    </table>

    <div class="sec-label">■ 교육 의무 구분</div>
    <div class="block-box" style="font-size:8.5pt;line-height:1.9">
      1. 직장 내 성희롱에 관한 법령<br>
      2. 해당 사업장의 직장 내 성희롱 발생 시 처리절차 및 조치기준<br>
      3. 해당 사업장의 직장 내 성희롱 피해근로자의 고충상담 및 구제절차<br>
      4. 그 밖에 성희롱 예방에 필요한 사항
    </div>

    <table class="ft" style="margin:8pt 0">
      <tr><td class="lbl">교육 과목</td><td class="val"><input class="di" placeholder="직장 내 성희롱 예방교육"/></td>
          <td class="lbl">교육 방법</td><td class="val">
            <select class="di"><option value="">— 선택 —</option><option>집합 교육</option><option>온라인 교육</option><option>자체 교육</option><option>외부기관 위탁</option></select>
          </td></tr>
      <tr><td class="lbl">교육 일시</td><td class="val"><input class="di" placeholder="2025. 01. 10.  오후 2:00 ~ 3:00 (60분)"/></td>
          <td class="lbl">교육 장소</td><td class="val"><input class="di" placeholder="본사 대회의실 / 온라인"/></td></tr>
      <tr><td class="lbl">교육 내용</td><td class="val" colspan="3"><input class="di" placeholder="성희롱 예방교육 일반 (고용노동부 교재 활용)"/></td></tr>
    </table>

    <table class="ft" style="margin-bottom:10pt">
      <thead><tr><th>구 분</th><th>계</th><th>남</th><th>여</th><th>교육 미실시 사유</th></tr></thead>
      <tbody>
        <tr><td class="lbl2">교육 대상자수</td>
            <td class="val" style="text-align:center"><input class="di" placeholder="10"/></td>
            <td class="val" style="text-align:center"><input class="di" placeholder="6"/></td>
            <td class="val" style="text-align:center"><input class="di" placeholder="4"/></td>
            <td class="val" rowspan="3" style="vertical-align:top;padding:4pt 6pt;font-size:8.5pt">
              <textarea class="di" style="min-height:44pt;font-size:8.5pt" placeholder="미실시자가 있는 경우 사유 기재"></textarea>
            </td></tr>
        <tr><td class="lbl2">교육 실시자수</td>
            <td class="val" style="text-align:center"><input class="di" placeholder="10"/></td>
            <td class="val" style="text-align:center"><input class="di" placeholder="6"/></td>
            <td class="val" style="text-align:center"><input class="di" placeholder="4"/></td></tr>
        <tr><td class="lbl2">교육 미실시자수</td>
            <td class="val" style="text-align:center"><input class="di" placeholder="0"/></td>
            <td class="val" style="text-align:center"><input class="di" placeholder="0"/></td>
            <td class="val" style="text-align:center"><input class="di" placeholder="0"/></td></tr>
      </tbody>
    </table>

    <table class="ft" style="margin-bottom:8pt">
      <thead><tr><th>실시자 성명</th><th>직 명</th><th>교육 실시 장소</th><th>비 고</th></tr></thead>
      <tbody>
        <tr><td class="val"><input class="di" placeholder="홍길동"/></td>
            <td class="val"><input class="di" placeholder="인사팀장"/></td>
            <td class="val"><input class="di" placeholder="본사 대회의실"/></td>
            <td class="val"><input class="di"/></td></tr>
      </tbody>
    </table>

    <div style="font-size:10.5pt;margin-bottom:6pt">
      참석자: 교육대상자 <input class="ii" placeholder="10" style="width:30pt"/>명 &nbsp;
      (참석: <input class="ii" placeholder="10" style="width:30pt"/>명 &nbsp;
      휴무: <input class="ii" placeholder="0" style="width:30pt"/>명)
    </div>
    <div class="sec-label">특기사항</div>
    <textarea class="di" style="border:1px solid var(--border-dk);border-radius:2px;width:100%;padding:5pt 7pt;min-height:36pt;font-size:9pt"></textarea>

    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row sr-ceo-row"><span class="s-lbl">대표자</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">서명/인</span></div>
      </div>
    </div>`
},

'harassment-list': {
  title: '성희롱 예방교육 참석자 명단',
  sub: '남녀고용평등법 제13조 — 교육일지 첨부서류',
  hasApproval: false, 
  notice: '※ 교육을 받은 각 개인이 직접 서명 또는 날인합니다. 교육일지와 함께 보관하십시오.',
  html: () => `
    <div class="doc-title">성희롱 예방교육 참석자 명단</div>
    <table class="ft" style="margin-bottom:8pt;width:auto">
      <tr><td class="lbl">교육일시</td><td class="val" style="min-width:120pt"><input class="di" placeholder="2025. 01. 10."/></td>
          <td class="lbl">교육장소</td><td class="val" style="min-width:120pt"><input class="di" placeholder="본사 대회의실"/></td></tr>
    </table>
    <div style="font-size:8.5pt;color:var(--muted);margin-bottom:6pt">※ 교육을 받은 각 개인별로 서명 또는 날인하시기 바랍니다.</div>
    <table class="ft">
      <thead>
        <tr><th style="width:30pt">연번</th><th>부 서 명</th><th>직 위</th><th>성 명</th><th style="width:70pt">서명날인</th></tr>
      </thead>
      <tbody>
        ${Array.from({length: 20}, (_, i) => `
        <tr>
          <td class="val" style="text-align:center;font-size:8.5pt">${i + 1}</td>
          <td class="val"><input class="di" style="font-size:8.5pt"/></td>
          <td class="val"><input class="di" style="font-size:8.5pt"/></td>
          <td class="val"><input class="di" style="font-size:8.5pt"/></td>
          <td class="val" style="height:18pt"></td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
      </div>
    </div>`
},

'disability-edu': {
  title: '장애인 인식개선 교육일지',
  sub: '장애인고용촉진법 제5조의2 — 연 1회 이상 의무 실시',
  hasApproval: false,
  notice: '※ 장애인고용촉진 및 직업재활법 제5조의2에 따라 사업주는 장애인 인식개선 교육을 매년 1회 이상 실시해야 합니다.\n※ 위반 시 300만원 이하의 과태료가 부과됩니다. 교육 자료 3년간 보존 의무.',
  html: () => `
    <div class="doc-title">장애인 인식개선 교육일지</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><td class="lbl">작성일자</td><td class="val"><input class="di" placeholder="2025. 01. 10."/></td>
          <td class="lbl">작 성 자</td><td class="val"><input class="di" placeholder="인사팀 홍길동"/></td></tr>
    </table>

    <div class="sec-label">■ 교육 의무 구분</div>
    <div class="block-box" style="font-size:8.5pt;line-height:1.9">
      1. 장애의 정의 및 장애유형에 대한 이해<br>
      2. 직장 내 장애인의 인권과 장애인에 대한 차별금지 및 정당한 편의제공<br>
      3. 장애인고용촉진 및 직업재활과 관련된 법과 제도<br>
      4. 그 밖에 직장 내 장애인 인식개선에 필요한 사항
    </div>

    <table class="ft" style="margin:8pt 0">
      <tr><td class="lbl">교육 과목</td><td class="val"><input class="di" placeholder="장애인 인식개선 교육"/></td>
          <td class="lbl">교육 방법</td><td class="val">
            <select class="di"><option value="">— 선택 —</option><option>집합 교육</option><option>온라인 교육</option><option>자체 교육</option><option>외부기관 위탁</option></select>
          </td></tr>
      <tr><td class="lbl">교육 일시</td><td class="val"><input class="di" placeholder="2025. 01. 10.  오후 3:00 ~ 4:00 (60분)"/></td>
          <td class="lbl">교육 장소</td><td class="val"><input class="di" placeholder="본사 대회의실 / 온라인"/></td></tr>
      <tr><td class="lbl">교육 내용</td><td class="val" colspan="3"><input class="di" placeholder="장애인 인식개선 교육 일반 (한국장애인고용공단 교재 활용)"/></td></tr>
    </table>

    <table class="ft" style="margin-bottom:10pt">
      <thead><tr><th>구 분</th><th>계</th><th>남</th><th>여</th><th>교육 미실시 사유</th></tr></thead>
      <tbody>
        <tr><td class="lbl2">교육 대상자수</td>
            <td class="val" style="text-align:center"><input class="di" placeholder="10"/></td>
            <td class="val" style="text-align:center"><input class="di" placeholder="6"/></td>
            <td class="val" style="text-align:center"><input class="di" placeholder="4"/></td>
            <td class="val" rowspan="3" style="vertical-align:top;padding:4pt 6pt">
              <textarea class="di" style="min-height:44pt;font-size:8.5pt" placeholder="미실시자가 있는 경우 사유 기재"></textarea>
            </td></tr>
        <tr><td class="lbl2">교육 실시자수</td>
            <td class="val" style="text-align:center"><input class="di" placeholder="10"/></td>
            <td class="val" style="text-align:center"><input class="di" placeholder="6"/></td>
            <td class="val" style="text-align:center"><input class="di" placeholder="4"/></td></tr>
        <tr><td class="lbl2">교육 미실시자수</td>
            <td class="val" style="text-align:center"><input class="di" placeholder="0"/></td>
            <td class="val" style="text-align:center"><input class="di" placeholder="0"/></td>
            <td class="val" style="text-align:center"><input class="di" placeholder="0"/></td></tr>
      </tbody>
    </table>

    <table class="ft" style="margin-bottom:8pt">
      <thead><tr><th>실시자 성명</th><th>직 명</th><th>교육 실시 장소</th><th>비 고</th></tr></thead>
      <tbody>
        <tr><td class="val"><input class="di" placeholder="홍길동"/></td>
            <td class="val"><input class="di" placeholder="인사팀장"/></td>
            <td class="val"><input class="di" placeholder="본사 대회의실"/></td>
            <td class="val"><input class="di"/></td></tr>
      </tbody>
    </table>

    <div style="font-size:10.5pt;margin-bottom:6pt">
      참석자: 교육대상자 <input class="ii" placeholder="10" style="width:30pt"/>명 &nbsp;
      (참석: <input class="ii" placeholder="10" style="width:30pt"/>명 &nbsp;
      휴무: <input class="ii" placeholder="0" style="width:30pt"/>명)
    </div>
    <div class="sec-label">특기사항</div>
    <textarea class="di" style="border:1px solid var(--border-dk);border-radius:2px;width:100%;padding:5pt 7pt;min-height:36pt;font-size:9pt"></textarea>

    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row sr-ceo-row"><span class="s-lbl">대표자</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">서명/인</span></div>
      </div>
    </div>`
},

'disability-list': {
  title: '장애인 인식개선 교육 참석자 명단',
  sub: '장애인고용촉진법 제5조의2 — 교육일지 첨부서류',
  hasApproval: false, 
  notice: '※ 교육을 받은 각 개인이 직접 서명 또는 날인합니다. 교육일지와 함께 보관하십시오.',
  html: () => `
    <div class="doc-title">장애인 인식개선 교육 참석자 명단</div>
    <table class="ft" style="margin-bottom:8pt;width:auto">
      <tr><td class="lbl">교육일시</td><td class="val" style="min-width:120pt"><input class="di" placeholder="2025. 01. 10."/></td>
          <td class="lbl">교육장소</td><td class="val" style="min-width:120pt"><input class="di" placeholder="본사 대회의실"/></td></tr>
    </table>
    <div style="font-size:8.5pt;color:var(--muted);margin-bottom:6pt">※ 교육을 받은 각 개인별로 서명 또는 날인하시기 바랍니다.</div>
    <table class="ft">
      <thead>
        <tr><th style="width:30pt">연번</th><th>부 서 명</th><th>직 위</th><th>성 명</th><th style="width:70pt">서명날인</th></tr>
      </thead>
      <tbody>
        ${Array.from({length: 20}, (_, i) => `
        <tr>
          <td class="val" style="text-align:center;font-size:8.5pt">${i + 1}</td>
          <td class="val"><input class="di" style="font-size:8.5pt"/></td>
          <td class="val"><input class="di" style="font-size:8.5pt"/></td>
          <td class="val"><input class="di" style="font-size:8.5pt"/></td>
          <td class="val" style="height:18pt"></td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
      </div>
    </div>`
},

}); /* end forms-교육.js */

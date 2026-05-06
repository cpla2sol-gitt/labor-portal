/* forms-퇴직.js — [퇴직] 서식 */
if (typeof window.FORMS === 'undefined') window.FORMS = {};
Object.assign(window.FORMS, {


resign: {
  title: '사직원',
  sub: '',
  hasApproval: true,
  notice: '',
  html: () => `
    <div class="doc-title">사 직 원</div>
    <table class="ft">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">소 속</td><td class="val"><input class="di" placeholder="영업팀"/></td></tr>
      <tr><td class="lbl">직 위</td><td class="val"><input class="di" placeholder="과장"/></td>
          <td class="lbl">주민번호</td><td class="val"><input class="di" placeholder="900101-*******"/></td></tr>
      <tr><td class="lbl">입사일자</td><td class="val"><input class="di" placeholder="2020. 03. 02."/></td>
          <td class="lbl">연 락 처</td><td class="val"><input class="di" placeholder="010-0000-0000"/></td></tr>
      <tr><td class="lbl">사직 사유</td><td class="val" colspan="3">
        <select class="di" style="margin-bottom:3pt"><option value="">— 사유 선택 —</option><option>개인신병</option><option>가사</option><option>전직</option><option>진학</option><option>결혼</option><option>권고사직</option><option>기타</option></select>
        <input class="di" placeholder="상세 사유"/>
      </td></tr>
      <tr><td class="lbl">사직 후 주소</td><td class="val" colspan="3"><input class="di" placeholder="서울특별시 강남구 테헤란로 000"/></td></tr>
      <tr><td class="lbl">긴급연락처</td><td class="val"><input class="di" placeholder="010-0000-0000"/></td>
          <td class="lbl">e-mail</td><td class="val"><input class="di" placeholder="hong@email.com"/></td></tr>
    </table>
    <div class="block-box" style="font-size:9pt;margin-top:8pt">
      본인은 본인의 자유의사에 따라 위와 같은 사유로 사직하고자 하오니 승인하여 주시기 바랍니다.<br><br>
      <strong>— 서약사항 —</strong><br>
      1. 재직 기간 중 가지고 있던 영업·고객 관련 비밀이 기록된 일체의 자료를 반납하겠으며,
      업무상 취득한 비밀을 타인에게 누설하지 않겠습니다.<br>
      2. 물품 반납, 업무 인수인계 등 회사 관련 제반 사항을 퇴직일 전일까지 처리하겠습니다.
    </div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">제출자</span><input class="s-in " placeholder="홍길동"/> <span class="stamp">서명/인</span></div>
        <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-row sr-ceo-row"><span class="s-lbl">대표자</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="c-suffix">귀하</span></div>
      </div>
      </div>
    </div>`
},


dismiss: {
  title: '해고통보서',
  sub: '근로기준법 제26조·제27조',
  hasApproval: false, 
  notice: '※ 근로기준법 제27조: 해고 사유·일시를 서면으로 통지하지 않은 해고는 효력이 없습니다.\n※ 해고일 30일 전 예고 또는 예고수당(30일분 통상임금) 지급 필수',
  html: () => `
    <div class="doc-title">해 고 통 보 서</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">부 서</td><td class="val"><input class="di" placeholder="영업팀"/></td>
          <td class="lbl">직 위</td><td class="val"><input class="di" placeholder="대리"/></td></tr>
      <tr><td class="lbl">연 락 처</td><td class="val"><input class="di" placeholder="010-0000-0000"/></td>
          <td class="lbl">생년월일</td><td class="val"><input class="di" placeholder="1990. 01. 01."/></td>
          <td class="lbl">입사일자</td><td class="val"><input class="di" placeholder="2020. 03. 02."/></td></tr>
      <tr><td class="lbl">주 소</td><td class="val" colspan="5"><input class="di" placeholder="서울특별시 강남구 테헤란로 000"/></td></tr>
      <tr><td class="lbl">해 고 일</td><td class="val" colspan="2"><input class="di" placeholder="2025. 02. 01."/></td>
          <td class="lbl">예고수당</td><td class="val" colspan="2"><input class="di" placeholder="□지급 (금      원)   □30일 전 예고로 불요"/></td></tr>
    </table>
    <div class="sec-label">■ 해고 사유 (구체적 사실 적시)</div>
    <textarea class="di" style="border:1px solid var(--border-dk);border-radius:2px;width:100%;padding:5pt 7pt;min-height:80pt;font-size:9.5pt;line-height:1.75" placeholder="귀하는 취업규칙 제__조 제__항에 따라 아래와 같은 행위로 인하여 해고에 해당합니다.&#10;&#10;1. 2025. 01. 05.부터 2025. 01. 10.까지 6일간 정당한 사유 없이 무단결근..."></textarea>
    <div class="body-text" style="font-size:9pt">
      위 사유로 취업규칙 제<input class="ii" style="width:20pt"/>조 제<input class="ii" style="width:20pt"/>항에 의거하여 해고를 통보합니다.
    </div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">대표</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">서명/인</span></div>
      </div>
    </div>
    <div class="receipt"><div class="receipt-cut">— 수 령 확 인 서 (절취선) —</div>
    <div class="receipt-body">본인은 위 해고통보서를 <input class="ii" placeholder="2025. 01. 10." style="width:90pt"/> 수령하였음을 확인합니다.<br>수령인: <input class="ii" placeholder="홍길동" style="width:90pt"/> &nbsp;<span class="stamp">서명/인</span></div></div>`
},


severance: {
  title: '퇴직금 중간정산 신청서',
  sub: '근로자퇴직급여보장법 제8조제2항',
  hasApproval: false, 
  notice: '※ 법정 사유: 무주택자 주택구입, 전세금 부담, 6개월 이상 요양, 파산·개인회생, 임금피크제, 근로시간 단축 등에만 인정',
  html: () => `
    <div class="doc-title">퇴직금 중간정산 신청서</div>
    <table class="ft">
      <tr><td class="lbl">소 속</td><td class="val"><input class="di" placeholder="인사팀"/></td>
          <td class="lbl">직 위</td><td class="val"><input class="di" placeholder="과장"/></td></tr>
      <tr><td class="lbl">성 명</td><td class="val" colspan="3"><input class="di" placeholder="홍길동"/></td></tr>
      <tr><td class="lbl">정산 기간</td><td class="val" colspan="3"><input class="di" placeholder="2020. 03. 02. ~ 2025. 03. 01."/></td></tr>
      <tr><td class="lbl">정산 금액</td><td class="val" colspan="3"><input class="di" placeholder="금 000,000원 (₩ 0,000,000)"/></td></tr>
      <tr><td class="lbl">정산 사유</td><td class="val" colspan="3">
        <select class="di" style="margin-bottom:3pt"><option value="">— 법정 사유 선택 —</option>
          <option>무주택자 주택 구입</option><option>전세금·보증금 부담</option>
          <option>본인·가족 6개월 이상 요양</option><option>파산선고</option>
          <option>개인회생절차 개시 결정</option><option>임금피크제 실시</option></select>
        <textarea class="di" placeholder="상세 사유 기재" style="min-height:36pt"></textarea>
      </td></tr>
    </table>
    <div class="body-text" style="text-align:center;font-size:9pt">근로자퇴직급여보장법 제8조 제2항에 의거 위와 같이 퇴직금 중간정산을 신청하오니 수락하여 주시기 바랍니다.</div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">신청인</span><input class="s-in " placeholder="홍길동"/> <span class="stamp">서명/인</span></div>
        <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-row sr-ceo-row"><span class="s-lbl">대표자</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="c-suffix">귀하</span></div>
      </div>
      </div>
    </div>`
},


clearance: {
  title: '금품청산확인서',
  sub: '근로기준법 제36조',
  hasApproval: false, 
  notice: '',
  html: () => `
    <div class="doc-title">금 품 청 산 확 인 서</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">생년월일</td><td class="val"><input class="di" placeholder="1990. 01. 01."/></td></tr>
      <tr><td class="lbl">주 소</td><td class="val" colspan="3"><input class="di" placeholder="서울특별시 강남구 테헤란로 000"/></td></tr>
      <tr><td class="lbl">연 락 처</td><td class="val"><input class="di" placeholder="010-0000-0000"/></td>
          <td class="lbl">근무부서</td><td class="val"><input class="di" placeholder="영업팀 과장"/></td></tr>
      <tr><td class="lbl">근무기간</td><td class="val" colspan="3"><input class="di" placeholder="2020. 03. 02. ~ 2025. 06. 30."/></td></tr>
    </table>
    <div class="block-box" style="font-size:9pt;line-height:1.9">
      상기 본인은 <input class="ii c-company" style="width:110pt" placeholder="(주)회사명"/>에
      <input class="ii" style="width:90pt" placeholder="2020. 03. 02."/>에 입사하여
      <input class="ii" style="width:90pt" placeholder="2025. 06. 30."/>까지 근무하였으며,
      재직기간 중 발생한 임금, 상여금, 제법정수당(연장·야간·휴일근로수당, 연차수당 등), 퇴직금, 그 외 근로관계로 발생한
      일체의 금품에 대해 퇴직과 동시에 금
      <input class="ii" style="width:70pt" placeholder="000,000"/>원
      (₩<input class="ii" style="width:80pt" placeholder="0,000,000"/>)을
      수령함으로써 이를 정산하였음을 확인합니다.<br><br>
      이로써 일체의 금품에 대해 지급받지 못한 금품은 없으며, 향후 어떠한 민·형사상 및 행정상의 절차를 통하여
      회사에 법적 책임을 묻지 않을 것을 확인합니다.
    </div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">확인자</span><input class="s-in " placeholder="홍길동"/> <span class="stamp">서명/인</span></div>
        <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/> <span class="stamp">직인</span></div>
      </div>
      </div>
    </div>`
},


handover: {
  title: '업무 인수·인계서',
  sub: '',
  hasApproval: true,
  notice: '',
  html: () => `
    <div class="doc-title">업무 인수·인계서</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><th colspan="2">인 계 자</th><th colspan="2">인 수 자</th></tr>
      <tr><td class="lbl2">소속부서</td><td class="val"><input class="di" placeholder="영업팀"/></td>
          <td class="lbl2">소속부서</td><td class="val"><input class="di" placeholder="영업팀"/></td></tr>
      <tr><td class="lbl2">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl2">성 명</td><td class="val"><input class="di" placeholder="김인수"/></td></tr>
      <tr><td class="lbl2" colspan="4" style="text-align:left;padding:4pt 5pt">
        인수인계 기간: <input class="ii" placeholder="2025. 06. 20." style="width:90pt"/> ~
        <input class="ii" placeholder="2025. 06. 30." style="width:90pt"/>
      </td></tr>
    </table>
    <div class="sec-label">■ 1. 인수인계 내용</div>
    <textarea class="di" style="border:1px solid var(--border-dk);border-radius:2px;width:100%;padding:5pt 7pt;min-height:70pt;font-size:9.5pt;line-height:1.75" placeholder="담당 업무 목록 및 현황"></textarea>
    <div class="sec-label">■ 2. 인수인계 파일 및 문서</div>
    <textarea class="di" style="border:1px solid var(--border-dk);border-radius:2px;width:100%;padding:5pt 7pt;min-height:50pt;font-size:9.5pt;line-height:1.75" placeholder="폴더 경로, 파일명, 보관 위치 등"></textarea>
    <div class="sec-label">■ 3. 기타</div>
    <textarea class="di" style="border:1px solid var(--border-dk);border-radius:2px;width:100%;padding:5pt 7pt;min-height:40pt;font-size:9.5pt;line-height:1.75" placeholder="인수인계 관련 유의사항"></textarea>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
      </div>
      </div>
    </div>`
},


retired: {
  title: '퇴직증명원',
  sub: '근로기준법 제39조',
  hasApproval: false, 
  notice: '',
  html: () => `
    <div class="doc-title">퇴 직 증 명 원</div>
    <table class="ft">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">생년월일</td><td class="val"><input class="di" placeholder="1990. 01. 01."/></td></tr>
      <tr><td class="lbl">소 속</td><td class="val" colspan="3"><input class="di" placeholder="영업팀 과장"/></td></tr>
      <tr><td class="lbl">입사일</td><td class="val"><input class="di" placeholder="2020. 03. 02."/></td>
          <td class="lbl">퇴직일</td><td class="val"><input class="di" placeholder="2025. 06. 30."/></td></tr>
      <tr><td class="lbl">퇴직사유</td><td class="val" colspan="3">
        <select class="di"><option value="">— 선택 —</option><option>자진퇴사</option><option>계약기간 만료</option><option>권고사직</option><option>해고</option><option>정년퇴직</option></select>
      </td></tr>
    </table>
    <div class="body-text" style="text-align:center">위 사실을 확인합니다.</div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-row sr-ceo-row"><span class="s-lbl">대표자</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">서명/인</span></div>
      </div>
    </div>`
},

}); /* end forms-퇴직.js */
/* forms-재직.js — [재직] 서식 */
if (typeof window.FORMS === 'undefined') window.FORMS = {};
Object.assign(window.FORMS, {


employed: {
  title: '재직증명서',
  sub: '근로기준법 제39조 · 시행령 제19조',
  hasApproval: false, 
  html: () => `
    <table class="ft" style="margin-bottom:5pt;width:auto;margin-left:auto;font-size:8.5pt">
    </table>
    <div class="doc-title">재 직 증 명 서</div>
    <table class="ft">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">주민번호</td><td class="val"><input class="di" placeholder="900101 - *******"/></td></tr>
      <tr><td class="lbl">소 속</td><td class="val"><input class="di" placeholder="인사팀"/></td>
          <td class="lbl">직 위</td><td class="val"><input class="di" placeholder="대리"/></td></tr>
      <tr><td class="lbl">입사일</td><td class="val"><input class="di" placeholder="2020. 03. 02."/></td>
          <td class="lbl">고용형태</td><td class="val"><select class="di"><option value="">— 선택 —</option><option>정규직</option><option>계약직</option><option>파견직</option><option>단시간근로자</option></select></td></tr>
      <tr><td class="lbl">용 도</td><td class="val" colspan="3"><select class="di"><option value="">— 선택 —</option><option>금융기관 제출용</option><option>관공서 제출용</option><option>개인 보관용</option><option>기타</option></select></td></tr>
    </table>
    <div class="body-text" style="text-align:center">위의 내용과 같이 재직하고 있음을 증명함.</div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-row sr-ceo-row"><span class="s-lbl">대표자</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">서명/인</span></div>
      </div>
    </div>`
},


career: {
  title: '경력증명서',
  sub: '근로기준법 제39조',
  hasApproval: false, 
  notice: '',
  html: () => `
    <div class="doc-title">경 력 증 명 서</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">주민번호</td><td class="val"><input class="di" placeholder="900101 - *******"/></td></tr>
      <tr><td class="lbl">주 소</td><td class="val" colspan="3"><input class="di" placeholder="서울특별시 강남구 테헤란로 000"/></td></tr>
    </table>
    <table class="ft">
      <thead>
        <tr><th style="width:90pt">근무기간</th><th style="width:55pt">채용형태</th><th>근무부서</th><th>담당업무</th></tr>
      </thead>
      <tbody>
        <tr><td class="val"><input class="di" placeholder="2020.03 ~ 2022.06"/></td>
            <td class="val" style="text-align:center;font-size:8.5pt;padding:3pt">□정규직<br>□계약직</td>
            <td class="val"><input class="di" placeholder="인사팀"/></td>
            <td class="val"><input class="di" placeholder="채용 관리"/></td></tr>
        <tr><td class="val"><input class="di" placeholder="2022.07 ~ 2025.06"/></td>
            <td class="val" style="text-align:center;font-size:8.5pt;padding:3pt">□정규직<br>□계약직</td>
            <td class="val"><input class="di" placeholder="인사팀"/></td>
            <td class="val"><input class="di" placeholder="급여·노무 행정"/></td></tr>
        <tr><td class="val"><input class="di"/></td>
            <td class="val" style="text-align:center;font-size:8.5pt;padding:3pt">□정규직<br>□계약직</td>
            <td class="val"><input class="di"/></td><td class="val"><input class="di"/></td></tr>
      </tbody>
      <tfoot>
        <tr><td class="lbl2" colspan="2">총 근무기간</td>
            <td class="val"><input class="di" placeholder="5년 3개월"/></td>
            <td class="val" style="padding:3pt 5pt;font-size:8.5pt">퇴직사유: <input class="ii" placeholder="자진퇴사" style="width:80pt"/></td></tr>
        <tr><td class="lbl2" colspan="2">용 도</td>
            <td class="val" colspan="2"><input class="di" placeholder="관공서 제출용"/></td></tr>
      </tfoot>
    </table>
    <div style="page-break-inside:avoid;break-inside:avoid;display:flow-root">
    <div class="body-text" style="text-align:center">위와 같은 내용이 사실임을 증명함.</div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-row sr-ceo-row"><span class="s-lbl">대표자</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">서명/인</span></div>
      </div>
    </div>
    </div>`
},


earlyleave: {
  title: '조퇴·외출 신청서',
  sub: '',
  hasApproval: true,
  notice: '',
  html: () => `
    <div class="doc-title">조퇴 □ &nbsp; 외출 □ &nbsp; 신청서</div>
    <table class="ft">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">소 속</td><td class="val"><input class="di" placeholder="인사팀"/></td></tr>
      <tr><td class="lbl">직 위</td><td class="val"><input class="di" placeholder="대리"/></td>
          <td class="lbl">주민번호</td><td class="val"><input class="di" placeholder="900101-*******"/></td></tr>
      <tr><td class="lbl">기 간</td><td class="val" colspan="3"><input class="di" placeholder="2025. 01. 10.   14:00 부터   16:00 까지   ( 2시간 )"/></td></tr>
      <tr><td class="lbl">사 유</td><td class="val" colspan="3"><textarea class="di" placeholder="병원 진료" style="min-height:120pt"></textarea></td></tr>
      <tr><td class="lbl">기타사항</td><td class="val" colspan="3"><input class="di"/></td></tr>
    </table>
    <div class="body-text" style="text-align:center">위와 같은 사유로 □조퇴 □외출 하고자 하오니 허가하여 주시기 바랍니다.</div>
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


absent: {
  title: '결근계',
  sub: '※ 증빙자료 요구 시 제출',
  hasApproval: true,
  notice: '',
  html: () => `
    <div class="doc-title">결 근 계</div>
    <table class="ft">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">소 속</td><td class="val"><input class="di" placeholder="영업팀"/></td></tr>
      <tr><td class="lbl">직 위</td><td class="val"><input class="di" placeholder="대리"/></td>
          <td class="lbl">주민번호</td><td class="val"><input class="di" placeholder="900101-*******"/></td></tr>
      <tr><td class="lbl">기 간</td><td class="val" colspan="3"><input class="di" placeholder="2025. 01. 10. 부터   2025. 01. 10. 까지   ( 1일간 )"/></td></tr>
      <tr><td class="lbl">사 유</td><td class="val" colspan="3"><textarea class="di" placeholder="몸살로 인한 병가" style="min-height:120pt"></textarea></td></tr>
      <tr><td class="lbl">기타사항</td><td class="val" colspan="3"><input class="di"/></td></tr>
    </table>
    <div class="body-text" style="text-align:center">위와 같은 사유로 결근하고자 하오니 허가하여 주시기 바랍니다.</div>
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


leave: {
  title: '휴가·휴직 신청서',
  sub: '※ 1개월 이상 휴직은 2주 전까지 제출',
  hasApproval: true,
  notice: '',
  html: () => `
    <div class="doc-title">휴가 □ &nbsp; 휴직 □ &nbsp; 신청서</div>
    <table class="ft">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">소 속</td><td class="val"><input class="di" placeholder="인사팀"/></td></tr>
      <tr><td class="lbl">직 위</td><td class="val"><input class="di" placeholder="대리"/></td>
          <td class="lbl">주민번호</td><td class="val"><input class="di" placeholder="900101-*******"/></td></tr>
      <tr><td class="lbl">기 간</td><td class="val" colspan="3"><input class="di" placeholder="2025. 01. 10. 부터   2025. 01. 14. 까지   ( 5일간 )"/></td></tr>
      <tr><td class="lbl">사 유</td><td class="val" colspan="3"><textarea class="di" placeholder="연차유급휴가 사용" style="min-height:120pt"></textarea></td></tr>
      <tr><td class="lbl">비상연락처</td><td class="val" colspan="3"><input class="di" placeholder="010-0000-0000"/></td></tr>
    </table>
    <div class="body-text" style="text-align:center">위와 같은 사유로 □휴가 □휴직 하고자 하오니 허가하여 주시기 바랍니다.</div>
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


maternity: {
  title: '육아휴직원',
  sub: '남녀고용평등법 제19조',
  hasApproval: false, 
  notice: '',
  html: () => `
    <div class="doc-title">육 아 휴 직 원</div>
    <table class="ft">
      <tr><td class="lbl" style="width:70pt">성 명</td><td class="val" colspan="3"><input class="di" placeholder="홍길동"/></td></tr>
      <tr><td class="lbl" style="width:70pt">부서 및 직급</td><td class="val"><input class="di" placeholder="인사팀 대리"/></td>
          <td class="lbl" style="width:70pt">연 락 처</td><td class="val"><input class="di" placeholder="010-0000-0000"/></td></tr>
      <tr><td class="lbl" style="width:70pt">생년월일</td><td class="val"><input class="di" placeholder="1990. 01. 01."/></td>
          <td class="lbl" style="width:70pt">주 소</td><td class="val"><input class="di" placeholder="서울시 강남구 테헤란로 000"/></td></tr>
      <tr><td class="lbl" style="width:70pt">대상자녀</td><td class="val"><input class="di" placeholder="홍아기"/></td>
          <td class="lbl" style="width:70pt">자녀생년월일</td><td class="val"><input class="di" placeholder="2024. 06. 15."/></td></tr>
      <tr><td class="lbl" style="width:70pt">휴직 개시일</td><td class="val"><input class="di" placeholder="2025. 01. 01."/></td>
          <td class="lbl" style="width:70pt">휴직 종료일</td><td class="val"><input class="di" placeholder="2025. 12. 31."/></td></tr>
    </table>
    <div class="body-text" style="text-align:center">본인은 상기 사유로 <input class="ii" placeholder="12" style="width:25pt"/>개월간 육아휴직을 하고자 하오니 허가하여 주시기 바랍니다.</div>
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

'return': {
  title: '복직원',
  sub: '※ 휴직기간 만료 7일 전까지 제출',
  hasApproval: true,
  notice: '',
  html: () => `
    <div class="doc-title">복 직 원</div>
    <table class="ft">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">소 속</td><td class="val"><input class="di" placeholder="인사팀"/></td></tr>
      <tr><td class="lbl">직 위</td><td class="val"><input class="di" placeholder="대리"/></td>
          <td class="lbl">주민번호</td><td class="val"><input class="di" placeholder="900101-*******"/></td></tr>
      <tr><td class="lbl">휴직일자</td><td class="val"><input class="di" placeholder="2024. 01. 01."/></td>
          <td class="lbl">복직일자</td><td class="val"><input class="di" placeholder="2025. 01. 02."/></td></tr>
      <tr><td class="lbl">복직사유</td><td class="val" colspan="3"><textarea class="di" placeholder="육아휴직 종료에 따른 복직" style="min-height:120pt"></textarea></td></tr>
      <tr><td class="lbl">기타사항</td><td class="val" colspan="3"><input class="di"/></td></tr>
    </table>
    <div class="body-text" style="text-align:center">위와 같은 사유로 복직하고자 하오니 허가하여 주시기 바랍니다.</div>
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

'ot-agree': {
  title: '연장·야간·휴일근로 동의서',
  sub: '근로기준법 제53조',
  hasApproval: false, 
  notice: '',
  html: () => `
    <div class="doc-title">연장·야간·휴일근로 동의서</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><td class="lbl">소 속</td><td class="val"><input class="di" placeholder="개발팀"/></td>
          <td class="lbl">업 무</td><td class="val"><input class="di" placeholder="인사·노무 관리"/></td>
          <td class="lbl">직 위</td><td class="val"><input class="di" placeholder="대리"/></td></tr>
      <tr><td class="lbl">성 명</td><td class="val" colspan="5"><input class="di" placeholder="홍길동"/></td></tr>
    </table>
    <div class="block-box">
      <strong>동 의 내 용</strong><br><br>
      1. 본인은 회사에 재직 중 업무상 필요에 따라 발생할 수 있는 연장(주 12시간 이내), 야간(당일 22:00~익일 06:00),
      휴일(법정·약정휴일)에 근로하는 것에 동의(합의)합니다.<br><br>
      2. 위 경우 회사 규정에 따라 사전 신청 및 승인절차를 지키며, 해당 근로 시 회사에서 정한 근무지침을 준수할 것에
      동의합니다.
    </div>
    <div style="margin-top:8pt;font-size:12pt;color:var(--muted)">특이사항: <input class="ii" style="width:250pt" placeholder="건강상·생활상 특이사항 및 요구사항"/></div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">동의자</span><input class="s-in " placeholder="홍길동"/> <span class="stamp">서명/인</span></div>
        <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-row sr-ceo-row"><span class="s-lbl">대표자</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="c-suffix">귀하</span></div>
      </div>
      </div>
    </div>`
},

'ot-req': {
  title: '연장·야간·휴일근로 신청서',
  sub: '',
  hasApproval: true,
  notice: '',
  html: () => `
    <div class="doc-title">연장·야간·휴일근로 신청서</div>
    <table class="ft">
      <tr><td class="lbl">소 속</td><td class="val"><input class="di" placeholder="개발팀"/></td>
          <td class="lbl">업 무</td><td class="val"><input class="di" placeholder="서버 유지보수"/></td>
          <td class="lbl">직 위</td><td class="val"><input class="di" placeholder="과장"/></td></tr>
      <tr><td class="lbl">성 명</td><td class="val" colspan="5"><input class="di" placeholder="홍길동"/></td></tr>
      <tr><td class="lbl">시행 예정일</td><td class="val" colspan="5"><input class="di" placeholder="2025. 01. 10. (금요일)   18:00 ~ 22:00"/></td></tr>
      <tr><td class="lbl">신청 사유</td><td class="val" colspan="5"><textarea class="di" placeholder="서버 정기점검 및 업데이트 작업 필요" style="min-height:150pt"></textarea></td></tr>
    </table>
    <div class="body-text" style="text-align:center">위의 내용으로 연장·야간·휴일근로를 신청하오니 허가해주시기 바랍니다.</div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">신청자</span><input class="s-in " placeholder="홍길동"/> <span class="stamp">서명/인</span></div>
        <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-row sr-ceo-row"><span class="s-lbl">대표자</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="c-suffix">귀하</span></div>
      </div>
      </div>
    </div>`
},

}); /* end forms-재직.js */

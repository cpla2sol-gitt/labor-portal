/* ═══════════════════════════════════════════════
   forms.js — 26종 서식 정의
   ═══════════════════════════════════════════════ */

window.FORMS = {

/* ① 개인정보수집동의서 */
privacy: {
  title: '개인정보 수집·이용 동의서',
  sub: '채용 시 서명 징구',
  hasApproval: false,
  notice: '',
  html: () => `
    <div class="doc-title">개인정보 수집·이용 동의서</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">생년월일</td><td class="val"><input class="di" placeholder="1990. 01. 01."/></td></tr>
      <tr><td class="lbl">주 소</td><td class="val" colspan="3"><input class="di" placeholder="서울특별시 강남구 테헤란로 000"/></td></tr>
    </table>
    <div class="body-text" style="font-size:9pt">
      본인은 <strong><input class="ii c-company" style="width:120pt"/></strong>(이하 "회사")의 재직근로자로서,
      인사관리상 개인정보 수집·이용이 필요하다는 것을 이해하고 아래 항목의 수집·이용에 동의합니다.
    </div>
    <table class="ft" style="margin:7pt 0;font-size:8.5pt">
      <thead>
        <tr><th>수집 항목</th><th>수집·이용 목적</th><th style="width:70pt">보유기간</th><th style="width:60pt">동의 여부</th></tr>
      </thead>
      <tbody>
        <tr><td class="val" style="padding:4pt 5pt">성명, 주소, 이메일, 연락처, 학력, 경력, 자격증</td>
            <td class="val" style="padding:4pt 5pt">채용·인사관리, 세법·노동관계법령 의무이행</td>
            <td class="val" style="text-align:center;padding:4pt">재직기간</td>
            <td class="val" style="text-align:center;padding:4pt">□ 동의 □ 거부</td></tr>
        <tr><td class="val" style="padding:4pt 5pt">주민등록번호, 운전면허번호, 외국인등록번호 (고유식별정보)</td>
            <td class="val" style="padding:4pt 5pt">채용·인사관리, 정부지원금 신청</td>
            <td class="val" style="text-align:center;padding:4pt">재직기간</td>
            <td class="val" style="text-align:center;padding:4pt">□ 동의 □ 거부</td></tr>
        <tr><td class="val" style="padding:4pt 5pt">신체장애, 병력, 범죄정보 (민감정보)</td>
            <td class="val" style="padding:4pt 5pt">채용·인사관리, 법령 의무이행</td>
            <td class="val" style="text-align:center;padding:4pt">재직기간</td>
            <td class="val" style="text-align:center;padding:4pt">□ 동의 □ 거부</td></tr>
      </tbody>
    </table>
    <div class="block-box" style="font-size:8.5pt">
      ※ 개인정보 제공에 대한 거부 권리가 있으나, 미동의 시 적법하게 시행되는 내부규정 및 법령에 따라 발생하는 불이익에 대한 책임은 본인에게 있습니다.
    </div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div>
        <div class="sign-block" style="margin-bottom:6pt"><div class="s-lbl">동의자</div><input class="s-in" placeholder="홍길동"/> <span class="stamp">인</span></div>
        <div class="sign-block" style="margin-bottom:3pt"><div class="s-lbl">회사명</div><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-block"><div class="s-lbl">대 표</div><input class="s-in c-ceo" placeholder="홍대표"/> 귀하</div>
      </div>
    </div>`
},

/* ② 근로자명부 */
roster: {
  title: '근로자 명부',
  sub: '근로기준법 제41조',
  hasApproval: false,
  notice: '',
  html: () => `
    <div class="doc-title">근 로 자 명 부</div>
    <table class="ft">
      <tr><td class="lbl">① 성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">② 생년월일</td><td class="val"><input class="di" placeholder="1990. 01. 01."/></td></tr>
      <tr><td class="lbl">③ 주 소</td><td class="val" colspan="3"><input class="di" placeholder="서울특별시 강남구 테헤란로 000  (전화: 010-0000-0000)"/></td></tr>
      <tr><td class="lbl">④ 부양가족</td><td class="val"><input class="di" placeholder="0 명"/></td>
          <td class="lbl">⑤ 종사업무</td><td class="val"><input class="di" placeholder="인사 관리"/></td></tr>
      <tr><td class="lbl">⑦ 최종학력</td><td class="val"><input class="di" placeholder="○○대학교 경영학과 졸업"/></td>
          <td class="lbl">⑥ 기능·자격</td><td class="val"><input class="di" placeholder="공인노무사, 1종 운전면허"/></td></tr>
      <tr><td class="lbl">⑧ 경 력</td><td class="val" colspan="3"><textarea class="di" placeholder="전 직장명 / 근무기간 / 담당업무" style="min-height:36pt"></textarea></td></tr>
      <tr><td class="lbl">⑨ 병 역</td><td class="val"><input class="di" placeholder="육군 병장 만기전역"/></td>
          <td class="lbl">⑭ 고용일</td><td class="val"><input class="di" placeholder="2020. 03. 02."/></td></tr>
      <tr><td class="lbl">⑩ 해고일</td><td class="val"><input class="di"/></td>
          <td class="lbl">⑪ 퇴직일</td><td class="val"><input class="di"/></td></tr>
      <tr><td class="lbl">⑫ 퇴직사유</td><td class="val"><input class="di"/></td>
          <td class="lbl">⑬ 금품청산</td><td class="val"><input class="di"/></td></tr>
      <tr><td class="lbl">⑰ 특기사항</td><td class="val" colspan="3"><textarea class="di" placeholder="교육, 건강, 휴직 등"></textarea></td></tr>
    </table>`
},

/* ③ 재직증명서 */
employed: {
  title: '재직증명서',
  sub: '근로기준법 제39조 · 시행령 제19조',
  hasApproval: false,
  notice: '※ 발급일로부터 3개월간 유효합니다.',
  html: () => `
    <div class="doc-law">■ 근로기준법 제39조(사용증명서) · 동법 시행령 제19조</div>
    <table class="ft" style="margin-bottom:5pt;width:auto;margin-left:auto;font-size:8.5pt">
      <tr><td class="lbl2">발급번호</td><td class="val" style="width:80pt"><input class="di" style="font-size:8.5pt"/></td>
          <td class="lbl2">발급담당자</td><td class="val" style="width:80pt"><input class="di" style="font-size:8.5pt"/></td></tr>
    </table>
    <div class="doc-title">재 직 증 명 서</div>
    <table class="ft">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">주민등록번호</td><td class="val"><input class="di" placeholder="900101 - *******"/></td></tr>
      <tr><td class="lbl">소 속</td><td class="val"><input class="di" placeholder="인사팀"/></td>
          <td class="lbl">직 위</td><td class="val"><input class="di" placeholder="대리"/></td></tr>
      <tr><td class="lbl">입사일</td><td class="val"><input class="di" placeholder="2020. 03. 02."/></td>
          <td class="lbl">고용형태</td><td class="val"><select class="di"><option value="">— 선택 —</option><option>정규직</option><option>계약직</option><option>파견직</option><option>단시간근로자</option></select></td></tr>
      <tr><td class="lbl">용 도</td><td class="val" colspan="3"><select class="di"><option value="">— 선택 —</option><option>금융기관 제출용</option><option>관공서 제출용</option><option>개인 보관용</option><option>기타</option></select></td></tr>
    </table>
    <div class="body-text" style="text-align:center">위의 내용과 같이 재직하고 있음을 증명함.</div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-block">
        <div class="s-lbl"><input class="s-in c-company" placeholder="(주)회사명"/> 대표</div>
        <input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">직인</span>
      </div>
    </div>`
},

/* ④ 경력증명서 */
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
    <div class="body-text" style="text-align:center">위와 같은 내용이 사실임을 증명함.</div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-block">
        <div class="s-lbl"><input class="s-in c-company" placeholder="(주)회사명"/> 대표</div>
        <input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">직인</span>
      </div>
    </div>`
},

/* ⑤ 조퇴·외출 신청서 */
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
      <tr><td class="lbl">사 유</td><td class="val" colspan="3"><textarea class="di" placeholder="병원 진료"></textarea></td></tr>
      <tr><td class="lbl">기타사항</td><td class="val" colspan="3"><input class="di"/></td></tr>
    </table>
    <div class="body-text" style="text-align:center">위와 같은 사유로 □조퇴 □외출 하고자 하오니 허가하여 주시기 바랍니다.</div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div>
        <div class="sign-block" style="margin-bottom:5pt"><div class="s-lbl">신청인</div><input class="s-in" placeholder="홍길동"/> <span class="stamp">인</span></div>
        <div class="sign-block" style="margin-bottom:3pt"><div class="s-lbl">회사명</div><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-block"><div class="s-lbl">대 표</div><input class="s-in c-ceo" placeholder="홍대표"/> 귀중</div>
      </div>
    </div>`
},

/* ⑥ 결근계 */
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
      <tr><td class="lbl">사 유</td><td class="val" colspan="3"><textarea class="di" placeholder="몸살로 인한 병가"></textarea></td></tr>
      <tr><td class="lbl">기타사항</td><td class="val" colspan="3"><input class="di"/></td></tr>
    </table>
    <div class="body-text" style="text-align:center">위와 같은 사유로 결근코자 하오니 허가하여 주시기 바랍니다.</div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div>
        <div class="sign-block" style="margin-bottom:5pt"><div class="s-lbl">신청인</div><input class="s-in" placeholder="홍길동"/> <span class="stamp">인</span></div>
        <div class="sign-block" style="margin-bottom:3pt"><div class="s-lbl">회사명</div><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-block"><div class="s-lbl">대 표</div><input class="s-in c-ceo" placeholder="홍대표"/> 귀중</div>
      </div>
    </div>`
},

/* ⑦ 휴가·휴직 신청서 */
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
      <tr><td class="lbl">사 유</td><td class="val" colspan="3"><textarea class="di" placeholder="연차유급휴가 사용"></textarea></td></tr>
      <tr><td class="lbl">비상연락처</td><td class="val" colspan="3"><input class="di" placeholder="010-0000-0000"/></td></tr>
    </table>
    <div class="body-text" style="text-align:center">위와 같은 사유로 □휴가 □휴직 하고자 하오니 허가하여 주시기 바랍니다.</div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div>
        <div class="sign-block" style="margin-bottom:5pt"><div class="s-lbl">신청인</div><input class="s-in" placeholder="홍길동"/> <span class="stamp">인</span></div>
        <div class="sign-block" style="margin-bottom:3pt"><div class="s-lbl">회사명</div><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-block"><div class="s-lbl">대 표</div><input class="s-in c-ceo" placeholder="홍대표"/> 귀중</div>
      </div>
    </div>`
},

/* ⑧ 육아휴직원 */
maternity: {
  title: '육아휴직원',
  sub: '남녀고용평등법 제19조',
  hasApproval: false,
  notice: '',
  html: () => `
    <div class="doc-title">육 아 휴 직 원</div>
    <table class="ft">
      <tr><td class="lbl">성 명</td><td class="val" colspan="3"><input class="di" placeholder="홍길동"/></td></tr>
      <tr><td class="lbl">부서 및 직급</td><td class="val"><input class="di" placeholder="인사팀 대리"/></td>
          <td class="lbl">연 락 처</td><td class="val"><input class="di" placeholder="010-0000-0000"/></td></tr>
      <tr><td class="lbl">생년월일</td><td class="val"><input class="di" placeholder="1990. 01. 01."/></td>
          <td class="lbl">주 소</td><td class="val"><input class="di" placeholder="서울시 강남구 테헤란로 000"/></td></tr>
      <tr><td class="lbl">대상자녀</td><td class="val"><input class="di" placeholder="홍아기"/></td>
          <td class="lbl">자녀생년월일</td><td class="val"><input class="di" placeholder="2024. 06. 15."/></td></tr>
      <tr><td class="lbl">휴직 개시일</td><td class="val"><input class="di" placeholder="2025. 01. 01."/></td>
          <td class="lbl">휴직 종료일</td><td class="val"><input class="di" placeholder="2025. 12. 31."/></td></tr>
    </table>
    <div class="body-text" style="text-align:center">본인은 상기 사유로 <input class="ii" placeholder="12" style="width:22pt"/>개월간 육아휴직을 하고자 하오니 허가하여 주시기 바랍니다.</div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div>
        <div class="sign-block" style="margin-bottom:5pt"><div class="s-lbl">신청인</div><input class="s-in" placeholder="홍길동"/> <span class="stamp">인</span></div>
        <div class="sign-block" style="margin-bottom:3pt"><div class="s-lbl">회사명</div><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-block"><div class="s-lbl">대 표</div><input class="s-in c-ceo" placeholder="홍대표"/> 귀중</div>
      </div>
    </div>`
},

/* ⑨ 복직원 */
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
      <tr><td class="lbl">복직사유</td><td class="val" colspan="3"><textarea class="di" placeholder="육아휴직 종료에 따른 복직"></textarea></td></tr>
      <tr><td class="lbl">기타사항</td><td class="val" colspan="3"><input class="di"/></td></tr>
    </table>
    <div class="body-text" style="text-align:center">위와 같은 사유로 복직코자 하오니 허가하여 주시기 바랍니다.</div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div>
        <div class="sign-block" style="margin-bottom:5pt"><div class="s-lbl">신청인</div><input class="s-in" placeholder="홍길동"/> <span class="stamp">인</span></div>
        <div class="sign-block" style="margin-bottom:3pt"><div class="s-lbl">회사명</div><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-block"><div class="s-lbl">대 표</div><input class="s-in c-ceo" placeholder="홍대표"/> 귀중</div>
      </div>
    </div>`
},

/* ⑩ 연장·야간·휴일근로 동의서 */
'ot-agree': {
  title: '연장·야간·휴일근로 동의서',
  sub: '근로기준법 제53조',
  hasApproval: false,
  notice: '',
  html: () => `
    <div class="doc-title">연장·야간·휴일근로 동의서</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><td class="lbl">소 속</td><td class="val"><input class="di c-company" placeholder="(주)회사명"/></td>
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
    <div style="margin-top:8pt;font-size:9pt;color:var(--muted)">특이사항: <input class="ii" style="width:250pt" placeholder="건강상·생활상 특이사항 및 요구사항"/></div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div>
        <div class="sign-block" style="margin-bottom:5pt"><div class="s-lbl">동의자</div><input class="s-in" placeholder="홍길동"/> <span class="stamp">인</span></div>
        <div class="sign-block" style="margin-bottom:3pt"><div class="s-lbl">회사명</div><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-block"><div class="s-lbl">대 표</div><input class="s-in c-ceo" placeholder="홍대표"/> 귀하</div>
      </div>
    </div>`
},

/* ⑪ 연장·야간·휴일근로 신청서 */
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
      <tr><td class="lbl">신청 사유</td><td class="val" colspan="5"><textarea class="di" placeholder="서버 정기점검 및 업데이트 작업 필요"></textarea></td></tr>
    </table>
    <div class="body-text" style="text-align:center">위의 내용으로 연장·야간·휴일근로를 신청하오니 허가해주시기 바랍니다.</div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div>
        <div class="sign-block" style="margin-bottom:5pt"><div class="s-lbl">신청자</div><input class="s-in" placeholder="홍길동"/> <span class="stamp">인</span></div>
        <div class="sign-block" style="margin-bottom:3pt"><div class="s-lbl">회사명</div><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-block"><div class="s-lbl">대 표</div><input class="s-in c-ceo" placeholder="홍대표"/> 귀중</div>
      </div>
    </div>`
},

/* ⑫ 사직원 */
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
      <div>
        <div class="sign-block" style="margin-bottom:5pt"><div class="s-lbl">제출자</div><input class="s-in" placeholder="홍길동"/> <span class="stamp">인</span></div>
        <div class="sign-block" style="margin-bottom:3pt"><div class="s-lbl">회사명</div><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-block"><div class="s-lbl">대 표</div><input class="s-in c-ceo" placeholder="홍대표"/> 귀중</div>
      </div>
    </div>`
},

/* ⑬ 해고통보서 */
dismiss: {
  title: '해고통보서',
  sub: '근로기준법 제26조·제27조',
  hasApproval: false,
  notice: '※ 근로기준법 제27조: 해고 사유·일시를 서면으로 통지하지 않은 해고는 효력이 없습니다.\n※ 해고일 30일 전 예고 또는 예고수당(30일분 통상임금) 지급 필수',
  html: () => `
    <div class="doc-law">■ 근로기준법 제26조, 제27조</div>
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
      <div>
        <div class="sign-block" style="margin-bottom:5pt"><div class="s-lbl"><input class="s-in c-company" placeholder="(주)회사명"/></div></div>
        <div class="sign-block"><div class="s-lbl">대표</div><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">인</span></div>
      </div>
    </div>
    <div class="receipt"><div class="receipt-cut">— 수 령 확 인 서 (절취선) —</div>
    <div class="receipt-body">본인은 위 해고통보서를 <input class="ii" placeholder="2025. 01. 10." style="width:90pt"/> 수령하였음을 확인합니다.<br>수령인: <input class="ii" placeholder="홍길동" style="width:90pt"/> &nbsp;<span class="stamp">인</span></div></div>`
},

/* ⑭ 퇴직금 중간정산 신청서 */
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
      <div>
        <div class="sign-block" style="margin-bottom:5pt"><div class="s-lbl">신청인</div><input class="s-in" placeholder="홍길동"/> <span class="stamp">인</span></div>
        <div class="sign-block" style="margin-bottom:3pt"><div class="s-lbl">회사명</div><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-block"><div class="s-lbl">대 표</div><input class="s-in c-ceo" placeholder="홍대표"/> 귀하</div>
      </div>
    </div>`
},

/* ⑮ 금품청산확인서 */
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
      <div>
        <div class="sign-block" style="margin-bottom:5pt"><div class="s-lbl">확인자</div><input class="s-in" placeholder="홍길동"/> <span class="stamp">인</span></div>
        <div class="sign-block" style="margin-bottom:3pt"><div class="s-lbl">회사명</div><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-block"><div class="s-lbl">대 표</div><input class="s-in c-ceo" placeholder="홍대표"/> 귀중</div>
      </div>
    </div>`
},

/* ⑯ 업무 인수·인계서 */
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
      <div>
        <div class="sign-block" style="margin-bottom:3pt"><div class="s-lbl">회사명</div><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-block"><div class="s-lbl">대 표</div><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">인</span></div>
      </div>
    </div>`
},

/* ⑰ 퇴직증명원 */
retired: {
  title: '퇴직증명원',
  sub: '근로기준법 제39조',
  hasApproval: false,
  notice: '',
  html: () => `
    <div class="doc-law">■ 근로기준법 제39조</div>
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
      <div class="sign-block">
        <div class="s-lbl">대표자</div>
        <input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">인</span><br>
        <input class="s-in c-company" style="margin-top:4pt" placeholder="(주)회사명"/>
      </div>
    </div>`
},

/* ⑱ 미사용 연차 통지서 */
annual: {
  title: '미사용 연차유급휴가일수 통지서',
  sub: '근로기준법 제61조',
  hasApproval: true,
  notice: '※ 소멸 6개월 전 → 사용 촉구 → 10일 내 미지정 → 소멸 2개월 전 회사가 지정 → 미사용 수당 지급 의무 면제',
  html: () => `
    <div class="doc-law">■ 근로기준법 제61조</div>
    <div class="doc-title">미사용 연차유급휴가일수 통지서</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">소 속</td><td class="val"><input class="di" placeholder="인사팀"/></td></tr>
      <tr><td class="lbl">직 위</td><td class="val"><input class="di" placeholder="대리"/></td>
          <td class="lbl">주민번호</td><td class="val"><input class="di" placeholder="900101-*******"/></td></tr>
      <tr><th>연차 발생 대상기간</th><th>연차 사용 대상기간</th><th style="width:55pt">발생(A)</th><th style="width:55pt">사용(B)</th><th style="width:55pt">미사용(A-B)</th></tr>
      <tr><td class="val" style="text-align:center"><input class="di" placeholder="2024.01.01~12.31"/></td>
          <td class="val" style="text-align:center"><input class="di" placeholder="2025.01.01~12.31"/></td>
          <td class="val" style="text-align:center"><input class="di" placeholder="15"/></td>
          <td class="val" style="text-align:center"><input class="di" placeholder="10"/></td>
          <td class="val" style="text-align:center"><input class="di" placeholder="5"/></td></tr>
    </table>
    <div class="block-box" style="font-size:9pt;line-height:1.9">
      1. 귀하의 통지일 현재 사용가능한 미사용 연차유급휴가일수는 <input class="ii" placeholder="5" style="width:22pt"/>일임을 알려드립니다.<br>
      2. <input class="ii" placeholder="2025. 07. 01." style="width:90pt"/>까지 미사용 연차유급휴가일수의 사용시기를 지정하여 서면으로 통보하여 주실 것을 촉구드립니다.<br>
      3. 동 기한 내에 사용시기 지정통보가 제출되지 아니한 경우 회사가 임의 지정할 예정이며, 그럼에도 사용하지 아니한 연차에 대하여는 미사용 연차수당이 지급되지 않음을 알려드립니다.
    </div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-block">
        <div class="s-lbl"><input class="s-in c-company" placeholder="(주)회사명"/> 대표</div>
        <input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">인</span>
      </div>
    </div>`
},

/* ⑲ 경고장 */
warning: {
  title: '경고장',
  sub: '수령확인서 별도 징구 권장',
  hasApproval: false,
  notice: '',
  html: () => `
    <div class="doc-title">경 고 장</div>
    <div class="body-text">소 속: <input class="ii" placeholder="인사팀" style="width:140pt"/> &nbsp;&nbsp; 성 명: <input class="ii" placeholder="홍길동" style="width:100pt"/></div>
    <div style="margin:8pt 0;font-size:9.5pt;line-height:1.9">
      귀하에게 관련된 아래 사항은 직원으로서 시정할 사항이므로 각성을 촉구하며, 차후 이러한 일이 발생하지 않도록 엄중 경고합니다.
      또다시 이와 비슷한 복무규율 위반 사례가 적발될 시에는 회사 규정에 따라 징계 조치될 수 있음을 양지하시기 바랍니다.
    </div>
    <div class="sec-label">※ 경고 내용</div>
    <textarea class="di" style="border:1px solid var(--border-dk);border-radius:2px;width:100%;padding:5pt 7pt;min-height:90pt;font-size:9.5pt;line-height:1.75" placeholder="경고 사유를 구체적으로 기재합니다.&#10;예) 귀하는 2025. 01. 05.부터 2025. 01. 10.까지 총 6회에 걸쳐 지각하였으며..."></textarea>
    <div style="font-size:9pt;color:var(--muted);margin-top:5pt">□ 사실확인서 제출 포함</div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-block">
        <div class="s-lbl"><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <input class="s-in c-ceo" placeholder="대표 홍대표"/> <span class="stamp">인</span>
      </div>
    </div>
    <div class="receipt"><div class="receipt-cut">— 수 령 확 인 서 (절취선) —</div>
    <div class="receipt-body">본인은 위 경고장을 <input class="ii" placeholder="2025. 01. 10." style="width:90pt"/> 수령하였음을 확인합니다.<br>수령인: <input class="ii" placeholder="홍길동" style="width:90pt"/> &nbsp;<span class="stamp">인</span></div></div>`
},

/* ⑳ 사실확인서 */
factcheck: {
  title: '사실확인서',
  sub: '',
  hasApproval: false,
  notice: '',
  html: () => `
    <div class="doc-title">사 실 확 인 서</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">소 속</td><td class="val"><input class="di" placeholder="영업팀"/></td></tr>
      <tr><td class="lbl">직 위</td><td class="val"><input class="di" placeholder="대리"/></td>
          <td class="lbl">직 무 명</td><td class="val"><input class="di" placeholder="영업 관리"/></td></tr>
    </table>
    <div class="sec-label">■ 내 용</div>
    <textarea class="di" style="border:1px solid var(--border-dk);border-radius:2px;width:100%;padding:5pt 7pt;min-height:140pt;font-size:9.5pt;line-height:1.75" placeholder="확인 사실을 구체적으로 기재합니다."></textarea>
    <div class="body-text" style="text-align:center">상기의 사유로 사실확인서를 제출합니다.</div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div>
        <div class="sign-block" style="margin-bottom:5pt"><div class="s-lbl">제출인</div><input class="s-in" placeholder="홍길동"/> <span class="stamp">인</span></div>
        <div class="sign-block" style="margin-bottom:3pt"><div class="s-lbl">회사명</div><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-block"><div class="s-lbl">대 표</div><input class="s-in c-ceo" placeholder="홍대표"/> 귀중</div>
      </div>
    </div>`
},

/* ㉑ 내용증명 */
'cert-letter': {
  title: '내용증명',
  sub: '무단결근 원직복귀명령 등',
  hasApproval: false,
  notice: '',
  html: () => `
    <div class="doc-title">내 용 증 명</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><td class="lbl">일 시</td><td class="val" colspan="3"><input class="di" placeholder="2025. 01. 10."/></td></tr>
      <tr><td class="lbl">수신자</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">수신자 주소</td><td class="val"><input class="di" placeholder="서울특별시 강남구 테헤란로 000"/></td></tr>
      <tr><td class="lbl">발신자</td><td class="val"><input class="di c-ceo" placeholder="대표 홍대표"/></td>
          <td class="lbl">발신자 주소</td><td class="val"><input class="di c-addr" placeholder="서울특별시 강남구 테헤란로 000"/></td></tr>
      <tr><td class="lbl">제 목</td><td class="val" colspan="3"><input class="di" placeholder="무단결근에 따른 원직복귀명령 통보"/></td></tr>
    </table>
    <textarea class="di" style="border:1px solid var(--border-dk);border-radius:2px;width:100%;padding:5pt 7pt;min-height:140pt;font-size:9.5pt;line-height:1.9" placeholder="1. 귀하의 무궁한 발전을 기원합니다.&#10;2. 귀하는 2025. 01. 05.부터 무단결근을 함으로써 근로제공의 의무를 불이행하고 있습니다.&#10;3. 귀하는 즉시 원직에 복귀하여 성실하게 근로를 제공하시길 바랍니다.&#10;4. 만약 무단결근이 계속된다면 회사의 규정에 따라 당연퇴직, 징계 등의 조치 및 손해배상청구를 추진할 수 있음을 양지하시기 바랍니다."></textarea>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-block">
        <div class="s-lbl">발신인 <input class="s-in c-company" placeholder="(주)회사명"/> 대표</div>
        <input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">인</span>
      </div>
    </div>`
},

/* ㉒ 위원회 개최 통보서 */
committee: {
  title: '위원회 개최 통보서',
  sub: '',
  hasApproval: false,
  notice: '',
  html: () => `
    <div class="doc-title">위원회 개최 통보서</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">소 속</td><td class="val"><input class="di" placeholder="영업팀"/></td></tr>
      <tr><td class="lbl">주민번호</td><td class="val" colspan="3"><input class="di" placeholder="900101-*******"/></td></tr>
    </table>
    <textarea class="di" style="border:1px solid var(--border-dk);border-radius:2px;width:100%;padding:5pt 7pt;min-height:90pt;font-size:9.5pt;line-height:1.9" placeholder="상기인은 아래와 같은 사유로 징계를 검토하게 된 바, 상기인은 아래 일자에 지정된 장소로 출석하여 징계위원회 회의에 참석하시길 바랍니다.&#10;만약 출석치 않을 시 징계위원회의 결정에 이의가 없음이라고 간주하오니 필히 참석하여 주시기 바랍니다."></textarea>
    <table class="ft" style="margin-top:8pt">
      <tr><td class="lbl">일 자</td><td class="val"><input class="di" placeholder="2025. 01. 20.  오후 2시"/></td></tr>
      <tr><td class="lbl">장 소</td><td class="val"><input class="di" placeholder="본사 회의실"/></td></tr>
      <tr><td class="lbl">위원회 위원</td><td class="val"><input class="di" placeholder="대표이사 외 2인"/></td></tr>
    </table>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-block">
        <div class="s-lbl"><input class="s-in c-company" placeholder="(주)회사명"/> 대표</div>
        <input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">인</span>
      </div>
    </div>`
},

/* ㉓ 출석통지서 */
summons: {
  title: '출석통지서',
  sub: '',
  hasApproval: false,
  notice: '',
  html: () => `
    <div class="doc-title">출 석 통 지 서</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><th colspan="4">출석자 인적사항</th></tr>
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">소 속</td><td class="val"><input class="di" placeholder="영업팀"/></td></tr>
      <tr><td class="lbl">직 위</td><td class="val"><input class="di" placeholder="대리"/></td>
          <td class="lbl">담당직무</td><td class="val"><input class="di" placeholder="영업관리"/></td></tr>
      <tr><td class="lbl">주 소</td><td class="val" colspan="3"><input class="di" placeholder="서울특별시 강남구 테헤란로 000"/></td></tr>
      <tr><td class="lbl">출석사유</td><td class="val" colspan="3"><textarea class="di" placeholder="징계위원회 출석 (취업규칙 위반 관련 소명 기회 부여)"></textarea></td></tr>
      <tr><td class="lbl">출석일시</td><td class="val"><input class="di" placeholder="2025. 01. 20.  오후 2시"/></td>
          <td class="lbl">출석장소</td><td class="val"><input class="di" placeholder="본사 대회의실"/></td></tr>
    </table>
    <div class="block-box" style="font-size:9pt;line-height:1.85">
      <strong>유의사항</strong><br>
      1. 진술을 위한 출석을 원하지 않을 때에는 진술권 포기서를, 진술을 할 경우에는 진술서를 즉시 제출하십시오.<br>
      2. 서면진술을 하고자 할 때에는 인사위원회 개최 전일까지 서면진술서를 제출하십시오.<br>
      3. 정당한 사유 없이 지정된 일시에 출석하지 않을 경우 진술할 의사가 없는 것으로 간주하여 진술 없이 징계안을 심의할 것입니다.
    </div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-block">
        <div class="s-lbl"><input class="s-in c-company" placeholder="(주)회사명"/> 인사위원회 위원장</div>
        <input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">인</span>
      </div>
    </div>`
},

/* ㉔ 징계의결서 */
disciplinary: {
  title: '징계의결서',
  sub: '인사위원회 심의·의결 후 발행',
  hasApproval: false,
  notice: '',
  html: () => `
    <div class="doc-title">징 계 의 결 서</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><th colspan="4">인적사항</th></tr>
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">직 급</td><td class="val"><input class="di" placeholder="대리"/></td></tr>
      <tr><td class="lbl">소 속</td><td class="val"><input class="di" placeholder="영업팀"/></td>
          <td class="lbl">담당직무</td><td class="val"><input class="di" placeholder="영업관리"/></td></tr>
      <tr><td class="lbl">생년월일</td><td class="val"><input class="di" placeholder="1990. 01. 01."/></td>
          <td class="lbl">주 소</td><td class="val"><input class="di" placeholder="서울시 강남구 테헤란로 000"/></td></tr>
    </table>
    <div class="sec-label">■ 의결주문</div>
    <input class="di" style="border:1px solid var(--border-dk);border-radius:2px;width:100%;padding:4pt 7pt;margin-bottom:8pt" placeholder="예) 해고 (2025. 02. 01.부)"/>
    <div class="sec-label">■ 징계사유</div>
    <textarea class="di" style="border:1px solid var(--border-dk);border-radius:2px;width:100%;padding:5pt 7pt;min-height:100pt;font-size:9.5pt;line-height:1.75" placeholder="징계사유를 구체적으로 기재합니다."></textarea>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div>
        <div style="font-size:9pt;color:var(--muted);text-align:right;margin-bottom:5pt"><input class="s-in c-company" placeholder="(주)회사명"/> 인사위원회</div>
        <div class="sign-block" style="margin-bottom:3pt"><div class="s-lbl">위원장</div><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">인</span></div>
        <div class="sign-block" style="margin-bottom:3pt"><div class="s-lbl">위 원</div><input class="s-in" placeholder="김위원"/> <span class="stamp">인</span></div>
        <div class="sign-block"><div class="s-lbl">위 원</div><input class="s-in" placeholder="이위원"/> <span class="stamp">인</span></div>
      </div>
    </div>`
},

/* ㉕ 출장신청서 */
trip: {
  title: '출장신청서',
  sub: '',
  hasApproval: true,
  notice: '',
  html: () => `
    <div class="doc-title">출 장 신 청 서</div>
    <table class="ft">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">소 속</td><td class="val"><input class="di" placeholder="영업팀"/></td></tr>
      <tr><td class="lbl">출장기간</td><td class="val" colspan="3"><input class="di" placeholder="2025. 01. 10. ~ 2025. 01. 12.  ( 1박 2일 )"/></td></tr>
      <tr><td class="lbl">출장목적</td><td class="val" colspan="3"><input class="di" placeholder="고객사 미팅 및 계약 협의"/></td></tr>
      <tr><td class="lbl">출장장소</td><td class="val" colspan="3"><input class="di" placeholder="부산광역시 해운대구 ○○ 빌딩"/></td></tr>
      <tr><td class="lbl">주요일정</td><td class="val" colspan="3"><textarea class="di" placeholder="1월 10일 - 이동 및 고객사 미팅&#10;1월 11일 - 현장 점검 및 계약 협의&#10;1월 12일 - 귀사" style="min-height:44pt"></textarea></td></tr>
      <tr>
        <td class="lbl">출장여비</td>
        <td class="val" colspan="3">
          <table style="width:100%;border-collapse:collapse;font-size:8.5pt">
            <tr>
              <td style="border:1px solid var(--border-dk);text-align:center;padding:3pt;background:#f0ece5;width:20%">교통비</td>
              <td style="border:1px solid var(--border-dk);text-align:center;padding:3pt;background:#f0ece5;width:20%">숙박료</td>
              <td style="border:1px solid var(--border-dk);text-align:center;padding:3pt;background:#f0ece5;width:20%">식비</td>
              <td style="border:1px solid var(--border-dk);text-align:center;padding:3pt;background:#f0ece5;width:20%">일당</td>
              <td style="border:1px solid var(--border-dk);text-align:center;padding:3pt;background:#f0ece5;width:20%">계</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--border-dk)"><input class="di" style="font-size:8.5pt" placeholder="30,000"/></td>
              <td style="border:1px solid var(--border-dk)"><input class="di" style="font-size:8.5pt" placeholder="80,000"/></td>
              <td style="border:1px solid var(--border-dk)"><input class="di" style="font-size:8.5pt" placeholder="30,000"/></td>
              <td style="border:1px solid var(--border-dk)"><input class="di" style="font-size:8.5pt" placeholder="20,000"/></td>
              <td style="border:1px solid var(--border-dk)"><input class="di" style="font-size:8.5pt" placeholder="160,000"/></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div>
        <div class="sign-block" style="margin-bottom:3pt"><div class="s-lbl">회사명</div><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-block"><div class="s-lbl">대 표</div><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">인</span></div>
      </div>
    </div>`
},

/* ㉖ 인사발령서 */
order: {
  title: '인사발령서',
  sub: '',
  hasApproval: false,
  notice: '',
  html: () => `
    <div class="doc-title">인 사 발 령 서</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><td class="lbl">수 신</td><td class="val"><input class="di" placeholder="홍길동 귀하"/></td>
          <td class="lbl">발 신</td><td class="val"><input class="di c-ceo" placeholder="대표이사 홍대표"/></td></tr>
      <tr><td class="lbl">제 목</td><td class="val" colspan="3"><input class="di" placeholder="인사발령의 건"/></td></tr>
    </table>
    <div class="sec-label">■ 발령 내용</div>
    <table class="ft">
      <thead><tr><th>발 령 전</th><th>발 령 후</th><th style="width:80pt">발령 일자</th><th style="width:80pt">비 고</th></tr></thead>
      <tbody>
        <tr><td class="val"><input class="di" placeholder="영업팀 대리"/></td>
            <td class="val"><input class="di" placeholder="마케팅팀 과장"/></td>
            <td class="val"><input class="di" placeholder="2025. 01. 01."/></td>
            <td class="val"><input class="di"/></td></tr>
        <tr><td class="val"><input class="di"/></td><td class="val"><input class="di"/></td>
            <td class="val"><input class="di"/></td><td class="val"><input class="di"/></td></tr>
      </tbody>
    </table>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-block">
        <div class="s-lbl"><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <input class="s-in c-ceo" placeholder="대표이사 홍대표"/> <span class="stamp">직인</span>
      </div>
    </div>`
}

}; // end FORMS

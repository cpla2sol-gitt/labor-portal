/* forms-채용.js — [채용] 서식 */
if (typeof window.FORMS === 'undefined') window.FORMS = {};
Object.assign(window.FORMS, {


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
    <table class="ft" style="margin:7pt 0;font-size:10pt">
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
    <div class="block-box" style="font-size:10pt">
      ※ 개인정보 제공에 대한 거부 권리가 있으나, 미동의 시 적법하게 시행되는 내부규정 및 법령에 따라 발생하는 불이익에 대한 책임은 본인에게 있습니다.
    </div>
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

}); /* end forms-채용.js */

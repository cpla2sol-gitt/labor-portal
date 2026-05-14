/* forms-채용.js — [채용] 서식 */
if (typeof window.FORMS === 'undefined') window.FORMS = {};
Object.assign(window.FORMS, {


privacy: {
  title: '개인정보의 수집·이용에 관한 동의서',
  sub: '채용 시 서명 징구',
  hasApproval: false,
  notice: '',
  html: () => `
    <div class="doc-title">개인정보의 수집·이용에 관한 동의서</div>

    <div class="body-text" style="font-size:10pt;margin-bottom:6pt">
      <input class="ii" placeholder="홍길동" style="width:60pt"/>은(는) <strong><input class="ii c-company" style="width:120pt"/></strong>의 재직근로자로서,
      인사관리상 개인정보의 수집·이용이 필요하다는 것을 이해하고 있고 다음과 같은 개인정보·민감정보·고유식별정보를 수집·이용하는 것에 동의합니다.
    </div>

    <table class="ft" style="margin-bottom:3pt;font-size:9.5pt">
      <thead>
        <tr><th style="width:30%">개인정보항목</th><th style="width:42%">수집·이용 목적</th><th>보유기간</th></tr>
      </thead>
      <tbody>
        <tr>
          <td class="val" style="padding:4pt 5pt">가. 성명<br/>나. 주소, 이메일, 연락처<br/>다. 학력, 근무경력, 자격증<br/>라. 기타 근무와 관련된 개인정보</td>
          <td class="val" style="padding:4pt 5pt">가. 채용 및 승진 등 인사관리<br/>나. 세법, 노동관계법령 등에서 부과하는 의무이행</td>
          <td class="val" style="padding:4pt 5pt">재직기간 동안 보유하고, 기타 개별법령에서 보유기간을 정하고 있는 경우 그에 따름</td>
        </tr>
      </tbody>
    </table>
    <div class="body-text" style="font-size:9.5pt;text-align:right;margin-bottom:10pt">
      개인정보의 수집·이용에(□동의함 □동의하지 않음)
    </div>

    <table class="ft" style="margin-bottom:3pt;font-size:9.5pt">
      <thead>
        <tr><th style="width:30%">민감정보의 항목</th><th style="width:42%">수집·이용 목적</th><th>보유기간</th></tr>
      </thead>
      <tbody>
        <tr>
          <td class="val" style="padding:4pt 5pt">가. 신체장애<br/>나. 병력<br/>다. 범죄정보</td>
          <td class="val" style="padding:4pt 5pt">가. 채용 및 승진 등 인사관리<br/>나. 세법, 노동관계법령 등에서 부과하는 의무이행<br/>다. 정부지원금 신청</td>
          <td class="val" style="padding:4pt 5pt">재직기간 동안 보유하고, 기타 개별법령에서 보유기간을 정하고 있는 경우 그에 따름</td>
        </tr>
      </tbody>
    </table>
    <div class="body-text" style="font-size:9.5pt;text-align:right;margin-bottom:10pt">
      민감정보의 수집·이용에(□동의함 □동의하지 않음)
    </div>

    <table class="ft" style="margin-bottom:3pt;font-size:9.5pt">
      <thead>
        <tr><th style="width:30%">고유식별정보</th><th style="width:42%">수집·이용 목적</th><th>보유기간</th></tr>
      </thead>
      <tbody>
        <tr>
          <td class="val" style="padding:4pt 5pt">가. 주민등록번호<br/>나. 운전면허번호<br/>다. 여권번호<br/>라. 외국인등록번호</td>
          <td class="val" style="padding:4pt 5pt">가. 채용 및 승진 등 인사관리<br/>나. 세법, 노동관계법령 등에서 부과하는 의무이행<br/>다. 정부지원금 신청</td>
          <td class="val" style="padding:4pt 5pt">재직기간 동안 보유하고, 기타 개별법령에서 보유기간을 정하고 있는 경우 그에 따름</td>
        </tr>
      </tbody>
    </table>
    <div class="body-text" style="font-size:9.5pt;text-align:right;margin-bottom:10pt">
      고유식별정보의 수집·이용에(□동의함 □동의하지 않음)
    </div>
      
    <div class="body-text" style="font-size:10pt;margin-bottom:10pt">
      본사는 취득한 개인정보를 수집한 목적에 필요한 범위에서 적합하게 처리하고 그 목적 외의 용도로 사용하지 않으며 개인 정보를 제공한 계약당사자는 언제나 자신이 입력한 개인정보를 열람수정 및 정보제공에 대한 철회를 할 수 있습니다. 본인은 1~3항에 따라 수집되는 개인정보의 항목과 개인정보의 수집·이용에 대한 거부를 할 수 있는 권리가 있다는 사실을 충분히 설명 받고 숙지하였으며, 미동의시 적법하게 시행되는 회사내부규정 및 법령에 따라 발생하는 불이익에 대한 책임은 본인에게 있음을 확인합니다.
    </div>

    <div style="margin-top:16pt;text-align:center;font-size:10pt">
      <input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일
    </div>
    <div style="display:flex;justify-content:flex-end;margin-top:10pt;flex-shrink:0">
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">동의자</span><input class="s-in" placeholder="홍길동"/> <span class="stamp">서명/인</span></div>
        <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-row sr-ceo-row"><span class="s-lbl">대표자</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="c-suffix">귀하</span></div>
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
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">생년월일</td><td class="val"><input class="di" placeholder="1990. 01. 01."/></td></tr>
      <tr><td class="lbl">주 소</td><td class="val" colspan="3"><input class="di" placeholder="서울특별시 강남구 테헤란로 000  (전화: 010-0000-0000)"/></td></tr>
      <tr><td class="lbl">부양가족</td><td class="val"><input class="di" placeholder="0 명"/></td>
          <td class="lbl">종사업무</td><td class="val"><input class="di" placeholder="인사 관리"/></td></tr>
      <tr><td class="lbl">최종학력</td><td class="val"><input class="di" placeholder="○○대학교 경영학과 졸업"/></td>
          <td class="lbl">기능·자격</td><td class="val"><input class="di" placeholder="공인노무사, 1종 운전면허"/></td></tr>
      <tr><td class="lbl">경 력</td><td class="val" colspan="3"><textarea class="di" placeholder="전 직장명 / 근무기간 / 담당업무" style="min-height:120pt"></textarea></td></tr>
      <tr><td class="lbl">병 역</td><td class="val"><input class="di" placeholder="육군 병장 만기전역"/></td>
          <td class="lbl">고용일</td><td class="val"><input class="di" placeholder="2020. 03. 02."/></td></tr>
      <tr><td class="lbl">해고일</td><td class="val"><input class="di"/></td>
          <td class="lbl">퇴직일</td><td class="val"><input class="di"/></td></tr>
      <tr><td class="lbl">퇴직사유</td><td class="val"><input class="di"/></td>
          <td class="lbl">금품청산</td><td class="val"><input class="di"/></td></tr>
      <tr><td class="lbl">특기사항</td><td class="val" colspan="3"><textarea class="di" placeholder="교육, 건강, 휴직 등" style="min-height:120pt"></textarea></td></tr>
    </table>`
},

}); /* end forms-채용.js */

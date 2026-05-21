/* forms-휴가.js — [휴가] 서식 */
if (typeof window.FORMS === 'undefined') window.FORMS = {};
Object.assign(window.FORMS, {


annual: {
  title: '미사용 연차유급휴가일수 통지서',
  sub: '근로기준법 제61조',
  hasApproval: true,
  notice: '▶ 1년 이상 (제61조 제1항)\n  1차: 소멸 6개월 전 10일 이내 — 미사용 일수 통지 + 10일 내 사용시기 지정 촉구\n  2차: 소멸 2개월 전까지 — 미지정분 회사가 서면 지정 \n\n▶ 1년 미만 (제61조 제2항)\n  1차: 입사 1년 종료 3개월 전 10일 이내 — 미사용 일수 통지 + 10일 내 사용시기 지정 촉구\n      ※ 마지막 2일분은 소멸 1개월 전 5일 이내 별도 촉구\n  2차: 소멸 1개월 전까지 — 미지정분 회사가 서면 지정\n      ※ 마지막 2일분은 입사 1년 종료 전 10일 이내 별도 촉구\n\n⚠️ 2차 서면 없이 1차만으로는 수당 면제 효과 없음',
  html: () => `    
    <div class="doc-title">미사용 연차유급휴가일수 통지서</div>
    <div style="margin-bottom:10pt;display:flex;align-items:center;gap:8pt;font-size:11pt">
      <span style="font-weight:500;color:var(--accent)">근로자 유형</span>
      <select id="annual-type" class="di" style="width:auto;padding:3pt 8pt" onchange="annualTypeChange(this.value)">
        <option value="over">1년 이상 근로자</option>
        <option value="under">1년 미만 근로자</option>
      </select>
    </div>    
    <table class="ft" style="table-layout:fixed;width:100%;margin-bottom:0">
      <colgroup>
        <col style="width:20%"/><col style="width:30%"/>
        <col style="width:20%"/><col style="width:30%"/>
      </colgroup>
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">소 속</td><td class="val"><input class="di" placeholder="인사팀"/></td></tr>
      <tr><td class="lbl">직 위</td><td class="val"><input class="di" placeholder="대리"/></td>
          <td class="lbl">주민번호</td><td class="val"><input class="di" placeholder="900101-*******"/></td></tr>
      <tr><td class="lbl">입사일자</td><td class="val"><input class="di" placeholder="2020. 03. 02."/></td>
          <td class="lbl" id="annual-period-label">연차 소멸<br>예정일</td><td class="val"><input class="di" placeholder="2025. 12. 31."/></td></tr>
      <tr><td class="lbl">발생 기준</td><td class="val" colspan="3">
        <select class="di" onchange="this.nextElementSibling.textContent=this.value"><option value="">— 선택 —</option><option>입사일 기준</option><option>회계연도 기준</option></select><span class="select-print-val"></span>
      </td></tr>
    </table>
    <table class="ft" style="table-layout:fixed;width:100%;margin-bottom:10pt;border-top:none">
      <colgroup>
        <col style="width:22%"/><col style="width:22%"/>
        <col style="width:18.6%"/><col style="width:18.6%"/><col style="width:18.6%"/>
      </colgroup>
      <tr><th style="white-space:pre-line">연차 발생&#10;대상기간</th><th style="white-space:pre-line">연차 사용&#10;대상기간</th>
          <th>발생(A)</th><th>사용(B)</th><th>미사용(A-B)</th></tr>
      <tr><td class="val" style="text-align:center"><textarea class="di" rows="2" style="resize:none;text-align:center" placeholder="2024.01.01~12.31"></textarea></td>
          <td class="val" style="text-align:center"><textarea class="di" rows="2" style="resize:none;text-align:center" placeholder="2025.01.01~12.31"></textarea></td>
          <td class="val" style="text-align:center"><input class="di" placeholder="15"/></td>
          <td class="val" style="text-align:center"><input class="di" placeholder="10"/></td>
          <td class="val" style="text-align:center"><input class="di" placeholder="5"/></td></tr>
    </table>
    <div class="block-box" style="font-size:11pt;line-height:1.9">
      1. 귀하의 통지일 현재 사용가능한 미사용 연차유급휴가일수는 <input class="ii" placeholder="5" style="width:22pt"/>일임을 알려드립니다.<br>
      2. <input class="ii" placeholder="2025. 07. 01." style="width:90pt"/>까지 미사용 연차유급휴가일수의 사용시기를 지정하여 서면으로 통보하여 주실 것을 촉구드립니다.<br>
      3. 동 기한 내에 사용시기 지정통보가 제출되지 아니한 경우 회사가 임의 지정할 예정이며, 그럼에도 사용하지 아니한 연차에 대하여는 미사용 연차수당이 지급되지 않음을 알려드립니다.
    </div>
    <div class="body-text no-print" style="font-size:10pt;color:#bbb;margin-top:6pt">
      ※ 본 통지서는 근로기준법 제61조에 따른 연차휴가 사용 촉구 서면(1차)입니다. 수당 지급의무 면제를 위해서는 이후 2차 회사 지정 서면이 반드시 필요합니다.
    </div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-row sr-ceo-row"><span class="s-lbl">대표자</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">서명/인</span></div>
      </div>
    </div>`
},
  
'labor-refusal': {
  title: '노무수령거부통지서',
  sub: '근로기준법 제61조 — 연차 사용촉진 후 노무수령 거부',
  hasApproval: false, 
  notice: '※ 근로기준법 제61조에 따라 연차 사용 촉구 및 회사 지정 절차를 완료한 후 발급합니다.\n※ 이 통지서를 수령하고도 출근·근로 제공 시, 회사는 해당일을 연차 사용으로 처리하고 미사용 연차수당 지급 의무가 없습니다.',
  html: () => `
    <div class="doc-title">노무수령거부 통지서</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">부 서</td><td class="val"><input class="di" placeholder="영업팀"/></td></tr>
      <tr><td class="lbl">지정 연차일</td><td class="val" colspan="3"><input class="di" placeholder="2025. 07. 15. (화요일)"/></td></tr>
    </table>
    <div class="block-box" style="font-size:11pt;line-height:1.9">
      근로기준법 제61조(연차 유급휴가의 사용 촉진)에 의거, 회사가 귀하에게 미사용 연차휴가일수를 알려주고
      그 사용시기를 정하여 회사에 통보하도록 촉구하였음에도 불구하고, 아무런 통보를 받지 못하여
      부득이 회사가 귀하의 연차휴가 사용일을 지정하여 통보하였습니다.<br><br>
      <strong>금일은 회사가 귀하의 연차휴가일로 지정한 날</strong>이므로 귀하는 금일 회사에 근로를 제공할 의무가 없고,
      회사에서는 <strong><u>귀하의 노무수령을 거부</u></strong>하오니 즉시 퇴근하시기 바랍니다.<br><br>
      본 통지서를 수령하였음에도 불구하고 귀하가 퇴근하지 않고 계속 근로할 경우,
      연차휴가를 사용한 것으로 처리되어 추후 연차휴가미사용수당이 지급되지 않을 수 있음을 알려드리오니
      이 점 유념하시어 휴가제도의 취지에 맞게 충분한 휴식을 취하시기 바랍니다.
    </div>
    <div class="sign-bottom-wrap" style="margin-top:auto; break-inside:avoid; page-break-inside:avoid">
      <div class="sign-area" style="margin-top:0">
        <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
        <div class="sign-right">
          <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
          <div class="sign-row sr-ceo-row"><span class="s-lbl">대표자</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">서명/인</span></div>
        </div>
      </div>
      <div class="receipt">
        <div class="receipt-cut">— 노무수령거부 통지서 수령확인증 (절취선) —</div>
        <div class="receipt-body">
          본인은 금일 회사의 노무수령거부 통지서를 수령하였음을 확인합니다.<br>
          수령 일시: <input class="ii" placeholder="2025. 07. 15." style="width:100pt"/> &nbsp;
          시각: <input class="ii" placeholder="09:00" style="width:45pt"/><br>
          수령인: <input class="ii" placeholder="홍길동" style="width:90pt"/> &nbsp;<span class="stamp">서명/인</span>
        </div>
      </div>
    </div>`
},

}); /* end forms-휴가.js */

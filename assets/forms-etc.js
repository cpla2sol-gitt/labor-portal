/* forms-기타.js — [기타] 서식 */
if (typeof window.FORMS === 'undefined') window.FORMS = {};
Object.assign(window.FORMS, {


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
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">신청자</span><input class="s-in " placeholder="홍길동"/> <span class="stamp">서명/인</span></div>
        <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
      </div>
      </div>
    </div>`
},


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
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-row sr-ceo-row"><span class="s-lbl">대표이사</span><input class="s-in c-ceo" placeholder="대표이사 홍대표"/> <span class="stamp">서명/인</span></div>
      </div>
    </div>`
},

}); /* end forms-기타.js */
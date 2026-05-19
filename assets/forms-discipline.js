/* forms-징계.js — [징계] 서식 */
if (typeof window.FORMS === 'undefined') window.FORMS = {};
Object.assign(window.FORMS, {


warning: {
  title: '경고장',
  sub: '수령확인서 별도 징구 권장',
  hasApproval: false, 
  notice: '',
  html: () => `
    <div class="doc-title">경 고 장</div>
    <div class="body-text">소 속: <input class="ii" placeholder="인사팀" style="width:140pt"/> &nbsp;&nbsp; 성 명: <input class="ii" placeholder="홍길동" style="width:100pt"/></div>
    <div style="margin:8pt 0;font-size:10.5pt;line-height:1.9">
      아래 사항은 직원으로서 시정할 사항이므로 각성을 촉구하며, 차후 이러한 일이 발생하지 않도록 귀하에게 엄중 경고합니다.
      이와 유사한 복무규율 위반 사례가 반복 적발될 시에는 회사 규정에 따라 징계 조치될 수 있음을 양지하시기 바랍니다.
    </div>
    <div class="sec-label">※ 경고 내용</div>
    <textarea class="di" style="border:1px solid var(--border-dk);border-radius:2px;width:100%;padding:5pt 7pt;min-height:200pt;font-size:9.5pt;line-height:1.75" placeholder="경고 사유를 구체적으로 기재합니다.&#10;예) 귀하는 2025. 01. 05.부터 2025. 01. 10.까지 총 6회에 걸쳐 지각하였으며..."></textarea>
    <div style="font-size:10.5pt;color:var(--muted);margin-top:5pt">□ 사실확인서 제출 포함</div>
    <div class="sign-bottom-wrap" style="margin-top:auto; break-inside:avoid; page-break-inside:avoid">
      <div class="sign-area" style="margin-top:0">
        <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
        <div class="sign-right">
          <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
          <div class="sign-row sr-ceo-row"><span class="s-lbl">대표자</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">서명/인</span></div>
        </div>
      </div>
      <div class="receipt"><div class="receipt-cut">— 수 령 확 인 서 (절취선) —</div>
      <div class="receipt-body">본인은 위 경고장을 <input class="ii" placeholder="2025. 01. 10." style="width:90pt"/> 수령하였음을 확인합니다.<br>수령인: <input class="ii" placeholder="홍길동" style="width:90pt"/> &nbsp;<span class="stamp">서명/인</span></div></div>
    </div>`
},


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
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">제출인</span><input class="s-in " placeholder="홍길동"/> <span class="stamp">서명/인</span></div>
        <div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
      </div>
      </div>
    </div>`
},

'cert-letter': {
  title: '내용증명',
  sub: '무단결근 원직복귀명령 등',
  hasApproval: false, 
  notice: '',
  html: () => `
    <div class="doc-title">내 용 증 명</div>
    <table class="ft" style="table-layout:fixed;width:100%;margin-bottom:10pt">
      <colgroup><col style="width:15%"/><col style="width:17%"/><col style="width:15%"/><col style="width:53%"/></colgroup>
      <tr><td class="lbl">일 시</td><td class="val" colspan="3"><input class="di" placeholder="2025. 01. 10."/></td></tr>
      <tr><td class="lbl">수신자</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">수신자 주소</td><td class="val"><textarea class="di" rows="2" style="resize:none" placeholder="서울특별시 강남구 테헤란로 000"></textarea></td></tr>
      <tr><td class="lbl">발신자</td><td class="val"><input class="di c-ceo" placeholder="대표 홍대표"/></td>
          <td class="lbl">발신자 주소</td><td class="val"><textarea class="di" rows="2" style="resize:none" placeholder="서울특별시 강남구 테헤란로 000"></textarea></td></tr>
      <tr><td class="lbl">제 목</td><td class="val" colspan="3"><input class="di" placeholder="무단결근에 따른 원직복귀명령 통보"/></td></tr>
    </table>
    <textarea class="di" style="border:1px solid var(--border-dk);border-radius:2px;width:100%;padding:5pt 7pt;min-height:250pt;font-size:9.5pt;line-height:1.9" placeholder="1. 귀하의 무궁한 발전을 기원합니다.&#10;2. 귀하는 2025. 01. 05.부터 무단결근을 함으로써 근로제공의 의무를 불이행하고 있습니다.&#10;3. 귀하는 즉시 원직에 복귀하여 성실하게 근로를 제공하시길 바랍니다.&#10;4. 만약 무단결근이 계속된다면 회사의 규정에 따라 당연퇴직, 징계 등의 조치 및 손해배상청구를 추진할 수 있음을 양지하시기 바랍니다."></textarea>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">발신인</span><input class="s-in c-company" placeholder="(주)회사명"/></div>
        <div class="sign-row sr-ceo-row"><span class="s-lbl">대표자</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">서명/인</span></div>
      </div>
    </div>`
},


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
      <div class="sign-right"><div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/></div><div class="sign-row sr-ceo-row"><span class="s-lbl">대표자</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">서명/인</span></div></div>
    </div>`
},


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
      <tr><td class="lbl">출석 사유</td><td class="val" colspan="3"><textarea class="di" placeholder="징계위원회 출석 (취업규칙 위반 관련 소명 기회 부여)"></textarea></td></tr>
      <tr><td class="lbl">출석 일시</td><td class="val"><input class="di" placeholder="2025. 01. 20.  오후 2시"/></td>
          <td class="lbl">출석 장소</td><td class="val"><input class="di" placeholder="본사 대회의실"/></td></tr>
    </table>
    <div class="block-box" style="font-size:10.5pt;line-height:1.85">
      <strong>유의사항</strong><br>
      1. 진술을 위한 출석을 원하지 않을 때에는 진술권 포기서를, 진술을 할 경우에는 진술서를 즉시 제출하십시오.<br>
      2. 서면진술을 하고자 할 때에는 인사위원회 개최 전일까지 서면진술서를 제출하십시오.<br>
      3. 정당한 사유 없이 지정된 일시에 출석하지 않을 경우 진술할 의사가 없는 것으로 간주하여 진술 없이 징계안을 심의할 것입니다.
    </div>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right"><div class="sign-row"><span class="s-lbl">회사명</span><input class="s-in c-company" placeholder="(주)회사명"/> 인사위원회</div><div class="sign-row sr-ceo-row"><span class="s-lbl">위원장</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">서명/인</span></div></div>
    </div>`
},


statement: {
  title: '진술권 포기서 / 진술서',
  sub: '인사위원회 출석 관련 — 징계절차 구비서류',
  hasApproval: false, 
  notice: '※ 본 서식은 진술권포기서와 출석 진술확인서를 한 장에 구성합니다. 해당 항목에만 서명하여 제출합니다.',
  html: () => `
    <div class="doc-title">진술권포기서 / 진술확인서</div>

    <div class="sec-label" style="font-size:10.5pt;margin-bottom:10pt">▣ 진술권 포기서</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><th colspan="4" style="background:#fdf0f0;color:#7a1a1a">진술권 포기 — 인적사항</th></tr>
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">직 급</td><td class="val"><input class="di" placeholder="대리"/></td></tr>
      <tr><td class="lbl">소 속</td><td class="val"><input class="di" placeholder="영업팀"/></td>
          <td class="lbl">주 소</td><td class="val"><input class="di" placeholder="서울시 강남구 테헤란로 000"/></td></tr>
    </table>
    <div class="block-box" style="font-size:10.5pt;text-align:center;padding:10pt">
      본인은 인사위원회에 출석하여 진술하는 것을 <strong>포기</strong>합니다.
    </div>
    <div style="text-align:right;margin:8pt 0 6pt;font-size:10.5pt">
      <input class="ii" placeholder="20" style="width:30pt"/>년
      <input class="ii" placeholder="01" style="width:22pt"/>월
      <input class="ii" placeholder="01" style="width:22pt"/>일 &nbsp;&nbsp;
      성 명: <input class="ii" placeholder="홍길동" style="width:90pt"/> &nbsp;<span class="stamp">서명/인</span>
    </div>
    <div style="text-align:right;font-size:10.5pt;color:var(--muted);margin-bottom:30pt">
      <input class="s-in c-company" placeholder="(주)회사명"/> 인사위원회 위원장 귀하
    </div>

    <div style="border-top:2px dashed var(--border);margin:14pt 0;"></div>

    <div class="sec-label" style="font-size:10.5pt;margin-bottom:10pt">▣ 출석 진술확인서</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><th colspan="4" style="background:#f0f5f0;color:#1a4a2a">진술 출석 — 인적사항</th></tr>
      <tr><td class="lbl">성 명</td><td class="val"><input class="di" placeholder="홍길동"/></td>
          <td class="lbl">직 급</td><td class="val"><input class="di" placeholder="대리"/></td></tr>
      <tr><td class="lbl">소 속</td><td class="val"><input class="di" placeholder="영업팀"/></td>
          <td class="lbl">주 소</td><td class="val"><input class="di" placeholder="서울시 강남구 테헤란로 000"/></td></tr>
    </table>
    <div class="block-box" style="font-size:10.5pt;text-align:center;padding:10pt">
      본인은 인사위원회에 <strong>출석하여 진술</strong>하겠습니다.
    </div>
    <div style="text-align:right;margin:8pt 0 6pt;font-size:10.5pt">
      <input class="ii" placeholder="20" style="width:30pt"/>년
      <input class="ii" placeholder="01" style="width:22pt"/>월
      <input class="ii" placeholder="01" style="width:22pt"/>일 &nbsp;&nbsp;
      성 명: <input class="ii" placeholder="홍길동" style="width:90pt"/> &nbsp;<span class="stamp">서명/인</span>
    </div>
    <div style="text-align:right;font-size:10.5pt;color:var(--muted)">
      <input class="s-in c-company" placeholder="(주)회사명"/> 인사위원회 위원장 귀하
    </div>`
},

'committee-minutes': {
  title: '인사위원회 회의록',
  sub: '징계위원회 심의 결과 공식 기록',
  hasApproval: false, 
  notice: '※ 회의록은 위원 전원이 서명 날인하여야 효력이 있으며, 징계 처분의 절차적 적법성 증거자료로 보관합니다.',
  html: () => `
    <div class="doc-title">인사위원회 회의록</div>
    <table class="ft" style="margin-bottom:10pt">
      <tr><td class="lbl">일 시</td><td class="val"><input class="di" placeholder="2025. 01. 20.  오후 2:00 ~ 3:30"/></td>
          <td class="lbl">장 소</td><td class="val"><input class="di" placeholder="본사 대회의실"/></td></tr>
      <tr><td class="lbl">안 건</td><td class="val" colspan="3"><input class="di" placeholder="홍길동 대리 징계의 건 (취업규칙 제__조 위반)"/></td></tr>
      <tr><td class="lbl">참석자</td><td class="val" colspan="3">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0;font-size:9.5">
          <div style="border-right:1px solid var(--border-dk);padding:3pt 5pt">
            위원장: <input class="ii" placeholder="홍대표" style="width:70pt"/>
          </div>
          <div style="border-right:1px solid var(--border-dk);padding:3pt 5pt">
            위 원: <input class="ii" placeholder="김이사" style="width:70pt"/>
          </div>
          <div style="padding:3pt 5pt">
            위 원: <input class="ii" placeholder="이팀장" style="width:70pt"/>
          </div>
        </div>
      </td></tr>
    </table>

    <div class="sec-label">■ 회의 내용</div>
    <textarea class="di" style="border:1px solid var(--border-dk);border-radius:2px;width:100%;padding:6pt 8pt;min-height:250pt;font-size:10.5pt;line-height:1.9"
      placeholder="1. 안건 상정 및 심의 대상자 인적사항 확인&#10;&#10;2. 징계 사유 검토&#10;   - 위반 행위 일시 및 내용:&#10;   - 관련 취업규칙 조항:&#10;&#10;3. 당사자 소명 내용 (또는 소명 포기 여부):&#10;&#10;4. 위원 의견 교환 및 심의&#10;&#10;5. 의결 결과:"></textarea>

    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">위 원</span><input class="s-in" placeholder="이팀장"/> <span class="stamp">서명/인</span></div>
      </div>
    </div>`
},

'committee-result': {
  title: '인사위원회 심의(의결) 결과서',
  sub: '인사위원회 의결 공식 결과 통보',
  hasApproval: false, 
  notice: '※ 이 결과서는 징계통지서 발부의 근거가 됩니다. 의결 후 즉시 당사자에게 서면 통보하십시오.',
  html: () => `
    <div class="doc-title">인사위원회 심의(의결) 결과서</div>

    <div class="sec-label" style="margin-bottom:5pt">○ 안건 및 요지</div>
    <table class="ft" style="table-layout:fixed;width:100%;margin-bottom:12pt">
      <colgroup><col style="width:8%"/><col style="width:24%"/><col style="width:14%"/><col style="width:36%"/><col style="width:18%"/></colgroup>
      <thead>
        <tr><th style="width:28pt">번호</th><th>제 목</th><th style="width:80pt">신청인</th><th>심의(의결) 요지</th><th style="width:80pt">심의(의결) 결과</th></tr>
      </thead>
      <tbody>
        <tr>
          <td class="val" style="text-align:center"><input class="di" placeholder="1"/></td>
          <td class="val"><input class="di" placeholder="홍길동 대리 징계의 건"/></td>
          <td class="val"><input class="di" placeholder="인사팀"/></td>
          <td class="val"><textarea class="di" style="min-height:50pt;font-size:8.5pt" placeholder="취업규칙 제__조 위반 — 무단결근 6일 및 복무기강 위반으로 해고 상당"></textarea></td>
          <td class="val">
            <select class="di" style="font-size:10.5pt">
              <option value="">— 선택 —</option>
              <option>해 고</option>
              <option>정 직</option>
              <option>감 봉</option>
              <option>견 책</option>
              <option>경 고</option>
              <option>무혐의</option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="val" style="text-align:center"><input class="di"/></td>
          <td class="val"><input class="di"/></td>
          <td class="val"><input class="di"/></td>
          <td class="val"><textarea class="di" style="min-height:40pt;font-size:8.5pt"></textarea></td>
          <td class="val"><input class="di"/></td>
        </tr>
      </tbody>
    </table>

    <div class="block-box" style="font-size:11.5pt;text-align:center">
      위의 사항에 대하여 심의(의결)함.
    </div>

    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div class="sign-right">
        <div class="sign-row"><span class="s-lbl">위 원</span><input class="s-in" placeholder="이팀장"/> <span class="stamp">서명/인</span></div>
      </div>
    </div>`
},


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
    <textarea class="di" style="border:1px solid var(--border-dk);border-radius:2px;width:100%;padding:5pt 7pt;min-height:250pt;font-size:9.5pt;line-height:1.75" placeholder="징계사유를 구체적으로 기재합니다."></textarea>
    <div class="sign-area">
      <div class="sign-date"><input class="ii" placeholder="20" style="width:30pt"/>년 <input class="ii" placeholder="01" style="width:22pt"/>월 <input class="ii" placeholder="01" style="width:22pt"/>일</div>
      <div>
        <div style="font-size:9pt;color:var(--muted);text-align:right;margin-bottom:5pt"><input class="s-in c-company" placeholder="(주)회사명"/> 인사위원회</div>
        <div class="sign-row sr-ceo-row"><span class="s-lbl">위원장</span><input class="s-in c-ceo" placeholder="홍대표"/> <span class="stamp">서명/인</span></div>
        <div class="sign-row"><span class="s-lbl">위 원</span><input class="s-in" placeholder="김위원"/> <span class="stamp">서명/인</span></div>
        <div class="sign-row"><span class="s-lbl">위 원</span><input class="s-in" placeholder="이위원"/> <span class="stamp">서명/인</span></div>
      </div>
    </div>`
},

}); /* end forms-징계.js */

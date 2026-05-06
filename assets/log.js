/* ══════════════════════════════════════════════════════════════
   LOG — 접속·행동 로그를 Google Sheets로 전송
   
   설정:
   아래 LOG_ENDPOINT에 Apps Script 배포 URL을 붙여넣으세요.
   빈 문자열('')이면 로그 기능이 비활성화됩니다.
   ══════════════════════════════════════════════════════════════ */
var LOG = (function() {

  /* ★ 여기에 Apps Script 배포 URL 입력 ★
     예: 'https://script.google.com/macros/s/AKfy.../exec'
     빈 문자열('')로 두면 로그 전송 안 함                     */
  var LOG_ENDPOINT = '';

  /* IP 주소 캐시 (페이지 로드 시 1회만 조회) */
  var _ipCache = { ip: '', country: '', city: '' };
  var _ipLoaded = false;

  /* ── IP 조회 (ipapi.co 무료 서비스 사용) ── */
  function loadIP() {
    if (_ipLoaded || !LOG_ENDPOINT) return;
    _ipLoaded = true;

    fetch('https://ipapi.co/json/')
      .then(function(r) { return r.json(); })
      .then(function(d) {
        _ipCache.ip      = d.ip      || '';
        _ipCache.country = d.country_name || '';
        _ipCache.city    = d.city    || '';
      })
      .catch(function() {
        /* IP 조회 실패 시 '알 수 없음' */
        _ipCache.ip      = '알 수 없음';
        _ipCache.country = '';
        _ipCache.city    = '';
      });
  }

  /* ── 브라우저·OS 파싱 ── */
  function parseUA() {
    var ua = navigator.userAgent;
    var browser = '알 수 없음';
    var os      = '알 수 없음';

    /* 브라우저 */
    if      (/Edg\//.test(ua))     browser = 'Edge';
    else if (/Chrome\//.test(ua))  browser = 'Chrome';
    else if (/Firefox\//.test(ua)) browser = 'Firefox';
    else if (/Safari\//.test(ua))  browser = 'Safari';
    else if (/Trident\//.test(ua)) browser = 'IE';

    /* OS */
    if      (/Windows NT 10/.test(ua)) os = 'Windows 10/11';
    else if (/Windows NT/.test(ua))    os = 'Windows';
    else if (/Mac OS X/.test(ua))      os = 'macOS';
    else if (/Android/.test(ua))       os = 'Android';
    else if (/iPhone|iPad/.test(ua))   os = 'iOS';
    else if (/Linux/.test(ua))         os = 'Linux';

    return { browser: browser, os: os };
  }

  /* ── 타임스탬프 포맷 ── */
  function getTimestamp() {
    var d = new Date();
    return d.getFullYear() + '. '
      + String(d.getMonth()+1).padStart(2,'0') + '. '
      + String(d.getDate()).padStart(2,'0') + '.  '
      + String(d.getHours()).padStart(2,'0') + ':'
      + String(d.getMinutes()).padStart(2,'0') + ':'
      + String(d.getSeconds()).padStart(2,'0');
  }

  /* ── 행동 한국어 라벨 ── */
  var ACTION_LABEL = {
    'view':       '서식 조회',
    'edit_save':  '서식 편집·저장',
    'print':      'PDF 출력',
    'print_all':  '전체 출력',
    'restore':    '버전 복원',
  };

  /* ── 로그 전송 ──
     formId   : 서식 ID (예: 'employed')
     formName : 서식 한글명 (예: '재직증명서')  — 빈 문자열이면 FORMS에서 자동 조회
     action   : 행동 키 (view / edit_save / print / print_all / restore)  */
  function send(formId, formName, action) {
    if (!LOG_ENDPOINT) return; /* URL 미설정 시 무시 */

    /* 서식명 자동 조회 */
    if (!formName && typeof FORMS !== 'undefined' && FORMS[formId]) {
      formName = FORMS[formId].title || formId;
    }

    var ua   = parseUA();
    var data = {
      timestamp  : getTimestamp(),
      ip         : _ipCache.ip,
      country    : _ipCache.country,
      city       : _ipCache.city,
      formId     : formId,
      formName   : formName,
      action     : ACTION_LABEL[action] || action,
      browser    : ua.browser,
      os         : ua.os,
      screen     : window.screen.width + 'x' + window.screen.height,
      language   : navigator.language || '',
      referrer   : document.referrer || '직접 접속',
    };

    /* URL 파라미터 GET 방식 전송 */
    var params = Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(String(data[k] || '').substring(0, 300));
    }).join('&');

    var url = LOG_ENDPOINT + '?' + params + '&_t=' + Date.now();

    /* XMLHttpRequest — no-cors 우회를 위해 sync 없이 비동기 */
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
      console.log('[LOG] 전송 완료:', data.action, data.formName, xhr.status);
    };
    xhr.onerror = function() {
      /* CORS 오류여도 Apps Script는 요청을 받음 */
      console.log('[LOG] 전송(CORS차단이나 Apps Script는 수신):', data.action);
    };
    xhr.send();
  }

  /* ── 즉시 IP 조회 시작 (스크립트 로드 즉시 실행) ── */
  loadIP();

  /* ── 페이지 로드 완료 후 첫 접속 로그 전송 ── */
  window.addEventListener('load', function() {
    /* IP 조회 완료 대기 후 전송 (최대 3초) */
    setTimeout(function() {
      send('PAGE', '포털 접속', 'view');
    }, 2000);
  });

  /* ── 이미 로드된 경우 즉시 실행 ── */
  if (document.readyState === 'complete') {
    setTimeout(function() {
      send('PAGE', '포털 접속', 'view');
    }, 2000);
  }

  /* ── 인쇄(PDF 출력) 감지 ── */
  window.addEventListener('beforeprint', function() {
    var formId   = (typeof S !== 'undefined') ? S.currentForm : '';
    var formName = (formId && typeof FORMS !== 'undefined' && FORMS[formId])
      ? FORMS[formId].title : '';
    send(formId || 'unknown', formName, 'print');
  });

  return { send: send };

})();
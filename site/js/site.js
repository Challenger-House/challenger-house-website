// Coordinate readout — drafting-table flourish, bottom right.
(function () {
  var el = document.querySelector('.coords');
  if (!el) return;
  document.addEventListener('mousemove', function (e) {
    el.textContent = 'X:' + e.pageX + ' Y:' + e.pageY;
  }, { passive: true });
})();

// Talking Tax widget. Two independent dial sets: "tt-a" (your team) runs
// on the landing page and the 1-Day page; "tt-b" (the shadow) runs on the
// landing page only. In-memory state only, no storage.
(function () {
  function fmtEuro(n) {
    return '€' + (Math.round(n / 1000) * 1000).toLocaleString('en-GB');
  }
  function fmtPct(n) {
    return (Math.round(n * 10) / 10) + '%';
  }
  // dial set two's headcount slider runs on a logarithmic feel; round the
  // displayed figure to something readable at its own scale.
  function roundHeadcount(n) {
    if (n < 1000) return Math.round(n / 50) * 50;
    if (n < 10000) return Math.round(n / 100) * 100;
    return Math.round(n / 500) * 500;
  }

  function wireSetOne(prefix) {
    var people = document.getElementById(prefix + '-people');
    if (!people) return;
    var share = document.getElementById(prefix + '-share');
    var cost = document.getElementById(prefix + '-cost');
    var vPeople = document.getElementById(prefix + '-people-v');
    var vShare = document.getElementById(prefix + '-share-v');
    var vCost = document.getElementById(prefix + '-cost-v');
    var result = document.getElementById(prefix + '-result');

    function calc() {
      var p = +people.value, s = +share.value, c = +cost.value;
      var total = p * c * (s / 100);
      vPeople.textContent = p;
      vShare.textContent = s + '%';
      vCost.textContent = fmtEuro(c);
      result.textContent = fmtEuro(total);
      people.setAttribute('aria-valuetext', p + ' people');
      share.setAttribute('aria-valuetext', s + ' percent');
      cost.setAttribute('aria-valuetext', fmtEuro(c) + ' per person per year');
    }
    [people, share, cost].forEach(function (el) { el.addEventListener('input', calc); });
    calc();
  }

  function wireSetTwo(prefix) {
    var pos = document.getElementById(prefix + '-people');
    if (!pos) return;
    var drag = document.getElementById(prefix + '-drag');
    var cost = document.getElementById(prefix + '-cost');
    var vPeople = document.getElementById(prefix + '-people-v');
    var vDrag = document.getElementById(prefix + '-drag-v');
    var vCost = document.getElementById(prefix + '-cost-v');
    var result = document.getElementById(prefix + '-result');

    function headcount() {
      var raw = 100 * Math.pow(500, (+pos.value) / 1000); // 100 .. 50,000
      return roundHeadcount(raw);
    }
    function calc() {
      var p = headcount(), d = +drag.value, c = +cost.value;
      var total = p * c * (d / 100);
      vPeople.textContent = p.toLocaleString('en-GB');
      vDrag.textContent = fmtPct(d);
      vCost.textContent = fmtEuro(c);
      result.textContent = fmtEuro(total);
      pos.setAttribute('aria-valuetext', p.toLocaleString('en-GB') + ' people');
      drag.setAttribute('aria-valuetext', fmtPct(d));
      cost.setAttribute('aria-valuetext', fmtEuro(c) + ' per person per year');
    }
    [pos, drag, cost].forEach(function (el) { el.addEventListener('input', calc); });
    calc();
  }

  wireSetOne('tt-a');
  wireSetTwo('tt-b');
})();

// Cookie / consent banner (GDPR + UK GDPR). The site sets no non-essential
// cookies today; this records the visitor's choice and is the gate for any
// future analytics: only load them when getConsent() === 'accepted'.
(function () {
  var KEY = 'ch-consent';
  function getConsent() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setConsent(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  // if analytics are added later, call them here when getConsent() === 'accepted'
  if (getConsent()) return; // choice already made

  function build() {
    if (document.querySelector('.cookie-banner')) return;
    var b = document.createElement('div');
    b.className = 'cookie-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Cookie consent');
    b.innerHTML =
      '<p class="cb-text">We set no marketing or analytics cookies. We do load our fonts from Google, which shares your IP with Google. Accept, or decline non-essential processing. See our <a href="privacy.html">Privacy &amp; Cookies</a> notice.</p>' +
      '<div class="cb-actions">' +
      '<button type="button" class="cb-btn cb-decline">Decline non-essential</button>' +
      '<button type="button" class="cb-btn cb-accept">Accept</button>' +
      '</div>';
    document.body.appendChild(b);
    function close(choice) { setConsent(choice); b.parentNode && b.parentNode.removeChild(b); }
    b.querySelector('.cb-accept').addEventListener('click', function () { close('accepted'); });
    b.querySelector('.cb-decline').addEventListener('click', function () { close('declined'); });
  }
  if (document.body) build(); else document.addEventListener('DOMContentLoaded', build);
})();

// Click-to-reveal phone. The number is assembled in JS at click time, so it is
// not sitting in the static HTML as a plain tel: link for scrapers to harvest.
(function () {
  var btns = document.querySelectorAll('.tel-reveal');
  if (!btns.length) return;
  var display = '+44 7947 484882';
  var dial = '+447947484882';
  Array.prototype.forEach.call(btns, function (btn) {
    btn.addEventListener('click', function () {
      var a = document.createElement('a');
      a.href = 'tel:' + dial;
      a.textContent = display;
      a.className = btn.className + ' tel-live';
      btn.parentNode.replaceChild(a, btn);
    }, { once: true });
  });
})();

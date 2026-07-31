// Coordinate readout — drafting-table flourish, bottom right.
(function () {
  var el = document.querySelector('.coords');
  if (!el) return;
  document.addEventListener('mousemove', function (e) {
    el.textContent = 'X:' + e.pageX + ' Y:' + e.pageY;
  }, { passive: true });
})();

// Talking Tax calculator. The maths must survive unchanged — see
// components/talking-tax-calculator.md. Regression: defaults give
// €480,000 / 4.8; people 50, share 60, cost 120 give €3,600,000 / 30.0.
(function () {
  var people = document.getElementById('s-people');
  if (!people) return;
  var share = document.getElementById('s-share');
  var cost = document.getElementById('s-cost');
  var vPeople = document.getElementById('v-people');
  var vShare = document.getElementById('v-share');
  var vCost = document.getElementById('v-cost');
  var rTotal = document.getElementById('r-total');
  var rFte = document.getElementById('r-fte');

  function fmt(n) { return '€' + Math.round(n).toLocaleString('en-GB'); }

  function calc() {
    var p = +people.value;
    var s = +share.value;
    var costPerPerson = +cost.value * 1000;
    var total = p * costPerPerson * (s / 100);
    var fte = (total / costPerPerson).toFixed(1);

    vPeople.textContent = p;
    vShare.textContent = s + '%';
    vCost.textContent = fmt(costPerPerson);
    rTotal.textContent = fmt(total);
    rFte.textContent = fte + ' full-time salaries';

    people.setAttribute('aria-valuetext', p + ' people');
    share.setAttribute('aria-valuetext', s + ' percent');
    cost.setAttribute('aria-valuetext', fmt(costPerPerson) + ' per person per year');
  }

  [people, share, cost].forEach(function (el) {
    el.addEventListener('input', calc);
  });
  calc();
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

// Imagination-gap carousel. On mobile the three cards become a swipeable strip;
// these dots track the swipe position and jump to a card when tapped. Desktop
// keeps the 3-up grid, where the dots are hidden and this is a no-op.
(function () {
  var car = document.querySelector('.insight-carousel');
  if (!car) return;
  var track = car.querySelector('.insight-cards');
  var cards = track ? track.querySelectorAll('.sheet') : [];
  var dots = car.querySelectorAll('.ic-dot');
  if (!track || !cards.length || !dots.length) return;
  function activeIndex() {
    var tr = track.getBoundingClientRect();
    var mid = tr.left + tr.width / 2;
    var best = 0, bestD = Infinity;
    Array.prototype.forEach.call(cards, function (c, i) {
      var r = c.getBoundingClientRect();
      var d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestD) { bestD = d; best = i; }
    });
    return best;
  }
  function sync() {
    var idx = activeIndex();
    Array.prototype.forEach.call(dots, function (d, i) {
      d.classList.toggle('active', i === idx);
    });
  }
  var raf;
  track.addEventListener('scroll', function () {
    if (raf) return;
    raf = window.requestAnimationFrame(function () { raf = 0; sync(); });
  }, { passive: true });
  Array.prototype.forEach.call(dots, function (d, i) {
    d.addEventListener('click', function () {
      cards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });
  sync();
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

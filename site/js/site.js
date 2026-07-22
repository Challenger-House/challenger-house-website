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

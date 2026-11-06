/* Hero printer tilt: the printer leans towards the mouse, as in the GCS layout. Skipped on touch screens and when "reduce motion" is on. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touchOnly = window.matchMedia && window.matchMedia('(hover: none)').matches;
  if (reduce || touchOnly) return;
  function transform(x, y) {
    return 'perspective(1400px) translate3d(' + (x * 28).toFixed(1) + 'px,' + (y * 18).toFixed(1) + 'px,0) rotateY(' + (x * 10).toFixed(2) + 'deg) rotateX(' + (-y * 7).toFixed(2) + 'deg)';
  }
  Array.prototype.forEach.call(document.querySelectorAll('.gcs-tilt'), function (el) {
    var hero = el.closest('section') || document.body;
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.62) * 2.4));
      var y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
      el.style.transform = transform(x, y);
    });
    hero.addEventListener('mouseleave', function () { el.style.transform = transform(0, 0); });
  });
})();

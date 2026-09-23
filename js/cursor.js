/**
 * Dünya Baradari — Ambient Cursor Dot Trail
 * Reference: https://www.dunya-baradari.com/
 * Drops gentle trailing '·' dots on mouse movement that drift slightly upward and fade out
 */

(function () {
  'use strict';

  let trail = document.querySelector('.et-trail');
  if (!trail) {
    trail = document.createElement('div');
    trail.className = 'et-trail';
    trail.setAttribute('aria-hidden', 'true');
    document.body.appendChild(trail);
  }

  let lastTime = 0;
  const throttleMs = 24; // Fluid spacing between dots

  function handlePointerMove(e) {
    const now = performance.now();
    if (now - lastTime < throttleMs) return;
    lastTime = now;

    const dot = document.createElement('span');
    dot.className = 'et-trail__dot';
    dot.textContent = '·';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';

    trail.appendChild(dot);

    window.setTimeout(() => {
      dot.remove();
    }, 1100);
  }

  window.addEventListener('pointermove', handlePointerMove, { passive: true });
})();



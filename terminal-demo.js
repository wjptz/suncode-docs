/**
 * Terminal Demo — event-driven auto-scroll + clickable progress dots.
 */
/* global requestAnimationFrame, clearTimeout, setTimeout, MutationObserver, document */
function initTerminalDemo(wrap) {
  var dots = wrap.querySelectorAll('.td-step-dot');
  var descs = wrap.querySelectorAll('.td-desc');
  var fill = wrap.querySelector('.td-timeline-fill');
  var body = wrap.querySelector('.td-body');
  var lines = body ? body.querySelectorAll('.td-line') : [];

  // Delays for ALL .td-line elements in DOM order (including loading/status lines)
  // DOM order: d0,d1,d2, d3,d4, d5,load,d6,d7,d8,d9, d10,load,d11,d12, d13,load,d14,fix, d15,d16,d17, d18,d19,d20,d21, d22
  var delays = [
    0.5, 1.1, 1.8, 2.8, 3.4, 4.6, 5.4, 6.6, 8.0, 9.2, 10.4, 12.0, 12.8, 14.0, 15.3, 16.8, 17.6,
    18.8, 19.8, 21.5, 22.1, 23.3, 24.3, 24.9, 26.1, 27.1, 28.3,
  ];
  var phaseEnd = [2, 4, 10, 14, 18, 21, 26];
  var descDelays = [0.5, 2.8, 4.6, 12.0, 16.8, 21.5, 24.3];

  // ── Auto-scroll: use animationstart event (reliable, event-driven) ──
  if (body) {
    body.addEventListener(
      'animationstart',
      function (e) {
        var line = e.target;
        if (!line.classList.contains('td-line')) return;
        requestAnimationFrame(function () {
          // Place new line at ~70% down from top of terminal viewport
          var target = line.offsetTop - body.clientHeight * 0.75;
          if (target > 0) body.scrollTo({ top: target, behavior: 'smooth' });
        });
      },
      true
    ); // capture phase
  }

  // ── Click dot: jump to phase, continue playing ──
  dots.forEach(function (dot, dotIdx) {
    dot.addEventListener('click', function () {
      var lastVisible = phaseEnd[dotIdx];
      var nextLine = lastVisible + 1;
      var baseDelay = nextLine < delays.length ? delays[nextLine] : 999;
      var remainTime = delays[delays.length - 1] - baseDelay + 1;

      // 1) Lines up to this phase: show immediately
      for (var j = 0; j <= lastVisible && j < lines.length; j++) {
        lines[j].style.animation = 'none';
        lines[j].offsetHeight;
        lines[j].style.animation = 'none';
        lines[j].style.opacity = '1';
        lines[j].style.transform = 'none';
        lines[j].style.display = '';
      }

      // 2) Lines after: restart with adjusted delays
      for (var k = nextLine; k < lines.length; k++) {
        lines[k].style.display = '';
        lines[k].style.opacity = '';
        lines[k].style.transform = '';
        lines[k].style.animation = 'none';
        lines[k].offsetHeight;
        var nd = delays[k] - baseDelay + 0.5;
        lines[k].style.animation = '';
        lines[k].style.animationDelay = Math.max(0, nd) + 's';
      }

      // 3) Progress fill (scaleX)
      if (fill) {
        var startScale = dotIdx / (dots.length - 1);
        fill.style.animation = 'none';
        fill.offsetHeight;
        fill.style.transition = 'none';
        fill.style.transform = 'translateY(-50%) scaleX(' + startScale + ')';
        requestAnimationFrame(function () {
          fill.style.transition = 'transform ' + Math.max(1, remainTime) + 's ease-out';
          fill.style.transform = 'translateY(-50%) scaleX(1)';
        });
      }

      // 4) Descriptions — class-based control
      var descsContainer = wrap.querySelector('.td-descs');
      if (descsContainer) descsContainer.classList.add('td-descs-ctrl');
      descs.forEach(function (d, di) {
        d.classList.toggle('td-desc-active', di === dotIdx);
      });
      // Schedule future descriptions
      if (wrap._descTimers) wrap._descTimers.forEach(clearTimeout);
      wrap._descTimers = [];
      for (var di = dotIdx + 1; di < descs.length; di++) {
        (function (idx) {
          var delay = (descDelays[idx] - baseDelay + 0.5) * 1000;
          wrap._descTimers.push(
            setTimeout(
              function () {
                descs.forEach(function (d, i) {
                  d.classList.toggle('td-desc-active', i === idx);
                });
              },
              Math.max(0, delay)
            )
          );
        })(di);
      }

      // 5) Dots
      dots.forEach(function (d, di) {
        d.style.animation = 'none';
        d.offsetHeight;
        if (di <= dotIdx) {
          d.style.opacity = '1';
          d.style.animation = 'none';
          d.style.transform = di === dotIdx ? 'scale(1.3)' : '';
          d.style.background = di === dotIdx ? '#a78bfa' : '';
        } else {
          d.style.opacity = '';
          d.style.transform = '';
          d.style.background = '';
          d.style.animation = '';
          d.style.animationDelay = '0.3s';
        }
      });

      // 6) Scroll terminal to this phase
      if (body && lines[lastVisible]) {
        lines[lastVisible].scrollIntoView({ block: 'end', behavior: 'smooth' });
      }
    });
  });
}

new MutationObserver(function () {
  var wrap = document.querySelector('.td-wrap');
  if (wrap && !wrap.dataset.init) {
    wrap.dataset.init = '1';
    initTerminalDemo(wrap);
  }
}).observe(document.body, { childList: true, subtree: true });

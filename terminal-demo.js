/**
 * Terminal Demo — event-driven auto-scroll + clickable progress dots.
 */
function initTerminalDemo(wrap) {
  var dots = wrap.querySelectorAll('.td-step-dot');
  var descs = wrap.querySelectorAll('.td-desc');
  var fill = wrap.querySelector('.td-timeline-fill');
  var body = wrap.querySelector('.td-body');
  var lines = body ? body.querySelectorAll('.td-line') : [];

  var delays = [0.3,1.0,1.8,3.0,4.2,5.0,6.0,7.0,8.0,9.0,9.8,10.6,11.6,12.8,13.6,14.8,15.6,16.6,17.6,18.6];
  var phaseEnd = [2, 3, 9, 12, 14, 16, 19];
  var descDelays = [0.3, 3.0, 4.2, 9.8, 12.8, 14.8, 16.6];

  // ── Auto-scroll: use animationstart event (reliable, event-driven) ──
  if (body) {
    body.addEventListener('animationstart', function (e) {
      var line = e.target;
      if (!line.classList.contains('td-line')) return;
      requestAnimationFrame(function () {
        // Place new line at ~70% down from top of terminal viewport
        var target = line.offsetTop - body.clientHeight * 0.75;
        if (target > 0) body.scrollTo({ top: target, behavior: 'smooth' });
      });
    }, true); // capture phase
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
      for (var j = nextLine; j < lines.length; j++) {
        lines[j].style.display = '';
        lines[j].style.opacity = '';
        lines[j].style.transform = '';
        lines[j].style.animation = 'none';
        lines[j].offsetHeight;
        var nd = (delays[j] - baseDelay) + 0.5;
        lines[j].style.animation = '';
        lines[j].style.animationDelay = Math.max(0, nd) + 's';
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
          wrap._descTimers.push(setTimeout(function () {
            descs.forEach(function (d, i) {
              d.classList.toggle('td-desc-active', i === idx);
            });
          }, Math.max(0, delay)));
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

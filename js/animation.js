(function (app) {
  const SHADOW = 'drop-shadow(0 12px 16px rgba(0, 0, 0, .5))';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function createAnimator(stage, bellEl, swingEl) {
    const sw = { a: 0, v: 0, ca: 0, cv: 0, raf: null, last: 0 };
    let swingDir = 1;
    let clapperEl = null;

    function step(t) {
      const dt = Math.min(0.032, (t - sw.last) / 1000 || 0.016);
      sw.last = t;
      const acc = -22 * sw.a - 1.2 * sw.v;
      sw.v += acc * dt;
      sw.a += sw.v * dt;
      sw.cv += (-110 * sw.ca - 5 * sw.cv - acc * 2.2) * dt;
      sw.ca = Math.max(-28, Math.min(28, sw.ca + sw.cv * dt));
      swingEl.style.transform = `rotate(${sw.a}deg)`;
      if (clapperEl) clapperEl.style.transform = `rotate(${sw.ca}deg)`;
      if (Math.abs(sw.a) + Math.abs(sw.v) + Math.abs(sw.ca) + Math.abs(sw.cv) < 0.05) {
        sw.a = sw.v = sw.ca = sw.cv = 0;
        swingEl.style.transform = '';
        if (clapperEl) clapperEl.style.transform = '';
        sw.raf = null;
        return;
      }
      sw.raf = requestAnimationFrame(step);
    }

    function swing(vel, dir) {
      const d = Math.abs(sw.v) > 20 ? Math.sign(sw.v) : (dir || (swingDir = -swingDir));
      const kick = (25 + vel * 50) * (reduceMotion ? 0.35 : 1);
      sw.v = Math.max(-95, Math.min(95, sw.v + d * kick));
      if (!sw.raf) { sw.last = performance.now(); sw.raf = requestAnimationFrame(step); }
    }

    function flash(vel) {
      bellEl.animate([
        { filter: `${SHADOW} brightness(${1.15 + vel * .25})` },
        { filter: `${SHADOW} brightness(1)` }
      ], { duration: 600, easing: 'ease-out' });
    }

    function soundWaves(vel) {
      const count = vel > 0.6 ? 3 : 2;
      ['l', 'r'].forEach(side => {
        for (let i = 0; i < count; i++) {
          const w = document.createElement('div');
          w.className = 'wave ' + side;
          stage.appendChild(w);
          const dx = (side === 'r' ? 1 : -1) * (40 + vel * 40);
          w.animate([
            { transform: 'translateX(0) scale(.5)', opacity: 0 },
            { opacity: .9 * vel + .1, offset: .2 },
            { transform: `translateX(${dx}px) scale(1.35)`, opacity: 0 }
          ], { duration: 1200, delay: i * 160, easing: 'ease-out' }).onfinish = () => w.remove();
        }
      });
    }

    return {
      setClapper(el) { clapperEl = el; },
      strike(vel, dir) {
        swing(vel, dir);
        flash(vel);
        soundWaves(vel);
      }
    };
  }

  Object.assign(app, { createAnimator });
})(window.BellApp = window.BellApp || {});

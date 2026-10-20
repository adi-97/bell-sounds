(function (app) {
  const { ART, BELLS, CHOICES, settings, saveSettings, loadBellId, saveBellId, initAudio, playBell, setVolume, setReverb, createAnimator, enableShake, disableShake } = app;

  const $ = id => document.getElementById(id);
  const stage = $('stage');
  const bellEl = $('bell');
  const chain = $('chain');
  const ringBtn = $('ringBtn');
  const dialog = $('settings');
  const aartiSeg = $('aartiSeg');
  const shakeSeg = $('shakeSeg');
  const status = $('status');

  const animator = createAnimator(stage, bellEl, $('pendulum'));
  let current = BELLS.find(b => b.id === loadBellId()) || BELLS[0];

  function ring(vel = 0.85, dir) {
    vel = Math.max(0.15, Math.min(1, vel));
    playBell(current, vel);
    animator.strike(vel, dir);
    if (navigator.vibrate) try { navigator.vibrate(15); } catch {}
  }

  function setPressed(seg, isOn) {
    seg.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', isOn(b)));
  }

  function select(bell) {
    current = bell;
    BELLS.forEach(b => b.el.setAttribute('aria-pressed', b === bell));
    bellEl.innerHTML = ART[bell.id];
    animator.setClapper(bellEl.querySelector('.clapper'));
    chain.hidden = !bell.hung;
    saveBellId(bell.id);
  }

  BELLS.forEach(bell => {
    const btn = document.createElement('button');
    btn.className = 'bell-opt';
    btn.innerHTML = `<svg viewBox="0 0 120 150" aria-hidden="true">${ART[bell.id]}</svg><b>${bell.name}</b>`;
    btn.addEventListener('click', () => { select(bell); ring(0.8); });
    bell.el = btn;
    $('bells').appendChild(btn);
  });
  select(current);

  let drag = null;
  function swipeRing() {
    const dt = Math.max(30, performance.now() - drag.t);
    ring(0.35 + (drag.travel / dt) * 0.5, Math.sign(drag.dx) || 1);
    drag.rang = true;
    drag.t = performance.now();
  }
  stage.addEventListener('pointerdown', e => {
    initAudio();
    stage.setPointerCapture(e.pointerId);
    drag = { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, dx: 0, dy: 0, travel: 0, t: performance.now(), rang: false };
  });
  stage.addEventListener('pointermove', e => {
    if (!drag) return;
    const mx = e.clientX - drag.x, my = e.clientY - drag.y;
    if (Math.hypot(mx, my) < 3) return;
    drag.x = e.clientX; drag.y = e.clientY;
    if (mx * drag.dx + my * drag.dy < 0 && drag.travel > 40) {
      swipeRing();
      drag.travel = 0;
    }
    drag.dx = mx; drag.dy = my;
    drag.travel += Math.hypot(mx, my);
  });
  stage.addEventListener('pointerup', () => {
    if (!drag) return;
    if (drag.travel > 40) swipeRing();
    else if (!drag.rang && Math.hypot(drag.x - drag.sx, drag.y - drag.sy) < 12) ring(0.85);
    drag = null;
  });
  stage.addEventListener('pointercancel', () => { drag = null; });

  let aartiTimer = null;
  function aartiTick() {
    ring(0.6 + Math.random() * 0.3);
    const base = 900 - settings.speed * 650;
    aartiTimer = setTimeout(aartiTick, base * (0.85 + Math.random() * 0.3));
  }
  function toggleAarti() {
    if (aartiTimer) { clearTimeout(aartiTimer); aartiTimer = null; }
    else aartiTick();
    const on = !!aartiTimer;
    setPressed(aartiSeg, b => (b.dataset.on === 'on') === on);
    ringBtn.textContent = on ? 'Stop ringing' : 'Ring once';
    stage.classList.toggle('continuous', on);
  }
  aartiSeg.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (btn && (btn.dataset.on === 'on') !== !!aartiTimer) toggleAarti();
  });
  ringBtn.addEventListener('click', () => aartiTimer ? toggleAarti() : ring(0.9));

  let shakeOn = false;
  shakeSeg.addEventListener('click', async e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const want = btn.dataset.shake === 'on';
    if (want === shakeOn) return;
    initAudio();
    if (want) {
      const error = await enableShake(ring);
      shakeOn = !error;
      status.textContent = error || 'Shake your phone to ring the bell.';
    } else {
      disableShake();
      shakeOn = false;
      status.textContent = '';
    }
    setPressed(shakeSeg, b => (b.dataset.shake === 'on') === shakeOn);
  });

  document.querySelectorAll('.seg[data-key]').forEach(seg => {
    const key = seg.dataset.key;
    const buttons = CHOICES[key].map(([label, value]) => {
      const b = document.createElement('button');
      b.textContent = label;
      b.setAttribute('aria-pressed', value === settings[key]);
      b.addEventListener('click', () => {
        settings[key] = value;
        buttons.forEach(x => x.setAttribute('aria-pressed', x === b));
        if (key === 'vol') setVolume();
        if (key === 'rev') setReverb();
        saveSettings();
      });
      seg.appendChild(b);
      return b;
    });
  });

  $('gearBtn').addEventListener('click', () => dialog.showModal());
  $('closeBtn').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });

  document.addEventListener('keydown', e => {
    if (dialog.open || e.repeat) return;
    if (e.target.tagName === 'BUTTON' && (e.code === 'Space' || e.key === 'Enter')) return;
    if (e.code === 'Space' || (e.key === 'Enter' && e.target === stage)) { e.preventDefault(); ring(0.9); }
    else if (/^[1-9]$/.test(e.key) && BELLS[e.key - 1]) select(BELLS[e.key - 1]);
    else if (e.key.toLowerCase() === 'c') toggleAarti();
  });
})(window.BellApp = window.BellApp || {});

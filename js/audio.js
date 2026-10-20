(function (app) {
  const { settings } = app;

  let ctx, master, dry, wet, noiseBuf;
  const voices = [];
  const MAX_VOICES = 10;

  function makeImpulse(seconds = 3.5) {
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    return buf;
  }

  function initAudio() {
    if (ctx) { if (ctx.state !== 'running') ctx.resume(); return; }
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch {}
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -10; comp.ratio.value = 6;
    master = ctx.createGain();
    master.gain.value = settings.vol;
    dry = ctx.createGain();
    wet = ctx.createGain();
    const verb = ctx.createConvolver();
    verb.buffer = makeImpulse();
    setReverb();
    dry.connect(master);
    wet.connect(verb).connect(master);
    master.connect(comp).connect(ctx.destination);
  }

  function setVolume() {
    if (master) master.gain.value = settings.vol;
  }

  function setReverb() {
    if (!ctx) return;
    const r = settings.rev;
    wet.gain.value = r * 0.9;
    dry.gain.value = 1 - r * 0.35;
  }

  function strikeNoise(p, vel, t, out) {
    if (!p.noise) return;
    if (!noiseBuf) {
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = Math.min(p.f0 * 3, 9000);
    bp.Q.value = 1.2;
    const g = ctx.createGain();
    g.gain.setValueAtTime(p.noise * vel, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
    src.connect(bp).connect(g).connect(out);
    src.start(t); src.stop(t + 0.08);
  }

  function strike(p, vel, t) {
    while (voices.length >= MAX_VOICES) {
      const v = voices.shift();
      v.out.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
      v.oscs.forEach(o => { try { o.stop(ctx.currentTime + 0.3); } catch {} });
    }
    const out = ctx.createGain();
    out.gain.value = p.gain * vel;
    out.connect(dry); out.connect(wet);
    const voice = { out, oscs: [] };
    const jitter = 1 + (Math.random() - 0.5) * 0.008;
    const bright = Math.pow(vel, 0.6);
    let longest = 0;

    p.partials.forEach(([ratio, amp, dmul], i) => {
      const f = p.f0 * ratio * jitter;
      if (f > 15000) return;
      const a = amp * (i === 0 ? 1 : bright);
      const decay = p.decay * dmul;
      longest = Math.max(longest, decay);
      const pair = p.beat ? [[f, a * 0.62], [f + p.beat * Math.sqrt(ratio), a * 0.38]] : [[f, a]];
      pair.forEach(([freq, amp2]) => {
        const o = ctx.createOscillator();
        o.frequency.value = freq;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(amp2, t + p.attack);
        g.gain.exponentialRampToValueAtTime(0.0001, t + p.attack + decay);
        o.connect(g).connect(out);
        o.start(t); o.stop(t + p.attack + decay + 0.05);
        voice.oscs.push(o);
      });
    });
    strikeNoise(p, vel, t, out);

    voices.push(voice);
    setTimeout(() => {
      const i = voices.indexOf(voice);
      if (i >= 0) voices.splice(i, 1);
    }, (t - ctx.currentTime + longest + 0.2) * 1000);
  }

  function playBell(bell, vel) {
    initAudio();
    const now = ctx.currentTime + 0.005;
    (bell.hits || [[0, 1]]).forEach(([dt, v]) => strike(bell, vel * v, now + dt));
  }

  Object.assign(app, { initAudio, setVolume, setReverb, playBell });
})(window.BellApp = window.BellApp || {});

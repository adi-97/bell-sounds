(function (app) {
  const { settings } = app;

  let handler = null;

  async function enableShake(onShake) {
    if (!('DeviceMotionEvent' in window)) return 'This device has no motion sensor.';
    if (!window.isSecureContext) return 'Shake needs HTTPS (GitHub Pages is fine).';
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        const res = await DeviceMotionEvent.requestPermission();
        if (res !== 'granted') return 'Motion permission denied. Allow it in Safari settings.';
      } catch {
        return 'Could not get motion permission.';
      }
    }

    let last = null, lastShake = 0;
    handler = e => {
      const a = e.accelerationIncludingGravity || e.acceleration;
      if (!a || a.x == null) return;
      if (last) {
        const delta = Math.abs(a.x - last.x) + Math.abs(a.y - last.y) + Math.abs(a.z - last.z);
        const threshold = 40 - settings.sens * 30;
        const now = performance.now();
        if (delta > threshold && now - lastShake > 280) {
          lastShake = now;
          onShake(0.4 + (delta - threshold) / 40, a.x > last.x ? 1 : -1);
        }
      }
      last = { x: a.x, y: a.y, z: a.z };
    };
    window.addEventListener('devicemotion', handler);
    return null;
  }

  function disableShake() {
    if (handler) window.removeEventListener('devicemotion', handler);
    handler = null;
  }

  Object.assign(app, { enableShake, disableShake });
})(window.BellApp = window.BellApp || {});

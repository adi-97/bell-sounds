(function (app) {
  const CHOICES = {
    vol: [['Low', .4], ['Medium', .7], ['High', 1]],
    rev: [['Off', 0], ['Low', .25], ['High', .55]],
    speed: [['Slow', 0], ['Medium', .5], ['Fast', 1]],
    sens: [['Low', .2], ['Medium', .5], ['High', .85]],
  };

  const settings = { vol: .7, rev: .25, speed: .5, sens: .5 };
  try { Object.assign(settings, JSON.parse(localStorage.getItem('settings')) || {}); } catch {}

  function saveSettings() {
    try { localStorage.setItem('settings', JSON.stringify(settings)); } catch {}
  }

  function loadBellId() {
    try { return localStorage.getItem('bell'); } catch { return null; }
  }

  function saveBellId(id) {
    try { localStorage.setItem('bell', id); } catch {}
  }

  Object.assign(app, { CHOICES, settings, saveSettings, loadBellId, saveBellId });
})(window.BellApp = window.BellApp || {});

// ===== SETTINGS =====
const CONFIG = {
  pdfUrl: 'https://drive.google.com/uc?export=download&id=1ur-vOn3QPTMc6RHO8tEJ8Up-mYkscPvF',
  surveyUrl: 'https://forms.gle/Rr1F8VchMbAkfmAr7',
  mailerliteAccount: '2680789',   // leave '' to skip the email step
};
// ====================

(function () {
  const dlg = document.getElementById('gate');
  const gated = !!CONFIG.mailerliteAccount && !!(dlg && dlg.showModal);

  if (gated) {
    (function (w, d, e, u, f, l, n) { w[f] = w[f] || function () { (w[f].q = w[f].q || []).push(arguments); }, l = d.createElement(e), l.async = 1, l.src = u, n = d.getElementsByTagName(e)[0], n.parentNode.insertBefore(l, n); })
    (window, document, 'script', 'https://assets.mailerlite.com/js/universal.js', 'ml');
    window.ml('account', CONFIG.mailerliteAccount);
  }

  document.querySelectorAll('[data-pdf]').forEach(a => {
    a.href = CONFIG.pdfUrl;
    a.addEventListener('click', e => {
      if (!gated) return;
      e.preventDefault();
      dlg.showModal();
    });
  });

  document.querySelectorAll('[data-survey]').forEach(a => {
    a.href = CONFIG.surveyUrl; a.target = '_blank'; a.rel = 'noopener';
  });

  if (dlg) {
    dlg.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => dlg.close()));
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  }

  const all = document.getElementById('toggle-all');
  const dds = [...document.querySelectorAll('.dd')];
  const sync = () => { all.textContent = dds.every(d => d.open) ? 'Close all' : 'Open all'; };
  all.addEventListener('click', () => { const open = !dds.every(d => d.open); dds.forEach(d => d.open = open); sync(); });
  dds.forEach(d => d.addEventListener('toggle', sync));
})();

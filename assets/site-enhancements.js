/* Progressive enhancements for the published site; no changes to scientific data. */
(() => {
  'use strict';
  const base = new URL('../', document.currentScript.src);
  const href = path => new URL(path, base).href;
  let scheduled = false;
  let mountAttempts = 0;

  function enhance() {
    scheduled = false;
    const shell = document.querySelector('.lab-shell');
    if (!shell) return;
    for (const control of document.querySelectorAll('.top-actions button, .top-actions a')) {
      if (!control.title) control.title = control.textContent.trim();
      if (!control.hasAttribute('aria-label')) control.setAttribute('aria-label', control.textContent.trim());
    }
    const intro = document.querySelector('.intro-overlay');
    if (intro && !intro.querySelector('.site-modules')) {
      const figure = document.createElement('figure');
      figure.className = 'site-visual';
      figure.innerHTML = `<div class="site-visual-heading"><span>MICRO → MACRO</span><span>Cross-scale concept</span></div>
        <img src="${href('og-agent.png')}" width="1731" height="909" alt="Concept view linking TPMS cells, effective materials, leading edges, aircraft, and radar scattering" decoding="async">
        <figcaption><span><strong>08 stages</strong>Continuous 3D demo</span><span><strong>03 structures</strong>Gyroid · Diamond · Primitive</span><span><strong>TE / TM</strong>Polarization exploration</span></figcaption>`;
      const modules = document.createElement('section');
      modules.className = 'site-modules';
      modules.setAttribute('aria-labelledby', 'site-modules-title');
      modules.innerHTML = `<div class="site-section-heading"><h2 id="site-modules-title">Explore the research modules</h2><span>DESIGN / SCAN / REPAIR</span></div>
        <div class="site-module-grid">
          <a class="site-module-card" data-site-absorbevo href="https://github.com/ZhichengFeng/AbsorbEvo"><span>DESIGN INTELLIGENCE</span><span class="site-card-arrow" aria-hidden="true">↗</span><strong>AbsorbEvo · Inverse design</strong><p>Physics-guided agents turn design goals into microwave absorbers verified by full-wave simulation.</p><span class="site-card-link">Explore AbsorbEvo →</span></a>
          <a class="site-module-card" href="${href('aerorepair-scan/')}"><span>MODULE 09 / IN-SITU SCAN</span><span class="site-card-arrow" aria-hidden="true">↗</span><strong>AeroRepair · In-situ scanning</strong><p>Explore near-field scanning, anomaly localization, and post-repair assessment.</p><span class="site-card-link">Open scan demo →</span></a>
          <a class="site-module-card" href="${href('repair-workflow/')}"><span>MODULE 10 / REPAIR WORKFLOW</span><span class="site-card-arrow" aria-hidden="true">↗</span><strong>Damage Detection and Repair</strong><p>Connect damage visualization, inspection, scarf repair, and re-inspection.</p><span class="site-card-link">Explore repair workflow →</span></a>
        </div><p class="site-data-note"><span>The cross-scale and repair demos use synthetic data. CST reference data are labeled separately.</span><a href="https://github.com/ZhichengFeng/ZhichengFeng-Stealth-lab">GitHub · Project and data ↗</a></p>`;
      intro.append(figure, modules);
      intro.classList.add('site-intro-ready');
    }
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(enhance);
  }
  function mount() {
    // The canvas is mounted by React after hydration, avoiding edits to its SSR tree.
    if (!document.querySelector('.scene-viewport canvas')) {
      // Leave the original page intact if 3D initialization fails.
      if (++mountAttempts < 200) setTimeout(mount, 150);
      return;
    }
    document.querySelector('.lab-shell').id = 'site-main';
    const skip = document.createElement('a');
    skip.className = 'site-skip-link';
    skip.href = '#site-main';
    skip.textContent = "Skip to main content";
    skip.addEventListener('click', event => {
      event.preventDefault();
      const target = ['.absorbevo-workspace', '.project-overview', '.intro-overlay', '.control-panel']
        .map(selector => document.querySelector(selector)).find(element => element && element.getClientRects().length);
      if (target) {
        target.tabIndex = -1;
        target.focus();
        target.scrollIntoView({block: 'start'});
      }
    });
    document.body.prepend(skip);
    enhance();
    new MutationObserver(schedule).observe(document.querySelector('.lab-shell'), {childList: true, subtree: true});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once: true});
  else mount();
})();

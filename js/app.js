/**
 * Harsh Ambule — Main UI Controller
 * Sagar Tamang (sagartamang.com) floating hover preview cards & theme switcher
 * Features exact spring-physics cursor tracking & dynamic rotation tilt
 */

(function () {
  'use strict';

  // 1. Theme Toggling
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

  function initTheme() {
    const savedTheme = localStorage.getItem('ha_theme') || 'dark'; // Default pitch black
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeIcon) {
      themeIcon.textContent = savedTheme === 'dark' ? '☼' : '◐';
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ha_theme', next);
      if (themeIcon) {
        themeIcon.textContent = next === 'dark' ? '☼' : '◐';
      }
    });
  }

  initTheme();

  // 2. Previews Data Mapping (1:1 with all portfolio triggers)
  const PREVIEWS = {
    'resume': {
      type: 'doc',
      filename: 'harsh-ambule-resume.pdf'
    },
    'sih': {
      type: 'image',
      src: 'assets/projects/sih_dedicated.jpg',
      title: 'Smart India Hackathon (National Stage)',
      domain: 'sih.gov.in'
    },
    'major-project': {
      type: 'image',
      src: 'assets/projects/major_project_dedicated.jpg',
      title: 'Final Year Major Project (PBCE AI)',
      domain: 'pbce.edu.in'
    },
    'promptwars': {
      type: 'image',
      src: 'assets/projects/carbonlens.jpg',
      title: 'Google PromptWars (Challenge 3)',
      domain: 'google.com'
    },
    'pbce': {
      type: 'image',
      src: 'assets/projects/pbce_campus.jpg',
      title: 'Priyadarshini Bhagwati College of Engineering',
      domain: 'pbce.edu.in'
    },
    'pjlce': {
      type: 'image',
      src: 'assets/projects/pbce_campus.jpg',
      title: 'Priyadarshini Bhagwati College of Engineering',
      domain: 'pbce.edu.in'
    },
    'orcid': {
      type: 'writing',
      gradient: 'linear-gradient(145deg, #16382b 0%, #0b1d16 100%)',
      date: 'Verified Peer Reviewer',
      title: 'Elsevier EAAI Journal Review Activity (ORCID: 0009-0009-5442-7687)',
      domain: 'orcid.org'
    },
    'scholar': {
      type: 'writing',
      gradient: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
      date: 'Google Scholar Profile',
      title: 'Harsh Ambule — Research Citations & Indices',
      domain: 'scholar.google.com'
    },
    'cert-dl': {
      type: 'cert',
      org: 'Coursera · DeepLearning.AI',
      instructor: 'Andrew Ng',
      title: 'Deep Learning Specialization',
      credentialId: 'Q1QDE1F2U2HD',
      domain: 'coursera.org'
    },
    'cert-linkedin': {
      type: 'cert-summary',
      title: '23 Verified Licenses & Certifications',
      issuers: 'Google Cloud · DeepLearning.AI · Coursera',
      domain: 'linkedin.com/in/harsh-ambule-3551bb266'
    },
    'relief-cr': {
      type: 'image',
      src: 'assets/projects/cloudfree.jpg',
      title: '01 // RelieF-CR (Cloud-Free v2)',
      domain: 'github.com/HARSH0177'
    },
    'ev-spatial': {
      type: 'image',
      src: 'assets/projects/ev_advisor.jpg',
      title: '02 // EV Spatial Intelligence Engine',
      domain: 'github.com/HARSH0177'
    },
    'newsmate': {
      type: 'image',
      src: 'assets/projects/newsmate.jpg',
      title: '03 // NewsMate v6 Multi-Agent Platform',
      domain: 'github.com/HARSH0177'
    },
    'carbonlensai': {
      type: 'image',
      src: 'assets/projects/carbonlens.jpg',
      title: '05 // CarbonLensAI Decision Engine',
      domain: 'github.com/HARSH0177'
    },
    'writing-eaai': {
      type: 'writing',
      gradient: 'linear-gradient(145deg, #182824 0%, #0d1417 100%)',
      date: 'September 20, 2026',
      title: 'Engineering Applications of Artificial Intelligence (EAAI) — Peer Review Activity',
      domain: 'orcid.org'
    },
    'writing-relief': {
      type: 'writing',
      gradient: 'linear-gradient(145deg, #1a2238 0%, #0d131f 100%)',
      date: 'August 28, 2026',
      title: 'Reconstructing Cloud-Obscured Earth Observation Imagery via Spatial-Temporal Multi-Sensor Attention',
      domain: 'github.com'
    },
    'writing-ev': {
      type: 'writing',
      gradient: 'linear-gradient(145deg, #231e33 0%, #110f1c 100%)',
      date: 'August 15, 2026',
      title: 'Geospatial Optimization of High-Density EV Charging Infrastructure Under Grid Capacity Constraints',
      domain: 'github.com'
    },
    'writing-newsmate': {
      type: 'writing',
      gradient: 'linear-gradient(145deg, #2b2216 0%, #15110b 100%)',
      date: 'August 02, 2026',
      title: 'Autonomous Multi-Agent Neural Media Synthesis & Cross-Source Validation Networks',
      domain: 'github.com'
    }
  };

  // Singleton card DOM element
  let card = document.querySelector('.st-hover-card');
  if (!card) {
    card = document.createElement('div');
    card.className = 'st-hover-card';
    card.setAttribute('aria-hidden', 'true');
    document.body.appendChild(card);
  }

  function renderCardContent(data) {
    if (data.type === 'doc') {
      return `
        <div class="st-hover-card__doc-box">
          <div class="st-hover-card__paper">
            <div class="st-hover-card__paper-lines">
              <div class="st-hover-card__paper-line st-hover-card__paper-line--h1"></div>
              <div class="st-hover-card__paper-line st-hover-card__paper-line--h2"></div>
              <div class="st-hover-card__paper-line" style="width: 92%;"></div>
              <div class="st-hover-card__paper-line" style="width: 86%;"></div>
              <div class="st-hover-card__paper-line" style="width: 90%;"></div>
              <div class="st-hover-card__paper-line" style="width: 72%; margin-top: 4px;"></div>
              <div class="st-hover-card__paper-line" style="width: 84%;"></div>
            </div>
            <div class="st-hover-card__paper-filename">${data.filename || 'resume.pdf'}</div>
          </div>
        </div>
      `;
    }

    if (data.type === 'cert') {
      return `
        <div class="st-hover-card__cert-box">
          <div class="st-hover-card__cert-badge">
            <span class="st-hover-card__cert-org">${data.org || 'Coursera · DeepLearning.AI'}</span>
            <span class="st-hover-card__cert-verified">✓ Verified</span>
          </div>
          <h4 class="st-hover-card__cert-title">${data.title}</h4>
          <p class="st-hover-card__cert-meta">Instructor: ${data.instructor || 'Andrew Ng'}</p>
          <div class="st-hover-card__cert-footer">
            <span class="st-hover-card__cert-id">ID: ${data.credentialId}</span>
            <span class="st-hover-card__cert-domain">${data.domain} ↗</span>
          </div>
        </div>
      `;
    }

    if (data.type === 'cert-summary') {
      return `
        <div class="st-hover-card__cert-box" style="background: linear-gradient(145deg, #091a2e 0%, #050d18 100%); border-color: rgba(14, 165, 233, 0.35);">
          <div class="st-hover-card__cert-badge">
            <span class="st-hover-card__cert-org" style="color: #38bdf8;">LinkedIn Verified Credentials</span>
            <span class="st-hover-card__cert-verified" style="color: #38bdf8; background: rgba(56, 189, 248, 0.12); border-color: rgba(56, 189, 248, 0.25);">23 Certifications</span>
          </div>
          <h4 class="st-hover-card__cert-title">${data.title}</h4>
          <p class="st-hover-card__cert-meta">${data.issuers}</p>
          <div class="st-hover-card__cert-footer">
            <span class="st-hover-card__cert-id">Harsh Ambule</span>
            <span class="st-hover-card__cert-domain" style="color: #38bdf8;">View on LinkedIn ↗</span>
          </div>
        </div>
      `;
    }

    if (data.type === 'writing') {
      return `
        <div class="st-hover-card__writing-box" style="background: ${data.gradient || 'linear-gradient(145deg, #182824 0%, #0d1417 100%)'}">
          <p class="st-hover-card__writing-date">${data.date || ''}</p>
          <h4 class="st-hover-card__writing-title">${data.title}</h4>
          <p class="st-hover-card__writing-domain">${data.domain || ''}</p>
        </div>
      `;
    }

    // Default: Image card (1:1 with Sagar Tamang)
    return `
      <div class="st-hover-card__image-box">
        <img src="${data.src}" alt="${data.title}" loading="eager">
        <div class="st-hover-card__image-caption">
          <span>${data.title}</span>
          <span>${data.domain}</span>
        </div>
      </div>
    `;
  }

  function getCardWidth(type) {
    if (type === 'doc') return 210;
    if (type === 'cert' || type === 'cert-summary') return 255;
    if (type === 'writing') return 255;
    return 220;
  }

  function getCardHeight(type) {
    if (type === 'doc') return 155;
    if (type === 'cert' || type === 'cert-summary') return 145;
    if (type === 'writing') return 140;
    return 165;
  }

  function calcTargetPos(clientX, clientY, cardWidth, cardHeight) {
    // Center horizontally over cursor
    let left = clientX - (cardWidth / 2);
    // Clamp horizontally within viewport padding
    const minLeft = 14;
    const maxLeft = window.innerWidth - cardWidth - 14;
    left = Math.max(minLeft, Math.min(left, maxLeft));

    // Position vertically above cursor (with offset)
    let top = clientY - cardHeight - 20;

    // If near the top edge of screen, flip smoothly below the cursor
    if (top < 16) {
      top = clientY + 28;
    }

    // Clamp vertically within viewport
    top = Math.max(12, Math.min(top, window.innerHeight - cardHeight - 12));

    return { left, top };
  }

  // 3. Second-Order Spring Physics Engine (Exact 1:1 Framer Motion useSpring algorithm)
  class SpringValue {
    constructor(initial, stiffness = 300, damping = 30, mass = 1) {
      this.stiffness = stiffness;
      this.damping = damping;
      this.mass = mass;
      this.current = initial;
      this.target = initial;
      this.velocity = 0;
    }

    jump(val) {
      this.current = val;
      this.target = val;
      this.velocity = 0;
    }

    set(val) {
      this.target = val;
    }

    step(dt) {
      // Semi-implicit Euler integration (energy conserving)
      const fSpring = -this.stiffness * (this.current - this.target);
      const fDamping = -this.damping * this.velocity;
      const accel = (fSpring + fDamping) / this.mass;

      this.velocity += accel * dt;
      this.current += this.velocity * dt;

      // Rest condition
      if (Math.abs(this.velocity) < 0.005 && Math.abs(this.current - this.target) < 0.005) {
        this.current = this.target;
        this.velocity = 0;
        return true;
      }
      return false;
    }
  }

  // Spring instances matching Sagar Tamang's parameters:
  // Stiffness 300, damping 30 for translation; stiffness 300, damping 20 for rotation
  const springX = new SpringValue(0, 300, 30);
  const springY = new SpringValue(0, 300, 30);
  const springRotate = new SpringValue(0, 300, 20);
  const springScale = new SpringValue(0.85, 320, 26);

  let activeTarget = null;
  let activeData = null;
  let isVisible = false;
  let lastClientX = null;
  let lastMoveTime = 0;
  let animFrameId = null;
  let lastTime = performance.now();

  function renderFrame(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.032);
    lastTime = now;

    // Decay rotation to base tilt if mouse stops moving during hover
    if (isVisible && activeData && (now - lastMoveTime > 60)) {
      const baseTilt = activeData.type === 'writing' ? -2.5 : 0;
      springRotate.set(baseTilt);
    }

    const xRest = springX.step(dt);
    const yRest = springY.step(dt);
    const rotRest = springRotate.step(dt);
    const scaleRest = springScale.step(dt);

    // Apply composite transform with subpixel rounding
    const px = Math.round(springX.current * 10) / 10;
    const py = Math.round(springY.current * 10) / 10;
    const r = Math.round(springRotate.current * 100) / 100;
    const s = Math.round(springScale.current * 1000) / 1000;

    card.style.transform = `translate3d(${px}px, ${py}px, 0) rotate(${r}deg) scale(${s})`;

    // Stop RAF loop when fully at rest and hidden
    if (!isVisible && xRest && yRest && rotRest && scaleRest) {
      animFrameId = null;
      return;
    }

    animFrameId = requestAnimationFrame(renderFrame);
  }

  function startLoop() {
    if (!animFrameId) {
      lastTime = performance.now();
      animFrameId = requestAnimationFrame(renderFrame);
    }
  }

  function showPreview(el, clientX, clientY) {
    const key = el.getAttribute('data-hover-card');
    const data = PREVIEWS[key];
    if (!data) return;

    const isNew = activeTarget !== el;
    activeTarget = el;
    activeData = data;

    if (isNew) {
      card.className = 'st-hover-card' + (data.type ? ` st-hover-card--${data.type}` : '');
      card.innerHTML = renderCardContent(data);
    }

    const cardWidth = getCardWidth(data.type);
    const cardHeight = getCardHeight(data.type);
    const { left, top } = calcTargetPos(clientX, clientY, cardWidth, cardHeight);

    if (!isVisible) {
      // Jump directly to initial cursor position
      springX.jump(left);
      springY.jump(top);
      springRotate.jump(0);
      springScale.jump(0.85);
      springScale.set(1);

      isVisible = true;
      card.classList.add('is-active');
    } else {
      // Spring smoothly between adjacent links
      springX.set(left);
      springY.set(top);
      springScale.set(1);
    }

    lastClientX = clientX;
    lastMoveTime = performance.now();
    startLoop();
  }

  function updateHoverPosition(clientX, clientY) {
    if (!activeTarget || !activeData) return;

    const cardWidth = getCardWidth(activeData.type);
    const cardHeight = getCardHeight(activeData.type);
    const { left, top } = calcTargetPos(clientX, clientY, cardWidth, cardHeight);

    springX.set(left);
    springY.set(top);

    // Dynamic rotation tilt derived from cursor horizontal velocity (Sagar Tamang's signature feel)
    if (lastClientX !== null) {
      const deltaX = clientX - lastClientX;
      const dynamicTilt = Math.max(-15, Math.min(15, deltaX * 1.2));
      const baseTilt = activeData.type === 'writing' ? -2.5 : 0;
      springRotate.set(dynamicTilt + baseTilt);
    }

    lastClientX = clientX;
    lastMoveTime = performance.now();
    startLoop();
  }

  function hidePreview() {
    activeTarget = null;
    activeData = null;
    isVisible = false;
    lastClientX = null;

    springRotate.set(0);
    springScale.set(0.85);
    card.classList.remove('is-active');
    startLoop();
  }

  // Unified document-level event delegation
  document.addEventListener('mouseover', (e) => {
    const trigger = e.target.closest('[data-hover-card]');
    if (trigger) {
      showPreview(trigger, e.clientX, e.clientY);
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (activeTarget) {
      updateHoverPosition(e.clientX, e.clientY);
    } else {
      // If pointer moved onto a trigger
      const trigger = e.target.closest('[data-hover-card]');
      if (trigger) {
        showPreview(trigger, e.clientX, e.clientY);
      }
    }
  });

  document.addEventListener('mouseout', (e) => {
    const trigger = e.target.closest('[data-hover-card]');
    if (trigger && (!e.relatedTarget || !trigger.contains(e.relatedTarget))) {
      hidePreview();
    }
  });

  // Window scroll cleanly dismisses card
  window.addEventListener('scroll', () => {
    if (activeTarget) {
      hidePreview();
    }
  }, { passive: true });

  // ---------------------------------------------------------------------------
  // Apple First-Time Device Start Screen ("hello" -> "नमस्ते" / "namaste")
  // ---------------------------------------------------------------------------
  function initAppleStartScreen() {
    const screen = document.getElementById('apple-start-screen');
    const textEl = document.getElementById('apple-greeting-text');
    const subEl = document.getElementById('apple-greeting-sub');
    const replayBtn = document.getElementById('apple-replay-btn');
    if (!screen || !textEl) return;

    let isDismissed = false;
    let t1 = null, t2 = null, t3 = null;

    function dismiss(fast = false) {
      if (isDismissed) return;
      isDismissed = true;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);

      screen.classList.add('is-dismissed');
      setTimeout(() => {
        screen.style.display = 'none';
      }, fast ? 400 : 850);
    }

    function playSequence() {
      isDismissed = false;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);

      screen.style.display = 'flex';
      screen.classList.remove('is-dismissed');

      // 1. Start with "hello"
      textEl.className = 'apple-greeting-text';
      textEl.textContent = 'hello';
      if (subEl) {
        subEl.className = 'apple-greeting-sub';
        subEl.textContent = '';
      }

      // Small tick for CSS transition
      requestAnimationFrame(() => {
        textEl.classList.add('is-visible');
      });

      // 2. Transition from "hello" to "नमस्ते" at 1400ms
      t1 = setTimeout(() => {
        textEl.classList.remove('is-visible');
        textEl.classList.add('is-fading');

        t2 = setTimeout(() => {
          textEl.textContent = 'नमस्ते';
          textEl.className = 'apple-greeting-text';
          if (subEl) {
            subEl.textContent = 'namaste';
            subEl.classList.add('is-visible');
          }
          requestAnimationFrame(() => {
            textEl.classList.add('is-visible');
          });

          // 3. Apple iOS slide-up reveal at 3300ms
          t3 = setTimeout(() => {
            dismiss(false);
          }, 1500);
        }, 450);
      }, 1400);
    }

    // Dismiss immediately on user interaction
    screen.addEventListener('click', () => dismiss(true));
    window.addEventListener('keydown', (e) => {
      if (!isDismissed && (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter')) {
        dismiss(true);
      }
    });

    // Replay button
    if (replayBtn) {
      replayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playSequence();
      });
    }

    // Auto-play on initial load
    playSequence();
  }

  // Initialize Apple start screen
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAppleStartScreen);
  } else {
    initAppleStartScreen();
  }

})();

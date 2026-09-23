/**
 * Sagar Tamang — Floating Assistant Controller
 * Handles animated placeholder, natural queries, and response popovers
 */

(function () {
  'use strict';

  const KNOWLEDGE_BASE = [
    {
      keywords: ['built', 'project', 'build', 'sarvam', 'relief', 'relif', 'ev', 'newsmate', 'environmental', 'aditya', 'carbonlens'],
      response: `Harsh has built <strong>6 core systems</strong>: 
      <br>• <strong>01 // RELIF-CR</strong> (satellite optical cloud removal)
      <br>• <strong>02 // EV Spatial Intelligence</strong> (charging grid placement optimizer)
      <br>• <strong>03 // NewsMate</strong> (multi-agent news & fact engine)
      <br>• <strong>04 // Environmental Impact Intelligence</strong> (deforestation & air quality AI)
      <br>• <strong>05 // Aditya-1 Mission Control</strong> (solar physics telemetry console)
      <br>• <strong>06 // CarbonLensAI</strong> (PromptWars decarbonization simulator).`
    },
    {
      keywords: ['sih', 'hackathon', 'smart india', 'lead', 'team'],
      response: `Harsh is a <strong>3× Smart India Hackathon (SIH)</strong> participant and team lead, successfully presenting at national evaluation stages. He also led his university 3rd Year Mini Project and Final Year Major Project engineering teams.`
    },
    {
      keywords: ['certif', 'credential', 'google cloud', 'academy', 'andrew ng', 'deep learning'],
      response: `Harsh holds <strong>23 verified certifications</strong>, including Google Cloud Gen AI Academy APAC (Cohorts 1 & 2), Google Cloud 2.0 (AI/ML, DevOps, Serverless), Google PromptWars (Challenge 3 Verified), and the 5-course Deep Learning Specialization by Andrew Ng.`
    },
    {
      keywords: ['eaai', 'elsevier', 'reviewer', 'journal', 'paper', 'orcid', 'scholar', 'publications'],
      response: `Harsh serves as an active peer reviewer for <strong>Elsevier's Engineering Applications of Artificial Intelligence (EAAI)</strong> journal (Sep 2026). His review record is officially linked on his <a href="https://orcid.org/0009-0009-5442-7687" target="_blank" rel="noopener">ORCID Profile (0009-0009-5442-7687)</a> and scholarly works are indexed on <a href="https://scholar.google.com/citations?user=N79lLdwAAAAJ" target="_blank" rel="noopener">Google Scholar</a>.`
    },
    {
      keywords: ['college', 'university', 'btech', 'degree', 'education', 'rtmnu'],
      response: `Harsh is pursuing his <strong>B.Tech in Artificial Intelligence</strong> at Priyadarshini J. L. College of Engineering (affiliated with RTMNU) in Nagpur, India.`
    },
    {
      keywords: ['contact', 'email', 'reach', 'resume', 'hire', 'linkedin', 'github'],
      response: `You can reach Harsh at <a href="mailto:harshambule1129@gmail.com">harshambule1129@gmail.com</a>, connect on <a href="https://www.linkedin.com/in/harsh-ambule-3551bb266/" target="_blank" rel="noopener">LinkedIn</a> or check his <a href="assets/harsh-ambule-resume.pdf" target="_blank" rel="noopener">Résumé (PDF)</a>.`
    }
  ];

  const PLACEHOLDERS = [
    'what has harsh built?',
    'ask about relief-cr satellite vision',
    'ask about smart india hackathon',
    'ask about google cloud gen ai academy',
    'ask about ev spatial intelligence engine',
    'ask me anything about harsh'
  ];

  let placeholderIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 60;

  const placeholderEl = document.getElementById('st-placeholder');
  const inputEl = document.getElementById('st-input');
  const sendBtn = document.getElementById('st-send-btn');
  const popoverEl = document.getElementById('st-popover');
  const popoverContent = document.getElementById('st-popover-content');
  const popoverClose = document.getElementById('st-popover-close');

  function typePlaceholder() {
    if (!placeholderEl || document.activeElement === inputEl || (inputEl && inputEl.value.trim() !== '')) {
      setTimeout(typePlaceholder, 1000);
      return;
    }

    const currentText = PLACEHOLDERS[placeholderIndex];

    if (isDeleting) {
      charIndex--;
      typingSpeed = 30;
    } else {
      charIndex++;
      typingSpeed = 60;
    }

    placeholderEl.textContent = currentText.substring(0, charIndex);

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      placeholderIndex = (placeholderIndex + 1) % PLACEHOLDERS.length;
      typingSpeed = 350;
    }

    setTimeout(typePlaceholder, typingSpeed);
  }

  function handleQuery(queryText) {
    if (!queryText || !queryText.trim()) return;
    const cleanQuery = queryText.toLowerCase().trim();

    let bestMatch = null;
    let maxHits = 0;

    for (const item of KNOWLEDGE_BASE) {
      let hits = 0;
      for (const kw of item.keywords) {
        if (cleanQuery.includes(kw)) hits++;
      }
      if (hits > maxHits) {
        maxHits = hits;
        bestMatch = item;
      }
    }

    const responseHtml = bestMatch
      ? bestMatch.response
      : `Harsh Ambule is an AI Engineer and Researcher building scalable deep learning systems, computer vision, and multi-agent platforms. Explore his 6 active builds above or reach him at <a href="mailto:harshambule1129@gmail.com">harshambule1129@gmail.com</a>.`;

    if (popoverContent && popoverEl) {
      popoverContent.innerHTML = `<p>${responseHtml}</p>`;
      popoverEl.classList.add('is-open');
    }
  }

  if (inputEl) {
    inputEl.addEventListener('input', () => {
      if (placeholderEl) {
        placeholderEl.style.opacity = inputEl.value.length > 0 ? '0' : '1';
      }
      if (sendBtn) {
        sendBtn.disabled = inputEl.value.trim().length === 0;
      }
    });

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleQuery(inputEl.value);
      }
    });

    inputEl.addEventListener('focus', () => {
      if (placeholderEl && inputEl.value.length === 0) {
        placeholderEl.style.opacity = '0.35';
      }
    });

    inputEl.addEventListener('blur', () => {
      if (placeholderEl && inputEl.value.length === 0) {
        placeholderEl.style.opacity = '1';
      }
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      if (inputEl) handleQuery(inputEl.value);
    });
  }

  if (popoverClose && popoverEl) {
    popoverClose.addEventListener('click', () => {
      popoverEl.classList.remove('is-open');
    });
  }

  typePlaceholder();
})();

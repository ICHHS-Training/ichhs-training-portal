/* ============================================================
   ICHHS Training Portal — Shared JavaScript
   ============================================================ */

// ── Mobile Nav ──────────────────────────────────────────────
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
  });

  // Close on link click (mobile)
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.textContent = '☰';
    });
  });

  // Mark active link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ── Accordion ───────────────────────────────────────────────
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const isOpen  = trigger.classList.contains('open');

      // Optionally close others in same group
      const group = trigger.closest('.accordion-group');
      if (group) {
        group.querySelectorAll('.accordion-trigger.open').forEach(t => {
          t.classList.remove('open');
          t.nextElementSibling.classList.remove('open');
        });
      }

      if (!isOpen) {
        trigger.classList.add('open');
        content.classList.add('open');
      }
    });
  });
}

// ── Flip Cards ──────────────────────────────────────────────
function initFlipCards() {
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
}

// ── Quiz ────────────────────────────────────────────────────
function initQuizzes() {
  document.querySelectorAll('.quiz-container').forEach(quiz => {
    const options  = quiz.querySelectorAll('.quiz-option');
    const feedback = quiz.querySelector('.quiz-feedback');
    const resetBtn = quiz.querySelector('.quiz-reset');

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        if (opt.classList.contains('disabled')) return;

        const isCorrect = opt.dataset.correct === 'true';

        // Disable all options
        options.forEach(o => {
          o.classList.add('disabled');
          if (o.dataset.correct === 'true') o.classList.add('correct');
        });

        if (!isCorrect) opt.classList.add('incorrect');

        // Show feedback
        if (feedback) {
          feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
          feedback.style.display = 'block';
        }

        if (resetBtn) resetBtn.style.display = 'block';
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        options.forEach(o => {
          o.classList.remove('correct', 'incorrect', 'disabled');
        });
        if (feedback) {
          feedback.classList.remove('correct', 'incorrect');
          feedback.style.display = 'none';
        }
        resetBtn.style.display = 'none';
      });
    }
  });
}

// ── Resource Search ─────────────────────────────────────────
function initSearch() {
  const input = document.getElementById('resource-search');
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    document.querySelectorAll('.resource-link').forEach(link => {
      const text = link.textContent.toLowerCase();
      link.style.display = text.includes(q) ? '' : 'none';
    });
    document.querySelectorAll('.resource-group').forEach(group => {
      const visible = Array.from(group.querySelectorAll('.resource-link'))
        .some(l => l.style.display !== 'none');
      group.style.display = visible ? '' : 'none';
    });
  });
}

// ── Unit Tabs ───────────────────────────────────────────────
function initUnitTabs() {
  const btns    = document.querySelectorAll('.unit-btn');
  const panels  = document.querySelectorAll('.unit-panel');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.unit;
      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => {
        p.classList.toggle('hidden', p.dataset.unit !== target);
      });
      btn.classList.add('active');
    });
  });
}

// ── Init on DOM ready ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAccordions();
  initFlipCards();
  initQuizzes();
  initSearch();
  initUnitTabs();
});

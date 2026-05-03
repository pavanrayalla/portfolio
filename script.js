/* ============================================================
   PAVAN SAI RAYALLA — PORTFOLIO SCRIPT
   No dependencies. Pure vanilla JavaScript.
   ============================================================ */

/* ---------- Theme Toggle ---------- */
const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function applyTheme(theme) {
  if (theme === 'light') {
    html.classList.add('light');
    themeIcon.textContent = '☀️';
  } else {
    html.classList.remove('light');
    themeIcon.textContent = '🌙';
  }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const next = html.classList.contains('light') ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

/* ---------- Mobile Menu ---------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close menu when link clicked
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ---------- Typewriter ---------- */
// EDIT the phrases array to change what cycles in the hero
const phrases = [
  'Senior Data & AI Engineer',
  'Agentic AI & GenAI Engineer',
  'Microsoft Fabric Architect',
  'LLMOps & RAG Engineer',
  'Azure AI Platform Engineer'
];

const typeEl = document.getElementById('typewriter-text');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    typeEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 40 : 70);
}
type();

/* ---------- Scroll Top Button ---------- */
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Active Nav Link ---------- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

/* ---------- Project Modal ---------- */
const overlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalEmployer = document.getElementById('modal-employer');
const modalDesc = document.getElementById('modal-desc');
const modalProblem = document.getElementById('modal-problem');
const modalArch = document.getElementById('modal-arch');
const modalFlow = document.getElementById('modal-flow');
const modalDecisions = document.getElementById('modal-decisions');
const modalEval = document.getElementById('modal-eval');
const modalSecurity = document.getElementById('modal-security');
const modalFuture = document.getElementById('modal-future');
const modalStack = document.getElementById('modal-stack');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.textContent     = card.dataset.name;
    modalEmployer.textContent  = card.dataset.employer;
    modalDesc.textContent      = card.dataset.desc;
    modalProblem.textContent   = card.dataset.problem;
    modalArch.textContent      = card.dataset.arch;
    modalFlow.textContent      = card.dataset.flow;
    modalEval.textContent      = card.dataset.eval;
    modalSecurity.textContent  = card.dataset.security;
    modalFuture.textContent    = card.dataset.future;

    // Decisions (pipe-separated in data attr)
    const decisions = card.dataset.decisions.split('||');
    modalDecisions.innerHTML = decisions.map(d => `<li>${d.trim()}</li>`).join('');

    // Stack tags
    const stack = card.dataset.stack.split(',');
    modalStack.innerHTML = stack.map(s => `<span class="tag">${s.trim()}</span>`).join('');

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

document.getElementById('modal-close').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------- Contact Form (Formspree) ---------- */
// EDIT the form ID below if you create a new Formspree form
const FORMSPREE_ID = 'xrejekqk';

const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn   = document.getElementById('submit-btn');
const submitText  = document.getElementById('submit-text');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitText.textContent = 'Sending…';

  const data = Object.fromEntries(new FormData(contactForm));

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...data, _subject: `[pavansair.com] ${data.topic}` })
    });
    const json = await res.json();
    if (res.ok && (json.ok || json.next)) {
      contactForm.style.display = 'none';
      formSuccess.classList.add('show');
    } else {
      alert(json.errors?.[0]?.message || 'Something went wrong. Please try again.');
      submitBtn.disabled = false;
      submitText.textContent = 'Send Message';
    }
  } catch {
    alert('Network error. Please email directly at pavansair.work@gmail.com');
    submitBtn.disabled = false;
    submitText.textContent = 'Send Message';
  }
});

const loader = document.getElementById('loader');
const scrollTopButton = document.querySelector('.scroll-top');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const progressBar = document.querySelector('.progress-bar');

function hideLoader() {
  loader.classList.add('hidden');
}

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

function toggleScrollTopButton() {
  if (window.scrollY > 400) {
    scrollTopButton.classList.add('visible');
  } else {
    scrollTopButton.classList.remove('visible');
  }
}

function handleNavToggle() {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.style.display = expanded ? 'none' : 'flex';
}

function closeMobileMenu() {
  if (window.innerWidth <= 840) {
    navMenu.style.display = 'none';
    navToggle.setAttribute('aria-expanded', 'false');
  }
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.section, .project-card, .case-card, .skill-card, .faq-card, .info-card, .timeline__item, .learning-card, .github-summary');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => {
    element.classList.add('reveal-hidden');
    observer.observe(element);
  });
}

function handleResize() {
  if (window.innerWidth > 840) {
    navMenu.style.display = 'flex';
    navToggle.setAttribute('aria-expanded', 'false');
  } else {
    navMenu.style.display = 'none';
  }
}

function initTypedText() {
  const heroText = document.querySelector('.hero p');
  if (!heroText) return;
  const phrases = [
    'I am a student focused on real-world development.',
    'I enjoy building clean user experiences.',
    'I am learning backend tools and scalable workflows.'
  ];
  let index = 0;
  let charIndex = 0;
  let currentPhrase = '';
  let isDeleting = false;

  function type() {
    const phrase = phrases[index];
    if (isDeleting) {
      currentPhrase = phrase.substring(0, charIndex - 1);
      charIndex -= 1;
    } else {
      currentPhrase = phrase.substring(0, charIndex + 1);
      charIndex += 1;
    }

    heroText.textContent = currentPhrase;

    if (!isDeleting && charIndex === phrase.length) {
      setTimeout(() => (isDeleting = true), 1200);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % phrases.length;
    }

    setTimeout(type, isDeleting ? 40 : 80);
  }
  type();
}

function initFloatingCards() {
  const cards = document.querySelectorAll('.project-card, .case-card, .skill-card, .info-card, .learning-card');
  window.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;

    cards.forEach((card) => {
      const magnitude = card.classList.contains('project-card') ? 10 : 5;
      card.style.transform = `translate3d(${x * magnitude}px, ${y * magnitude}px, 0)`;
    });
  });
}

function init() {
  setTimeout(hideLoader, 800);
  window.addEventListener('scroll', () => {
    updateScrollProgress();
    toggleScrollTopButton();
  });

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  navToggle.addEventListener('click', handleNavToggle);
  navLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));
  window.addEventListener('resize', handleResize);

  handleResize();
  updateScrollProgress();
  initScrollReveal();
  initTypedText();
  initFloatingCards();
}

window.addEventListener('DOMContentLoaded', init);

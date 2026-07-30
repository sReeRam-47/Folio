// ----- 1. DARK MODE PERSISTENCE & INITIALIZATION -----
const themeToggle = document.querySelector('.theme-btn');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.body.classList.add('dark');
}

if (themeToggle) {
  const updateToggleIcon = () => {
    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  };

  updateToggleIcon();

  themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateToggleIcon();
  });
}

// ----- 2. BACK TO TOP BUTTON -----
const toTop = document.querySelector('#to-top');

if (toTop) {
  let isTicking = false;
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        toTop.classList.toggle('show', window.scrollY > 300);
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ----- 3. SCROLL REVEAL (RELIABLE INITIALIZATION) -----
const initReveal = () => {
  const revealItems = document.querySelectorAll('.reveal');
  
  if (!revealItems.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealItems.forEach((item) => {
      // Force immediate visibility if already in viewport
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        item.classList.add('is-visible');
      } else {
        observer.observe(item);
      }
    });
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
};

// Execute immediately if DOM ready, otherwise wait for load
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initReveal();
} else {
  document.addEventListener('DOMContentLoaded', initReveal);
}

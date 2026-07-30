document.addEventListener('DOMContentLoaded', () => {

  // ----- 1. DARK MODE TOGGLE & PERSISTENCE -----
  const themeToggle = document.querySelector('.theme-btn');
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Set initial theme state
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark');
  }

  if (themeToggle) {
    const updateToggleIcon = () => {
      const isDark = document.body.classList.contains('dark');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    };

    // Initialize button state
    updateToggleIcon();

    themeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      document.body.classList.toggle('dark');

      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateToggleIcon();
    });
  }

  // ----- 2. BACK TO TOP BUTTON WITH OPTIMIZED SCROLL -----
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

  // ----- 3. SCROLL REVEAL OBSERVER -----
  const revealItems = document.querySelectorAll('.reveal');

  if (revealItems.length > 0) {
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
        { threshold: 0.15 }
      );

      revealItems.forEach((item) => {
        // Instant check if item is already inside the viewport on load
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          item.classList.add('is-visible');
        } else {
          observer.observe(item);
        }
      });
    } else {
      // Fallback for browsers without IntersectionObserver support
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }
  }
});

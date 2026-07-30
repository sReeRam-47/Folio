// Run as soon as script loads without relying strictly on DOMContentLoaded
(function () {
  const init = () => {
    // 1. DARK MODE TOGGLE
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

    // 2. BACK TO TOP BUTTON
    const toTop = document.querySelector('#to-top');
    if (toTop) {
      window.addEventListener('scroll', () => {
        toTop.classList.toggle('show', window.scrollY > 300);
      }, { passive: true });

      toTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // 3. SCROLL REVEAL OBSERVER (FIXED FOR IMMEDIATE SHOW)
    const revealItems = document.querySelectorAll('.reveal');

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
        { threshold: 0.05, rootMargin: '50px 0px 0px 0px' }
      );

      revealItems.forEach((item) => {
        observer.observe(item);
        // Instant check if item is in view immediately on load
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          item.classList.add('is-visible');
        }
      });
    } else {
      // Fallback: show everything immediately
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

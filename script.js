// ----- 1. DARK MODE TOGGLE -----
const themeToggle = document.querySelector('#theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    const isDark = document.body.classList.contains('dark');
    // Sun for light mode, moon for dark mode
    themeToggle.textContent = isDark ? '🌙' : '☀️';
  });
}

// ----- 2. BACK TO TOP BUTTON -----
const toTop = document.querySelector('#to-top');

if (toTop) {
  window.addEventListener('scroll', () => {
    // correct property: scrollY (capital Y)
    if (window.scrollY > 300) {
      toTop.classList.add('show');
    } else {
      toTop.classList.remove('show');
    }
  });

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ----- 3. SCROLL REVEAL -----
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
    {
      threshold: 0.15
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  // Fallback: if no IntersectionObserver, just show elements
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

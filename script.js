// Check saved preference OR system preference on load
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.body.classList.add('dark');
}

// Keep button icon in sync on load
if (themeToggle) {
  const updateIcon = () => {
    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  };

  updateIcon(); // Initial set

  themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    document.body.classList.toggle('dark');
    
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateIcon();
  });
}

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

const themeToggle = document.querySelector('.theme-toggle');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
  themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
  document.querySelector('meta[name="theme-color"]').content =
    theme === 'light' ? '#f4f5f5' : '#080d10';
}
try {
  setTheme(localStorage.getItem('miauflix-theme') === 'light' ? 'light' : 'dark');
} catch {
  setTheme('dark');
}
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  setTheme(theme);
  try {
    localStorage.setItem('miauflix-theme', theme);
  } catch {
    /* Theme still works without storage. */
  }
});

const copyButton = document.querySelector('.copy-button');
const copyStatus = document.querySelector('.copy-status');
copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(document.querySelector('#setup-commands').textContent);
    copyButton.querySelector('span').textContent = 'Copied!';
    copyStatus.textContent = 'Quick start commands copied to clipboard.';
    setTimeout(() => {
      copyButton.querySelector('span').textContent = 'Copy commands';
    }, 2500);
  } catch {
    copyStatus.textContent = 'Clipboard unavailable. Select and copy the commands above.';
  }
});

const carousel = document.querySelector('.screenshot-carousel');
if (carousel) {
  const track = carousel.querySelector('.carousel-track');
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const dots = [...carousel.querySelectorAll('.carousel-dot')];
  const status = carousel.querySelector('.carousel-status');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeIndex = 0;
  let hovered = false;
  let inView = false;
  let timer;

  function show(index, announce = false) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const offset = (i - activeIndex + slides.length) % slides.length;
      const position =
        offset === 0
          ? 'center'
          : offset === 1
            ? 'right'
            : offset === slides.length - 1
              ? 'left'
              : 'hidden';
      slide.setAttribute('aria-hidden', String(position === 'hidden'));
      const crossesBack =
        slide.dataset.position &&
        slide.dataset.position !== 'center' &&
        position !== 'center' &&
        slide.dataset.position !== position;
      if (crossesBack) slide.classList.add('is-repositioning');
      slide.dataset.position = position;
      if (crossesBack) {
        window.requestAnimationFrame(() =>
          window.requestAnimationFrame(() => {
            slide.classList.remove('is-repositioning');
          }),
        );
      }
    });
    dots.forEach((dot, i) => {
      if (i === activeIndex) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    status.setAttribute('aria-live', announce ? 'polite' : 'off');
    status.textContent = `${activeIndex + 1} of ${slides.length} · ${slides[activeIndex].querySelector('figcaption').textContent}`;
  }
  function schedule() {
    clearInterval(timer);
    if (
      reducedMotion.matches ||
      hovered ||
      !inView ||
      document.hidden ||
      carousel.contains(document.activeElement)
    )
      return;
    timer = window.setInterval(() => show(activeIndex + 1), 5000);
  }
  function navigate(index) {
    show(index, true);
    schedule();
  }
  carousel
    .querySelector('.carousel-previous')
    .addEventListener('click', () => navigate(activeIndex - 1));
  carousel
    .querySelector('.carousel-next')
    .addEventListener('click', () => navigate(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => navigate(index)));
  track.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') navigate(0);
    else if (event.key === 'End') navigate(slides.length - 1);
    else navigate(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
  });
  carousel.addEventListener('mouseenter', () => {
    hovered = true;
    schedule();
  });
  carousel.addEventListener('mouseleave', () => {
    hovered = false;
    schedule();
  });
  carousel.addEventListener('focusin', schedule);
  carousel.addEventListener('focusout', () => window.setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', schedule);
  new IntersectionObserver(
    (entries) => {
      inView = entries[0].isIntersecting;
      schedule();
    },
    { threshold: 0.4 },
  ).observe(track);

  show(0);
  carousel.classList.add('is-rotating');
  carousel.querySelector('.carousel-controls').hidden = false;
}

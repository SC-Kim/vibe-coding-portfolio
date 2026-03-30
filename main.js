// Intersection Observer: fade-in elements when they enter the viewport
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-in').forEach((el) => {
  fadeObserver.observe(el);
});

// READ MORE: toggle extra portfolio section with smooth scroll
const readMoreBtn = document.getElementById('readMoreBtn');
const extraContent = document.getElementById('extraContent');

readMoreBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const isOpen = extraContent.classList.contains('open');

  if (isOpen) {
    // Collapse: set explicit height first, then animate to 0
    extraContent.style.height = extraContent.scrollHeight + 'px';
    extraContent.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      extraContent.style.height = '0';
    });
    extraContent.classList.remove('open');
    readMoreBtn.textContent = 'READ MORE';
  } else {
    // Expand: measure full height and animate to it
    extraContent.style.overflow = 'hidden';
    extraContent.style.height = '0';
    extraContent.classList.add('open');

    const fullHeight = extraContent.scrollHeight + 'px';
    extraContent.style.height = fullHeight;

    extraContent.addEventListener(
      'transitionend',
      () => {
        // After animation, remove fixed height so content reflows freely
        extraContent.style.height = '';
        extraContent.style.overflow = '';
      },
      { once: true }
    );

    readMoreBtn.textContent = 'READ LESS';

    // Trigger fade-in for newly revealed elements
    extraContent.querySelectorAll('.fade-in').forEach((el) => {
      if (!el.classList.contains('visible')) {
        setTimeout(() => el.classList.add('visible'), 50);
      }
    });

    // Smooth scroll to the extra section
    setTimeout(() => {
      extraContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
});

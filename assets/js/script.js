// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Parallax tilt on leaderboard (desktop only)
const lbStage = document.querySelector('.lb-stage');
const lbCard = document.querySelector('.lb-card');
const isDesktop = () => window.matchMedia('(min-width: 1025px) and (hover: hover)').matches;
if (lbStage && lbCard) {
  lbStage.addEventListener('mousemove', (e) => {
    if (!isDesktop()) return;
    const rect = lbStage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    lbCard.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
  });
  lbStage.addEventListener('mouseleave', () => {
    if (!isDesktop()) return;
    lbCard.style.transform = 'rotateY(-6deg) rotateX(2deg)';
  });
}

// Parallax mesh blobs
const blobs = document.querySelectorAll('.mesh-blob');
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      blobs.forEach((blob, i) => {
        const speed = (i + 1) * 0.06;
        blob.style.transform = `translateY(${y * speed}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Mobile menu
const burger = document.getElementById('navBurger');
const menu = document.getElementById('mobileMenu');
const menuLinks = menu.querySelectorAll('a');
function toggleMenu(force) {
  const willOpen = force !== undefined ? force : !burger.classList.contains('open');
  burger.classList.toggle('open', willOpen);
  menu.classList.toggle('open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
}
burger.addEventListener('click', () => toggleMenu());
menuLinks.forEach(a => a.addEventListener('click', () => toggleMenu(false)));
// Close on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });
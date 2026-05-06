// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== MOBILE NAV =====
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavClose = document.querySelector('.mobile-nav-close');
const mobileLinks = document.querySelectorAll('.mobile-nav a');

function toggleMobileNav() {
  mobileNav.classList.toggle('open');
  hamburger.classList.toggle('active');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMobileNav);
mobileNavClose.addEventListener('click', toggleMobileNav);
mobileLinks.forEach(link => link.addEventListener('click', toggleMobileNav));

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== MENU TABS =====
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCards = document.querySelectorAll('.menu-card');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const category = tab.dataset.category;

    menuCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = '';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => { card.style.display = 'none'; }, 400);
      }
    });
  });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => sectionObserver.observe(section));

// ===== RESERVATION FORM =====
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(reservationForm);
    const data = Object.fromEntries(formData.entries());

    // Validation
    let valid = true;
    if (!data.name || !data.phone || !data.date || !data.time || !data.guests || !data.store) {
      valid = false;
    }
    if (valid) {
      const btn = reservationForm.querySelector('.btn-submit');
      const orig = btn.textContent;
      btn.textContent = '✓ 訂位成功！我們將盡快與您聯繫';
      btn.style.background = '#2D5F4A';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
        reservationForm.reset();
      }, 3000);
    } else {
      alert('請填寫所有必填欄位');
    }
  });
}

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.highlight-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const increment = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current + suffix;
      }, 25);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ===== SMOOTH NAV CLICKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navH = navbar.offsetHeight;
      const pos = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  });
});

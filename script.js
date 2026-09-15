/* ══════════════════════════════════════════════
   DARCOD — Black Fits Better
   JavaScript — Animations & Interactions
   ══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── LOADER ───
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2200);
  });
  // Fallback: if load event already fired
  if (document.readyState === 'complete') {
    setTimeout(() => loader.classList.add('hidden'), 2200);
  }
  document.body.style.overflow = 'hidden';


  // ─── CURSOR GLOW ───
  const cursorGlow = document.getElementById('cursor-glow');
  if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }


  // ─── NAVBAR SCROLL ───
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = current;
  }, { passive: true });


  // ─── MOBILE MENU ───
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // ─── ACTIVE NAV LINK ON SCROLL ───
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });


  // ─── REVEAL ON SCROLL ───
  const revealElements = document.querySelectorAll('.reveal-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ─── COUNTER ANIMATION ───
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target) {
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }


  // ─── PARTICLES (subtle floating dots) ───
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const count = 40;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position: absolute;
        width: ${Math.random() * 2 + 1}px;
        height: ${Math.random() * 2 + 1}px;
        background: rgba(255,255,255,${Math.random() * 0.08 + 0.02});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      particlesContainer.appendChild(dot);
    }

    // Add particle keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes particleFloat {
        0%, 100% { transform: translate(0, 0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        50% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 60 + 20}px, -${Math.random() * 80 + 30}px); }
      }
    `;
    document.head.appendChild(style);
  }


  // ─── SMOOTH SCROLL FOR ANCHOR LINKS ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ─── CONTACT FORM ───
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple form "sent" feedback
      const btnText = submitBtn.querySelector('.btn-text');
      const btnIcon = submitBtn.querySelector('.btn-icon');
      
      btnText.textContent = 'Sent!';
      btnIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
      submitBtn.classList.add('sent');

      contactForm.reset();

      setTimeout(() => {
        btnText.textContent = 'Send Message';
        btnIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
        submitBtn.classList.remove('sent');
      }, 3000);
    });
  }


  // ─── PARALLAX on hero title (subtle) ───
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroTitle.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroTitle.style.opacity = 1 - (scrolled / window.innerHeight) * 0.6;
      }
    }, { passive: true });
  }

});

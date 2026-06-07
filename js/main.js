/* ============================================
   DUA FOUNDATION — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Navigation Toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      navOverlay.classList.toggle('visible');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      navOverlay.classList.remove('visible');
      document.body.style.overflow = '';
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        navOverlay.classList.remove('visible');
        document.body.style.overflow = '';
      }
    });
  });

  // ---- Navbar scroll effect ----
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 50);
    }

    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 400);
    }
  });

  // ---- Back to Top ----
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Scroll Animations (Intersection Observer) ----
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  if (animateElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
  }

  // ---- Counter Animation (for stats) ----
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);
      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll('[data-target]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Tab Functionality (Activities page) ----
  const tabBtns = document.querySelectorAll('.tab-btn');
  const activityCards = document.querySelectorAll('.activity-card');

  if (tabBtns.length && activityCards.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        activityCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'flex';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- Donate Amount Selection ----
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customAmountInput = document.querySelector('.amount-input-wrapper input');

  if (amountBtns.length) {
    amountBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        if (customAmountInput) {
          customAmountInput.value = btn.textContent.replace(/[^\d]/g, '');
        }
      });
    });
  }

  // ---- Donate Type Toggle ----
  const typeBtns = document.querySelectorAll('.type-btn');
  if (typeBtns.length) {
    typeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        typeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // ---- Contact Form Submission (demo) ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = this.querySelector('.form-submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '✓ Message Sent Successfully!';
      submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        this.reset();
      }, 3000);
    });
  }

  // ---- Set Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.nav-donate-btn)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || 
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});

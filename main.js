document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu handling
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    if (!burgerBtn || !mobileOverlay) return;
    burgerBtn.classList.add('open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    mobileOverlay.removeAttribute('hidden');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    if (!burgerBtn || !mobileOverlay) return;
    burgerBtn.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    mobileOverlay.setAttribute('hidden', '');
    document.body.classList.remove('menu-open');
  }

  function toggleMenu() {
    const isExpanded = burgerBtn?.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (burgerBtn) {
    burgerBtn.addEventListener('click', toggleMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', (e) => {
      if (e.target === mobileOverlay) {
        closeMenu();
      }
    });
  }

  mobileNavLinks.forEach((link, index) => {
    link.style.animationDelay = `${0.06 * (index + 1)}s`;
    link.addEventListener('click', () => {
      mobileNavLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
      closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'Escape' &&
      burgerBtn &&
      burgerBtn.getAttribute('aria-expanded') === 'true'
    ) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (
      window.innerWidth > 720 &&
      burgerBtn &&
      burgerBtn.getAttribute('aria-expanded') === 'true'
    ) {
      closeMenu();
    }
  });

  // Nav link active switching on desktop
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  desktopNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      desktopNavLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Stats count-up animation
  const statItems = document.querySelectorAll('.stat-item');

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateStat(statEl, index) {
    const target = parseFloat(statEl.getAttribute('data-target'));
    const suffix = statEl.getAttribute('data-suffix') || '';
    const decimals = parseInt(statEl.getAttribute('data-decimals') || '0', 10);
    const valueEl = statEl.querySelector('.stat-value');

    if (!valueEl || isNaN(target)) return;

    const duration = 1500 + index * 80;
    const startDelay = 480 + index * 90;

    setTimeout(() => {
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const currentVal = easedProgress * target;

        valueEl.textContent = currentVal.toFixed(decimals) + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          valueEl.textContent = target.toFixed(decimals) + suffix;
        }
      }

      requestAnimationFrame(update);
    }, startDelay);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            statItems.forEach((statEl, idx) => {
              animateStat(statEl, idx);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    const statsFooter = document.querySelector('.stats-footer');
    if (statsFooter) {
      observer.observe(statsFooter);
    }
  } else {
    // Fallback if IntersectionObserver is not supported
    statItems.forEach((statEl, idx) => {
      animateStat(statEl, idx);
    });
  }
});

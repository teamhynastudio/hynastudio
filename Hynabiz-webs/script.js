/**
 * HYNA BIZ — Minimalist Web Interactions
 * Clean, lightweight, and responsive
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navCapsule = document.querySelector('.nav-capsule');
  const mobileToggle = document.getElementById('navMobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileClose = document.getElementById('mobileDrawerClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // 1. Scroll effect for floating capsule
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navCapsule.classList.add('scrolled');
    } else {
      navCapsule.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile Navigation Drawer Handlers
  function openMobileMenu() {
    if (!mobileDrawer || !mobileOverlay) return;
    mobileDrawer.classList.add('open');
    mobileOverlay.style.display = 'block';
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileDrawer || !mobileOverlay) return;
    mobileDrawer.classList.remove('open');
    mobileOverlay.style.display = 'none';
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openMobileMenu);
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 3. Region Selector Dropdown Handlers
  const regionSelector = document.getElementById('regionSelector');
  const regionBtn = document.getElementById('regionBtn');
  const regionText = document.getElementById('currentRegionText');
  const regionItems = document.querySelectorAll('.region-item');
  const mobileRegionSelect = document.getElementById('mobileRegionDropdown');

  if (regionBtn && regionSelector) {
    regionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = regionSelector.classList.toggle('open');
      regionBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!regionSelector.contains(e.target)) {
        regionSelector.classList.remove('open');
        regionBtn.setAttribute('aria-expanded', 'false');
      }
    });

    regionItems.forEach(item => {
      item.addEventListener('click', () => {
        const region = item.getAttribute('data-region');
        if (regionText) regionText.textContent = region;

        regionItems.forEach(ri => ri.classList.remove('active'));
        item.classList.add('active');

        if (mobileRegionSelect) {
          mobileRegionSelect.value = region;
        }

        regionSelector.classList.remove('open');
        regionBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (mobileRegionSelect) {
    mobileRegionSelect.addEventListener('change', (e) => {
      const region = e.target.value;
      if (regionText) regionText.textContent = region;
      regionItems.forEach(ri => {
        if (ri.getAttribute('data-region') === region) {
          ri.classList.add('active');
        } else {
          ri.classList.remove('active');
        }
      });
    });
  }
});

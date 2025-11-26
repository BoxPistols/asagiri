/**
 * Scroll To Top Module
 * Handles scroll-to-top button visibility and smooth scrolling
 */

(function() {
  'use strict';

  // Configuration constants
  var SCROLL_THRESHOLD = 300; // pixels to scroll before showing button
  var THROTTLE_DELAY = 100;   // milliseconds between scroll checks

  var scrollTopBtn = null;
  var lastScrollTime = 0;
  var ticking = false;

  /**
   * Throttled scroll handler for better performance
   */
  function handleScroll() {
    var now = Date.now();

    if (now - lastScrollTime < THROTTLE_DELAY) {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function() {
          updateButtonVisibility();
          ticking = false;
        });
      }
      return;
    }

    lastScrollTime = now;
    updateButtonVisibility();
  }

  /**
   * Update the visibility of the scroll-to-top button
   */
  function updateButtonVisibility() {
    if (!scrollTopBtn) return;

    if (window.pageYOffset > SCROLL_THRESHOLD) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  }

  /**
   * Smoothly scroll to the top of the page
   */
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Initialize the scroll-to-top functionality
   */
  function initScrollTop() {
    scrollTopBtn = document.getElementById('scrollTopBtn');

    if (!scrollTopBtn) {
      // Try alternative selectors
      scrollTopBtn = document.querySelector('.scroll-top');
    }

    if (scrollTopBtn) {
      // Use addEventListener instead of onclick
      scrollTopBtn.addEventListener('click', scrollToTop);

      // Add throttled scroll listener
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Initial visibility check
      updateButtonVisibility();
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollTop);
  } else {
    initScrollTop();
  }

  // Expose functions globally for backward compatibility
  window.scrollToTop = scrollToTop;
})();

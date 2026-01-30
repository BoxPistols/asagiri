/**
 * Ripple Effect Module
 * Material Design 3 inspired ripple effect for interactive elements
 *
 * Usage:
 *   Add .ripple class to any element
 *   Or call AsagiriRipple.init() to auto-initialize all buttons
 */

(function() {
  'use strict';

  // Animation duration constant (matches CSS animation duration)
  const RIPPLE_DURATION = 600;

  /**
   * Create ripple effect on element
   * @param {MouseEvent} event - Click event
   * @param {HTMLElement} element - Target element
   */
  function createRipple(event, element) {
    // Get element dimensions and position
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    // Create ripple wave element
    const ripple = document.createElement('span');
    ripple.className = 'ripple-wave';
    ripple.style.cssText = `width: ${size}px;height: ${size}px;left: ${x}px;top: ${y}px;`;

    element.appendChild(ripple);

    // Remove ripple after animation completes using animationend event for reliability
    ripple.addEventListener('animationend', function() {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    });

    // Fallback removal in case animationend doesn't fire
    setTimeout(function() {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, RIPPLE_DURATION + 100);
  }

  /**
   * Create centered ripple effect (for FABs, icon buttons)
   * @param {MouseEvent} event - Click event
   * @param {HTMLElement} element - Target element
   */
  function createCenteredRipple(event, element) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple-wave';
    ripple.style.cssText = `width: ${size}px;height: ${size}px;left: 50%;top: 50%;margin-left: ${-size / 2}px;margin-top: ${-size / 2}px;`;

    element.appendChild(ripple);

    // Remove ripple after animation completes using animationend event for reliability
    ripple.addEventListener('animationend', function() {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    });

    // Fallback removal in case animationend doesn't fire
    setTimeout(function() {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, RIPPLE_DURATION + 100);
  }

  /**
   * Handle click event for ripple
   * @param {MouseEvent} event - Click event
   */
  function handleRippleClick(event) {
    const element = event.currentTarget;

    // Check if it's a centered ripple
    if (element.classList.contains('ripple-centered')) {
      createCenteredRipple(event, element);
    } else {
      createRipple(event, element);
    }
  }

  // Ripple variant classes for checking
  const RIPPLE_CLASSES = ['ripple', 'ripple-light', 'ripple-dark', 'ripple-primary', 'ripple-success', 'ripple-danger'];

  /**
   * Initialize ripple effects on elements
   * @param {string|HTMLElement|NodeList} selector - Elements to initialize
   */
  function init(selector) {
    let elements;

    if (typeof selector === 'string') {
      elements = document.querySelectorAll(selector);
    } else if (selector instanceof HTMLElement) {
      elements = [selector];
    } else if (selector instanceof NodeList) {
      elements = selector;
    } else {
      // Default: initialize all elements with .ripple class and all buttons
      elements = document.querySelectorAll('.ripple, button:not(.no-ripple), .button:not(.no-ripple), .btn:not(.no-ripple)');
    }

    elements.forEach(function(element) {
      // Avoid double initialization
      if (element.dataset.rippleInit === 'true') {
        return;
      }

      // Add ripple class if not present (check all variant classes)
      const hasRippleClass = RIPPLE_CLASSES.some(function(cls) {
        return element.classList.contains(cls);
      });
      if (!hasRippleClass) {
        element.classList.add('ripple');
      }

      element.addEventListener('click', handleRippleClick);
      element.dataset.rippleInit = 'true';
    });
  }

  /**
   * Destroy ripple effects on elements
   * @param {string|HTMLElement|NodeList} selector - Elements to destroy
   */
  function destroy(selector) {
    let elements;

    if (typeof selector === 'string') {
      elements = document.querySelectorAll(selector);
    } else if (selector instanceof HTMLElement) {
      elements = [selector];
    } else if (selector instanceof NodeList) {
      elements = selector;
    } else {
      elements = document.querySelectorAll('[data-ripple-init="true"]');
    }

    elements.forEach(function(element) {
      element.removeEventListener('click', handleRippleClick);
      delete element.dataset.rippleInit;

      // Remove any existing ripples
      const ripples = element.querySelectorAll('.ripple-wave');
      ripples.forEach(function(ripple) {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      });
    });
  }

  // Auto-initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      init();
    });
  } else {
    // DOM already loaded
    init();
  }

  // Expose API globally
  window.AsagiriRipple = {
    init: init,
    destroy: destroy,
    create: createRipple,
    createCentered: createCenteredRipple
  };
})();

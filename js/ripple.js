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

  /**
   * Create ripple effect on element
   * @param {MouseEvent} event - Click event
   * @param {HTMLElement} element - Target element
   */
  function createRipple(event, element) {
    // Remove any existing ripple waves
    var existingRipples = element.querySelectorAll('.ripple-wave');
    existingRipples.forEach(function(ripple) {
      if (ripple.dataset.removing !== 'true') {
        ripple.dataset.removing = 'true';
        setTimeout(function() {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        }, 600);
      }
    });

    // Get element dimensions and position
    var rect = element.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var x = event.clientX - rect.left - size / 2;
    var y = event.clientY - rect.top - size / 2;

    // Create ripple wave element
    var ripple = document.createElement('span');
    ripple.className = 'ripple-wave';
    ripple.style.cssText =
      'width: ' + size + 'px;' +
      'height: ' + size + 'px;' +
      'left: ' + x + 'px;' +
      'top: ' + y + 'px;';

    element.appendChild(ripple);

    // Remove ripple after animation completes
    setTimeout(function() {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  /**
   * Create centered ripple effect (for FABs, icon buttons)
   * @param {MouseEvent} event - Click event
   * @param {HTMLElement} element - Target element
   */
  function createCenteredRipple(event, element) {
    var existingRipples = element.querySelectorAll('.ripple-wave');
    existingRipples.forEach(function(ripple) {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    });

    var rect = element.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height) * 2;

    var ripple = document.createElement('span');
    ripple.className = 'ripple-wave';
    ripple.style.cssText =
      'width: ' + size + 'px;' +
      'height: ' + size + 'px;' +
      'left: 50%;' +
      'top: 50%;' +
      'margin-left: ' + (-size / 2) + 'px;' +
      'margin-top: ' + (-size / 2) + 'px;';

    element.appendChild(ripple);

    setTimeout(function() {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  /**
   * Handle click event for ripple
   * @param {MouseEvent} event - Click event
   */
  function handleRippleClick(event) {
    var element = event.currentTarget;

    // Check if it's a centered ripple
    if (element.classList.contains('ripple-centered')) {
      createCenteredRipple(event, element);
    } else {
      createRipple(event, element);
    }
  }

  /**
   * Initialize ripple effects on elements
   * @param {string|HTMLElement|NodeList} selector - Elements to initialize
   */
  function init(selector) {
    var elements;

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

      // Add ripple class if not present
      if (!element.classList.contains('ripple') &&
          !element.classList.contains('ripple-light') &&
          !element.classList.contains('ripple-dark') &&
          !element.classList.contains('ripple-primary')) {
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
    var elements;

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
      var ripples = element.querySelectorAll('.ripple-wave');
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

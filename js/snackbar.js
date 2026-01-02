/**
 * Snackbar / Toast Module
 * Material Design 3 inspired notifications
 *
 * Usage:
 *   AsagiriSnackbar.show('Message sent');
 *   AsagiriSnackbar.show('Item deleted', { action: { text: 'Undo', callback: () => {} } });
 *   AsagiriSnackbar.success('Saved successfully');
 *   AsagiriSnackbar.error('Something went wrong');
 */

(function() {
  'use strict';

  // Default configuration
  var defaults = {
    duration: 5000, // Auto-dismiss after 5 seconds (0 = no auto-dismiss)
    position: 'bottom-center', // bottom-center, bottom-left, bottom-right, top-center, top-left, top-right
    showProgress: false, // Show progress bar for auto-dismiss
    closeable: true, // Show close button
    maxStack: 3 // Maximum number of visible snackbars
  };

  // Container element reference
  var container = null;
  var snackbars = [];

  /**
   * Get or create container element
   * @param {string} position - Position of container
   * @returns {HTMLElement} Container element
   */
  function getContainer(position) {
    var positionClass = 'snackbar-' + position;

    if (container && container.classList.contains(positionClass)) {
      return container;
    }

    // Create new container
    if (container) {
      container.remove();
    }

    container = document.createElement('div');
    container.className = 'snackbar-container ' + positionClass;
    document.body.appendChild(container);

    return container;
  }

  /**
   * Create snackbar element
   * @param {string} message - Message to display
   * @param {Object} options - Snackbar options
   * @returns {HTMLElement} Snackbar element
   */
  function createSnackbar(message, options) {
    options = Object.assign({}, defaults, options);

    var snackbar = document.createElement('div');
    snackbar.className = 'snackbar';

    // Add variant class
    if (options.variant) {
      snackbar.classList.add('snackbar-' + options.variant);
    }

    // Icon
    var iconHtml = '';
    if (options.icon) {
      snackbar.classList.add('snackbar-with-icon');
      iconHtml = '<span class="snackbar-icon">' + options.icon + '</span>';
    }

    // Action button
    var actionHtml = '';
    if (options.action) {
      actionHtml = '<button class="snackbar-btn" type="button">' + options.action.text + '</button>';
    }

    // Close button
    var closeHtml = '';
    if (options.closeable) {
      closeHtml = '<button class="snackbar-close" type="button" aria-label="Close">&times;</button>';
    }

    // Progress bar
    var progressHtml = '';
    if (options.showProgress && options.duration > 0) {
      progressHtml = '<div class="snackbar-progress" style="--snackbar-duration: ' + options.duration + 'ms;"></div>';
    }

    // Build HTML
    snackbar.innerHTML = iconHtml +
      '<span class="snackbar-text">' + message + '</span>' +
      actionHtml +
      closeHtml +
      progressHtml;

    // Make position relative for progress bar
    if (options.showProgress) {
      snackbar.style.position = 'relative';
    }

    return snackbar;
  }

  /**
   * Show a snackbar
   * @param {string} message - Message to display
   * @param {Object} options - Snackbar options
   * @returns {Object} Snackbar instance with dismiss method
   */
  function show(message, options) {
    options = Object.assign({}, defaults, options);

    var containerEl = getContainer(options.position);
    var snackbar = createSnackbar(message, options);
    var dismissTimeout = null;
    var isDismissed = false;

    // Add to container
    containerEl.insertBefore(snackbar, containerEl.firstChild);
    snackbars.unshift(snackbar);

    // Remove excess snackbars
    while (snackbars.length > options.maxStack) {
      var oldSnackbar = snackbars.pop();
      dismiss(oldSnackbar);
    }

    // Show animation
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        snackbar.classList.add('show');
      });
    });

    // Dismiss function
    function dismiss(target) {
      target = target || snackbar;

      if (target._isDismissed) return;
      target._isDismissed = true;

      target.classList.remove('show');
      target.classList.add('hiding');

      setTimeout(function() {
        if (target.parentNode) {
          target.parentNode.removeChild(target);
        }
        var index = snackbars.indexOf(target);
        if (index > -1) {
          snackbars.splice(index, 1);
        }
      }, 300);
    }

    // Bind action button
    if (options.action && options.action.callback) {
      var actionBtn = snackbar.querySelector('.snackbar-btn');
      if (actionBtn) {
        actionBtn.addEventListener('click', function() {
          options.action.callback();
          dismiss();
        });
      }
    }

    // Bind close button
    var closeBtn = snackbar.querySelector('.snackbar-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        dismiss();
      });
    }

    // Auto-dismiss
    if (options.duration > 0) {
      dismissTimeout = setTimeout(function() {
        dismiss();
      }, options.duration);
    }

    // Pause on hover
    snackbar.addEventListener('mouseenter', function() {
      if (dismissTimeout) {
        clearTimeout(dismissTimeout);
      }
      var progress = snackbar.querySelector('.snackbar-progress');
      if (progress) {
        progress.style.animationPlayState = 'paused';
      }
    });

    snackbar.addEventListener('mouseleave', function() {
      if (options.duration > 0 && !snackbar._isDismissed) {
        dismissTimeout = setTimeout(function() {
          dismiss();
        }, Math.max(options.duration / 3, 1500));
      }
      var progress = snackbar.querySelector('.snackbar-progress');
      if (progress) {
        progress.style.animationPlayState = 'running';
      }
    });

    return {
      element: snackbar,
      dismiss: function() { dismiss(); }
    };
  }

  /**
   * Show success snackbar
   * @param {string} message - Message to display
   * @param {Object} options - Snackbar options
   * @returns {Object} Snackbar instance
   */
  function success(message, options) {
    options = Object.assign({}, options, {
      variant: 'success',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>'
    });
    return show(message, options);
  }

  /**
   * Show error snackbar
   * @param {string} message - Message to display
   * @param {Object} options - Snackbar options
   * @returns {Object} Snackbar instance
   */
  function error(message, options) {
    options = Object.assign({}, options, {
      variant: 'danger',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
      duration: 8000 // Longer duration for errors
    });
    return show(message, options);
  }

  /**
   * Show warning snackbar
   * @param {string} message - Message to display
   * @param {Object} options - Snackbar options
   * @returns {Object} Snackbar instance
   */
  function warning(message, options) {
    options = Object.assign({}, options, {
      variant: 'warning',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
    });
    return show(message, options);
  }

  /**
   * Show info snackbar
   * @param {string} message - Message to display
   * @param {Object} options - Snackbar options
   * @returns {Object} Snackbar instance
   */
  function info(message, options) {
    options = Object.assign({}, options, {
      variant: 'info',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
    });
    return show(message, options);
  }

  /**
   * Dismiss all snackbars
   */
  function dismissAll() {
    snackbars.slice().forEach(function(snackbar) {
      if (!snackbar._isDismissed) {
        snackbar._isDismissed = true;
        snackbar.classList.remove('show');
        snackbar.classList.add('hiding');
        setTimeout(function() {
          if (snackbar.parentNode) {
            snackbar.parentNode.removeChild(snackbar);
          }
        }, 300);
      }
    });
    snackbars = [];
  }

  /**
   * Update default configuration
   * @param {Object} config - Configuration object
   */
  function configure(config) {
    Object.assign(defaults, config);
  }

  // Expose API globally
  window.AsagiriSnackbar = {
    show: show,
    success: success,
    error: error,
    warning: warning,
    info: info,
    dismissAll: dismissAll,
    configure: configure
  };
})();

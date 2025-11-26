/**
 * Theme Toggle Module
 * Handles light/dark theme switching with localStorage persistence
 */

(function() {
  'use strict';

  /**
   * Update theme toggle icon visibility
   * @param {string} theme - Current theme ('light' or 'dark')
   */
  function updateThemeIcon(theme) {
    const moon = document.getElementById('theme-icon-moon');
    const sun = document.getElementById('theme-icon-sun');

    if (moon && sun) {
      moon.style.display = theme === 'dark' ? 'none' : 'block';
      sun.style.display = theme === 'dark' ? 'block' : 'none';
    }
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Dispatch custom event for other scripts to listen to
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme: newTheme }
    }));
  }

  /**
   * Get the preferred theme based on saved preference or system settings
   * @returns {string} The preferred theme
   */
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  /**
   * Initialize the theme system
   */
  function initTheme() {
    const preferredTheme = getPreferredTheme();
    document.documentElement.setAttribute('data-theme', preferredTheme);
    updateThemeIcon(preferredTheme);

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
          const newTheme = e.matches ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', newTheme);
          updateThemeIcon(newTheme);
        }
      });
    }

    // Attach click handlers using addEventListener
    document.querySelectorAll('.theme-toggle').forEach(function(button) {
      button.addEventListener('click', toggleTheme);
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  // Expose functions globally for backward compatibility
  window.toggleTheme = toggleTheme;
  window.updateThemeIcon = updateThemeIcon;
  window.getPreferredTheme = getPreferredTheme;
})();

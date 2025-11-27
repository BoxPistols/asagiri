/**
 * Reusable UI Components
 * Dynamically injects common UI elements: navigation, theme toggle, scroll-to-top
 */

(function() {
  'use strict';

  // SVG Icons
  var icons = {
    moon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
    sun: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
    arrowUp: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>'
  };

  /**
   * Create theme toggle button HTML
   * @returns {string} HTML string for theme toggle
   */
  function createThemeToggle() {
    return '<button class="theme-toggle" aria-label="Toggle theme">' +
      '<span class="theme-icon-moon">' + icons.moon + '</span>' +
      '<span class="theme-icon-sun" style="display:none;">' + icons.sun + '</span>' +
      '</button>';
  }

  /**
   * Create scroll-to-top button HTML
   * @returns {string} HTML string for scroll-to-top button
   */
  function createScrollToTop() {
    return '<button class="scroll-top" id="scrollTopBtn" aria-label="Scroll to top">' +
      icons.arrowUp +
      '</button>';
  }

  /**
   * Create global navigation HTML
   * @param {Object} options - Navigation options
   * @param {string} options.basePath - Base path for links (e.g., '../' or './')
   * @returns {string} HTML string for navigation
   */
  function createNavigation(options) {
    var basePath = (options && options.basePath) || '';

    return '<nav class="global-nav">' +
      '<a href="' + basePath + 'index.html" class="nav-logo">Asagiri</a>' +
      '<div class="nav-links">' +
        '<a href="' + basePath + 'docs/index.html">Docs</a>' +
        '<a href="' + basePath + 'showcase.html">Components</a>' +
        '<a href="' + basePath + 'docs/guides/practical-examples.html">Examples</a>' +
        '<a href="' + basePath + 'docs/guides/developer-guide.html">Guides</a>' +
        '<a href="https://github.com/BoxPistols/asagiri" target="_blank">GitHub</a>' +
        createThemeToggle() +
      '</div>' +
    '</nav>';
  }

  /**
   * Inject components into the page
   * @param {Object} options - Injection options
   * @param {boolean} options.navigation - Include navigation (default: true)
   * @param {boolean} options.scrollTop - Include scroll-to-top (default: true)
   * @param {string} options.basePath - Base path for links
   */
  function injectComponents(options) {
    options = options || {};
    var basePath = options.basePath || '';
    var includeNav = options.navigation !== false;
    var includeScrollTop = options.scrollTop !== false;

    // Inject navigation at start of body
    if (includeNav && !document.querySelector('.global-nav')) {
      document.body.insertAdjacentHTML('afterbegin', createNavigation({ basePath: basePath }));
    }

    // Inject scroll-to-top button
    if (includeScrollTop && !document.getElementById('scrollTopBtn')) {
      document.body.insertAdjacentHTML('beforeend', createScrollToTop());
    }
  }

  /**
   * Update theme icons based on current theme
   * Works with both id-based and class-based icons
   * @param {string} theme - Current theme
   */
  function updateThemeIcons(theme) {
    // ID-based icons (legacy)
    var moonById = document.getElementById('theme-icon-moon');
    var sunById = document.getElementById('theme-icon-sun');
    if (moonById && sunById) {
      moonById.style.display = theme === 'dark' ? 'none' : 'block';
      sunById.style.display = theme === 'dark' ? 'block' : 'none';
    }

    // Class-based icons (new)
    document.querySelectorAll('.theme-icon-moon').forEach(function(el) {
      el.style.display = theme === 'dark' ? 'none' : 'inline-flex';
    });
    document.querySelectorAll('.theme-icon-sun').forEach(function(el) {
      el.style.display = theme === 'dark' ? 'inline-flex' : 'none';
    });
  }

  // Expose functions globally
  window.AsagiriComponents = {
    createThemeToggle: createThemeToggle,
    createScrollToTop: createScrollToTop,
    createNavigation: createNavigation,
    injectComponents: injectComponents,
    updateThemeIcons: updateThemeIcons,
    icons: icons
  };
})();

export default {
  title: 'Components/Navigation',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Global navigation component with theme toggle and responsive design. Styles are inherited from the framework SCSS.',
      },
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Theme mode',
    },
    activePage: {
      control: 'select',
      options: ['docs', 'components', 'examples', 'guides', 'none'],
      description: 'Active navigation item',
    },
  },
};

// Storybook-specific position override (nav is normally fixed)
const storyStyles = `
  <style>
    .global-nav { position: relative; }
  </style>
`;

const moonIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
const sunIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

const createNavigation = ({ theme = 'light', activePage = 'none' }) => {
  const getActiveClass = (page) => activePage === page ? 'active' : '';
  const themeIcon = theme === 'dark' ? sunIcon : moonIcon;

  return `
    ${storyStyles}
    <div data-theme="${theme}">
      <nav class="global-nav">
        <a href="#" class="nav-logo">Asagiri</a>
        <div class="nav-links">
          <a href="#" class="${getActiveClass('docs')}">Docs</a>
          <a href="#" class="${getActiveClass('components')}">Components</a>
          <a href="#" class="${getActiveClass('examples')}">Examples</a>
          <a href="#" class="${getActiveClass('guides')}">Guides</a>
          <a href="#" target="_blank">GitHub</a>
          <button class="theme-toggle" aria-label="Toggle theme">
            ${themeIcon}
          </button>
        </div>
      </nav>
    </div>
  `;
};

export const Default = {
  args: {
    theme: 'light',
    activePage: 'none',
  },
  render: createNavigation,
};

export const WithActiveItem = {
  args: {
    theme: 'light',
    activePage: 'docs',
  },
  render: createNavigation,
};

export const DarkMode = {
  args: {
    theme: 'dark',
    activePage: 'none',
  },
  render: createNavigation,
};

export const DarkModeWithActiveItem = {
  args: {
    theme: 'dark',
    activePage: 'components',
  },
  render: createNavigation,
};

export const AllStates = {
  render: () => `
    ${storyStyles}
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin-bottom: 0.5rem; color: var(--color-text-muted);">Light Mode</h4>
        <div data-theme="light">
          <nav class="global-nav">
            <a href="#" class="nav-logo">Asagiri</a>
            <div class="nav-links">
              <a href="#" class="active">Docs</a>
              <a href="#">Components</a>
              <a href="#">Examples</a>
              <a href="#">Guides</a>
              <a href="#" target="_blank">GitHub</a>
              <button class="theme-toggle" aria-label="Toggle theme">
                ${moonIcon}
              </button>
            </div>
          </nav>
        </div>
      </div>
      <div>
        <h4 style="margin-bottom: 0.5rem; color: var(--color-text-muted);">Dark Mode</h4>
        <div data-theme="dark" style="background: #18181b; padding: 1rem; border-radius: 8px;">
          <nav class="global-nav">
            <a href="#" class="nav-logo">Asagiri</a>
            <div class="nav-links">
              <a href="#">Docs</a>
              <a href="#" class="active">Components</a>
              <a href="#">Examples</a>
              <a href="#">Guides</a>
              <a href="#" target="_blank">GitHub</a>
              <button class="theme-toggle" aria-label="Toggle theme">
                ${sunIcon}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  `,
};

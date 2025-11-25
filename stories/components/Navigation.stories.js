export default {
  title: 'Components/Navigation',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Global navigation component with theme toggle and responsive design.',
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

const navStyles = `
  <style>
    .global-nav {
      position: relative;
      height: 60px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      z-index: 1000;
    }

    [data-theme="dark"] .global-nav {
      background: rgba(24, 24, 27, 0.95);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .nav-logo {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-primary);
      text-decoration: none;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .nav-links a {
      color: var(--color-text);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      transition: color 0.2s;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: var(--color-primary);
    }

    .theme-toggle {
      width: 32px;
      height: 32px;
      font-size: 0.875rem;
      padding: 0;
      background: var(--color-bg);
      border: 1px solid var(--color-border, rgba(0, 0, 0, 0.1));
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .theme-toggle:hover {
      background: var(--color-box);
      transform: scale(1.05);
    }

    [data-theme="dark"] .theme-toggle {
      background: var(--color-box);
      border-color: rgba(255, 255, 255, 0.1);
    }
  </style>
`;

const createNavigation = ({ theme = 'light', activePage = 'none' }) => {
  const getActiveClass = (page) => activePage === page ? 'active' : '';
  const themeIcon = theme === 'dark' ? '☀️' : '🌙';

  return `
    ${navStyles}
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
            <span>${themeIcon}</span>
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
    ${navStyles}
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
                <span>🌙</span>
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
                <span>☀️</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  `,
};

export default {
  title: 'Components/ThemeToggle',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Compact theme toggle button for switching between light and dark modes. Styles are inherited from the framework SCSS.',
      },
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Current theme state',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
  },
};

// Storybook-specific demo styles
const storyStyles = `
  <style>
    .toggle-demo-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 1rem;
    }
    .toggle-demo-row {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .toggle-demo-label {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      min-width: 100px;
    }
  </style>
`;

const moonIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
const sunIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

const sizeMap = {
  sm: 'theme-toggle-sm',
  md: '',
  lg: 'theme-toggle-lg',
};

const createThemeToggle = ({ theme = 'light', size = 'md' }) => {
  const icon = theme === 'dark' ? sunIcon : moonIcon;
  const sizeClass = sizeMap[size] || '';

  return `
    ${storyStyles}
    <div data-theme="${theme}" style="padding: 2rem; ${theme === 'dark' ? 'background: #18181b; border-radius: 8px;' : ''}">
      <div class="toggle-demo-container">
        <div class="toggle-demo-row">
          <span class="toggle-demo-label">${theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
          <button class="theme-toggle ${sizeClass}" aria-label="Toggle theme">
            ${icon}
          </button>
        </div>
      </div>
    </div>
  `;
};

export const LightMode = {
  args: {
    theme: 'light',
    size: 'md',
  },
  render: createThemeToggle,
};

export const DarkMode = {
  args: {
    theme: 'dark',
    size: 'md',
  },
  render: createThemeToggle,
};

export const Small = {
  args: {
    theme: 'light',
    size: 'sm',
  },
  render: createThemeToggle,
};

export const Large = {
  args: {
    theme: 'light',
    size: 'lg',
  },
  render: createThemeToggle,
};

export const AllSizes = {
  render: () => `
    ${storyStyles}
    <div class="toggle-demo-container">
      <h4 style="margin-bottom: 0.5rem; color: var(--color-text);">Size Variants</h4>

      <div class="toggle-demo-row">
        <span class="toggle-demo-label">Small (28px)</span>
        <button class="theme-toggle theme-toggle-sm" aria-label="Toggle theme">
          ${moonIcon}
        </button>
      </div>

      <div class="toggle-demo-row">
        <span class="toggle-demo-label">Medium (32px)</span>
        <button class="theme-toggle" aria-label="Toggle theme">
          ${moonIcon}
        </button>
      </div>

      <div class="toggle-demo-row">
        <span class="toggle-demo-label">Large (40px)</span>
        <button class="theme-toggle theme-toggle-lg" aria-label="Toggle theme">
          ${moonIcon}
        </button>
      </div>
    </div>
  `,
};

export const AllStates = {
  render: () => `
    ${storyStyles}
    <div class="toggle-demo-container">
      <h4 style="margin-bottom: 0.5rem; color: var(--color-text);">Theme States</h4>

      <div data-theme="light">
        <div class="toggle-demo-row">
          <span class="toggle-demo-label">Light Mode</span>
          <button class="theme-toggle" aria-label="Toggle theme">
            ${moonIcon}
          </button>
          <span style="font-size: 0.75rem; color: var(--color-text-muted);">Click to switch to dark</span>
        </div>
      </div>

      <div data-theme="dark" style="background: #18181b; padding: 1rem; border-radius: 8px; margin-top: 0.5rem;">
        <div class="toggle-demo-row">
          <span class="toggle-demo-label" style="color: #a1a1aa;">Dark Mode</span>
          <button class="theme-toggle" aria-label="Toggle theme">
            ${sunIcon}
          </button>
          <span style="font-size: 0.75rem; color: #71717a;">Click to switch to light</span>
        </div>
      </div>

      <div style="margin-top: 1rem;">
        <div class="toggle-demo-row">
          <span class="toggle-demo-label">Hover State</span>
          <button class="theme-toggle" style="background: var(--color-box); transform: scale(1.05);" aria-label="Toggle theme">
            ${moonIcon}
          </button>
        </div>
      </div>

      <div>
        <div class="toggle-demo-row">
          <span class="toggle-demo-label">Focus State</span>
          <button class="theme-toggle" style="outline: 2px solid var(--color-primary); outline-offset: 2px;" aria-label="Toggle theme">
            ${moonIcon}
          </button>
        </div>
      </div>
    </div>
  `,
};

export const Interactive = {
  render: () => `
    ${storyStyles}
    <style>
      .interactive-demo {
        padding: 2rem;
        border-radius: 8px;
        transition: background-color 0.3s, color 0.3s;
      }
      .interactive-demo[data-theme="light"] {
        background: #f9f9f9;
      }
      .interactive-demo[data-theme="dark"] {
        background: #18181b;
        color: #fafafa;
      }
    </style>
    <div class="interactive-demo" id="themeDemo" data-theme="light">
      <div class="toggle-demo-container">
        <h4>Interactive Demo</h4>
        <p style="font-size: 0.875rem; opacity: 0.7;">Click the toggle to switch themes:</p>
        <div class="toggle-demo-row">
          <span class="toggle-demo-label">Current Theme</span>
          <button class="theme-toggle" id="toggleBtn" aria-label="Toggle theme">
            <svg id="moonSvg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            <svg id="sunSvg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          </button>
          <span id="themeLabel" style="font-size: 0.875rem;">Light</span>
        </div>
      </div>
    </div>
    <script>
      (function() {
        const demo = document.getElementById('themeDemo');
        const btn = document.getElementById('toggleBtn');
        const moonSvg = document.getElementById('moonSvg');
        const sunSvg = document.getElementById('sunSvg');
        const label = document.getElementById('themeLabel');

        btn.addEventListener('click', function() {
          const current = demo.getAttribute('data-theme');
          const newTheme = current === 'dark' ? 'light' : 'dark';
          demo.setAttribute('data-theme', newTheme);
          moonSvg.style.display = newTheme === 'dark' ? 'none' : 'block';
          sunSvg.style.display = newTheme === 'dark' ? 'block' : 'none';
          label.textContent = newTheme === 'dark' ? 'Dark' : 'Light';
        });
      })();
    </script>
  `,
};

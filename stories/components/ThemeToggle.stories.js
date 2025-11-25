export default {
  title: 'Components/ThemeToggle',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Compact theme toggle button for switching between light and dark modes.',
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

const themeToggleStyles = `
  <style>
    .theme-toggle {
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

    .theme-toggle:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    [data-theme="dark"] .theme-toggle {
      background: var(--color-box);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .theme-toggle-sm {
      width: 28px;
      height: 28px;
      font-size: 0.75rem;
    }

    .theme-toggle-md {
      width: 32px;
      height: 32px;
      font-size: 0.875rem;
    }

    .theme-toggle-lg {
      width: 40px;
      height: 40px;
      font-size: 1rem;
    }

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

const sizeMap = {
  sm: 'theme-toggle-sm',
  md: 'theme-toggle-md',
  lg: 'theme-toggle-lg',
};

const createThemeToggle = ({ theme = 'light', size = 'md' }) => {
  const icon = theme === 'dark' ? '☀️' : '🌙';
  const sizeClass = sizeMap[size] || 'theme-toggle-md';

  return `
    ${themeToggleStyles}
    <div data-theme="${theme}" style="padding: 2rem; ${theme === 'dark' ? 'background: #18181b; border-radius: 8px;' : ''}">
      <div class="toggle-demo-container">
        <div class="toggle-demo-row">
          <span class="toggle-demo-label">${theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
          <button class="theme-toggle ${sizeClass}" aria-label="Toggle theme">
            <span>${icon}</span>
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
    ${themeToggleStyles}
    <div class="toggle-demo-container">
      <h4 style="margin-bottom: 0.5rem; color: var(--color-text);">Size Variants</h4>

      <div class="toggle-demo-row">
        <span class="toggle-demo-label">Small (28px)</span>
        <button class="theme-toggle theme-toggle-sm" aria-label="Toggle theme">
          <span>🌙</span>
        </button>
      </div>

      <div class="toggle-demo-row">
        <span class="toggle-demo-label">Medium (32px)</span>
        <button class="theme-toggle theme-toggle-md" aria-label="Toggle theme">
          <span>🌙</span>
        </button>
      </div>

      <div class="toggle-demo-row">
        <span class="toggle-demo-label">Large (40px)</span>
        <button class="theme-toggle theme-toggle-lg" aria-label="Toggle theme">
          <span>🌙</span>
        </button>
      </div>
    </div>
  `,
};

export const AllStates = {
  render: () => `
    ${themeToggleStyles}
    <div class="toggle-demo-container">
      <h4 style="margin-bottom: 0.5rem; color: var(--color-text);">Theme States</h4>

      <div data-theme="light">
        <div class="toggle-demo-row">
          <span class="toggle-demo-label">Light Mode</span>
          <button class="theme-toggle theme-toggle-md" aria-label="Toggle theme">
            <span>🌙</span>
          </button>
          <span style="font-size: 0.75rem; color: var(--color-text-muted);">Click to switch to dark</span>
        </div>
      </div>

      <div data-theme="dark" style="background: #18181b; padding: 1rem; border-radius: 8px; margin-top: 0.5rem;">
        <div class="toggle-demo-row">
          <span class="toggle-demo-label" style="color: #a1a1aa;">Dark Mode</span>
          <button class="theme-toggle theme-toggle-md" aria-label="Toggle theme">
            <span>☀️</span>
          </button>
          <span style="font-size: 0.75rem; color: #71717a;">Click to switch to light</span>
        </div>
      </div>

      <div style="margin-top: 1rem;">
        <div class="toggle-demo-row">
          <span class="toggle-demo-label">Hover State</span>
          <button class="theme-toggle theme-toggle-md" style="background: var(--color-box); transform: scale(1.05);" aria-label="Toggle theme">
            <span>🌙</span>
          </button>
        </div>
      </div>

      <div>
        <div class="toggle-demo-row">
          <span class="toggle-demo-label">Focus State</span>
          <button class="theme-toggle theme-toggle-md" style="outline: 2px solid var(--color-primary); outline-offset: 2px;" aria-label="Toggle theme">
            <span>🌙</span>
          </button>
        </div>
      </div>
    </div>
  `,
};

export const Interactive = {
  render: () => `
    ${themeToggleStyles}
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
          <button class="theme-toggle theme-toggle-md" id="toggleBtn" aria-label="Toggle theme">
            <span id="toggleIcon">🌙</span>
          </button>
          <span id="themeLabel" style="font-size: 0.875rem;">Light</span>
        </div>
      </div>
    </div>
    <script>
      (function() {
        const demo = document.getElementById('themeDemo');
        const btn = document.getElementById('toggleBtn');
        const icon = document.getElementById('toggleIcon');
        const label = document.getElementById('themeLabel');

        btn.addEventListener('click', function() {
          const current = demo.getAttribute('data-theme');
          const newTheme = current === 'dark' ? 'light' : 'dark';
          demo.setAttribute('data-theme', newTheme);
          icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
          label.textContent = newTheme === 'dark' ? 'Dark' : 'Light';
        });
      })();
    </script>
  `,
};

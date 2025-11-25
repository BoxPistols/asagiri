export default {
  title: 'Components/ScrollToTop',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Scroll to top button that appears when page is scrolled down.',
      },
    },
  },
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Button visibility state',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Theme mode',
    },
  },
};

const scrollTopStyles = `
  <style>
    .scroll-top-demo {
      position: relative;
      width: 44px;
      height: 44px;
      background: var(--color-primary);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .scroll-top-demo:hover {
      background: var(--color-accent);
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    }

    .scroll-top-demo.hidden {
      opacity: 0.3;
    }

    .scroll-demo-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }

    .scroll-demo-row {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .scroll-demo-label {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      min-width: 120px;
    }
  </style>
`;

const createScrollToTop = ({ visible = true, theme = 'light' }) => {
  const visibilityClass = visible ? '' : 'hidden';

  return `
    ${scrollTopStyles}
    <div data-theme="${theme}" style="padding: 2rem; ${theme === 'dark' ? 'background: #18181b; border-radius: 8px;' : ''}">
      <div class="scroll-demo-container">
        <div class="scroll-demo-row">
          <span class="scroll-demo-label">${visible ? 'Visible State' : 'Hidden State'}</span>
          <button class="scroll-top-demo ${visibilityClass}" aria-label="Scroll to top">
            ↑
          </button>
        </div>
      </div>
    </div>
  `;
};

export const Default = {
  args: {
    visible: true,
    theme: 'light',
  },
  render: createScrollToTop,
};

export const Hidden = {
  args: {
    visible: false,
    theme: 'light',
  },
  render: createScrollToTop,
};

export const DarkMode = {
  args: {
    visible: true,
    theme: 'dark',
  },
  render: createScrollToTop,
};

export const AllStates = {
  render: () => `
    ${scrollTopStyles}
    <div class="scroll-demo-container">
      <h4 style="margin-bottom: 1rem; color: var(--color-text);">Scroll to Top Button States</h4>

      <div class="scroll-demo-row">
        <span class="scroll-demo-label">Default</span>
        <button class="scroll-top-demo" aria-label="Scroll to top">↑</button>
      </div>

      <div class="scroll-demo-row">
        <span class="scroll-demo-label">Hover (simulated)</span>
        <button class="scroll-top-demo" style="background: var(--color-accent); transform: translateY(-3px); box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);" aria-label="Scroll to top">↑</button>
      </div>

      <div class="scroll-demo-row">
        <span class="scroll-demo-label">Hidden</span>
        <button class="scroll-top-demo hidden" aria-label="Scroll to top">↑</button>
      </div>

      <div data-theme="dark" style="background: #18181b; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
        <div class="scroll-demo-row">
          <span class="scroll-demo-label" style="color: #a1a1aa;">Dark Mode</span>
          <button class="scroll-top-demo" aria-label="Scroll to top">↑</button>
        </div>
      </div>
    </div>
  `,
};

export const InteractiveDemo = {
  render: () => `
    ${scrollTopStyles}
    <style>
      .scroll-container {
        height: 400px;
        overflow-y: auto;
        position: relative;
        border: 1px solid var(--color-border);
        border-radius: 8px;
      }
      .scroll-content {
        padding: 2rem;
        height: 1000px;
        background: linear-gradient(to bottom, var(--color-bg), var(--color-box));
      }
      .fixed-scroll-btn {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
      }
    </style>
    <div>
      <p style="margin-bottom: 1rem; color: var(--color-text-muted);">Scroll down in the container below to see the button behavior:</p>
      <div class="scroll-container" id="scrollContainer">
        <div class="scroll-content">
          <h3>Scroll Down</h3>
          <p>The scroll-to-top button appears after scrolling 300px.</p>
          <p style="margin-top: 400px;">Keep scrolling...</p>
          <p style="margin-top: 200px;">Almost there...</p>
          <p style="margin-top: 200px;">You've reached the bottom!</p>
        </div>
        <button class="scroll-top-demo fixed-scroll-btn" id="scrollBtn" style="display: none;" aria-label="Scroll to top">↑</button>
      </div>
    </div>
    <script>
      (function() {
        const container = document.getElementById('scrollContainer');
        const btn = document.getElementById('scrollBtn');

        container.addEventListener('scroll', function() {
          if (container.scrollTop > 100) {
            btn.style.display = 'flex';
          } else {
            btn.style.display = 'none';
          }
        });

        btn.addEventListener('click', function() {
          container.scrollTo({ top: 0, behavior: 'smooth' });
        });
      })();
    </script>
  `,
};

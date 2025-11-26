export default {
  title: 'Components/ScrollToTop',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Scroll to top button that appears when page is scrolled down. Styles are inherited from the framework SCSS.',
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

// Storybook-specific overrides (button is normally fixed positioned)
const storyStyles = `
  <style>
    .scroll-top-demo {
      position: relative !important;
      opacity: 1 !important;
      visibility: visible !important;
    }
    .scroll-top-demo.hidden {
      opacity: 0.3 !important;
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
    ${storyStyles}
    <div data-theme="${theme}" style="padding: 2rem; ${theme === 'dark' ? 'background: #18181b; border-radius: 8px;' : ''}">
      <div class="scroll-demo-container">
        <div class="scroll-demo-row">
          <span class="scroll-demo-label">${visible ? 'Visible State' : 'Hidden State'}</span>
          <button class="scroll-top scroll-top-demo ${visibilityClass}" aria-label="Scroll to top">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
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
    ${storyStyles}
    <div class="scroll-demo-container">
      <h4 style="margin-bottom: 1rem; color: var(--color-text);">Scroll to Top Button States</h4>

      <div class="scroll-demo-row">
        <span class="scroll-demo-label">Default</span>
        <button class="scroll-top scroll-top-demo" aria-label="Scroll to top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
        </button>
      </div>

      <div class="scroll-demo-row">
        <span class="scroll-demo-label">Hidden</span>
        <button class="scroll-top scroll-top-demo hidden" aria-label="Scroll to top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
        </button>
      </div>

      <div data-theme="dark" style="background: #18181b; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
        <div class="scroll-demo-row">
          <span class="scroll-demo-label" style="color: #a1a1aa;">Dark Mode</span>
          <button class="scroll-top scroll-top-demo" aria-label="Scroll to top">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  `,
};

export const InteractiveDemo = {
  render: () => `
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
        position: absolute !important;
        bottom: 1rem;
        right: 1rem;
        opacity: 1 !important;
        visibility: visible !important;
      }
    </style>
    <div>
      <p style="margin-bottom: 1rem; color: var(--color-text-muted);">Scroll down in the container below to see the button behavior:</p>
      <div class="scroll-container" id="scrollContainer">
        <div class="scroll-content">
          <h3>Scroll Down</h3>
          <p>The scroll-to-top button appears after scrolling 100px.</p>
          <p style="margin-top: 400px;">Keep scrolling...</p>
          <p style="margin-top: 200px;">Almost there...</p>
          <p style="margin-top: 200px;">You've reached the bottom!</p>
        </div>
        <button class="scroll-top fixed-scroll-btn" id="scrollBtn" style="display: none;" aria-label="Scroll to top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
        </button>
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

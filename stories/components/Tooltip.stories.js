export default {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip placement',
    },
    variant: {
      control: 'select',
      options: ['dark', 'light', 'primary', 'success', 'danger', 'warning', 'info'],
      description: 'Tooltip variant',
    },
  },
};

const tooltipScript = `
<script>
  (function() {
    document.querySelectorAll('[data-tooltip]').forEach(trigger => {
      const text = trigger.getAttribute('data-tooltip');
      const placement = trigger.getAttribute('data-tooltip-placement') || 'top';
      const variant = trigger.getAttribute('data-tooltip-variant') || 'dark';

      const tooltip = document.createElement('div');
      tooltip.className = \`tooltip tooltip-\${placement} tooltip-\${variant}\`;
      tooltip.textContent = text;
      tooltip.style.position = 'absolute';
      tooltip.style.display = 'none';
      tooltip.style.zIndex = '9999';
      document.body.appendChild(tooltip);

      const showTooltip = () => {
        const rect = trigger.getBoundingClientRect();
        tooltip.style.display = 'block';

        let top, left;
        switch(placement) {
          case 'top':
            top = rect.top - tooltip.offsetHeight - 8;
            left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2);
            break;
          case 'bottom':
            top = rect.bottom + 8;
            left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2);
            break;
          case 'left':
            top = rect.top + (rect.height / 2) - (tooltip.offsetHeight / 2);
            left = rect.left - tooltip.offsetWidth - 8;
            break;
          case 'right':
            top = rect.top + (rect.height / 2) - (tooltip.offsetHeight / 2);
            left = rect.right + 8;
            break;
        }

        tooltip.style.top = top + window.scrollY + 'px';
        tooltip.style.left = left + window.scrollX + 'px';
      };

      const hideTooltip = () => {
        tooltip.style.display = 'none';
      };

      trigger.addEventListener('mouseenter', showTooltip);
      trigger.addEventListener('mouseleave', hideTooltip);
      trigger.addEventListener('focus', showTooltip);
      trigger.addEventListener('blur', hideTooltip);
    });
  })();
</script>
`;

export const BasicTooltip = {
  render: () => `
    <div style="padding: 3rem; text-align: center;">
      <button class="btn btn-primary" data-tooltip="This is a tooltip">
        Hover me
      </button>
    </div>
    ${tooltipScript}
  `,
};

export const Placements = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 3rem; align-items: center; padding: 3rem;">
      <button class="btn btn-secondary" data-tooltip="Tooltip on top" data-tooltip-placement="top">
        Top
      </button>

      <div style="display: flex; gap: 3rem;">
        <button class="btn btn-secondary" data-tooltip="Tooltip on left" data-tooltip-placement="left">
          Left
        </button>
        <button class="btn btn-secondary" data-tooltip="Tooltip on right" data-tooltip-placement="right">
          Right
        </button>
      </div>

      <button class="btn btn-secondary" data-tooltip="Tooltip on bottom" data-tooltip-placement="bottom">
        Bottom
      </button>
    </div>
    ${tooltipScript}
  `,
};

export const Variants = {
  render: () => `
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; padding: 3rem;">
      <button class="btn btn-light" data-tooltip="Dark tooltip (default)" data-tooltip-variant="dark">
        Dark
      </button>
      <button class="btn btn-dark" data-tooltip="Light tooltip" data-tooltip-variant="light">
        Light
      </button>
      <button class="btn btn-outline-primary" data-tooltip="Primary tooltip" data-tooltip-variant="primary">
        Primary
      </button>
      <button class="btn btn-outline-success" data-tooltip="Success tooltip" data-tooltip-variant="success">
        Success
      </button>
      <button class="btn btn-outline-danger" data-tooltip="Danger tooltip" data-tooltip-variant="danger">
        Danger
      </button>
      <button class="btn btn-outline-warning" data-tooltip="Warning tooltip" data-tooltip-variant="warning">
        Warning
      </button>
      <button class="btn btn-outline-info" data-tooltip="Info tooltip" data-tooltip-variant="info">
        Info
      </button>
    </div>
    ${tooltipScript}
  `,
};

export const OnIcons = {
  render: () => `
    <div style="display: flex; gap: 2rem; padding: 3rem;">
      <span data-tooltip="Edit" data-tooltip-placement="top" style="cursor: pointer; font-size: 1.5rem;">
        ✏️
      </span>
      <span data-tooltip="Delete" data-tooltip-placement="top" data-tooltip-variant="danger" style="cursor: pointer; font-size: 1.5rem;">
        🗑️
      </span>
      <span data-tooltip="Share" data-tooltip-placement="top" style="cursor: pointer; font-size: 1.5rem;">
        📤
      </span>
      <span data-tooltip="Download" data-tooltip-placement="top" style="cursor: pointer; font-size: 1.5rem;">
        💾
      </span>
      <span data-tooltip="Settings" data-tooltip-placement="top" style="cursor: pointer; font-size: 1.5rem;">
        ⚙️
      </span>
    </div>
    ${tooltipScript}
  `,
};

export const InContext = {
  render: () => `
    <div style="padding: 2rem;">
      <div class="card" style="max-width: 600px;">
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
          <h4>User Settings</h4>
          <span data-tooltip="Click for help" data-tooltip-placement="left" style="cursor: pointer;">
            ❓
          </span>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label">
              Username
              <span data-tooltip="Username must be unique" data-tooltip-placement="top" style="margin-left: 0.25rem; cursor: help; color: var(--color-text-muted);">
                ℹ️
              </span>
            </label>
            <input type="text" class="form-control" placeholder="Enter username">
          </div>

          <div class="form-group">
            <label class="form-label">
              Password
              <span data-tooltip="Minimum 8 characters, must include letters and numbers" data-tooltip-placement="top" style="margin-left: 0.25rem; cursor: help; color: var(--color-text-muted);">
                ℹ️
              </span>
            </label>
            <input type="password" class="form-control" placeholder="Enter password">
          </div>

          <div style="display: flex; gap: 1rem;">
            <button class="btn btn-primary">Save</button>
            <button class="btn btn-secondary" data-tooltip="Discard all changes" data-tooltip-placement="top">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    ${tooltipScript}
  `,
};

export const LongText = {
  render: () => `
    <div style="padding: 3rem; text-align: center;">
      <button class="btn btn-primary" data-tooltip="This is a longer tooltip with more detailed information that wraps to multiple lines" data-tooltip-placement="top">
        Hover for long tooltip
      </button>
    </div>
    ${tooltipScript}
  `,
};

export const DisabledElement = {
  render: () => `
    <div style="padding: 3rem; text-align: center;">
      <span data-tooltip="This button is disabled because you don't have permission" data-tooltip-placement="top">
        <button class="btn btn-primary" disabled>
          Disabled Button
        </button>
      </span>
    </div>
    ${tooltipScript}
  `,
};

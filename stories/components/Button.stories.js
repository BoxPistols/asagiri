export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: 'Button variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    outline: {
      control: 'boolean',
      description: 'Use outline style',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
    label: {
      control: 'text',
      description: 'Button text',
    },
  },
};

const createButton = ({ variant = 'primary', size = 'md', outline = false, disabled = false, fullWidth = false, label = 'Button' }) => {
  const classes = [
    'btn',
    outline ? `btn-outline-${variant}` : `btn-${variant}`,
    size !== 'md' ? `btn-${size}` : '',
    fullWidth ? 'btn-block' : '',
  ].filter(Boolean).join(' ');

  return `<button class="${classes}" ${disabled ? 'disabled' : ''}>${label}</button>`;
};

export const Primary = {
  args: {
    variant: 'primary',
    label: 'Primary Button',
  },
  render: createButton,
};

export const Secondary = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button',
  },
  render: createButton,
};

export const Success = {
  args: {
    variant: 'success',
    label: 'Success Button',
  },
  render: createButton,
};

export const Danger = {
  args: {
    variant: 'danger',
    label: 'Danger Button',
  },
  render: createButton,
};

export const Outline = {
  args: {
    variant: 'primary',
    outline: true,
    label: 'Outline Button',
  },
  render: createButton,
};

export const Small = {
  args: {
    variant: 'primary',
    size: 'sm',
    label: 'Small Button',
  },
  render: createButton,
};

export const Large = {
  args: {
    variant: 'primary',
    size: 'lg',
    label: 'Large Button',
  },
  render: createButton,
};

export const Disabled = {
  args: {
    variant: 'primary',
    disabled: true,
    label: 'Disabled Button',
  },
  render: createButton,
};

export const FullWidth = {
  args: {
    variant: 'primary',
    fullWidth: true,
    label: 'Full Width Button',
  },
  render: createButton,
};

export const AllVariants = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button class="btn btn-primary">Primary</button>
        <button class="btn btn-secondary">Secondary</button>
        <button class="btn btn-success">Success</button>
        <button class="btn btn-danger">Danger</button>
        <button class="btn btn-warning">Warning</button>
        <button class="btn btn-info">Info</button>
      </div>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button class="btn btn-outline-primary">Outline Primary</button>
        <button class="btn btn-outline-secondary">Outline Secondary</button>
        <button class="btn btn-outline-success">Outline Success</button>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
        <button class="btn btn-primary btn-sm">Small</button>
        <button class="btn btn-primary">Medium</button>
        <button class="btn btn-primary btn-lg">Large</button>
      </div>
    </div>
  `,
};

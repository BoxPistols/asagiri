export default {
  title: 'Components/Alert',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      description: 'Alert variant',
    },
    message: {
      control: 'text',
      description: 'Alert message',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show dismiss button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Alert size',
    },
  },
};

const createAlert = ({
  variant = 'primary',
  message = 'This is an alert message.',
  dismissible = false,
  size = 'md',
}) => {
  const classes = [
    'alert',
    `alert-${variant}`,
    dismissible ? 'alert-dismissible' : '',
    size !== 'md' ? `alert-${size}` : '',
  ].filter(Boolean).join(' ');

  return `
    <div class="${classes}">
      ${message}
      ${dismissible ? `
        <button class="alert-close" onclick="this.parentElement.remove()">×</button>
      ` : ''}
    </div>
  `;
};

export const Primary = {
  args: {
    variant: 'primary',
    message: 'This is a primary alert message.',
  },
  render: createAlert,
};

export const Success = {
  args: {
    variant: 'success',
    message: 'Operation completed successfully!',
  },
  render: createAlert,
};

export const Danger = {
  args: {
    variant: 'danger',
    message: 'An error occurred. Please try again.',
  },
  render: createAlert,
};

export const Warning = {
  args: {
    variant: 'warning',
    message: 'Warning: Please review your input.',
  },
  render: createAlert,
};

export const Info = {
  args: {
    variant: 'info',
    message: 'For your information: New features available.',
  },
  render: createAlert,
};

export const Dismissible = {
  args: {
    variant: 'success',
    message: 'This alert can be dismissed by clicking the × button.',
    dismissible: true,
  },
  render: createAlert,
};

export const Small = {
  args: {
    variant: 'primary',
    message: 'Small alert message',
    size: 'sm',
  },
  render: createAlert,
};

export const Large = {
  args: {
    variant: 'primary',
    message: 'Large alert message with more prominent styling',
    size: 'lg',
  },
  render: createAlert,
};

export const AllVariants = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div class="alert alert-primary">Primary alert message</div>
      <div class="alert alert-secondary">Secondary alert message</div>
      <div class="alert alert-success">Success alert message</div>
      <div class="alert alert-danger">Danger alert message</div>
      <div class="alert alert-warning">Warning alert message</div>
      <div class="alert alert-info">Info alert message</div>
      <div class="alert alert-success alert-dismissible">
        Dismissible alert
        <button class="alert-close" onclick="this.parentElement.remove()">×</button>
      </div>
    </div>
  `,
};

export default {
  title: 'Components/Badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: 'Badge variant',
    },
    label: {
      control: 'text',
      description: 'Badge text',
    },
    pill: {
      control: 'boolean',
      description: 'Pill shaped badge',
    },
    pulse: {
      control: 'boolean',
      description: 'Pulse animation',
    },
  },
};

const createBadge = ({
  variant = 'primary',
  label = 'Badge',
  pill = false,
  pulse = false,
}) => {
  const classes = [
    'badge',
    `badge-${variant}`,
    pill ? 'badge-pill' : '',
    pulse ? 'badge-pulse' : '',
  ].filter(Boolean).join(' ');

  return `<span class="${classes}">${label}</span>`;
};

export const Primary = {
  args: {
    variant: 'primary',
    label: 'Primary',
  },
  render: createBadge,
};

export const Success = {
  args: {
    variant: 'success',
    label: 'Success',
  },
  render: createBadge,
};

export const Danger = {
  args: {
    variant: 'danger',
    label: 'Danger',
  },
  render: createBadge,
};

export const Pill = {
  args: {
    variant: 'primary',
    label: 'Pill Badge',
    pill: true,
  },
  render: createBadge,
};

export const WithPulse = {
  args: {
    variant: 'success',
    label: 'Live',
    pulse: true,
  },
  render: createBadge,
};

export const Counter = {
  args: {
    variant: 'danger',
    label: '99+',
    pill: true,
  },
  render: createBadge,
};

export const AllVariants = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <span class="badge badge-primary">Primary</span>
      <span class="badge badge-secondary">Secondary</span>
      <span class="badge badge-success">Success</span>
      <span class="badge badge-danger">Danger</span>
      <span class="badge badge-warning">Warning</span>
      <span class="badge badge-info">Info</span>
      <span class="badge badge-light">Light</span>
      <span class="badge badge-dark">Dark</span>
    </div>
  `,
};

export const PillVariants = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <span class="badge badge-primary badge-pill">Primary</span>
      <span class="badge badge-success badge-pill">Active</span>
      <span class="badge badge-danger badge-pill">99+</span>
      <span class="badge badge-warning badge-pill">Pending</span>
      <span class="badge badge-info badge-pill">New</span>
    </div>
  `,
};

export const InContext = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <h3>Notifications <span class="badge badge-danger badge-pill">5</span></h3>
      <p>Status: <span class="badge badge-success">Active</span></p>
      <button class="btn btn-primary">
        Messages <span class="badge badge-light badge-pill">3</span>
      </button>
      <div class="card" style="max-width: 400px;">
        <div class="card-header">
          <h4>Task Board <span class="badge badge-warning badge-pill">12 pending</span></h4>
        </div>
        <div class="card-body">
          <p>
            <span class="badge badge-success">Completed</span>
            <span class="badge badge-info">In Progress</span>
            <span class="badge badge-danger">Blocked</span>
          </p>
        </div>
      </div>
    </div>
  `,
};

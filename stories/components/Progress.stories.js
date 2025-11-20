export default {
  title: 'Components/Progress',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'danger', 'warning', 'info'],
      description: 'Progress bar variant',
    },
    striped: {
      control: 'boolean',
      description: 'Striped pattern',
    },
    animated: {
      control: 'boolean',
      description: 'Animated stripes',
    },
  },
};

const createProgress = ({
  value = 50,
  variant = 'primary',
  striped = false,
  animated = false,
  label = '',
}) => {
  const barClasses = [
    'progress-bar',
    `progress-bar-${variant}`,
    striped ? 'progress-bar-striped' : '',
    animated ? 'progress-bar-animated' : '',
  ].filter(Boolean).join(' ');

  return `
    <div class="progress">
      <div class="${barClasses}" style="width: ${value}%;" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100">
        ${label || `${value}%`}
      </div>
    </div>
  `;
};

export const Basic = {
  args: {
    value: 50,
    variant: 'primary',
  },
  render: createProgress,
};

export const Variants = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <div style="margin-bottom: 0.25rem; font-size: 0.875rem;">Primary - 25%</div>
        <div class="progress">
          <div class="progress-bar progress-bar-primary" style="width: 25%;">25%</div>
        </div>
      </div>
      <div>
        <div style="margin-bottom: 0.25rem; font-size: 0.875rem;">Success - 50%</div>
        <div class="progress">
          <div class="progress-bar progress-bar-success" style="width: 50%;">50%</div>
        </div>
      </div>
      <div>
        <div style="margin-bottom: 0.25rem; font-size: 0.875rem;">Info - 75%</div>
        <div class="progress">
          <div class="progress-bar progress-bar-info" style="width: 75%;">75%</div>
        </div>
      </div>
      <div>
        <div style="margin-bottom: 0.25rem; font-size: 0.875rem;">Warning - 60%</div>
        <div class="progress">
          <div class="progress-bar progress-bar-warning" style="width: 60%;">60%</div>
        </div>
      </div>
      <div>
        <div style="margin-bottom: 0.25rem; font-size: 0.875rem;">Danger - 90%</div>
        <div class="progress">
          <div class="progress-bar progress-bar-danger" style="width: 90%;">90%</div>
        </div>
      </div>
    </div>
  `,
};

export const Striped = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div class="progress">
        <div class="progress-bar progress-bar-primary progress-bar-striped" style="width: 40%;">40%</div>
      </div>
      <div class="progress">
        <div class="progress-bar progress-bar-success progress-bar-striped" style="width: 60%;">60%</div>
      </div>
      <div class="progress">
        <div class="progress-bar progress-bar-danger progress-bar-striped" style="width: 80%;">80%</div>
      </div>
    </div>
  `,
};

export const Animated = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div class="progress">
        <div class="progress-bar progress-bar-primary progress-bar-striped progress-bar-animated" style="width: 45%;">
          Processing...
        </div>
      </div>
      <div class="progress">
        <div class="progress-bar progress-bar-success progress-bar-striped progress-bar-animated" style="width: 75%;">
          Uploading...
        </div>
      </div>
      <div class="progress">
        <div class="progress-bar progress-bar-info progress-bar-striped progress-bar-animated" style="width: 100%;">
          Loading...
        </div>
      </div>
    </div>
  `,
};

export const Sizes = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <div style="margin-bottom: 0.25rem; font-size: 0.875rem;">Small</div>
        <div class="progress progress-sm">
          <div class="progress-bar progress-bar-primary" style="width: 50%;">50%</div>
        </div>
      </div>
      <div>
        <div style="margin-bottom: 0.25rem; font-size: 0.875rem;">Medium (Default)</div>
        <div class="progress">
          <div class="progress-bar progress-bar-primary" style="width: 50%;">50%</div>
        </div>
      </div>
      <div>
        <div style="margin-bottom: 0.25rem; font-size: 0.875rem;">Large</div>
        <div class="progress progress-lg">
          <div class="progress-bar progress-bar-primary" style="width: 50%;">50%</div>
        </div>
      </div>
    </div>
  `,
};

export const MultipleBar = {
  render: () => `
    <div class="progress">
      <div class="progress-bar progress-bar-success" style="width: 30%;">30%</div>
      <div class="progress-bar progress-bar-warning" style="width: 20%;">20%</div>
      <div class="progress-bar progress-bar-danger" style="width: 15%;">15%</div>
    </div>
  `,
};

export const WithLabels = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span>CPU Usage</span>
          <span>67%</span>
        </div>
        <div class="progress">
          <div class="progress-bar progress-bar-info" style="width: 67%;"></div>
        </div>
      </div>
      <div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span>Memory</span>
          <span>8.2 GB / 16 GB</span>
        </div>
        <div class="progress">
          <div class="progress-bar progress-bar-warning" style="width: 51%;"></div>
        </div>
      </div>
      <div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span>Disk Space</span>
          <span>450 GB / 500 GB</span>
        </div>
        <div class="progress">
          <div class="progress-bar progress-bar-danger" style="width: 90%;"></div>
        </div>
      </div>
    </div>
  `,
};

export const TaskProgress = {
  render: () => `
    <div class="card" style="max-width: 500px;">
      <div class="card-header">
        <h4>Project Tasks</h4>
      </div>
      <div class="card-body">
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>Design Phase</span>
              <span class="badge badge-success">Complete</span>
            </div>
            <div class="progress">
              <div class="progress-bar progress-bar-success" style="width: 100%;">100%</div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>Development</span>
              <span class="badge badge-warning">In Progress</span>
            </div>
            <div class="progress">
              <div class="progress-bar progress-bar-warning progress-bar-striped progress-bar-animated" style="width: 65%;">65%</div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>Testing</span>
              <span class="badge badge-info">Planned</span>
            </div>
            <div class="progress">
              <div class="progress-bar progress-bar-info" style="width: 0%;">0%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const FileUpload = {
  render: () => `
    <div class="card" style="max-width: 400px;">
      <div class="card-body">
        <h4>File Upload</h4>
        <p style="margin: 1rem 0;">document.pdf</p>
        <div class="progress">
          <div class="progress-bar progress-bar-primary progress-bar-striped progress-bar-animated" style="width: 73%;">
            73% (3.2 MB / 4.4 MB)
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 0.5rem; font-size: 0.875rem; color: var(--color-text-muted);">
          <span>Uploading...</span>
          <span>~15 seconds remaining</span>
        </div>
      </div>
    </div>
  `,
};

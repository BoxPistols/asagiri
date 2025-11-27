export default {
  title: 'Components/Loading',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Loading spinner size',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      description: 'Loading spinner variant',
    },
  },
};

export const BasicSpinner = {
  render: () => `
    <div class="spinner"></div>
  `,
};

export const Variants = {
  render: () => `
    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
      <div class="spinner spinner-primary"></div>
      <div class="spinner spinner-secondary"></div>
      <div class="spinner spinner-success"></div>
      <div class="spinner spinner-danger"></div>
      <div class="spinner spinner-warning"></div>
      <div class="spinner spinner-info"></div>
    </div>
  `,
};

export const Sizes = {
  render: () => `
    <div style="display: flex; gap: 2rem; align-items: center;">
      <div class="spinner spinner-sm"></div>
      <div class="spinner spinner-md"></div>
      <div class="spinner spinner-lg"></div>
      <div class="spinner spinner-xl"></div>
    </div>
  `,
};

export const InButton = {
  render: () => `
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button class="btn btn-primary" disabled>
        <span class="spinner spinner-sm" style="margin-right: 0.5rem;"></span>
        Loading...
      </button>
      <button class="btn btn-secondary" disabled>
        <span class="spinner spinner-sm" style="margin-right: 0.5rem;"></span>
        Processing
      </button>
      <button class="btn btn-success" disabled>
        <span class="spinner spinner-sm" style="margin-right: 0.5rem;"></span>
        Saving
      </button>
    </div>
  `,
};

export const FullPageLoader = {
  render: () => `
    <div style="position: relative; height: 300px; background: var(--color-surface); border-radius: var(--border-radius);">
      <div class="loading-overlay">
        <div class="spinner spinner-lg spinner-primary"></div>
        <div style="margin-top: 1rem; font-size: 1rem; color: var(--color-text);">
          Loading content...
        </div>
      </div>
    </div>
  `,
};

export const Skeleton = {
  render: () => `
    <div style="max-width: 500px;">
      <div class="skeleton skeleton-text" style="width: 60%; height: 2rem; margin-bottom: 1rem;"></div>
      <div class="skeleton skeleton-text" style="width: 100%; margin-bottom: 0.5rem;"></div>
      <div class="skeleton skeleton-text" style="width: 100%; margin-bottom: 0.5rem;"></div>
      <div class="skeleton skeleton-text" style="width: 80%;"></div>
    </div>
  `,
};

export const SkeletonCard = {
  render: () => `
    <div class="card" style="max-width: 400px;">
      <div class="skeleton skeleton-image" style="width: 100%; height: 200px;"></div>
      <div class="card-body">
        <div class="skeleton skeleton-text" style="width: 70%; height: 1.5rem; margin-bottom: 1rem;"></div>
        <div class="skeleton skeleton-text" style="width: 100%; margin-bottom: 0.5rem;"></div>
        <div class="skeleton skeleton-text" style="width: 100%; margin-bottom: 0.5rem;"></div>
        <div class="skeleton skeleton-text" style="width: 60%;"></div>
      </div>
    </div>
  `,
};

export const SkeletonList = {
  render: () => `
    <div style="max-width: 600px;">
      ${Array(5).fill(0).map(() => `
        <div style="display: flex; gap: 1rem; padding: 1rem; border-bottom: 1px solid var(--color-border);">
          <div class="skeleton skeleton-avatar" style="width: 48px; height: 48px; border-radius: 50%;"></div>
          <div style="flex: 1;">
            <div class="skeleton skeleton-text" style="width: 40%; height: 1rem; margin-bottom: 0.5rem;"></div>
            <div class="skeleton skeleton-text" style="width: 90%;"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `,
};

export const SkeletonTable = {
  render: () => `
    <table class="table">
      <thead>
        <tr>
          <th style="width: 40%;">Name</th>
          <th style="width: 30%;">Status</th>
          <th style="width: 30%;">Date</th>
        </tr>
      </thead>
      <tbody>
        ${Array(5).fill(0).map(() => `
          <tr>
            <td><div class="skeleton skeleton-text" style="width: 80%;"></div></td>
            <td><div class="skeleton skeleton-text" style="width: 60%;"></div></td>
            <td><div class="skeleton skeleton-text" style="width: 70%;"></div></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `,
};

export const DotsLoader = {
  render: () => `
    <div class="dots-loader">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  `,
};

export const ProgressLoader = {
  render: () => `
    <div style="max-width: 400px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span>Loading resources...</span>
        <span>67%</span>
      </div>
      <div class="progress">
        <div class="progress-bar progress-bar-primary progress-bar-striped progress-bar-animated" style="width: 67%;">
        </div>
      </div>
    </div>
  `,
};

export const LoadingStates = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
      <!-- Loading Card -->
      <div class="card">
        <div class="card-body" style="text-align: center; padding: 3rem 1rem;">
          <div class="spinner spinner-lg spinner-primary" style="margin-bottom: 1rem;"></div>
          <p style="color: var(--color-text-muted);">Loading data...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div class="card">
        <div class="card-body" style="text-align: center; padding: 3rem 1rem;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">[Empty]</div>
          <h4>No items found</h4>
          <p style="color: var(--color-text-muted);">Try adjusting your filters</p>
        </div>
      </div>

      <!-- Error State -->
      <div class="card">
        <div class="card-body" style="text-align: center; padding: 3rem 1rem;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">[Error]</div>
          <h4>Failed to load</h4>
          <p style="color: var(--color-text-muted); margin-bottom: 1rem;">Something went wrong</p>
          <button class="btn btn-primary">Retry</button>
        </div>
      </div>
    </div>
  `,
};

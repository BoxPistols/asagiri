export default {
  title: 'Components/Avatar',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Avatar size',
    },
    type: {
      control: 'select',
      options: ['image', 'initials', 'icon'],
      description: 'Avatar type',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      description: 'Avatar color variant',
    },
  },
};

export const ImageAvatar = {
  render: () => `
    <div style="display: flex; gap: 1rem; align-items: center;">
      <div class="avatar avatar-md">
        <img src="https://i.pravatar.cc/150?img=1" alt="User avatar">
      </div>
      <div class="avatar avatar-md">
        <img src="https://i.pravatar.cc/150?img=2" alt="User avatar">
      </div>
      <div class="avatar avatar-md">
        <img src="https://i.pravatar.cc/150?img=3" alt="User avatar">
      </div>
    </div>
  `,
};

export const InitialsAvatar = {
  render: () => `
    <div style="display: flex; gap: 1rem; align-items: center;">
      <div class="avatar avatar-md avatar-primary">
        <span>JD</span>
      </div>
      <div class="avatar avatar-md avatar-success">
        <span>AB</span>
      </div>
      <div class="avatar avatar-md avatar-danger">
        <span>CD</span>
      </div>
      <div class="avatar avatar-md avatar-warning">
        <span>EF</span>
      </div>
    </div>
  `,
};

export const Sizes = {
  render: () => `
    <div style="display: flex; gap: 1rem; align-items: center;">
      <div class="avatar avatar-xs avatar-primary">
        <span>XS</span>
      </div>
      <div class="avatar avatar-sm avatar-primary">
        <span>SM</span>
      </div>
      <div class="avatar avatar-md avatar-primary">
        <span>MD</span>
      </div>
      <div class="avatar avatar-lg avatar-primary">
        <span>LG</span>
      </div>
      <div class="avatar avatar-xl avatar-primary">
        <span>XL</span>
      </div>
    </div>
  `,
};

export const WithStatus = {
  render: () => `
    <div style="display: flex; gap: 1.5rem; align-items: center;">
      <div class="avatar avatar-md" style="position: relative;">
        <img src="https://i.pravatar.cc/150?img=5" alt="User avatar">
        <span class="avatar-status avatar-status-online"></span>
      </div>
      <div class="avatar avatar-md" style="position: relative;">
        <img src="https://i.pravatar.cc/150?img=6" alt="User avatar">
        <span class="avatar-status avatar-status-away"></span>
      </div>
      <div class="avatar avatar-md" style="position: relative;">
        <img src="https://i.pravatar.cc/150?img=7" alt="User avatar">
        <span class="avatar-status avatar-status-busy"></span>
      </div>
      <div class="avatar avatar-md" style="position: relative;">
        <img src="https://i.pravatar.cc/150?img=8" alt="User avatar">
        <span class="avatar-status avatar-status-offline"></span>
      </div>
    </div>
  `,
};

export const AvatarGroup = {
  render: () => `
    <div class="avatar-group">
      <div class="avatar avatar-md">
        <img src="https://i.pravatar.cc/150?img=10" alt="User avatar">
      </div>
      <div class="avatar avatar-md">
        <img src="https://i.pravatar.cc/150?img=11" alt="User avatar">
      </div>
      <div class="avatar avatar-md">
        <img src="https://i.pravatar.cc/150?img=12" alt="User avatar">
      </div>
      <div class="avatar avatar-md">
        <img src="https://i.pravatar.cc/150?img=13" alt="User avatar">
      </div>
      <div class="avatar avatar-md avatar-primary">
        <span>+5</span>
      </div>
    </div>
  `,
};

export const Variants = {
  render: () => `
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <div class="avatar avatar-md avatar-primary">
        <span>PR</span>
      </div>
      <div class="avatar avatar-md avatar-secondary">
        <span>SE</span>
      </div>
      <div class="avatar avatar-md avatar-success">
        <span>SU</span>
      </div>
      <div class="avatar avatar-md avatar-danger">
        <span>DA</span>
      </div>
      <div class="avatar avatar-md avatar-warning">
        <span>WA</span>
      </div>
      <div class="avatar avatar-md avatar-info">
        <span>IN</span>
      </div>
    </div>
  `,
};

export const Rounded = {
  render: () => `
    <div style="display: flex; gap: 1rem; align-items: center;">
      <div class="avatar avatar-md avatar-rounded">
        <img src="https://i.pravatar.cc/150?img=20" alt="User avatar">
      </div>
      <div class="avatar avatar-md avatar-rounded avatar-primary">
        <span>AB</span>
      </div>
      <div class="avatar avatar-md avatar-rounded avatar-success">
        <span>CD</span>
      </div>
    </div>
  `,
};

export const InContext = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- User List Item -->
      <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid var(--color-border); border-radius: var(--border-radius);">
        <div class="avatar avatar-md" style="position: relative;">
          <img src="https://i.pravatar.cc/150?img=25" alt="User avatar">
          <span class="avatar-status avatar-status-online"></span>
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 600;">Sarah Johnson</div>
          <div style="font-size: 0.875rem; color: var(--color-text-muted);">Product Designer</div>
        </div>
        <button class="btn btn-sm btn-primary">Message</button>
      </div>

      <!-- Comment -->
      <div style="display: flex; gap: 1rem;">
        <div class="avatar avatar-sm">
          <img src="https://i.pravatar.cc/150?img=26" alt="User avatar">
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 0.25rem;">Mike Chen</div>
          <div style="font-size: 0.875rem; color: var(--color-text-muted);">
            Great work on this feature! The UX is much better now.
          </div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.5rem;">
            2 hours ago
          </div>
        </div>
      </div>

      <!-- Notification -->
      <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--color-surface); border-radius: var(--border-radius);">
        <div class="avatar avatar-sm avatar-success">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 600;">Your profile was updated successfully</div>
          <div style="font-size: 0.875rem; color: var(--color-text-muted);">Just now</div>
        </div>
      </div>
    </div>
  `,
};

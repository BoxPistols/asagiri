export default {
  title: 'Components/Breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'select',
      options: ['slash', 'arrow', 'chevron', 'dot'],
      description: 'Breadcrumb separator',
    },
  },
};

export const BasicBreadcrumb = {
  render: () => `
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item"><a href="#">Library</a></li>
        <li class="breadcrumb-item active" aria-current="page">Data</li>
      </ol>
    </nav>
  `,
};

export const WithIcons = {
  render: () => `
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item"><a href="#">Documents</a></li>
        <li class="breadcrumb-item"><a href="#">Projects</a></li>
        <li class="breadcrumb-item active" aria-current="page">Report.pdf</li>
      </ol>
    </nav>
  `,
};

export const SlashSeparator = {
  render: () => `
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb breadcrumb-slash">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item"><a href="#">Products</a></li>
        <li class="breadcrumb-item"><a href="#">Electronics</a></li>
        <li class="breadcrumb-item active" aria-current="page">Laptops</li>
      </ol>
    </nav>
  `,
};

export const ArrowSeparator = {
  render: () => `
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb breadcrumb-arrow">
        <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
        <li class="breadcrumb-item"><a href="#">Users</a></li>
        <li class="breadcrumb-item"><a href="#">John Doe</a></li>
        <li class="breadcrumb-item active" aria-current="page">Edit Profile</li>
      </ol>
    </nav>
  `,
};

export const DotSeparator = {
  render: () => `
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb breadcrumb-dot">
        <li class="breadcrumb-item"><a href="#">Blog</a></li>
        <li class="breadcrumb-item"><a href="#">Category</a></li>
        <li class="breadcrumb-item active" aria-current="page">Article Title</li>
      </ol>
    </nav>
  `,
};

export const LongPath = {
  render: () => `
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item"><a href="#">Company</a></li>
        <li class="breadcrumb-item"><a href="#">Departments</a></li>
        <li class="breadcrumb-item"><a href="#">Engineering</a></li>
        <li class="breadcrumb-item"><a href="#">Teams</a></li>
        <li class="breadcrumb-item"><a href="#">Frontend</a></li>
        <li class="breadcrumb-item active" aria-current="page">Members</li>
      </ol>
    </nav>
  `,
};

export const InCard = {
  render: () => `
    <div class="card">
      <div class="card-header">
        <nav aria-label="Breadcrumb">
          <ol class="breadcrumb" style="margin: 0;">
            <li class="breadcrumb-item"><a href="#">Settings</a></li>
            <li class="breadcrumb-item"><a href="#">Account</a></li>
            <li class="breadcrumb-item active" aria-current="page">Security</li>
          </ol>
        </nav>
      </div>
      <div class="card-body">
        <h3>Security Settings</h3>
        <p>Manage your account security and privacy settings.</p>
      </div>
    </div>
  `,
};

export const Responsive = {
  render: () => `
    <div>
      <p style="margin-bottom: 1rem; font-size: 0.875rem; color: var(--color-text-muted);">
        Resize viewport to see responsive behavior
      </p>
      <nav aria-label="Breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item d-none d-md-block"><a href="#">Home</a></li>
          <li class="breadcrumb-item d-none d-md-block"><a href="#">Products</a></li>
          <li class="breadcrumb-item"><a href="#">...Categories</a></li>
          <li class="breadcrumb-item active" aria-current="page">Item</li>
        </ol>
      </nav>
    </div>
  `,
};

export const AllVariants = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4>Default (Chevron)</h4>
        <nav aria-label="Breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Library</a></li>
            <li class="breadcrumb-item active" aria-current="page">Data</li>
          </ol>
        </nav>
      </div>

      <div>
        <h4>Slash</h4>
        <nav aria-label="Breadcrumb">
          <ol class="breadcrumb breadcrumb-slash">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Library</a></li>
            <li class="breadcrumb-item active" aria-current="page">Data</li>
          </ol>
        </nav>
      </div>

      <div>
        <h4>Arrow</h4>
        <nav aria-label="Breadcrumb">
          <ol class="breadcrumb breadcrumb-arrow">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Library</a></li>
            <li class="breadcrumb-item active" aria-current="page">Data</li>
          </ol>
        </nav>
      </div>

      <div>
        <h4>Dot</h4>
        <nav aria-label="Breadcrumb">
          <ol class="breadcrumb breadcrumb-dot">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Library</a></li>
            <li class="breadcrumb-item active" aria-current="page">Data</li>
          </ol>
        </nav>
      </div>
    </div>
  `,
};

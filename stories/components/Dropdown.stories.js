export default {
  title: 'Components/Dropdown',
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['down', 'up', 'start', 'end'],
      description: 'Dropdown direction',
    },
    alignment: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Menu alignment',
    },
  },
};

const dropdownScript = `
<script>
  (function() {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');

      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Close all other dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
          if (otherMenu !== menu) {
            otherMenu.style.display = 'none';
          }
        });

        // Toggle current dropdown
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
      });
    });
  })();
</script>
`;

export const BasicDropdown = {
  render: () => `
    <div class="dropdown">
      <button class="btn btn-primary dropdown-toggle">
        Dropdown Button
      </button>
      <div class="dropdown-menu" style="display: none;">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else</a>
      </div>
    </div>
    ${dropdownScript}
  `,
};

export const WithDivider = {
  render: () => `
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle">
        Options
      </button>
      <div class="dropdown-menu" style="display: none;">
        <a class="dropdown-item" href="#">Profile</a>
        <a class="dropdown-item" href="#">Settings</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Logout</a>
      </div>
    </div>
    ${dropdownScript}
  `,
};

export const WithHeader = {
  render: () => `
    <div class="dropdown">
      <button class="btn btn-info dropdown-toggle">
        Menu
      </button>
      <div class="dropdown-menu" style="display: none;">
        <h6 class="dropdown-header">Account</h6>
        <a class="dropdown-item" href="#">Profile</a>
        <a class="dropdown-item" href="#">Billing</a>
        <div class="dropdown-divider"></div>
        <h6 class="dropdown-header">Settings</h6>
        <a class="dropdown-item" href="#">Preferences</a>
        <a class="dropdown-item" href="#">Security</a>
      </div>
    </div>
    ${dropdownScript}
  `,
};

export const WithIcons = {
  render: () => `
    <div class="dropdown">
      <button class="btn btn-success dropdown-toggle">
        Actions
      </button>
      <div class="dropdown-menu" style="display: none;">
        <a class="dropdown-item" href="#">Edit</a>
        <a class="dropdown-item" href="#">Copy</a>
        <a class="dropdown-item" href="#">Share</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item text-danger" href="#">Delete</a>
      </div>
    </div>
    ${dropdownScript}
  `,
};

export const ActiveAndDisabled = {
  render: () => `
    <div class="dropdown">
      <button class="btn btn-primary dropdown-toggle">
        Status Items
      </button>
      <div class="dropdown-menu" style="display: none;">
        <a class="dropdown-item active" href="#">Active Item</a>
        <a class="dropdown-item" href="#">Normal Item</a>
        <a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">Disabled Item</a>
        <a class="dropdown-item" href="#">Another Item</a>
      </div>
    </div>
    ${dropdownScript}
  `,
};

export const DropdownVariants = {
  render: () => `
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle">Primary</button>
        <div class="dropdown-menu" style="display: none;">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
        </div>
      </div>

      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle">Secondary</button>
        <div class="dropdown-menu" style="display: none;">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
        </div>
      </div>

      <div class="dropdown">
        <button class="btn btn-success dropdown-toggle">Success</button>
        <div class="dropdown-menu" style="display: none;">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
        </div>
      </div>

      <div class="dropdown">
        <button class="btn btn-danger dropdown-toggle">Danger</button>
        <div class="dropdown-menu" style="display: none;">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
        </div>
      </div>
    </div>
    ${dropdownScript}
  `,
};

export const MenuAlignment = {
  render: () => `
    <div style="display: flex; gap: 1rem; justify-content: space-between;">
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle">
          Align Start
        </button>
        <div class="dropdown-menu dropdown-menu-start" style="display: none;">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else</a>
        </div>
      </div>

      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle">
          Align End
        </button>
        <div class="dropdown-menu dropdown-menu-end" style="display: none;">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else</a>
        </div>
      </div>
    </div>
    ${dropdownScript}
  `,
};

export const SplitButton = {
  render: () => `
    <div style="display: flex; gap: 1rem;">
      <div class="btn-group">
        <button class="btn btn-primary">Action</button>
        <div class="dropdown" style="display: inline-block;">
          <button class="btn btn-primary dropdown-toggle dropdown-toggle-split">
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu" style="display: none;">
            <a class="dropdown-item" href="#">Edit</a>
            <a class="dropdown-item" href="#">Copy</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Delete</a>
          </div>
        </div>
      </div>
    </div>
    ${dropdownScript}
  `,
};

export const DropdownSizes = {
  render: () => `
    <div style="display: flex; gap: 1rem; align-items: center;">
      <div class="dropdown">
        <button class="btn btn-primary btn-sm dropdown-toggle">
          Small
        </button>
        <div class="dropdown-menu" style="display: none;">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
        </div>
      </div>

      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle">
          Medium
        </button>
        <div class="dropdown-menu" style="display: none;">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
        </div>
      </div>

      <div class="dropdown">
        <button class="btn btn-primary btn-lg dropdown-toggle">
          Large
        </button>
        <div class="dropdown-menu" style="display: none;">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
        </div>
      </div>
    </div>
    ${dropdownScript}
  `,
};

export const UserMenu = {
  render: () => `
    <div class="dropdown">
      <button class="btn btn-light dropdown-toggle" style="display: flex; align-items: center; gap: 0.5rem;">
        <span class="avatar" style="width: 32px; height: 32px; background: var(--color-primary); color: white; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold;">
          JD
        </span>
        John Doe
      </button>
      <div class="dropdown-menu dropdown-menu-end" style="display: none; min-width: 200px;">
        <div class="dropdown-header">
          <div style="font-weight: 600;">John Doe</div>
          <div style="font-size: 0.875rem; color: var(--color-text-muted);">john@example.com</div>
        </div>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Profile</a>
        <a class="dropdown-item" href="#">Settings</a>
        <a class="dropdown-item" href="#">Billing</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Sign Out</a>
      </div>
    </div>
    ${dropdownScript}
  `,
};

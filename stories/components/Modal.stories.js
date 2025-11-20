export default {
  title: 'Components/Modal',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'fullscreen'],
      description: 'Modal size',
    },
    centered: {
      control: 'boolean',
      description: 'Vertically centered',
    },
  },
};

const modalScript = `
<script>
  (function() {
    document.querySelectorAll('[data-modal-open]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = e.currentTarget.getAttribute('data-modal-open');
        const modal = document.getElementById(targetId);
        if (modal) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    });

    document.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.currentTarget.closest('.modal');
        if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = '';
        }
      });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.style.display = 'none';
          document.body.style.overflow = '';
        }
      });
    });
  })();
</script>
`;

export const BasicModal = {
  render: () => `
    <div>
      <button class="btn btn-primary" data-modal-open="basic-modal">Open Modal</button>

      <div id="basic-modal" class="modal modal-overlay" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">Modal Title</h3>
              <button class="modal-close" data-modal-close aria-label="Close">×</button>
            </div>
            <div class="modal-body">
              <p>This is the modal body content. You can place any content here.</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-modal-close>Close</button>
              <button class="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    ${modalScript}
  `,
};

export const SmallModal = {
  render: () => `
    <div>
      <button class="btn btn-primary" data-modal-open="small-modal">Small Modal</button>

      <div id="small-modal" class="modal modal-overlay" style="display: none;">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">Small Modal</h3>
              <button class="modal-close" data-modal-close aria-label="Close">×</button>
            </div>
            <div class="modal-body">
              <p>This is a small modal with compact content.</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-modal-close>Cancel</button>
              <button class="btn btn-primary">OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    ${modalScript}
  `,
};

export const LargeModal = {
  render: () => `
    <div>
      <button class="btn btn-primary" data-modal-open="large-modal">Large Modal</button>

      <div id="large-modal" class="modal modal-overlay" style="display: none;">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">Large Modal</h3>
              <button class="modal-close" data-modal-close aria-label="Close">×</button>
            </div>
            <div class="modal-body">
              <h4>Extended Content</h4>
              <p>This large modal can contain more extensive content, such as forms, tables, or detailed information.</p>
              <div class="form-group">
                <label class="form-label">Example Form Field</label>
                <input type="text" class="form-control" placeholder="Enter something">
              </div>
              <div class="form-group">
                <label class="form-label">Description</label>
                <textarea class="form-control" rows="4" placeholder="Enter description"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-modal-close>Cancel</button>
              <button class="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    ${modalScript}
  `,
};

export const CenteredModal = {
  render: () => `
    <div>
      <button class="btn btn-primary" data-modal-open="centered-modal">Centered Modal</button>

      <div id="centered-modal" class="modal modal-overlay" style="display: none;">
        <div class="modal-dialog modal-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">Vertically Centered</h3>
              <button class="modal-close" data-modal-close aria-label="Close">×</button>
            </div>
            <div class="modal-body">
              <p>This modal is vertically centered in the viewport.</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" data-modal-close>Got it</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    ${modalScript}
  `,
};

export const ConfirmDialog = {
  render: () => `
    <div>
      <button class="btn btn-danger" data-modal-open="confirm-modal">Delete Item</button>

      <div id="confirm-modal" class="modal modal-overlay" style="display: none;">
        <div class="modal-dialog modal-sm modal-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">Confirm Delete</h3>
              <button class="modal-close" data-modal-close aria-label="Close">×</button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-modal-close>Cancel</button>
              <button class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    ${modalScript}
  `,
};

export const FormModal = {
  render: () => `
    <div>
      <button class="btn btn-success" data-modal-open="form-modal">Create New User</button>

      <div id="form-modal" class="modal modal-overlay" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">Create New User</h3>
              <button class="modal-close" data-modal-close aria-label="Close">×</button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="user-name" class="form-label">Name</label>
                  <input type="text" id="user-name" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="user-email" class="form-label">Email</label>
                  <input type="email" id="user-email" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="user-role" class="form-label">Role</label>
                  <select id="user-role" class="form-control">
                    <option>Admin</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </select>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-modal-close>Cancel</button>
              <button class="btn btn-success">Create User</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    ${modalScript}
  `,
};

export const ScrollableModal = {
  render: () => `
    <div>
      <button class="btn btn-primary" data-modal-open="scrollable-modal">Scrollable Modal</button>

      <div id="scrollable-modal" class="modal modal-overlay" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">Terms and Conditions</h3>
              <button class="modal-close" data-modal-close aria-label="Close">×</button>
            </div>
            <div class="modal-body" style="max-height: 400px; overflow-y: auto;">
              <h4>1. Introduction</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <h4>2. Terms of Use</h4>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <h4>3. Privacy Policy</h4>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <h4>4. Disclaimer</h4>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <h4>5. Additional Terms</h4>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
              <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-modal-close>Decline</button>
              <button class="btn btn-primary" data-modal-close>Accept</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    ${modalScript}
  `,
};

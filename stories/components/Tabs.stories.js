export default {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline'],
      description: 'Tab variant',
    },
    alignment: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Tab alignment',
    },
  },
};

const tabScript = `
<script>
  (function() {
    document.querySelectorAll('.tabs').forEach(tabGroup => {
      const tabs = tabGroup.querySelectorAll('.tab');
      const panels = tabGroup.parentElement.querySelectorAll('.tab-panel');

      tabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
          e.preventDefault();

          // Remove active from all tabs and panels
          tabs.forEach(t => t.classList.remove('active'));
          panels.forEach(p => {
            p.classList.remove('active');
            p.style.display = 'none';
          });

          // Add active to clicked tab and corresponding panel
          tab.classList.add('active');
          if (panels[index]) {
            panels[index].classList.add('active');
            panels[index].style.display = 'block';
          }
        });
      });
    });
  })();
</script>
`;

export const BasicTabs = {
  render: () => `
    <div>
      <ul class="tabs">
        <li><a href="#" class="tab active">Home</a></li>
        <li><a href="#" class="tab">Profile</a></li>
        <li><a href="#" class="tab">Messages</a></li>
        <li><a href="#" class="tab">Settings</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-panel active" style="display: block;">
          <h3>Home Content</h3>
          <p>Welcome to the home tab. This is where your main content goes.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Profile Content</h3>
          <p>Your profile information and settings appear here.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Messages Content</h3>
          <p>View and manage your messages in this section.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Settings Content</h3>
          <p>Configure your application preferences here.</p>
        </div>
      </div>
    </div>
    ${tabScript}
  `,
};

export const PillTabs = {
  render: () => `
    <div>
      <ul class="tabs tabs-pills">
        <li><a href="#" class="tab active">Overview</a></li>
        <li><a href="#" class="tab">Details</a></li>
        <li><a href="#" class="tab">Specs</a></li>
        <li><a href="#" class="tab">Reviews</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-panel active" style="display: block;">
          <h3>Overview</h3>
          <p>Product overview and key highlights.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Details</h3>
          <p>Detailed product information and features.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Specifications</h3>
          <p>Technical specifications and requirements.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Customer Reviews</h3>
          <p>What customers are saying about this product.</p>
        </div>
      </div>
    </div>
    ${tabScript}
  `,
};

export const UnderlineTabs = {
  render: () => `
    <div>
      <ul class="tabs tabs-underline">
        <li><a href="#" class="tab active">Dashboard</a></li>
        <li><a href="#" class="tab">Analytics</a></li>
        <li><a href="#" class="tab">Reports</a></li>
        <li><a href="#" class="tab">Export</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-panel active" style="display: block;">
          <h3>Dashboard</h3>
          <p>Your main dashboard with key metrics and insights.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Analytics</h3>
          <p>Detailed analytics and performance metrics.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Reports</h3>
          <p>Generated reports and summaries.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Export</h3>
          <p>Export your data in various formats.</p>
        </div>
      </div>
    </div>
    ${tabScript}
  `,
};

export const CenteredTabs = {
  render: () => `
    <div>
      <ul class="tabs tabs-center">
        <li><a href="#" class="tab active">Week</a></li>
        <li><a href="#" class="tab">Month</a></li>
        <li><a href="#" class="tab">Year</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-panel active" style="display: block;">
          <h3>Weekly Statistics</h3>
          <p>Performance data for the current week.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Monthly Statistics</h3>
          <p>Performance data for the current month.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Yearly Statistics</h3>
          <p>Performance data for the current year.</p>
        </div>
      </div>
    </div>
    ${tabScript}
  `,
};

export const IconTabs = {
  render: () => `
    <div>
      <ul class="tabs tabs-pills">
        <li><a href="#" class="tab active">📊 Dashboard</a></li>
        <li><a href="#" class="tab">👤 Users</a></li>
        <li><a href="#" class="tab">⚙️ Settings</a></li>
        <li><a href="#" class="tab">📝 Logs</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-panel active" style="display: block;">
          <h3>📊 Dashboard</h3>
          <p>Main dashboard with key performance indicators.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>👤 User Management</h3>
          <p>Manage users, roles, and permissions.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>⚙️ System Settings</h3>
          <p>Configure system-wide settings and preferences.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>📝 Activity Logs</h3>
          <p>View system logs and user activity.</p>
        </div>
      </div>
    </div>
    ${tabScript}
  `,
};

export const VerticalTabs = {
  render: () => `
    <div style="display: flex; gap: 1rem;">
      <ul class="tabs tabs-vertical" style="flex-direction: column; border-right: 1px solid var(--color-border); padding-right: 1rem; min-width: 150px;">
        <li><a href="#" class="tab active">General</a></li>
        <li><a href="#" class="tab">Security</a></li>
        <li><a href="#" class="tab">Privacy</a></li>
        <li><a href="#" class="tab">Notifications</a></li>
        <li><a href="#" class="tab">Advanced</a></li>
      </ul>
      <div class="tab-content" style="flex: 1;">
        <div class="tab-panel active" style="display: block;">
          <h3>General Settings</h3>
          <p>Basic application settings and preferences.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Security Settings</h3>
          <p>Password, two-factor authentication, and security options.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Privacy Settings</h3>
          <p>Control your privacy and data sharing preferences.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Notification Settings</h3>
          <p>Manage email and push notification preferences.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Advanced Settings</h3>
          <p>Advanced configuration options for power users.</p>
        </div>
      </div>
    </div>
    ${tabScript}
  `,
};

export const TabsWithBadges = {
  render: () => `
    <div>
      <ul class="tabs">
        <li><a href="#" class="tab active">Inbox <span class="badge badge-danger badge-pill">5</span></a></li>
        <li><a href="#" class="tab">Starred <span class="badge badge-warning badge-pill">2</span></a></li>
        <li><a href="#" class="tab">Drafts <span class="badge badge-info badge-pill">3</span></a></li>
        <li><a href="#" class="tab">Sent</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-panel active" style="display: block;">
          <h3>Inbox (5 unread)</h3>
          <p>Your inbox messages appear here.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Starred Messages (2)</h3>
          <p>Messages you've marked as important.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Draft Messages (3)</h3>
          <p>Messages you've started but haven't sent yet.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Sent Messages</h3>
          <p>Messages you've sent to others.</p>
        </div>
      </div>
    </div>
    ${tabScript}
  `,
};

export const DisabledTab = {
  render: () => `
    <div>
      <ul class="tabs">
        <li><a href="#" class="tab active">Available</a></li>
        <li><a href="#" class="tab tab-disabled" style="opacity: 0.5; cursor: not-allowed;">Disabled</a></li>
        <li><a href="#" class="tab">Another Tab</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-panel active" style="display: block;">
          <h3>Available Tab</h3>
          <p>This tab is active and accessible.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Disabled Tab</h3>
          <p>This tab is disabled and cannot be accessed.</p>
        </div>
        <div class="tab-panel" style="display: none;">
          <h3>Another Tab</h3>
          <p>Another accessible tab.</p>
        </div>
      </div>
    </div>
    ${tabScript}
  `,
};

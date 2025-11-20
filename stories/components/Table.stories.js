export default {
  title: 'Components/Table',
  tags: ['autodocs'],
  argTypes: {
    striped: {
      control: 'boolean',
      description: 'Striped rows',
    },
    bordered: {
      control: 'boolean',
      description: 'Bordered table',
    },
    hoverable: {
      control: 'boolean',
      description: 'Hover effect on rows',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Table size',
    },
  },
};

export const BasicTable = {
  render: () => `
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>John Doe</td>
          <td>john@example.com</td>
          <td>Developer</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jane Smith</td>
          <td>jane@example.com</td>
          <td>Designer</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Bob Johnson</td>
          <td>bob@example.com</td>
          <td>Manager</td>
        </tr>
      </tbody>
    </table>
  `,
};

export const StripedTable = {
  render: () => `
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Price</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Laptop</td>
          <td>$1,299</td>
          <td>15</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Mouse</td>
          <td>$29</td>
          <td>150</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Keyboard</td>
          <td>$89</td>
          <td>75</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Monitor</td>
          <td>$399</td>
          <td>30</td>
        </tr>
      </tbody>
    </table>
  `,
};

export const BorderedTable = {
  render: () => `
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Task</th>
          <th>Status</th>
          <th>Assignee</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Update documentation</td>
          <td><span class="badge badge-success">Complete</span></td>
          <td>Alice</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Fix navigation bug</td>
          <td><span class="badge badge-warning">In Progress</span></td>
          <td>Bob</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Design new landing page</td>
          <td><span class="badge badge-info">Planned</span></td>
          <td>Carol</td>
        </tr>
      </tbody>
    </table>
  `,
};

export const HoverableTable = {
  render: () => `
    <table class="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Transaction</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2024-01-15</td>
          <td>Subscription Payment</td>
          <td class="text-danger">-$49.99</td>
        </tr>
        <tr>
          <td>2</td>
          <td>2024-01-10</td>
          <td>Client Payment</td>
          <td class="text-success">+$1,200.00</td>
        </tr>
        <tr>
          <td>3</td>
          <td>2024-01-05</td>
          <td>Office Supplies</td>
          <td class="text-danger">-$150.00</td>
        </tr>
      </tbody>
    </table>
  `,
};

export const SmallTable = {
  render: () => `
    <table class="table table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Code</th>
          <th>Description</th>
          <th>Qty</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>SKU-001</td>
          <td>Widget A</td>
          <td>10</td>
        </tr>
        <tr>
          <td>2</td>
          <td>SKU-002</td>
          <td>Widget B</td>
          <td>25</td>
        </tr>
        <tr>
          <td>3</td>
          <td>SKU-003</td>
          <td>Widget C</td>
          <td>5</td>
        </tr>
      </tbody>
    </table>
  `,
};

export const ResponsiveTable = {
  render: () => `
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Country</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
            <td>555-1234</td>
            <td>New York</td>
            <td>USA</td>
            <td><span class="badge badge-success">Active</span></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane</td>
            <td>Smith</td>
            <td>jane@example.com</td>
            <td>555-5678</td>
            <td>London</td>
            <td>UK</td>
            <td><span class="badge badge-success">Active</span></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Bob</td>
            <td>Johnson</td>
            <td>bob@example.com</td>
            <td>555-9012</td>
            <td>Tokyo</td>
            <td>Japan</td>
            <td><span class="badge badge-warning">Pending</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
};

export const TableWithActions = {
  render: () => `
    <table class="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Project Alpha</td>
          <td><span class="badge badge-success">Active</span></td>
          <td>
            <button class="btn btn-sm btn-primary">Edit</button>
            <button class="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Project Beta</td>
          <td><span class="badge badge-warning">Pending</span></td>
          <td>
            <button class="btn btn-sm btn-primary">Edit</button>
            <button class="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Project Gamma</td>
          <td><span class="badge badge-info">Review</span></td>
          <td>
            <button class="btn btn-sm btn-primary">Edit</button>
            <button class="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
};

export const AllVariants = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Striped + Bordered</h4>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Feature</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Dark Mode</td>
              <td><span class="badge badge-success">Done</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Responsive</td>
              <td><span class="badge badge-success">Done</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h4>Hover + Small</h4>
        <table class="table table-hover table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Item A</td>
              <td>$10</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Item B</td>
              <td>$20</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

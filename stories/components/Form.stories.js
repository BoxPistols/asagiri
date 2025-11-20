export default {
  title: 'Components/Form',
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'inline'],
      description: 'Form layout',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Form size',
    },
  },
};

export const BasicForm = {
  render: () => `
    <form class="form">
      <div class="form-group">
        <label for="name" class="form-label">Name</label>
        <input type="text" id="name" class="form-control" placeholder="Enter your name">
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" class="form-control" placeholder="your@email.com">
      </div>
      <div class="form-group">
        <label for="message" class="form-label">Message</label>
        <textarea id="message" class="form-control" rows="4" placeholder="Your message"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `,
};

export const FormValidation = {
  render: () => `
    <form class="form">
      <div class="form-group">
        <label for="username" class="form-label">Username</label>
        <input type="text" id="username" class="form-control is-valid" value="john_doe">
        <div class="form-feedback form-feedback-valid">Username is available!</div>
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" class="form-control is-invalid" value="123">
        <div class="form-feedback form-feedback-invalid">Password must be at least 8 characters.</div>
      </div>
      <div class="form-group">
        <label for="confirm" class="form-label">Confirm Password</label>
        <input type="password" id="confirm" class="form-control" placeholder="Confirm password">
        <div class="form-text">Please enter the same password again.</div>
      </div>
    </form>
  `,
};

export const FormInputs = {
  render: () => `
    <form class="form">
      <div class="form-group">
        <label for="text-input" class="form-label">Text Input</label>
        <input type="text" id="text-input" class="form-control" placeholder="Enter text">
      </div>
      <div class="form-group">
        <label for="select-input" class="form-label">Select</label>
        <select id="select-input" class="form-control">
          <option>Choose an option</option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Checkboxes</label>
        <div class="form-check">
          <input type="checkbox" id="check1" class="form-check-input">
          <label for="check1" class="form-check-label">Option 1</label>
        </div>
        <div class="form-check">
          <input type="checkbox" id="check2" class="form-check-input" checked>
          <label for="check2" class="form-check-label">Option 2</label>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Radio Buttons</label>
        <div class="form-check">
          <input type="radio" id="radio1" name="radio" class="form-check-input" checked>
          <label for="radio1" class="form-check-label">Choice 1</label>
        </div>
        <div class="form-check">
          <input type="radio" id="radio2" name="radio" class="form-check-input">
          <label for="radio2" class="form-check-label">Choice 2</label>
        </div>
      </div>
      <div class="form-group">
        <label for="file-input" class="form-label">File Upload</label>
        <input type="file" id="file-input" class="form-control">
      </div>
      <div class="form-group">
        <label for="range-input" class="form-label">Range</label>
        <input type="range" id="range-input" class="form-range" min="0" max="100" value="50">
      </div>
    </form>
  `,
};

export const HorizontalForm = {
  render: () => `
    <form class="form form-horizontal">
      <div class="form-group row">
        <label for="h-name" class="form-label col-sm-3">Name</label>
        <div class="col-sm-9">
          <input type="text" id="h-name" class="form-control" placeholder="Enter your name">
        </div>
      </div>
      <div class="form-group row">
        <label for="h-email" class="form-label col-sm-3">Email</label>
        <div class="col-sm-9">
          <input type="email" id="h-email" class="form-control" placeholder="your@email.com">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-9 offset-sm-3">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  `,
};

export const InlineForm = {
  render: () => `
    <form class="form form-inline">
      <input type="email" class="form-control" placeholder="Email">
      <input type="password" class="form-control" placeholder="Password">
      <button type="submit" class="btn btn-primary">Sign In</button>
    </form>
  `,
};

export const FormSizes = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div class="form-group">
        <label class="form-label">Small</label>
        <input type="text" class="form-control form-control-sm" placeholder="Small input">
      </div>
      <div class="form-group">
        <label class="form-label">Medium (Default)</label>
        <input type="text" class="form-control" placeholder="Medium input">
      </div>
      <div class="form-group">
        <label class="form-label">Large</label>
        <input type="text" class="form-control form-control-lg" placeholder="Large input">
      </div>
    </div>
  `,
};

export const DisabledForm = {
  render: () => `
    <form class="form">
      <div class="form-group">
        <label for="disabled-input" class="form-label">Disabled Input</label>
        <input type="text" id="disabled-input" class="form-control" value="Cannot edit this" disabled>
      </div>
      <div class="form-group">
        <label for="readonly-input" class="form-label">Readonly Input</label>
        <input type="text" id="readonly-input" class="form-control" value="Can select but not edit" readonly>
      </div>
      <div class="form-check">
        <input type="checkbox" id="disabled-check" class="form-check-input" disabled>
        <label for="disabled-check" class="form-check-label">Disabled checkbox</label>
      </div>
      <button type="submit" class="btn btn-primary" disabled>Disabled Button</button>
    </form>
  `,
};

export const FormGrid = {
  render: () => `
    <form class="form">
      <div class="row">
        <div class="col-md-6 form-group">
          <label for="first-name" class="form-label">First Name</label>
          <input type="text" id="first-name" class="form-control" placeholder="John">
        </div>
        <div class="col-md-6 form-group">
          <label for="last-name" class="form-label">Last Name</label>
          <input type="text" id="last-name" class="form-control" placeholder="Doe">
        </div>
      </div>
      <div class="form-group">
        <label for="address" class="form-label">Address</label>
        <input type="text" id="address" class="form-control" placeholder="123 Main St">
      </div>
      <div class="row">
        <div class="col-md-6 form-group">
          <label for="city" class="form-label">City</label>
          <input type="text" id="city" class="form-control" placeholder="New York">
        </div>
        <div class="col-md-4 form-group">
          <label for="state" class="form-label">State</label>
          <select id="state" class="form-control">
            <option>Choose...</option>
            <option>CA</option>
            <option>NY</option>
            <option>TX</option>
          </select>
        </div>
        <div class="col-md-2 form-group">
          <label for="zip" class="form-label">Zip</label>
          <input type="text" id="zip" class="form-control" placeholder="10001">
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `,
};

export default {
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
    },
    content: {
      control: 'text',
      description: 'Card content',
    },
    hasHeader: {
      control: 'boolean',
      description: 'Show card header',
    },
    hasFooter: {
      control: 'boolean',
      description: 'Show card footer',
    },
    clickable: {
      control: 'boolean',
      description: 'Make card clickable',
    },
  },
};

const createCard = ({
  title = 'Card Title',
  content = 'This is the card content. It can contain any text or HTML elements.',
  hasHeader = true,
  hasFooter = false,
  clickable = false,
}) => {
  const classes = ['card', clickable ? 'card-clickable' : ''].filter(Boolean).join(' ');

  return `
    <div class="${classes}">
      ${hasHeader ? `
        <div class="card-header">
          <h3>${title}</h3>
        </div>
      ` : ''}
      <div class="card-body">
        ${!hasHeader ? `<h4>${title}</h4>` : ''}
        <p>${content}</p>
      </div>
      ${hasFooter ? `
        <div class="card-footer">
          <button class="btn btn-sm btn-primary">Action</button>
          <button class="btn btn-sm btn-secondary">Cancel</button>
        </div>
      ` : ''}
    </div>
  `;
};

export const Default = {
  args: {
    title: 'Default Card',
    content: 'This is a simple card component with header and body.',
    hasHeader: true,
    hasFooter: false,
  },
  render: createCard,
};

export const WithFooter = {
  args: {
    title: 'Card with Footer',
    content: 'This card includes a footer with action buttons.',
    hasHeader: true,
    hasFooter: true,
  },
  render: createCard,
};

export const Clickable = {
  args: {
    title: 'Clickable Card',
    content: 'This card has hover effects and can be made interactive.',
    hasHeader: true,
    clickable: true,
  },
  render: createCard,
};

export const NoHeader = {
  args: {
    title: 'Simple Card',
    content: 'This card has no separate header section.',
    hasHeader: false,
  },
  render: createCard,
};

export const CardGrid = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
      <div class="card">
        <div class="card-header">
          <h3>Card 1</h3>
        </div>
        <div class="card-body">
          <p>This is the first card in a grid layout.</p>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3>Card 2</h3>
        </div>
        <div class="card-body">
          <p>This is the second card in a grid layout.</p>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3>Card 3</h3>
        </div>
        <div class="card-body">
          <p>This is the third card in a grid layout.</p>
        </div>
      </div>
    </div>
  `,
};

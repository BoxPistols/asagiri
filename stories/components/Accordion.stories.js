export default {
  title: 'Components/Accordion',
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple panels to be open',
    },
    bordered: {
      control: 'boolean',
      description: 'Add borders to accordion',
    },
  },
};

const accordionScript = `
<script>
  (function() {
    document.querySelectorAll('.accordion').forEach(accordion => {
      const allowMultiple = accordion.hasAttribute('data-allow-multiple');
      const headers = accordion.querySelectorAll('.accordion-header');

      headers.forEach(header => {
        header.addEventListener('click', () => {
          const item = header.parentElement;
          const content = item.querySelector('.accordion-content');
          const isActive = item.classList.contains('active');

          if (!allowMultiple) {
            // Close all other items
            accordion.querySelectorAll('.accordion-item').forEach(otherItem => {
              if (otherItem !== item) {
                otherItem.classList.remove('active');
                const otherContent = otherItem.querySelector('.accordion-content');
                if (otherContent) otherContent.style.display = 'none';
              }
            });
          }

          // Toggle current item
          if (isActive) {
            item.classList.remove('active');
            content.style.display = 'none';
          } else {
            item.classList.add('active');
            content.style.display = 'block';
          }
        });
      });
    });
  })();
</script>
`;

export const BasicAccordion = {
  render: () => `
    <div class="accordion">
      <div class="accordion-item active">
        <div class="accordion-header">
          <h3>Section 1</h3>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content" style="display: block;">
          <p>Content for section 1. This is expanded by default.</p>
        </div>
      </div>
      <div class="accordion-item">
        <div class="accordion-header">
          <h3>Section 2</h3>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content" style="display: none;">
          <p>Content for section 2. Click the header to expand.</p>
        </div>
      </div>
      <div class="accordion-item">
        <div class="accordion-header">
          <h3>Section 3</h3>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content" style="display: none;">
          <p>Content for section 3. Click the header to expand.</p>
        </div>
      </div>
    </div>
    ${accordionScript}
  `,
};

export const AllowMultiple = {
  render: () => `
    <div class="accordion" data-allow-multiple>
      <div class="accordion-item active">
        <div class="accordion-header">
          <h3>Question 1: What is Asagiri?</h3>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content" style="display: block;">
          <p>Asagiri is a modern, lightweight CSS framework designed for building responsive and accessible web applications.</p>
        </div>
      </div>
      <div class="accordion-item">
        <div class="accordion-header">
          <h3>Question 2: How do I install it?</h3>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content" style="display: none;">
          <p>You can install Asagiri via npm: <code>npm install asagiri</code></p>
        </div>
      </div>
      <div class="accordion-item">
        <div class="accordion-header">
          <h3>Question 3: Is it compatible with React?</h3>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content" style="display: none;">
          <p>Yes! Asagiri is framework-agnostic and works perfectly with React, Vue, Angular, or vanilla JavaScript.</p>
        </div>
      </div>
    </div>
    ${accordionScript}
  `,
};

export const BorderedAccordion = {
  render: () => `
    <div class="accordion accordion-bordered">
      <div class="accordion-item">
        <div class="accordion-header">
          <h3>Personal Information</h3>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content" style="display: none;">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-control" placeholder="John Doe">
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" placeholder="john@example.com">
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <div class="accordion-header">
          <h3>Shipping Address</h3>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content" style="display: none;">
          <div class="form-group">
            <label class="form-label">Street Address</label>
            <input type="text" class="form-control" placeholder="123 Main St">
          </div>
          <div class="form-group">
            <label class="form-label">City</label>
            <input type="text" class="form-control" placeholder="New York">
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <div class="accordion-header">
          <h3>Payment Method</h3>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content" style="display: none;">
          <div class="form-check">
            <input type="radio" id="credit" name="payment" class="form-check-input" checked>
            <label for="credit" class="form-check-label">Credit Card</label>
          </div>
          <div class="form-check">
            <input type="radio" id="paypal" name="payment" class="form-check-input">
            <label for="paypal" class="form-check-label">PayPal</label>
          </div>
        </div>
      </div>
    </div>
    ${accordionScript}
  `,
};

export const WithIcons = {
  render: () => `
    <div class="accordion">
      <div class="accordion-item">
        <div class="accordion-header">
          <h3>📦 Shipping Information</h3>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content" style="display: none;">
          <p>Free shipping on orders over $50. Standard delivery takes 3-5 business days.</p>
        </div>
      </div>
      <div class="accordion-item">
        <div class="accordion-header">
          <h3>💳 Payment Options</h3>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content" style="display: none;">
          <p>We accept all major credit cards, PayPal, and Apple Pay.</p>
        </div>
      </div>
      <div class="accordion-item">
        <div class="accordion-header">
          <h3>🔄 Return Policy</h3>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content" style="display: none;">
          <p>Returns accepted within 30 days of purchase with original packaging.</p>
        </div>
      </div>
      <div class="accordion-item">
        <div class="accordion-header">
          <h3>📞 Contact Support</h3>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content" style="display: none;">
          <p>Email: support@example.com | Phone: 1-800-123-4567</p>
        </div>
      </div>
    </div>
    ${accordionScript}
  `,
};

export const NestedAccordion = {
  render: () => `
    <div class="accordion" data-allow-multiple>
      <div class="accordion-item">
        <div class="accordion-header">
          <h3>Frontend Development</h3>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content" style="display: none;">
          <div class="accordion">
            <div class="accordion-item">
              <div class="accordion-header">
                <h4>HTML & CSS</h4>
                <span class="accordion-icon">▼</span>
              </div>
              <div class="accordion-content" style="display: none;">
                <p>Markup and styling fundamentals for web development.</p>
              </div>
            </div>
            <div class="accordion-item">
              <div class="accordion-header">
                <h4>JavaScript</h4>
                <span class="accordion-icon">▼</span>
              </div>
              <div class="accordion-content" style="display: none;">
                <p>Programming language for interactive web applications.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <div class="accordion-header">
          <h3>Backend Development</h3>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content" style="display: none;">
          <p>Server-side programming and database management.</p>
        </div>
      </div>
    </div>
    ${accordionScript}
  `,
};

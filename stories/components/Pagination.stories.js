export default {
  title: 'Components/Pagination',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Pagination size',
    },
    alignment: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Pagination alignment',
    },
  },
};

const paginationScript = `
<script>
  (function() {
    document.querySelectorAll('.pagination').forEach(pagination => {
      const items = pagination.querySelectorAll('.page-item:not(.disabled)');

      items.forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();

          // Remove active from all items
          pagination.querySelectorAll('.page-item').forEach(i => i.classList.remove('active'));

          // Add active to clicked item
          if (!item.classList.contains('prev') && !item.classList.contains('next')) {
            item.classList.add('active');
          }
        });
      });
    });
  })();
</script>
`;

export const BasicPagination = {
  render: () => `
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">4</a></li>
        <li class="page-item"><a class="page-link" href="#">5</a></li>
      </ul>
    </nav>
    ${paginationScript}
  `,
};

export const WithPrevNext = {
  render: () => `
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item prev">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">«</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">4</a></li>
        <li class="page-item"><a class="page-link" href="#">5</a></li>
        <li class="page-item next">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">»</span>
          </a>
        </li>
      </ul>
    </nav>
    ${paginationScript}
  `,
};

export const WithLabels = {
  render: () => `
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item prev">
          <a class="page-link" href="#">Previous</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item next">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
    ${paginationScript}
  `,
};

export const Disabled = {
  render: () => `
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item prev disabled">
          <a class="page-link" href="#" aria-label="Previous" tabindex="-1" aria-disabled="true">
            <span aria-hidden="true">«</span>
          </a>
        </li>
        <li class="page-item active"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item next">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">»</span>
          </a>
        </li>
      </ul>
    </nav>
    ${paginationScript}
  `,
};

export const Sizes = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Small</h4>
        <nav aria-label="Small pagination">
          <ul class="pagination pagination-sm">
            <li class="page-item"><a class="page-link" href="#">«</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">»</a></li>
          </ul>
        </nav>
      </div>
      <div>
        <h4>Medium (Default)</h4>
        <nav aria-label="Medium pagination">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">«</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">»</a></li>
          </ul>
        </nav>
      </div>
      <div>
        <h4>Large</h4>
        <nav aria-label="Large pagination">
          <ul class="pagination pagination-lg">
            <li class="page-item"><a class="page-link" href="#">«</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">»</a></li>
          </ul>
        </nav>
      </div>
    </div>
    ${paginationScript}
  `,
};

export const Alignment = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Start (Default)</h4>
        <nav aria-label="Left aligned pagination">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
      <div>
        <h4>Center</h4>
        <nav aria-label="Center aligned pagination">
          <ul class="pagination pagination-center">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
      <div>
        <h4>End</h4>
        <nav aria-label="Right aligned pagination">
          <ul class="pagination pagination-end">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
    ${paginationScript}
  `,
};

export const WithEllipsis = {
  render: () => `
    <nav aria-label="Page navigation with ellipsis">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">«</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item disabled">
          <span class="page-link">...</span>
        </li>
        <li class="page-item"><a class="page-link" href="#">8</a></li>
        <li class="page-item"><a class="page-link" href="#">9</a></li>
        <li class="page-item active"><a class="page-link" href="#">10</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">»</a>
        </li>
      </ul>
    </nav>
    ${paginationScript}
  `,
};

export const SimplePagination = {
  render: () => `
    <nav aria-label="Simple pagination">
      <ul class="pagination pagination-simple">
        <li class="page-item">
          <a class="page-link" href="#">← Newer Posts</a>
        </li>
        <li class="page-item" style="margin-left: auto;">
          <a class="page-link" href="#">Older Posts →</a>
        </li>
      </ul>
    </nav>
    ${paginationScript}
  `,
};

export const WithInfo = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item prev">
            <a class="page-link" href="#">«</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#">5</a></li>
          <li class="page-item next">
            <a class="page-link" href="#">»</a>
          </li>
        </ul>
      </nav>
      <div style="font-size: 0.875rem; color: var(--color-text-muted);">
        Showing 11-20 of 157 results
      </div>
    </div>
    ${paginationScript}
  `,
};

# Asagiri v2.1 Migration Guide

This guide covers breaking changes and migration steps from Asagiri v2.0 to v2.1.

## Breaking Changes

### Alert Component

#### Restored Alert Variants

In the initial v2.1 release, `alert-secondary`, `alert-light`, and `alert-dark` were inadvertently removed. These have been **restored** in this update to maintain backward compatibility.

**All Alert Variants Now Available:**
- ✅ `alert-primary`
- ✅ `alert-secondary` (restored)
- ✅ `alert-success`
- ✅ `alert-warning`
- ✅ `alert-danger`
- ✅ `alert-info`
- ✅ `alert-light` (restored)
- ✅ `alert-dark` (restored)

**No migration needed** - your existing code using these classes will continue to work.

```html
<!-- These classes now work as expected -->
<div class="alert alert-secondary">Secondary alert</div>
<div class="alert alert-light">Light alert</div>
<div class="alert alert-dark">Dark alert</div>
```

#### TypeScript Definitions

The `AlertClass` type definition has been updated to include all variants:

```typescript
export type AlertClass =
  | 'alert'
  | 'alert-primary'
  | 'alert-secondary'  // ✅ restored
  | 'alert-success'
  | 'alert-warning'
  | 'alert-danger'
  | 'alert-info'
  | 'alert-light'      // ✅ restored
  | 'alert-dark'       // ✅ restored
  | 'alert-dismissible'
  | 'alert-close'
  | 'alert-heading'
  | 'alert-solid'
  | 'alert-sm'
  | 'alert-lg'
  | 'alert-with-icon'
  | 'alert-icon'
  | 'alert-content';
```

### Accordion Component

#### Improved Animation System

The accordion animation has been improved from a fixed `max-height` approach to a more modern `grid-template-rows` technique for better performance and accuracy.

**Before (v2.0):**
```scss
.accordion-panel {
  max-height: 0;
  &.active {
    max-height: 1000px; // Fixed height could cause issues
  }
}
```

**After (v2.1):**
```scss
.accordion-panel {
  display: grid;
  grid-template-rows: 0fr;
  &.active {
    grid-template-rows: 1fr; // Dynamic height based on content
  }
}
```

**HTML Structure Change Required:**

Your accordion panel content now needs to be wrapped in a child element:

```html
<!-- v2.0 (old) -->
<div class="accordion-panel">
  Content here
</div>

<!-- v2.1 (new) -->
<div class="accordion-panel">
  <div>
    Content here
  </div>
</div>
```

**Migration Steps:**

1. Wrap all accordion panel content in a `<div>` or other block element
2. Test that animations work smoothly with your content heights
3. Remove any custom `max-height` overrides you may have added

**Benefits:**
- ✅ More accurate animation timing
- ✅ Works with any content height
- ✅ Better performance
- ✅ No content clipping issues

### Form Validation

#### Removed `!important` Declarations

Form validation styles have been refactored to remove `!important` declarations for better customization.

**Before (v2.0):**
```scss
.is-valid {
  border-color: var(--color-success) !important;
}
```

**After (v2.1):**
```scss
.form-control.is-valid,
input.is-valid,
textarea.is-valid,
select.is-valid {
  border-color: var(--color-success);
}
```

**Migration Impact:**

This change makes validation styles **easier to override** without needing `!important` in your custom CSS.

**If you were relying on the `!important` behavior:**

Add more specific selectors or increase specificity:

```scss
/* Before (relying on !important override) */
.is-valid {
  border-color: blue !important;
}

/* After (use higher specificity) */
.my-form .form-control.is-valid,
.my-form input.is-valid {
  border-color: blue;
}
```

**Benefits:**
- ✅ Easier to customize without specificity battles
- ✅ Better CSS architecture
- ✅ More maintainable code

## New Features in v2.1

### New Components

- **Tabs**: Interactive tab navigation with pills, underline, and vertical variants
- **Accordion**: Collapsible content panels with ARIA support
- **Pagination**: Page navigation with various styles
- **Breadcrumb**: Hierarchical navigation
- **Progress**: Progress bars and indicators
- **Avatar**: User avatars with status indicators
- **Skeleton**: Loading placeholder components
- **Dropdown**: Dropdown menus with keyboard navigation

### Enhanced Components

- **Alert**: Added sizes (`alert-sm`, `alert-lg`), solid variant, and icon support
- **Badge**: New variants, sizes, and animation options
- **Card**: Enhanced with more variants and utilities
- **Forms**: Comprehensive validation states and feedback

### Storybook Integration

Interactive component documentation and testing:

```bash
npm run storybook
```

### Design Token System

Comprehensive design token documentation with automated analysis:

```bash
npm run analyze:tokens
```

## Browser Support

v2.1 requires modern browsers that support:
- CSS Grid
- CSS Custom Properties (CSS Variables)
- `color-mix()` function (with fallbacks)
- `grid-template-rows` animation

**Minimum Versions:**
- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+

For older browsers, consider including appropriate polyfills or using v2.0.

## Testing Your Migration

1. **Visual Testing**: Check all alert, accordion, and form validation components
2. **Accessibility**: Verify ARIA attributes and keyboard navigation
3. **Responsive**: Test on mobile and tablet devices
4. **Dark Mode**: Test both light and dark themes
5. **Animations**: Verify accordion animations with various content heights

## Getting Help

- 📖 [Documentation](./docs/)
- 🎨 [Storybook](http://localhost:6006) (run `npm run storybook`)
- 📊 [Design Tokens](./docs/design-tokens.md)
- 🐛 [Report Issues](https://github.com/BoxPistols/asagiri/issues)

## Rollback

If you encounter issues with v2.1, you can temporarily roll back to v2.0:

```bash
npm install asagiri@2.0.0
```

Please report any issues so we can address them in future updates.

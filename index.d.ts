/**
 * Asagiri CSS Framework v2.0
 * TypeScript type definitions for utility classes and components
 */

// Spacing scale
export type SpacingScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20;

// Margin utilities
export type MarginClass =
  | `m-${SpacingScale}`
  | `mt-${SpacingScale}`
  | `mr-${SpacingScale}`
  | `mb-${SpacingScale}`
  | `ml-${SpacingScale}`
  | `mx-${SpacingScale}`
  | `my-${SpacingScale}`;

// Padding utilities
export type PaddingClass =
  | `p-${SpacingScale}`
  | `pt-${SpacingScale}`
  | `pr-${SpacingScale}`
  | `pb-${SpacingScale}`
  | `pl-${SpacingScale}`
  | `px-${SpacingScale}`
  | `py-${SpacingScale}`;

// Display utilities
export type DisplayClass =
  | 'd-block'
  | 'd-inline'
  | 'd-inline-block'
  | 'd-flex'
  | 'd-inline-flex'
  | 'd-grid'
  | 'd-none';

// Flexbox utilities
export type FlexClass =
  | 'flex-row'
  | 'flex-row-reverse'
  | 'flex-column'
  | 'flex-column-reverse'
  | 'flex-wrap'
  | 'flex-nowrap'
  | 'flex-wrap-reverse'
  | 'justify-start'
  | 'justify-end'
  | 'justify-center'
  | 'justify-between'
  | 'justify-around'
  | 'justify-evenly'
  | 'items-start'
  | 'items-end'
  | 'items-center'
  | 'items-baseline'
  | 'items-stretch'
  | 'flex-1'
  | 'flex-auto'
  | 'flex-none';

// Grid utilities
export type GridColsClass =
  | 'grid-cols-1'
  | 'grid-cols-2'
  | 'grid-cols-3'
  | 'grid-cols-4'
  | 'grid-cols-5'
  | 'grid-cols-6'
  | 'grid-cols-7'
  | 'grid-cols-8'
  | 'grid-cols-9'
  | 'grid-cols-10'
  | 'grid-cols-11'
  | 'grid-cols-12';

export type GridClass =
  | 'grid'
  | GridColsClass
  | 'grid-auto-fit-sm'
  | 'grid-auto-fit-md'
  | 'grid-auto-fit-lg'
  | 'grid-auto-fill-sm'
  | 'grid-auto-fill-md'
  | 'grid-auto-fill-lg'
  | 'col-span-1'
  | 'col-span-2'
  | 'col-span-3'
  | 'col-span-4'
  | 'col-span-5'
  | 'col-span-6'
  | 'col-span-7'
  | 'col-span-8'
  | 'col-span-9'
  | 'col-span-10'
  | 'col-span-11'
  | 'col-span-12'
  | 'col-span-full'
  | `gap-${SpacingScale}`
  | `gap-x-${SpacingScale}`
  | `gap-y-${SpacingScale}`;

// Position utilities
export type PositionClass =
  | 'position-static'
  | 'position-relative'
  | 'position-absolute'
  | 'position-fixed'
  | 'position-sticky';

// Opacity utilities
export type OpacityClass =
  | 'opacity-0'
  | 'opacity-25'
  | 'opacity-50'
  | 'opacity-75'
  | 'opacity-100';

// Z-index utilities
export type ZIndexClass =
  | 'z-0'
  | 'z-10'
  | 'z-20'
  | 'z-30'
  | 'z-40'
  | 'z-50'
  | 'z-auto';

// Overflow utilities
export type OverflowClass =
  | 'overflow-auto'
  | 'overflow-hidden'
  | 'overflow-visible'
  | 'overflow-scroll'
  | 'overflow-x-auto'
  | 'overflow-x-hidden'
  | 'overflow-y-auto'
  | 'overflow-y-hidden';

// Text alignment utilities
export type TextAlignClass =
  | 'text-left'
  | 'text-center'
  | 'text-right'
  | 'text-justify';

// Other utilities
export type UtilityClass =
  | 'select-none'
  | 'select-text'
  | 'select-all';

// Accessibility utilities
export type AccessibilityClass =
  | 'sr-only'
  | 'visually-hidden'
  | 'focus-visible'
  | 'touch-target'
  | 'skip-link';

// Typography classes
export type TypographyClass =
  | 'head-1'
  | 'head-2'
  | 'head-3'
  | 'head-4'
  | 'head-5'
  | 'head-6'
  | 'lead'
  | 'small'
  | 'text-muted';

// Button classes
export type ButtonClass =
  | 'btn'
  | 'btn-primary'
  | 'btn-secondary'
  | 'btn-success'
  | 'btn-danger'
  | 'btn-warning'
  | 'btn-info'
  | 'btn-light'
  | 'btn-dark'
  | 'btn-link'
  | 'btn-outline'
  | 'btn-sm'
  | 'btn-lg'
  | 'btn-block';

// Alert classes (Enhanced v2.1)
export type AlertClass =
  | 'alert'
  | 'alert-primary'
  | 'alert-secondary'
  | 'alert-success'
  | 'alert-warning'
  | 'alert-danger'
  | 'alert-info'
  | 'alert-light'
  | 'alert-dark'
  | 'alert-dismissible'
  | 'alert-close'
  | 'alert-heading'
  | 'alert-solid'
  | 'alert-sm'
  | 'alert-lg'
  | 'alert-with-icon'
  | 'alert-icon'
  | 'alert-content';

// Badge classes (New v2.1)
export type BadgeClass =
  | 'badge'
  | 'badge-primary'
  | 'badge-secondary'
  | 'badge-accent'
  | 'badge-success'
  | 'badge-warning'
  | 'badge-danger'
  | 'badge-info'
  | 'badge-light'
  | 'badge-dark'
  | 'badge-elegant'
  | 'badge-outline'
  | 'badge-soft'
  | 'badge-sm'
  | 'badge-lg'
  | 'badge-xl'
  | 'badge-pill'
  | 'badge-square'
  | 'badge-circle'
  | 'badge-dot'
  | 'badge-pulse'
  | 'badge-with-icon'
  | 'badge-icon'
  | 'badge-positioned'
  | 'badge-group';

// Tabs classes (New v2.1)
export type TabsClass =
  | 'tabs'
  | 'tabs-nav'
  | 'tab-link'
  | 'tab-icon'
  | 'tabs-content'
  | 'tab-panel'
  | 'tabs-pills'
  | 'tabs-pills-outline'
  | 'tabs-vertical'
  | 'tabs-justified'
  | 'tabs-centered'
  | 'tabs-right'
  | 'tabs-sm'
  | 'tabs-lg'
  | 'tabs-animated'
  | 'tabs-scrollable';

// Accordion classes (New v2.1)
export type AccordionClass =
  | 'accordion'
  | 'accordion-item'
  | 'accordion-header'
  | 'accordion-panel'
  | 'accordion-flush'
  | 'accordion-compact'
  | 'accordion-always-open';

// Pagination classes (New v2.1)
export type PaginationClass =
  | 'pagination'
  | 'page-link'
  | 'page-prev'
  | 'page-next'
  | 'page-ellipsis'
  | 'pagination-pills'
  | 'pagination-sm'
  | 'pagination-lg'
  | 'pagination-simple';

// Breadcrumb classes (New v2.1)
export type BreadcrumbClass =
  | 'breadcrumb'
  | 'breadcrumb-item'
  | 'breadcrumb-arrow'
  | 'breadcrumb-dot'
  | 'breadcrumb-gt'
  | 'breadcrumb-compact'
  | 'breadcrumb-bg'
  | 'breadcrumb-item-icon'
  | 'breadcrumb-icon'
  | 'breadcrumb-responsive'
  | 'breadcrumb-keep';

// Progress classes (New v2.1)
export type ProgressClass =
  | 'progress'
  | 'progress-bar'
  | 'progress-label'
  | 'progress-bar-success'
  | 'progress-bar-warning'
  | 'progress-bar-danger'
  | 'progress-bar-info'
  | 'progress-sm'
  | 'progress-lg'
  | 'progress-xl'
  | 'progress-bar-striped'
  | 'progress-bar-animated'
  | 'progress-indeterminate'
  | 'progress-stacked'
  | 'progress-vertical'
  | 'progress-with-label'
  | 'progress-label-text'
  | 'progress-rounded'
  | 'progress-square';

// Loading/Spinner classes (New v2.1)
export type LoadingClass =
  | 'spinner'
  | 'spinner-sm'
  | 'spinner-lg'
  | 'spinner-xl'
  | 'spinner-primary'
  | 'spinner-success'
  | 'spinner-warning'
  | 'spinner-danger'
  | 'spinner-info'
  | 'spinner-light'
  | 'spinner-dark'
  | 'spinner-grow'
  | 'spinner-border'
  | 'spinner-dots'
  | 'spinner-pulse'
  | 'loading-overlay'
  | 'btn-loading'
  | 'button-loading'
  | 'loading-text';

// Skeleton classes (New v2.1)
export type SkeletonClass =
  | 'skeleton'
  | 'skeleton-text'
  | 'skeleton-text-sm'
  | 'skeleton-text-lg'
  | 'skeleton-heading'
  | 'skeleton-h1'
  | 'skeleton-h2'
  | 'skeleton-h3'
  | 'skeleton-paragraph'
  | 'skeleton-rect'
  | 'skeleton-square'
  | 'skeleton-circle'
  | 'skeleton-avatar'
  | 'skeleton-avatar-sm'
  | 'skeleton-avatar-md'
  | 'skeleton-avatar-lg'
  | 'skeleton-avatar-xl'
  | 'skeleton-button'
  | 'skeleton-button-sm'
  | 'skeleton-button-lg'
  | 'skeleton-button-block'
  | 'skeleton-card'
  | 'skeleton-table-row'
  | 'skeleton-list-item'
  | 'skeleton-media'
  | 'skeleton-image'
  | 'skeleton-body'
  | 'skeleton-content'
  | 'skeleton-pulse'
  | 'skeleton-wave'
  | 'skeleton-static'
  | 'skeleton-group'
  | 'skeleton-post'
  | 'skeleton-meta'
  | 'skeleton-profile'
  | 'skeleton-info';

// Card classes (Enhanced v2.1)
export type CardClass =
  | 'card'
  | 'card-header'
  | 'card-header-icon'
  | 'card-body'
  | 'card-footer'
  | 'card-title'
  | 'card-subtitle'
  | 'card-text'
  | 'card-img'
  | 'card-img-top'
  | 'card-img-bottom'
  | 'card-img-overlay'
  | 'card-link'
  | 'card-actions'
  | 'card-actions-end'
  | 'card-actions-center'
  | 'card-actions-between'
  | 'card-hover'
  | 'card-clickable'
  | 'card-sm'
  | 'card-lg'
  | 'card-borderless'
  | 'card-flat'
  | 'card-outlined'
  | 'card-primary'
  | 'card-success'
  | 'card-warning'
  | 'card-danger'
  | 'card-info'
  | 'card-horizontal'
  | 'card-group'
  | 'card-deck'
  | 'card-columns';

// Avatar classes (New v2.1)
export type AvatarClass =
  | 'avatar'
  | 'avatar-xs'
  | 'avatar-sm'
  | 'avatar-md'
  | 'avatar-lg'
  | 'avatar-xl'
  | 'avatar-xxl'
  | 'avatar-square'
  | 'avatar-rounded'
  | 'avatar-bordered'
  | 'avatar-primary'
  | 'avatar-secondary'
  | 'avatar-success'
  | 'avatar-warning'
  | 'avatar-danger'
  | 'avatar-info'
  | 'avatar-elegant'
  | 'avatar-status'
  | 'avatar-status-online'
  | 'avatar-status-offline'
  | 'avatar-status-away'
  | 'avatar-status-busy'
  | 'avatar-group'
  | 'avatar-count'
  | 'avatar-group-sm'
  | 'avatar-group-lg'
  | 'avatar-icon'
  | 'avatar-icon-img'
  | 'avatar-placeholder'
  | 'avatar-clickable'
  | 'avatar-list'
  | 'avatar-list-item'
  | 'avatar-info'
  | 'avatar-name'
  | 'avatar-meta';

// Form Validation classes (New v2.1)
export type FormValidationClass =
  | 'is-valid'
  | 'is-invalid'
  | 'is-warning'
  | 'valid-feedback'
  | 'invalid-feedback'
  | 'warning-feedback'
  | 'valid-tooltip'
  | 'invalid-tooltip'
  | 'warning-tooltip'
  | 'was-validated'
  | 'form-check-input'
  | 'form-check-label'
  | 'has-success'
  | 'has-error'
  | 'has-warning'
  | 'required'
  | 'form-required';

// Dropdown classes (New v2.1)
export type DropdownClass =
  | 'dropdown'
  | 'dropdown-toggle'
  | 'dropdown-toggle-no-caret'
  | 'dropdown-menu'
  | 'dropdown-item'
  | 'dropdown-header'
  | 'dropdown-divider'
  | 'dropdown-item-text'
  | 'dropdown-menu-right'
  | 'dropdown-menu-center'
  | 'dropup'
  | 'dropend'
  | 'dropstart'
  | 'dropdown-item-icon'
  | 'dropdown-icon'
  | 'dropdown-menu-sm'
  | 'dropdown-menu-lg'
  | 'dropdown-search'
  | 'dropdown-item-badge'
  | 'dropdown-menu-responsive';

// Form classes
export type FormClass =
  | 'form-group'
  | 'form-control'
  | 'form-label'
  | 'form-text'
  | 'form-check'
  | 'form-check-input'
  | 'form-check-label'
  | 'form-inline';

// Container classes
export type ContainerClass =
  | 'container'
  | 'container-fluid'
  | 'container-sm'
  | 'container-md'
  | 'container-lg'
  | 'container-xl';

// Row/Column classes (original grid system)
export type RowColClass =
  | 'row'
  | 'column'
  | 'column-1'
  | 'column-2'
  | 'column-3'
  | 'column-4'
  | 'column-5'
  | 'column-6'
  | 'column-7'
  | 'column-8'
  | 'column-9'
  | 'column-10'
  | 'column-11'
  | 'column-12'
  | 'column-auto';

// Combined utility type
export type AsagiriUtilityClass =
  | MarginClass
  | PaddingClass
  | DisplayClass
  | FlexClass
  | GridClass
  | PositionClass
  | OpacityClass
  | ZIndexClass
  | OverflowClass
  | TextAlignClass
  | UtilityClass
  | AccessibilityClass;

// Combined component type
export type AsagiriComponentClass =
  | TypographyClass
  | ButtonClass
  | AlertClass
  | BadgeClass
  | TabsClass
  | AccordionClass
  | PaginationClass
  | BreadcrumbClass
  | ProgressClass
  | LoadingClass
  | SkeletonClass
  | CardClass
  | AvatarClass
  | FormValidationClass
  | DropdownClass
  | FormClass
  | ContainerClass
  | RowColClass;

// All Asagiri classes
export type AsagiriClass = AsagiriUtilityClass | AsagiriComponentClass;

/**
 * Helper function to combine class names
 * @param classes - Array of class names or conditional class objects
 * @returns Combined class string
 */
export function cn(...classes: (string | undefined | null | false | Record<string, boolean>)[]): string;

/**
 * Helper function specifically for Asagiri classes with type safety
 * @param classes - Array of Asagiri class names
 * @returns Combined class string
 */
export function asagiri(...classes: (AsagiriClass | undefined | null | false)[]): string;

/**
 * CSS file path for direct import
 */
export const cssPath: string;

/**
 * Default export for convenience
 */
declare const _default: {
  cn: typeof cn;
  asagiri: typeof asagiri;
  cssPath: typeof cssPath;
};

export default _default;

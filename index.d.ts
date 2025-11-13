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

// Alert classes
export type AlertClass =
  | 'alert'
  | 'alert-primary'
  | 'alert-secondary'
  | 'alert-success'
  | 'alert-danger'
  | 'alert-warning'
  | 'alert-info'
  | 'alert-light'
  | 'alert-dark';

// Card classes
export type CardClass =
  | 'card'
  | 'card-header'
  | 'card-body'
  | 'card-footer'
  | 'card-title'
  | 'card-text';

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
  | CardClass
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

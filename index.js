/**
 * Asagiri CSS Framework v2.0
 * JavaScript utilities for React, Vue, and other frameworks
 * CommonJS format
 */

'use strict';

/**
 * Combines class names into a single string
 * Supports strings, arrays, objects, and conditional rendering
 *
 * @param {...(string|undefined|null|false|Array|Object)} classes - Class names to combine
 * @returns {string} Combined class string
 *
 * @example
 * cn('btn', 'btn-primary') // => 'btn btn-primary'
 * cn('btn', isActive && 'active') // => 'btn active' (if isActive is true)
 * cn('btn', { active: isActive, disabled: isDisabled }) // => 'btn active' (if isActive is true)
 * cn(['btn', 'btn-primary']) // => 'btn btn-primary'
 */
function cn() {
  const classes = [];

  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i];

    if (!arg) continue;

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const inner = cn.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === 'object') {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        for (const key in arg) {
          if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(' ');
}

/**
 * Asagiri-specific class name helper
 * Provides type-safe class name combination for Asagiri classes
 *
 * @param {...(string|undefined|null|false)} classes - Asagiri class names
 * @returns {string} Combined class string
 *
 * @example
 * asagiri('m-4', 'p-2', 'd-flex') // => 'm-4 p-2 d-flex'
 * asagiri('btn', 'btn-primary', isLarge && 'btn-lg') // => 'btn btn-primary btn-lg' (if isLarge is true)
 */
function asagiri() {
  return cn.apply(null, arguments);
}

/**
 * CSS file path for direct import
 */
const cssPath = './css/main.css';

// CommonJS exports
module.exports = {
  cn: cn,
  asagiri: asagiri,
  cssPath: cssPath
};

module.exports.cn = cn;
module.exports.asagiri = asagiri;
module.exports.cssPath = cssPath;
module.exports.default = module.exports;

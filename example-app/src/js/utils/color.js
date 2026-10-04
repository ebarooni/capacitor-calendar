import { COLOR_PRESETS } from './color-presets.js';

/**
 * Map a select value to a CSS color for the swatch.
 * Supports hex (#RRGGBB / #RRGGBBAA) and known system named colors.
 */
export function cssColorPreview(color) {
  if (typeof color !== 'string') {
    return null;
  }
  const namedPreview = {
    blue: '#007AFF',
    brown: '#A2845E',
    gray: '#8E8E93',
    green: '#34C759',
    indigo: '#5856D6',
    orange: '#FF9500',
    pink: '#FF2D55',
    purple: '#AF52DE',
    red: '#FF3B30',
    teal: '#5AC8FA',
    yellow: '#FFCC00',
  };
  if (namedPreview[color]) {
    return namedPreview[color];
  }
  if (!color.startsWith('#')) {
    return null;
  }
  const digits = color.slice(1);
  if (/^[0-9a-fA-F]{6}$/.test(digits)) {
    return `#${digits}`;
  }
  if (/^[0-9a-fA-F]{8}$/.test(digits)) {
    const red = digits.slice(0, 2);
    const green = digits.slice(2, 4);
    const blue = digits.slice(4, 6);
    const alpha = Number.parseInt(digits.slice(6, 8), 16) / 255;
    return `rgba(${Number.parseInt(red, 16)}, ${Number.parseInt(green, 16)}, ${Number.parseInt(blue, 16)}, ${alpha})`;
  }
  return null;
}

export function updateColorSwatch(swatchSelector, color, omittedTitle) {
  const swatch = document.querySelector(swatchSelector);
  if (!swatch) {
    return;
  }
  if (!color) {
    swatch.style.background = '';
    swatch.title = omittedTitle;
    return;
  }
  const preview = cssColorPreview(color);
  if (preview) {
    swatch.style.background = preview;
    swatch.title = color;
  } else {
    swatch.style.background = '';
    swatch.title = `${color} (no CSS preview)`;
  }
}

export function initColorSelects() {
  document.querySelectorAll('ion-select.color-select').forEach((select) => {
    const presetName = select.dataset.colorPreset;
    const options = COLOR_PRESETS[presetName];
    if (!options) {
      return;
    }

    select.innerHTML = '';
    for (const option of options) {
      const element = document.createElement('ion-select-option');
      element.value = option.value;
      element.textContent = option.label;
      select.appendChild(element);
    }

    const swatchId = select.dataset.swatch;
    const omitTitle = select.dataset.omitTitle || 'Color omitted';
    if (swatchId) {
      updateColorSwatch(`#${swatchId}`, select.value, omitTitle);
      select.addEventListener('ionChange', (event) => {
        updateColorSwatch(`#${swatchId}`, event.detail.value, omitTitle);
      });
    }
  });
}

/** Returns `{ color }` only when the select has a value; empty means omit the field. */
export function optionalColorFromSelect(selector) {
  const color = document.querySelector(selector)?.value;
  return color ? { color } : {};
}

/**
 * Event color is hex-only (Android). Named / non-hex selections are omitted
 * so createEvent does not reject with `Invalid color format.` on the happy path.
 */
export function optionalEventHexColor(selector) {
  const color = document.querySelector(selector)?.value;
  return color && color.startsWith('#') ? { color } : {};
}

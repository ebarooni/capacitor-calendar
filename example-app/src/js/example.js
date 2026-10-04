import { registerAllMethods } from './methods/index.js';
import { initColorSelects } from './utils/color.js';
import { initIdFields } from './utils/ids.js';
import { applyWebMethodVisibility, isWebPlatform, selectMethodsTab } from './utils/platform.js';

document.addEventListener('DOMContentLoaded', () => {
  if (isWebPlatform()) {
    applyWebMethodVisibility();
  }

  selectMethodsTab();
  initColorSelects();
  initIdFields();
  registerAllMethods();
});

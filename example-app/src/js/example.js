import { registerAllMethods } from './methods/index.js';
import { initColorSelects } from './utils/color.js';
import { applyWebMethodVisibility, isWebPlatform, selectMethodsTab } from './utils/platform.js';
import { initResultSelects } from './utils/result-selects.js';

document.addEventListener('DOMContentLoaded', () => {
  if (isWebPlatform()) {
    applyWebMethodVisibility();
  }

  selectMethodsTab();
  initColorSelects();
  initResultSelects();
  registerAllMethods();
});

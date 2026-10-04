import { Capacitor } from '@capacitor/core';

const WEB_SUPPORTED_METHOD_IDS = new Set(['create-event', 'create-event-with-prompt']);

export function isWebPlatform() {
  return Capacitor.getPlatform() === 'web';
}

export function selectMethodsTab() {
  const tabs = document.querySelector('ion-tabs');
  if (tabs && typeof tabs.select === 'function') {
    void tabs.select('methods');
  }
}

export function applyWebMethodVisibility() {
  const note = document.querySelector('#web-platform-note');
  if (note) {
    note.hidden = false;
  }

  document.querySelectorAll('#methods-list ion-button').forEach((button) => {
    const id = button.id;
    if (!id) {
      return;
    }
    if (WEB_SUPPORTED_METHOD_IDS.has(id)) {
      button.disabled = false;
      return;
    }
    button.disabled = true;
    button.setAttribute('title', 'Not available on web (export-only)');
  });
}

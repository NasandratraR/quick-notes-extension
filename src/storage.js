/* ═══════════════════════════════════════════════════════════════════
   Stockage
   ═══════════════════════════════════════════════════════════════════ */
import { state, STORAGE_KEYS } from './state.js';

export function loadNotes() {
  return new Promise(resolve => {
    chrome.storage.local.get([STORAGE_KEYS.notes], r => resolve(r[STORAGE_KEYS.notes] || []));
  });
}

export function persistNotes() {
  return new Promise(resolve => {
    chrome.storage.local.set({ [STORAGE_KEYS.notes]: state.notes }, resolve);
  });
}

/* ═══════════════════════════════════════════════════════════════════
   Stockage des groupes
   ═══════════════════════════════════════════════════════════════════ */
export function loadGroups() {
  return new Promise(resolve => {
    chrome.storage.local.get([STORAGE_KEYS.groups], r => resolve(r[STORAGE_KEYS.groups] || []));
  });
}

export function persistGroups() {
  return new Promise(resolve => {
    chrome.storage.local.set({
      [STORAGE_KEYS.groups]: state.groups,
      [STORAGE_KEYS.ungroupedCollapsed]: state.ungroupedCollapsed,
    }, resolve);
  });
}

/* ═══════════════════════════════════════════════════════════════════
   Stockage des images (séparé des notes)
   ═══════════════════════════════════════════════════════════════════ */
export function loadImages() {
  return new Promise(resolve => {
    chrome.storage.local.get([STORAGE_KEYS.images], r => {
      state.images = r[STORAGE_KEYS.images] || {};
      resolve();
    });
  });
}

export function saveImage(id, dataUrl) {
  state.images[id] = dataUrl;
  return new Promise(resolve => {
    chrome.storage.local.set({ [STORAGE_KEYS.images]: state.images }, resolve);
  });
}

export function deleteImages(ids) {
  ids.forEach(id => delete state.images[id]);
  return new Promise(resolve => {
    chrome.storage.local.set({ [STORAGE_KEYS.images]: state.images }, resolve);
  });
}

export function extractImageIds(content) {
  return [...content.matchAll(/!\[[^\]]*\]\(img:([a-z0-9]+)/g)].map(m => m[1]);
}

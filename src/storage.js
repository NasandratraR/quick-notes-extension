/* ═══════════════════════════════════════════════════════════════════
   Stockage

   chrome.storage.local reste le cache local rapide (rendu instantané,
   fonctionne hors-ligne). Quand un utilisateur est connecté (Firebase
   Auth), les notes/groupes sont en plus synchronisés avec Firestore :
   Firestore fait autorité au chargement, et chaque sauvegarde y est
   répercutée en fire-and-forget (les échecs réseau sont avalés pour ne
   jamais bloquer l'usage hors-ligne).
   ═══════════════════════════════════════════════════════════════════ */
import { state, STORAGE_KEYS } from './state.js';
import { getCurrentUser } from './auth.js';
import { getDoc, setDoc } from './firestore.js';

export async function loadNotes() {
  const local = await new Promise(resolve => {
    chrome.storage.local.get([STORAGE_KEYS.notes], r => resolve(r[STORAGE_KEYS.notes] || []));
  });

  const user = getCurrentUser();
  if (!user) return local;

  try {
    const remote = await getDoc(`quicknotes_users/${user.uid}/data/notes`);
    if (remote?.notes) {
      await new Promise(resolve => chrome.storage.local.set({ [STORAGE_KEYS.notes]: remote.notes }, resolve));
      return remote.notes;
    }
  } catch (err) {
    console.warn('Pull Firestore (notes) impossible, utilisation du cache local.', err);
  }
  return local;
}

export async function persistNotes() {
  await new Promise(resolve => {
    chrome.storage.local.set({ [STORAGE_KEYS.notes]: state.notes }, resolve);
  });

  const user = getCurrentUser();
  if (!user) return;
  setDoc(`quicknotes_users/${user.uid}/data/notes`, { notes: state.notes })
    .catch(err => console.warn('Push Firestore (notes) impossible.', err));
}

/* ═══════════════════════════════════════════════════════════════════
   Stockage des groupes
   ═══════════════════════════════════════════════════════════════════ */
export async function loadGroups() {
  const local = await new Promise(resolve => {
    chrome.storage.local.get([STORAGE_KEYS.groups], r => resolve(r[STORAGE_KEYS.groups] || []));
  });

  const user = getCurrentUser();
  if (!user) return local;

  try {
    const remote = await getDoc(`quicknotes_users/${user.uid}/data/groups`);
    if (remote?.groups) {
      await new Promise(resolve => chrome.storage.local.set({
        [STORAGE_KEYS.groups]: remote.groups,
        [STORAGE_KEYS.ungroupedCollapsed]: remote.ungroupedCollapsed || false,
      }, resolve));
      state.ungroupedCollapsed = remote.ungroupedCollapsed || false;
      return remote.groups;
    }
  } catch (err) {
    console.warn('Pull Firestore (groupes) impossible, utilisation du cache local.', err);
  }
  return local;
}

export async function persistGroups() {
  await new Promise(resolve => {
    chrome.storage.local.set({
      [STORAGE_KEYS.groups]: state.groups,
      [STORAGE_KEYS.ungroupedCollapsed]: state.ungroupedCollapsed,
    }, resolve);
  });

  const user = getCurrentUser();
  if (!user) return;
  setDoc(`quicknotes_users/${user.uid}/data/groups`, { groups: state.groups, ungroupedCollapsed: state.ungroupedCollapsed })
    .catch(err => console.warn('Push Firestore (groupes) impossible.', err));
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

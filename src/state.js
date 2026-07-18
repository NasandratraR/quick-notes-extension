import { TEXT_COLORS } from './constants.js';

/* ═══════════════════════════════════════════════════════════════════
   État global partagé

   Regroupé dans un seul objet mutable (plutôt que des `let` exportés)
   car les modules ES interdisent de réassigner un binding importé :
   `import { notes } from './state.js'; notes = []` lèverait une erreur.
   En revanche, muter une propriété d'objet (`state.notes = []`) fonctionne.
   ═══════════════════════════════════════════════════════════════════ */
export const state = {
  notes: [],
  groups: [],
  images: {},          // { imgId: dataUrl }
  currentNoteId: null,

  saveTimer: null,
  renderTimer: null,
  toastTimer: null,

  isPreviewMode: false,
  isSplitMode: false,

  currentTextColor: TEXT_COLORS[0],
  currentTheme: 'brun',
  currentFont: 'default',
  currentFontSize: 13,
  currentFontWeight: 400,

  tocScrollPending: false,
  isTocOpen: true,

  dragOverGroupId: null,
  ungroupedCollapsed: false,
  groupDrag: null,

  editorSearchQuery: '',
  editorSearchMatches: [],
  editorSearchIdx: -1,
};

/* ═══════════════════════════════════════════════════════════════════
   Clés de stockage chrome.storage.local
   ═══════════════════════════════════════════════════════════════════ */
export const STORAGE_KEYS = {
  notes: 'quicknotes',
  groups: 'quicknotes_groups',
  images: 'quicknotes_images',
  ungroupedCollapsed: 'quicknotes_ungrouped_collapsed',
  theme: 'quicknotes_theme',
  font: 'quicknotes_font',
  fontSize: 'quicknotes_font_size',
  fontWeight: 'quicknotes_font_weight',
  auth: 'quicknotes_auth',
};

/* ═══════════════════════════════════════════════════════════════════
   Point d'entrée : raccourcis clavier + initialisation + wiring des
   événements de l'interface
   ═══════════════════════════════════════════════════════════════════ */
import { state, STORAGE_KEYS } from './state.js';
import { generateId } from './utils.js';
import { loadNotes, persistNotes, loadGroups, loadImages, saveImage } from './storage.js';
import {
  applyTheme, applyFont, applyFontSize, applyFontWeight,
  renderFontFamilyPicker, toggleFontFamilyPicker, closeFontFamilyPicker,
  toggleColorPicker, closeColorPicker, toggleSettingsPanel,
} from './themes.js';
import { renderNoteList } from './notes-list.js';
import {
  selectNote, createNote, deleteCurrentNote,
  onTitleInput, onEditorInput, toggleInfoPanel, closeInfoPanel,
} from './notes-crud.js';
import { showNewGroupInput } from './groups.js';
import { toggleToc } from './toc.js';
import { setSplitMode, setPreviewMode } from './preview.js';
import {
  wrapSelection, insertList, insertCheckbox, insertCodeBlock,
  toggleLangPicker, closeLangPicker,
} from './editor-format.js';
import { exportAllNotes, exportCurrentNote, importFromFile } from './export-import.js';
import {
  openEditorSearch, closeEditorSearch, updateEditorSearch,
  navigateEditorSearch, syncHighlightScroll,
} from './editor-search.js';

/* ═══════════════════════════════════════════════════════════════════
   Raccourcis clavier
   ═══════════════════════════════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  const ctrl = e.ctrlKey || e.metaKey;
  const editor = document.getElementById('note-editor');

  if (ctrl && e.key === 'n')           { e.preventDefault(); createNote(); return; }
  if (ctrl && e.key === 'f') {
    e.preventDefault();
    if (state.currentNoteId) {
      openEditorSearch();
    } else {
      document.getElementById('search-input').focus();
    }
    return;
  }
  if (ctrl && e.shiftKey && e.key==='K') { e.preventDefault(); toggleLangPicker(); return; }
  if (ctrl && e.shiftKey && e.key==='U') { e.preventDefault(); insertList(false);   return; }
  if (ctrl && e.shiftKey && e.key==='O') { e.preventDefault(); insertList(true);    return; }
  if (ctrl && e.shiftKey && e.key==='C') { e.preventDefault(); insertCheckbox();    return; }
  if (ctrl && e.key === 'e')           { e.preventDefault(); wrapSelection(editor, '`', '`'); return; }
  if (ctrl && e.key === 'b' && !state.isPreviewMode) { e.preventDefault(); wrapSelection(editor, '**', '**'); return; }
  if (ctrl && e.key === 'i' && !state.isPreviewMode) { e.preventDefault(); wrapSelection(editor, '*', '*'); return; }
  if (ctrl && e.key === 'p')           { e.preventDefault(); setPreviewMode(!state.isPreviewMode); return; }
  if (ctrl && e.key === '\\')          { e.preventDefault(); setSplitMode(!state.isSplitMode); return; }
  if (ctrl && e.key === 't')           { e.preventDefault(); toggleToc(); return; }
  if (e.key === 'Escape') {
    const searchBar = document.getElementById('editor-search-bar');
    if (searchBar && searchBar.style.display !== 'none') {
      closeEditorSearch();
      document.getElementById('note-editor').focus();
      return;
    }
    closeLangPicker();
    closeInfoPanel();
    return;
  }

  /* Tab dans l'éditeur → insérer des espaces */
  if (e.key === 'Tab' && document.activeElement === editor) {
    e.preventDefault();
    const start = editor.selectionStart;
    editor.setRangeText('  ', start, editor.selectionEnd, 'end');
    onEditorInput();
  }
});

/* ═══════════════════════════════════════════════════════════════════
   Initialisation
   ═══════════════════════════════════════════════════════════════════ */
async function init() {
  const [loadedNotes, loadedGroups, , savedTheme, savedFont, savedFontSize, savedFontWeight, savedUngroupedCollapsed] = await Promise.all([
    loadNotes(),
    loadGroups(),
    loadImages(),
    new Promise(r => chrome.storage.local.get([STORAGE_KEYS.theme], d => r(d[STORAGE_KEYS.theme] || 'brun'))),
    new Promise(r => chrome.storage.local.get([STORAGE_KEYS.font], d => r(d[STORAGE_KEYS.font] || 'default'))),
    new Promise(r => chrome.storage.local.get([STORAGE_KEYS.fontSize], d => r(d[STORAGE_KEYS.fontSize] || 13))),
    new Promise(r => chrome.storage.local.get([STORAGE_KEYS.fontWeight], d => r(d[STORAGE_KEYS.fontWeight] || 400))),
    new Promise(r => chrome.storage.local.get([STORAGE_KEYS.ungroupedCollapsed], d => r(d[STORAGE_KEYS.ungroupedCollapsed] || false))),
  ]);
  state.notes              = loadedNotes;
  state.groups             = loadedGroups;
  state.ungroupedCollapsed = savedUngroupedCollapsed;
  applyTheme(savedTheme);
  applyFont(savedFont);
  applyFontSize(savedFontSize);
  applyFontWeight(savedFontWeight);
  renderNoteList();

  if (state.notes.length > 0) {
    const sorted = [...state.notes].sort((a, b) => b.updatedAt - a.updatedAt);
    selectNote(sorted[0].id);
  } else {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('empty-state').style.display  = 'flex';
  }

  /* ── Barre principale ── */
  document.getElementById('new-note-btn').addEventListener('click', createNote);
  document.getElementById('new-group-btn').addEventListener('click', showNewGroupInput);
  document.getElementById('delete-btn').addEventListener('click', deleteCurrentNote);
  document.getElementById('info-btn').addEventListener('click', toggleInfoPanel);
  document.getElementById('close-info-btn').addEventListener('click', closeInfoPanel);
  document.getElementById('toggle-sidebar-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  });
  /* ── Redimensionnement de la TOC ── */
  const tocHandle = document.getElementById('toc-resize-handle');
  const tocPanel  = document.getElementById('toc-panel');
  let tocResizing = false;

  tocHandle.addEventListener('pointerdown', e => {
    e.preventDefault();
    tocResizing = true;
    tocHandle.classList.add('resizing');
    document.addEventListener('pointermove', onTocResize, { passive: false });
    document.addEventListener('pointerup', onTocResizeEnd);
  });

  function onTocResize(e) {
    if (!tocResizing) return;
    const rect = tocPanel.getBoundingClientRect();
    const newWidth = rect.right - e.clientX;
    const clamped = Math.min(520, Math.max(140, newWidth));
    tocPanel.style.width = clamped + 'px';
  }

  function onTocResizeEnd() {
    tocResizing = false;
    tocHandle.classList.remove('resizing');
    document.removeEventListener('pointermove', onTocResize);
    document.removeEventListener('pointerup', onTocResizeEnd);
    /* Sauvegarder la largeur dans la note courante */
    if (state.currentNoteId) {
      const note = state.notes.find(n => n.id === state.currentNoteId);
      if (note) {
        note.tocWidth = parseInt(tocPanel.style.width);
        persistNotes();
      }
    }
  }

  document.getElementById('btn-toc').classList.add('split-active');
  document.getElementById('btn-toc').addEventListener('click', toggleToc);
  document.getElementById('btn-split').addEventListener('click', () => setSplitMode(!state.isSplitMode));
  document.getElementById('settings-btn').addEventListener('click', toggleSettingsPanel);
  document.getElementById('close-settings-btn').addEventListener('click', () => {
    document.getElementById('settings-panel').style.display = 'none';
  });

  renderFontFamilyPicker();
  document.getElementById('btn-font-family').addEventListener('click', toggleFontFamilyPicker);
  document.getElementById('fmt-size-dec').addEventListener('click', () => applyFontSize(state.currentFontSize - 1));
  document.getElementById('fmt-size-inc').addEventListener('click', () => applyFontSize(state.currentFontSize + 1));
  document.getElementById('fmt-weight-dec').addEventListener('click', () => applyFontWeight(state.currentFontWeight - 100));
  document.getElementById('fmt-weight-inc').addEventListener('click', () => applyFontWeight(state.currentFontWeight + 100));

  document.getElementById('export-json-btn').addEventListener('click', exportAllNotes);
  document.getElementById('export-md-btn').addEventListener('click', exportCurrentNote);

  const importFileInput = document.getElementById('import-file-input');
  document.getElementById('import-btn').addEventListener('click', () => importFileInput.click());
  importFileInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) { importFromFile(file); importFileInput.value = ''; }
  });

  document.getElementById('fullscreen-btn').addEventListener('click', () => {
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
  });
  document.getElementById('create-first-btn').addEventListener('click', createNote);

  /* ── Barre de formatage ── */
  document.getElementById('btn-code-block').addEventListener('click', toggleLangPicker);

  document.getElementById('btn-inline-code').addEventListener('click', () => {
    wrapSelection(document.getElementById('note-editor'), '`', '`');
  });

  document.getElementById('btn-bold').addEventListener('click', () => {
    wrapSelection(document.getElementById('note-editor'), '**', '**');
  });

  document.getElementById('btn-italic').addEventListener('click', () => {
    wrapSelection(document.getElementById('note-editor'), '*', '*');
  });

  document.getElementById('btn-heading').addEventListener('click', () => {
    document.getElementById('heading-picker').classList.toggle('open');
  });

  document.getElementById('heading-picker').addEventListener('click', e => {
    const item = e.target.closest('.heading-picker-item');
    if (!item) return;
    const level = parseInt(item.dataset.level);
    const editor = document.getElementById('note-editor');
    const start = editor.selectionStart;
    const lineStart = editor.value.lastIndexOf('\n', start - 1) + 1;
    const lineEnd = editor.value.indexOf('\n', start);
    const lineEndPos = lineEnd === -1 ? editor.value.length : lineEnd;
    const line = editor.value.slice(lineStart, lineEndPos);
    const cleanLine = line.replace(/^#{1,6}\s*/, '');
    const newLine = '#'.repeat(level) + ' ' + cleanLine;
    editor.setRangeText(newLine, lineStart, lineEndPos, 'end');
    editor.focus();
    onEditorInput();
    document.getElementById('heading-picker').classList.remove('open');
  });

  /* Fermer les dropdowns si clic ailleurs (listener unique) */
  document.addEventListener('click', e => {
    const langPicker = document.getElementById('lang-picker');
    const langBtn    = document.getElementById('btn-code-block');
    if (!langPicker.contains(e.target) && e.target !== langBtn && !langBtn.contains(e.target)) {
      closeLangPicker();
    }
    const hPicker = document.getElementById('heading-picker');
    const hBtn    = document.getElementById('btn-heading');
    if (!hPicker.contains(e.target) && !hBtn.contains(e.target)) {
      hPicker.classList.remove('open');
    }
    const fPicker = document.getElementById('font-family-picker');
    const fBtn    = document.getElementById('btn-font-family');
    if (!fPicker.contains(e.target) && !fBtn.contains(e.target)) {
      closeFontFamilyPicker();
    }
    const cDropdown = document.getElementById('color-picker-dropdown');
    const cBtn      = document.getElementById('btn-text-color');
    if (!cDropdown.contains(e.target) && !cBtn.contains(e.target)) {
      closeColorPicker();
    }
  });

  document.getElementById('btn-text-color').addEventListener('click', toggleColorPicker);
  document.getElementById('color-a-bar').style.background = state.currentTextColor;

  document.getElementById('btn-ul').addEventListener('click', () => insertList(false));
  document.getElementById('btn-ol').addEventListener('click', () => insertList(true));
  document.getElementById('btn-checkbox').addEventListener('click', insertCheckbox);

  document.getElementById('btn-edit-mode').addEventListener('click', () => setPreviewMode(false));
  document.getElementById('btn-preview-mode').addEventListener('click', () => setPreviewMode(true));

  /* ── Emojis ── */
  document.getElementById('emoji-bar').addEventListener('click', e => {
    const btn = e.target.closest('.emoji-btn');
    if (!btn) return;
    if (state.isSplitMode || !state.isPreviewMode) {
      const editor = document.getElementById('note-editor');
      const pos = editor.selectionStart;
      editor.setRangeText(btn.dataset.emoji, pos, editor.selectionEnd, 'end');
      editor.focus();
      onEditorInput();
    } else {
      setPreviewMode(false);
      const editor = document.getElementById('note-editor');
      const pos = editor.value.length;
      editor.setRangeText(btn.dataset.emoji, pos, pos, 'end');
      editor.focus();
      onEditorInput();
    }
  });

  /* Sélection d'un langage dans le dropdown */
  document.getElementById('lang-picker').addEventListener('click', e => {
    const item = e.target.closest('.lang-picker-item');
    if (!item) return;
    insertCodeBlock(item.dataset.lang);
    closeLangPicker();
  });

  /* ── Collage d'image (Ctrl+V) ── */
  document.addEventListener('paste', e => {
    if (!state.currentNoteId) return;
    const items = Array.from(e.clipboardData?.items || []);
    const imageItem = items.find(it => it.type.startsWith('image/'));
    if (!imageItem) return;

    e.preventDefault();
    const blob = imageItem.getAsFile();
    const reader = new FileReader();
    reader.onload = async () => {
      const imgId = generateId();
      await saveImage(imgId, reader.result);

      if (state.isPreviewMode) setPreviewMode(false);
      const editor = document.getElementById('note-editor');
      const pos = editor.selectionStart;
      const needsNewline = pos > 0 && editor.value[pos - 1] !== '\n';
      const insertion = (needsNewline ? '\n' : '') + `![](img:${imgId})\n`;
      editor.setRangeText(insertion, pos, editor.selectionEnd, 'end');
      editor.focus();
      onEditorInput();
    };
    reader.readAsDataURL(blob);
  });

  /* ── Titre ── */
  document.getElementById('note-title-input').addEventListener('input', onTitleInput);
  document.getElementById('note-title-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); document.getElementById('note-editor').focus(); }
  });

  /* ── Recherche dans l'éditeur ── */
  document.getElementById('editor-search-input').addEventListener('input', updateEditorSearch);
  document.getElementById('editor-search-input').addEventListener('keydown', e => {
    if (e.key === 'Enter')  { e.preventDefault(); navigateEditorSearch(e.shiftKey ? -1 : 1); }
    if (e.key === 'Escape') { closeEditorSearch(); document.getElementById('note-editor').focus(); }
  });
  document.getElementById('editor-search-prev').addEventListener('click', () => navigateEditorSearch(-1));
  document.getElementById('editor-search-next').addEventListener('click', () => navigateEditorSearch(1));
  document.getElementById('editor-search-close').addEventListener('click', closeEditorSearch);

  /* ── Éditeur ── */
  document.getElementById('note-editor').addEventListener('input', onEditorInput);
  document.getElementById('note-editor').addEventListener('scroll', syncHighlightScroll);

  /* ── Recherche ── */
  const searchInput = document.getElementById('search-input');
  const clearBtn    = document.getElementById('clear-search');

  searchInput.addEventListener('input', e => {
    clearBtn.style.display = e.target.value ? 'flex' : 'none';
    renderNoteList(e.target.value);
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    renderNoteList('');
    searchInput.focus();
  });
}

document.addEventListener('DOMContentLoaded', init);

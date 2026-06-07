/* ═══════════════════════════════════════════════════════════════════
   CRUD notes
   ═══════════════════════════════════════════════════════════════════ */
import { state } from './state.js';
import { generateId, parseNote, escHtml, showToast } from './utils.js';
import { persistNotes, deleteImages, extractImageIds } from './storage.js';
import { closeEditorSearch, updateEditorSearch } from './editor-search.js';
import { renderNoteList, updateNoteItemDisplay } from './notes-list.js';
import { renderPreviewPanel, setPreviewMode } from './preview.js';
import { renderTocPanel, setupTocScrollSpy } from './toc.js';

export function selectNote(id) {
  const note = state.notes.find(n => n.id === id);
  if (!note) return;

  state.currentNoteId = id;
  closeEditorSearch();
  document.getElementById('note-editor').value      = note.content;
  document.getElementById('note-title-input').value = note.title || '';
  document.getElementById('main-content').style.display        = 'flex';
  document.getElementById('empty-state').style.display         = 'none';
  document.getElementById('view-toggle-toolbar').style.display = 'flex';

  renderNoteList(document.getElementById('search-input').value);
  if (state.isSplitMode) { renderPreviewPanel(); } else { setPreviewMode(true); }
  closeInfoPanel();

  /* Restaurer la largeur de la TOC pour cette note */
  if (state.isTocOpen) {
    const tocPanel = document.getElementById('toc-panel');
    tocPanel.style.width = (note.tocWidth || 280) + 'px';
    renderTocPanel();
    setupTocScrollSpy();
  }

  const editor = document.getElementById('note-editor');
  editor.setSelectionRange(editor.value.length, editor.value.length);
  editor.focus();
}

export async function createNote() {
  const note = { id: generateId(), title: '', content: '', createdAt: Date.now(), updatedAt: Date.now() };
  state.notes.unshift(note);
  await persistNotes();
  renderNoteList(document.getElementById('search-input').value);
  selectNote(note.id);
}

export async function deleteCurrentNote() {
  if (!state.currentNoteId) return;
  if (!confirm('Supprimer cette note ? Cette action est irréversible.')) return;

  const dying = state.notes.find(n => n.id === state.currentNoteId);
  if (dying) await deleteImages(extractImageIds(dying.content));

  state.notes = state.notes.filter(n => n.id !== state.currentNoteId);
  state.currentNoteId = null;
  await persistNotes();

  document.getElementById('main-content').style.display        = 'none';
  document.getElementById('empty-state').style.display         = 'flex';
  document.getElementById('view-toggle-toolbar').style.display = 'none';
  closeInfoPanel();

  const filter = document.getElementById('search-input').value;
  renderNoteList(filter);

  const next = state.notes
    .filter(n => !filter || n.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.updatedAt - a.updatedAt)[0];
  if (next) selectNote(next.id);
}

export function onTitleInput() {
  if (!state.currentNoteId) return;
  const note = state.notes.find(n => n.id === state.currentNoteId);
  if (!note) return;

  note.title     = document.getElementById('note-title-input').value;
  note.updatedAt = Date.now();
  updateNoteItemDisplay(note);

  clearTimeout(state.saveTimer);
  state.saveTimer = setTimeout(async () => {
    await persistNotes();
    showToast();
  }, 600);
}

export function onEditorInput() {
  if (!state.currentNoteId) return;
  const note = state.notes.find(n => n.id === state.currentNoteId);
  if (!note) return;

  note.content   = document.getElementById('note-editor').value;
  note.updatedAt = Date.now();

  updateNoteItemDisplay(note);
  if (state.editorSearchQuery) updateEditorSearch();

  /* Rendus coûteux debounced : preview + TOC */
  clearTimeout(state.renderTimer);
  state.renderTimer = setTimeout(() => {
    if (state.isSplitMode) renderPreviewPanel();
    if (state.isTocOpen)   renderTocPanel();
  }, 150);

  clearTimeout(state.saveTimer);
  state.saveTimer = setTimeout(async () => {
    await persistNotes();
    showToast();
  }, 600);
}

/* ═══════════════════════════════════════════════════════════════════
   Panneau d'infos
   ═══════════════════════════════════════════════════════════════════ */
export function openInfoPanel() {
  if (!state.currentNoteId) return;
  const note = state.notes.find(n => n.id === state.currentNoteId);
  if (!note) return;

  const { title } = parseNote(note.content);
  const words = note.content.trim() ? note.content.trim().split(/\s+/).length : 0;
  const chars = note.content.length;
  const codeBlocks = (note.content.match(/```[\s\S]*?```/g) || []).length;
  const fmt = ts => new Date(ts).toLocaleString('fr-FR', {
    day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit',
  });

  document.getElementById('info-panel-body').innerHTML = `
    <div class="info-row"><span class="info-label">Titre</span><span class="info-value" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(title)}</span></div>
    <div class="info-row"><span class="info-label">Mots</span><span class="info-value">${words}</span></div>
    <div class="info-row"><span class="info-label">Caractères</span><span class="info-value">${chars}</span></div>
    <div class="info-row"><span class="info-label">Blocs de code</span><span class="info-value">${codeBlocks}</span></div>
    <div class="info-row"><span class="info-label">Créée</span><span class="info-value">${fmt(note.createdAt)}</span></div>
    <div class="info-row"><span class="info-label">Modifiée</span><span class="info-value">${fmt(note.updatedAt)}</span></div>
  `;
  document.getElementById('info-panel').style.display = 'block';
}

export function closeInfoPanel() {
  document.getElementById('info-panel').style.display = 'none';
}

export function toggleInfoPanel() {
  document.getElementById('info-panel').style.display === 'none'
    ? openInfoPanel()
    : closeInfoPanel();
}

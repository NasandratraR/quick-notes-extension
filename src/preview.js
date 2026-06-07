/* ═══════════════════════════════════════════════════════════════════
   Rendu du panneau aperçu (partagé entre mode aperçu et split)
   ═══════════════════════════════════════════════════════════════════ */
import { state } from './state.js';
import { renderMarkdown } from './markdown.js';
import { setupImageResize, setupTableResize, setupCheckboxes } from './editor-format.js';
import { renderTocPanel, setupTocScrollSpy } from './toc.js';
import { highlightPreviewPanel } from './editor-search.js';

export function renderPreviewPanel() {
  const note = state.notes.find(n => n.id === state.currentNoteId);
  const previewEl = document.getElementById('preview-panel');
  if (!note) { previewEl.innerHTML = ''; return; }

  previewEl.innerHTML = renderMarkdown(note.content);
  previewEl.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.code).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copié !';
        setTimeout(() => (btn.textContent = orig), 1500);
      });
    });
  });

  setupImageResize();
  setupTableResize();
  setupCheckboxes();
  if (state.isTocOpen) { renderTocPanel(); setupTocScrollSpy(); }
  if (state.editorSearchQuery) highlightPreviewPanel();
}

/* ═══════════════════════════════════════════════════════════════════
   Mode split
   ═══════════════════════════════════════════════════════════════════ */
export function setSplitMode(active) {
  state.isSplitMode = active;
  const wrapper    = document.querySelector('.editor-preview-wrapper');
  const editorEl   = document.getElementById('note-editor');
  const previewEl  = document.getElementById('preview-panel');
  const btn        = document.getElementById('btn-split');
  const viewToggle = document.getElementById('view-toggle-toolbar');

  if (active) {
    wrapper.classList.add('split');
    editorEl.style.display  = '';
    previewEl.style.display = 'block';
    btn.classList.add('split-active');
    viewToggle.style.display = 'none';
    renderPreviewPanel();
  } else {
    wrapper.classList.remove('split');
    btn.classList.remove('split-active');
    viewToggle.style.display = 'flex';
    setPreviewMode(state.isPreviewMode);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   Mode aperçu
   ═══════════════════════════════════════════════════════════════════ */
export function setPreviewMode(preview) {
  state.isPreviewMode = preview;
  const editorEl     = document.getElementById('note-editor');
  const wrapperEl    = document.querySelector('.editor-wrapper');
  const previewEl    = document.getElementById('preview-panel');
  const btnEdit      = document.getElementById('btn-edit-mode');
  const btnPreview   = document.getElementById('btn-preview-mode');

  if (preview) {
    renderPreviewPanel();
    if (wrapperEl) wrapperEl.style.display = 'none';
    previewEl.style.display = 'block';
    btnEdit.classList.remove('active');
    btnPreview.classList.add('active');
  } else {
    if (wrapperEl) wrapperEl.style.display = '';
    previewEl.style.display = 'none';
    btnEdit.classList.add('active');
    btnPreview.classList.remove('active');
    editorEl.focus();
  }
}

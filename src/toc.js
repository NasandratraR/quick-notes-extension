/* ═══════════════════════════════════════════════════════════════════
   Table des matières
   ═══════════════════════════════════════════════════════════════════ */
import { state } from './state.js';

export function parseToc(content) {
  const headings = [];
  let hIdx = 0;
  content.split('\n').forEach((line, lineIdx) => {
    const m = line.match(/^(#{1,6})\s+(.+)/);
    if (m) headings.push({ level: m[1].length, text: m[2].trim().replace(/<[^>]+>/g, ''), lineIdx, id: `h-${hIdx++}` });
  });
  return headings;
}

export function setActiveTocItem(idx) {
  document.querySelectorAll('.toc-item').forEach(el =>
    el.classList.toggle('active', parseInt(el.dataset.idx) === idx)
  );
}

export function renderTocPanel() {
  const tocEl = document.getElementById('toc-items');
  if (!tocEl || !state.isTocOpen) return;

  const note = state.notes.find(n => n.id === state.currentNoteId);
  if (!note) { tocEl.innerHTML = '<div class="toc-empty">Aucun titre trouvé.</div>'; return; }

  const toc = parseToc(note.content);
  if (toc.length === 0) {
    tocEl.innerHTML = '<div class="toc-empty">Ajoutez des titres avec # ## ###</div>';
    return;
  }

  tocEl.innerHTML = '';
  toc.forEach((item, idx) => {
    const el = document.createElement('div');
    el.className = `toc-item toc-h${item.level}`;
    el.dataset.idx = idx;
    el.dataset.id = item.id;
    el.textContent = item.text;
    el.title = item.text;
    el.addEventListener('click', () => scrollToHeading(idx, item));
    tocEl.appendChild(el);
  });
}

export function scrollToHeading(idx, item) {
  if (state.isPreviewMode || state.isSplitMode) {
    const previewEl = document.getElementById('preview-panel');
    const el = previewEl.querySelector(`#${item.id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    const editor = document.getElementById('note-editor');
    const lines = editor.value.split('\n');
    const charsBefore = lines.slice(0, item.lineIdx).join('\n').length + (item.lineIdx > 0 ? 1 : 0);
    editor.focus();
    editor.setSelectionRange(charsBefore, charsBefore);
    editor.scrollTop = (item.lineIdx / lines.length) * editor.scrollHeight;
  }
  setActiveTocItem(idx);
}

export function setupTocScrollSpy() {
  const previewEl = document.getElementById('preview-panel');
  previewEl.removeEventListener('scroll', onTocScroll);
  if (state.isTocOpen && (state.isPreviewMode || state.isSplitMode)) {
    previewEl.addEventListener('scroll', onTocScroll);
  }
}

export function onTocScroll() {
  if (state.tocScrollPending) return;
  state.tocScrollPending = true;
  requestAnimationFrame(() => {
    state.tocScrollPending = false;
    const previewEl = document.getElementById('preview-panel');
    const headings = [...previewEl.querySelectorAll('[id^="h-"]')];
    if (!headings.length) return;
    const scrollTop = previewEl.scrollTop + 24;
    let activeIdx = 0;
    headings.forEach((h, i) => { if (h.offsetTop <= scrollTop) activeIdx = i; });
    setActiveTocItem(activeIdx);
  });
}

export function toggleToc() {
  state.isTocOpen = !state.isTocOpen;
  const panel = document.getElementById('toc-panel');
  const btn   = document.getElementById('btn-toc');
  panel.style.display = state.isTocOpen ? 'flex' : 'none';
  btn.classList.toggle('split-active', state.isTocOpen);
  if (state.isTocOpen) { renderTocPanel(); setupTocScrollSpy(); }
}

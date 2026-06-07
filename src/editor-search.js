/* ═══════════════════════════════════════════════════════════════════
   Recherche dans l'éditeur
   ═══════════════════════════════════════════════════════════════════ */
import { state } from './state.js';
import { escapeRegex } from './utils.js';
import { esc } from './markdown.js';

export function openEditorSearch() {
  const bar    = document.getElementById('editor-search-bar');
  const input  = document.getElementById('editor-search-input');
  const editor = document.getElementById('note-editor');
  bar.style.display = 'flex';
  const sel = editor.value.slice(editor.selectionStart, editor.selectionEnd).trim();
  if (sel && sel.length < 120) input.value = sel;
  input.select();
  input.focus();
  updateEditorSearch();
}

export function closeEditorSearch() {
  document.getElementById('editor-search-bar').style.display = 'none';
  document.getElementById('editor-search-input').value = '';
  document.getElementById('editor-search-count').textContent = '';
  document.getElementById('editor-highlight-layer').innerHTML = '';
  clearPreviewHighlights();
  state.editorSearchQuery   = '';
  state.editorSearchMatches = [];
  state.editorSearchIdx     = -1;
}

export function updateEditorSearch() {
  const input   = document.getElementById('editor-search-input');
  const editor  = document.getElementById('note-editor');
  const layer   = document.getElementById('editor-highlight-layer');
  const countEl = document.getElementById('editor-search-count');

  state.editorSearchQuery = input.value;

  if (!state.editorSearchQuery) {
    state.editorSearchMatches = [];
    state.editorSearchIdx     = -1;
    layer.innerHTML     = '';
    countEl.textContent = '';
    input.classList.remove('no-match');
    clearPreviewHighlights();
    return;
  }

  const text = editor.value;
  const re   = new RegExp(escapeRegex(state.editorSearchQuery), 'gi');
  state.editorSearchMatches = [...text.matchAll(re)].map(m => m.index);

  if (state.editorSearchMatches.length === 0) {
    state.editorSearchIdx = -1;
    layer.innerHTML = '';
    countEl.textContent = '0 résultat';
    input.classList.add('no-match');
    clearPreviewHighlights();
    return;
  }

  input.classList.remove('no-match');
  if (state.editorSearchIdx < 0 || state.editorSearchIdx >= state.editorSearchMatches.length) state.editorSearchIdx = 0;
  countEl.textContent = `${state.editorSearchIdx + 1} / ${state.editorSearchMatches.length}`;

  if (!state.isPreviewMode) {
    renderHighlightLayer(text);
    scrollEditorToMatch();
  }
  if (state.isPreviewMode || state.isSplitMode) {
    highlightPreviewPanel();
    scrollPreviewToMatch();
  }
}

export function renderHighlightLayer(text) {
  const layer = document.getElementById('editor-highlight-layer');
  if (!state.editorSearchQuery || !state.editorSearchMatches.length) { layer.innerHTML = ''; return; }

  let html = '';
  let prev = 0;
  let i    = 0;
  const re = new RegExp(escapeRegex(state.editorSearchQuery), 'gi');
  let m;
  while ((m = re.exec(text)) !== null) {
    html += esc(text.slice(prev, m.index));
    html += `<mark${i === state.editorSearchIdx ? ' class="current"' : ''}>${esc(m[0])}</mark>`;
    prev = m.index + m[0].length;
    i++;
  }
  html += esc(text.slice(prev));
  layer.innerHTML = html;
}

export function navigateEditorSearch(dir) {
  if (!state.editorSearchMatches.length) return;
  state.editorSearchIdx = (state.editorSearchIdx + dir + state.editorSearchMatches.length) % state.editorSearchMatches.length;
  document.getElementById('editor-search-count').textContent =
    `${state.editorSearchIdx + 1} / ${state.editorSearchMatches.length}`;

  if (!state.isPreviewMode) {
    renderHighlightLayer(document.getElementById('note-editor').value);
    scrollEditorToMatch(true);
  }
  if (state.isPreviewMode || state.isSplitMode) {
    highlightPreviewPanel();
    scrollPreviewToMatch();
  }

  document.getElementById('editor-search-input').focus();
}

export function scrollEditorToMatch(grabFocus = false) {
  if (state.editorSearchIdx < 0 || !state.editorSearchMatches.length) return;
  const editor     = document.getElementById('note-editor');
  const matchStart = state.editorSearchMatches[state.editorSearchIdx];
  const matchEnd   = matchStart + state.editorSearchQuery.length;
  if (grabFocus) {
    editor.focus();
    editor.setSelectionRange(matchStart, matchEnd);
  }
  const lines      = editor.value.slice(0, matchStart).split('\n');
  const totalLines = editor.value.split('\n').length || 1;
  const target     = (lines.length / totalLines) * editor.scrollHeight - editor.clientHeight / 3;
  editor.scrollTop = Math.max(0, target);
  syncHighlightScroll();
}

export function syncHighlightScroll() {
  const editor = document.getElementById('note-editor');
  const layer  = document.getElementById('editor-highlight-layer');
  layer.scrollTop = editor.scrollTop;
}

export function clearPreviewHighlights() {
  document.getElementById('preview-panel').querySelectorAll('mark').forEach(mark => {
    const parent = mark.parentNode;
    if (!parent) return;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
}

export function highlightPreviewPanel() {
  const panel = document.getElementById('preview-panel');
  clearPreviewHighlights();
  if (!state.editorSearchQuery) return;

  const re = new RegExp(escapeRegex(state.editorSearchQuery), 'gi');
  const walker = document.createTreeWalker(panel, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) textNodes.push(node);

  let globalIdx = 0;
  textNodes.forEach(textNode => {
    const text = textNode.nodeValue;
    const matches = [...text.matchAll(re)];
    if (!matches.length) return;
    const frag = document.createDocumentFragment();
    let prev = 0;
    matches.forEach(m => {
      if (m.index > prev) frag.appendChild(document.createTextNode(text.slice(prev, m.index)));
      const mark = document.createElement('mark');
      mark.textContent = m[0];
      if (globalIdx === state.editorSearchIdx) mark.classList.add('current');
      frag.appendChild(mark);
      prev = m.index + m[0].length;
      globalIdx++;
    });
    if (prev < text.length) frag.appendChild(document.createTextNode(text.slice(prev)));
    textNode.parentNode.replaceChild(frag, textNode);
  });
}

export function scrollPreviewToMatch() {
  const current = document.getElementById('preview-panel').querySelector('mark.current');
  if (current) current.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

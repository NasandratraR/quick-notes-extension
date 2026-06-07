/* ═══════════════════════════════════════════════════════════════════
   Formatage dans l'éditeur
   ═══════════════════════════════════════════════════════════════════ */
import { state } from './state.js';
import { escapeRegex } from './utils.js';
import { persistNotes } from './storage.js';
import { onEditorInput } from './notes-crud.js';
import { updateNoteItemDisplay } from './notes-list.js';

export function wrapSelection(editor, before, after) {
  const start = editor.selectionStart;
  const end   = editor.selectionEnd;
  const selected = editor.value.slice(start, end);
  const replacement = before + selected + after;

  editor.setRangeText(replacement, start, end, 'select');
  /* Positionner le curseur à l'intérieur si sélection vide */
  if (start === end) {
    const pos = start + before.length;
    editor.setSelectionRange(pos, pos);
  }
  editor.focus();
  onEditorInput();
}

export function insertCodeBlock(lang) {
  const editor = document.getElementById('note-editor');
  const start = editor.selectionStart;
  const end   = editor.selectionEnd;
  const selected = editor.value.slice(start, end);

  const prefix = start > 0 && editor.value[start - 1] !== '\n' ? '\n' : '';
  const before = `${prefix}\`\`\`${lang}\n`;
  const after  = '\n```\n';
  const replacement = before + (selected || '') + after;

  editor.setRangeText(replacement, start, end, 'end');

  /* Placer le curseur dans le bloc si sélection vide */
  if (start === end) {
    const cursorPos = start + prefix.length + `\`\`\`${lang}\n`.length;
    editor.setSelectionRange(cursorPos, cursorPos);
  }

  editor.focus();
  onEditorInput();
}

/* Checkboxes interactives en aperçu */
export function setupCheckboxes() {
  const previewEl = document.getElementById('preview-panel');
  previewEl.querySelectorAll('.task-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const note = state.notes.find(n => n.id === state.currentNoteId);
      if (!note) return;
      const lineIdx = parseInt(cb.dataset.line);
      const lines   = note.content.split('\n');
      if (!lines[lineIdx]) return;
      lines[lineIdx] = cb.checked
        ? lines[lineIdx].replace(/^([-*+]\s)\[ \]/, '$1[x]')
        : lines[lineIdx].replace(/^([-*+]\s)\[[xX]\]/, '$1[ ]');
      note.content = lines.join('\n');
      note.updatedAt = Date.now();
      document.getElementById('note-editor').value = note.content;
      persistNotes();
      updateNoteItemDisplay(note);
    });
  });
}

export function insertCheckbox() {
  const editor = document.getElementById('note-editor');
  const pos    = editor.selectionStart;
  const prefix = pos > 0 && editor.value[pos - 1] !== '\n' ? '\n' : '';
  editor.setRangeText(prefix + '- [ ] ', pos, editor.selectionEnd, 'end');
  editor.focus();
  onEditorInput();
}

/* Poignée de redimensionnement des images en aperçu */
export function setupImageResize() {
  const previewEl = document.getElementById('preview-panel');
  previewEl.querySelectorAll('.img-resize-handle').forEach(handle => {
    handle.addEventListener('pointerdown', e => {
      e.preventDefault();
      const wrapper = handle.closest('.img-wrapper');
      const img     = wrapper.querySelector('img');
      const startX  = e.clientX;
      const startW  = img.offsetWidth;

      function onMove(ev) {
        const w = Math.max(50, startW + ev.clientX - startX);
        img.style.width = w + 'px';
      }

      function onUp() {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup',   onUp);
        if (!state.currentNoteId) return;
        const note   = state.notes.find(n => n.id === state.currentNoteId);
        if (!note) return;
        const imgRef = wrapper.dataset.imgref;
        const finalW = Math.round(img.offsetWidth);
        const re = new RegExp(
          `(!\\[[^\\]]*\\]\\()${escapeRegex(imgRef)}(\\s*=\\d+)?(\\))`, 'g'
        );
        note.content = note.content.replace(re, `$1${imgRef} =${finalW}$3`);
        document.getElementById('note-editor').value = note.content;
        persistNotes();
      }

      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup',   onUp);
    });
  });
}

/* Redimensionnement des colonnes et de la largeur globale du tableau */
export function setupTableResize() {
  const previewEl = document.getElementById('preview-panel');
  const note = state.currentNoteId ? state.notes.find(n => n.id === state.currentNoteId) : null;
  if (!note) return;
  const stored = note.tableWidths || {};

  previewEl.querySelectorAll('.md-table-outer').forEach(outer => {
    const wrapper = outer.querySelector('.md-table-wrapper');
    const table   = outer.querySelector('.md-table');
    const wHandle = outer.querySelector('.tbl-width-handle');
    if (!table || !wrapper) return;

    const key  = table.dataset.key;
    const cols = [...table.querySelectorAll('col')];
    const ths  = [...table.querySelectorAll('thead th')];
    if (!cols.length || !ths.length) return;

    /* Charger les données (format objet ou tableau legacy) */
    const raw      = stored[key];
    const storedCols  = Array.isArray(raw) ? raw : (raw?.cols  || null);
    const storedOuterW = raw?.outerW || null;

    /* Mesurer les largeurs naturelles AVANT de passer en fixed */
    const naturalWidths = ths.map(th => Math.round(th.getBoundingClientRect().width));
    const widths = storedCols || naturalWidths;
    widths.forEach((w, i) => { if (cols[i]) cols[i].style.width = w + 'px'; });
    table.style.tableLayout = 'fixed';
    /* Pas de table.style.width : la table se dimensionne exactement à la somme des colonnes */
    outer.style.width = storedOuterW ? storedOuterW + 'px' : 'fit-content';

    function save() {
      if (!state.currentNoteId) return;
      const n = state.notes.find(n => n.id === state.currentNoteId);
      if (!n) return;
      if (!n.tableWidths) n.tableWidths = {};
      n.tableWidths[key] = {
        cols:   cols.map(col => parseInt(col.style.width) || 80),
        outerW: Math.round(outer.getBoundingClientRect().width),
      };
      persistNotes();
    }

    function makeOverlay(cursor) {
      const ov = document.createElement('div');
      ov.style.cssText = `position:fixed;inset:0;z-index:9999;cursor:${cursor};`;
      document.body.appendChild(ov);
      return ov;
    }

    /* ── Poignées de colonnes ── */
    ths.forEach((th, colIdx) => {
      if (colIdx >= ths.length - 1) return;
      const handle = th.querySelector('.col-resize-handle');
      if (!handle) return;

      handle.addEventListener('pointerdown', e => {
        e.preventDefault();
        e.stopPropagation();
        const ov     = makeOverlay('col-resize');
        const startX = e.clientX;
        const startW = parseInt(cols[colIdx].style.width) || 80;

        function onMove(ev) {
          const newW = Math.max(40, startW + ev.clientX - startX);
          cols[colIdx].style.width = newW + 'px';
          /* table et outer (fit-content) s'adaptent automatiquement */
        }
        function onUp() {
          ov.remove();
          document.removeEventListener('pointermove', onMove);
          document.removeEventListener('pointerup',   onUp);
          save();
        }
        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup',   onUp);
      });
    });

    /* ── Poignée de largeur globale du tableau ── */
    if (!wHandle) return;
    wHandle.addEventListener('pointerdown', e => {
      e.preventDefault();
      e.stopPropagation();
      const ov     = makeOverlay('ew-resize');
      const startX = e.clientX;
      const startW = Math.round(outer.getBoundingClientRect().width);

      function onMove(ev) {
        outer.style.width = Math.max(120, startW + ev.clientX - startX) + 'px';
      }
      function onUp() {
        ov.remove();
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup',   onUp);
        save();
      }
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup',   onUp);
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════
   Listes à puces / numérotées
   ═══════════════════════════════════════════════════════════════════ */
export function insertList(ordered) {
  const editor = document.getElementById('note-editor');
  const val    = editor.value;
  const selStart = editor.selectionStart;
  const selEnd   = editor.selectionEnd;

  /* Trouver le début de la première ligne sélectionnée */
  const lineStart = val.lastIndexOf('\n', selStart - 1) + 1;

  /* Trouver la fin de la dernière ligne sélectionnée */
  const lookFrom = selEnd > selStart ? selEnd - 1 : selStart;
  const nlPos    = val.indexOf('\n', lookFrom);
  const lineEnd  = nlPos === -1 ? val.length : nlPos;

  const lines = val.slice(lineStart, lineEnd).split('\n');
  let counter = 1;
  const newLines = lines.map(line => {
    const clean = line.replace(/^(\d+\.\s+|[-*+]\s+)/, '');
    return ordered ? `${counter++}. ${clean}` : `- ${clean}`;
  });

  editor.setRangeText(newLines.join('\n'), lineStart, lineEnd, 'select');
  editor.focus();
  onEditorInput();
}

/* ═══════════════════════════════════════════════════════════════════
   Dropdown de langages
   ═══════════════════════════════════════════════════════════════════ */
export function closeLangPicker() {
  document.getElementById('lang-picker').classList.remove('open');
}

export function toggleLangPicker() {
  document.getElementById('lang-picker').classList.toggle('open');
}

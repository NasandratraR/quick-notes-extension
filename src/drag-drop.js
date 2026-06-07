/* ═══════════════════════════════════════════════════════════════════
   Drag & drop (pointer events — fluide, avec seuil de déclenchement)
   ═══════════════════════════════════════════════════════════════════ */
import { state } from './state.js';
import { persistNotes } from './storage.js';
import { renderNoteList } from './notes-list.js';

export const DRAG_THRESHOLD = 6; // px avant de déclencher le drag

let pendingDrag = null;   // en attente du seuil
let pointerDrag = null;   // drag actif

/* Étape 1 : surveiller si c'est un vrai drag ou un simple clic */
export function watchForDrag(noteId, item, e) {
  pendingDrag = {
    noteId, item,
    startX: e.clientX,
    startY: e.clientY,
    rect: item.getBoundingClientRect(),
  };
  document.addEventListener('pointermove', onWatchMove);
  document.addEventListener('pointerup',   onWatchUp);
}

function onWatchMove(e) {
  if (!pendingDrag) return;
  const dx = e.clientX - pendingDrag.startX;
  const dy = e.clientY - pendingDrag.startY;
  if (dx * dx + dy * dy > DRAG_THRESHOLD * DRAG_THRESHOLD) {
    document.removeEventListener('pointermove', onWatchMove);
    document.removeEventListener('pointerup',   onWatchUp);
    const { noteId, item, rect, startY } = pendingDrag;
    pendingDrag = null;
    beginDrag(noteId, item, rect, startY - rect.top, e);
  }
}

function onWatchUp() {
  /* Seuil non atteint → c'est un clic, le click event se déclenche naturellement */
  document.removeEventListener('pointermove', onWatchMove);
  document.removeEventListener('pointerup',   onWatchUp);
  pendingDrag = null;
}

/* Étape 2 : drag réel */
function beginDrag(noteId, item, rect, offsetY, firstMoveEvent) {
  const listEl = document.getElementById('notes-list');

  const ghost = item.cloneNode(true);
  ghost.classList.add('drag-ghost');
  ghost.style.width = rect.width + 'px';
  ghost.style.left  = rect.left + 'px';
  ghost.style.top   = (firstMoveEvent.clientY - offsetY) + 'px';
  document.body.appendChild(ghost);

  item.classList.add('drag-placeholder');
  pointerDrag = { noteId, item, ghost, listEl, offsetY };

  document.addEventListener('pointermove',   onDragMove, { passive: false });
  document.addEventListener('pointerup',     onDragEnd);
  document.addEventListener('pointercancel', onDragEnd);
}

function onDragMove(e) {
  if (!pointerDrag) return;
  e.preventDefault();
  const { ghost, item, listEl, offsetY } = pointerDrag;

  ghost.style.top = (e.clientY - offsetY) + 'px';

  /* Détecter si le curseur survole un en-tête de groupe */
  let newGroupId = null;
  for (const header of listEl.querySelectorAll('.group-header')) {
    const r = header.getBoundingClientRect();
    if (e.clientY >= r.top - 4 && e.clientY <= r.bottom + 4) {
      newGroupId = header.dataset.groupId;
      break;
    }
  }

  if (newGroupId !== state.dragOverGroupId) {
    listEl.querySelectorAll('.group-header.drop-target').forEach(h => h.classList.remove('drop-target'));
    state.dragOverGroupId = newGroupId;
    if (state.dragOverGroupId) {
      listEl.querySelector(`.group-header[data-group-id="${state.dragOverGroupId}"]`)?.classList.add('drop-target');
    }
  }

  if (state.dragOverGroupId) return; /* ne pas réordonner quand on vise un header */

  const allNotes = [...listEl.querySelectorAll('.note-item:not(.drag-placeholder)')];
  let placed = false;
  for (const sib of allNotes) {
    const r = sib.getBoundingClientRect();
    if (e.clientY < r.top + r.height / 2) {
      sib.parentNode.insertBefore(item, sib);
      placed = true;
      break;
    }
  }
  if (!placed) listEl.appendChild(item); /* zone sans groupe = root de listEl */
}

async function onDragEnd(e) {
  if (!pointerDrag) return;
  e.preventDefault();
  document.removeEventListener('pointermove',   onDragMove);
  document.removeEventListener('pointerup',     onDragEnd);
  document.removeEventListener('pointercancel', onDragEnd);

  const { ghost, item, listEl, noteId } = pointerDrag;
  pointerDrag = null;

  listEl.querySelectorAll('.group-header.drop-target').forEach(h => h.classList.remove('drop-target'));

  ghost.remove();
  item.classList.remove('drag-placeholder');

  const note = state.notes.find(n => n.id === noteId);
  if (note) {
    if (state.dragOverGroupId) {
      note.groupId = state.dragOverGroupId;
    } else {
      const container = item.closest('.group-notes');
      note.groupId = container ? container.dataset.groupId : null;
    }
  }
  state.dragOverGroupId = null;

  const newOrder = [...listEl.querySelectorAll('.note-item')].map(el => el.dataset.id);
  state.notes.sort((a, b) => {
    const ai = newOrder.indexOf(a.id);
    const bi = newOrder.indexOf(b.id);
    return (ai < 0 ? 9999 : ai) - (bi < 0 ? 9999 : bi);
  });

  await persistNotes();
  renderNoteList(document.getElementById('search-input').value);
}

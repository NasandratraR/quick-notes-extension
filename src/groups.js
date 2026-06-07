/* ═══════════════════════════════════════════════════════════════════
   Drag & drop des groupes
   ═══════════════════════════════════════════════════════════════════ */
import { state } from './state.js';
import { GROUP_COLORS } from './constants.js';
import { generateId } from './utils.js';
import { persistGroups, persistNotes } from './storage.js';
import { renderNoteList } from './notes-list.js';
import { DRAG_THRESHOLD } from './drag-drop.js';

let pendingGroupDrag = null;

export function watchForGroupDrag(groupId, headerEl, e) {
  pendingGroupDrag = { groupId, headerEl, startX: e.clientX, startY: e.clientY, rect: headerEl.getBoundingClientRect() };
  document.addEventListener('pointermove', onGroupWatchMove);
  document.addEventListener('pointerup',   onGroupWatchUp);
}

function onGroupWatchMove(e) {
  if (!pendingGroupDrag) return;
  const dx = e.clientX - pendingGroupDrag.startX;
  const dy = e.clientY - pendingGroupDrag.startY;
  if (dx * dx + dy * dy > DRAG_THRESHOLD * DRAG_THRESHOLD) {
    document.removeEventListener('pointermove', onGroupWatchMove);
    document.removeEventListener('pointerup',   onGroupWatchUp);
    const { groupId, headerEl, rect, startY } = pendingGroupDrag;
    pendingGroupDrag = null;
    beginGroupDrag(groupId, headerEl, rect, startY - rect.top, e);
  }
}

function onGroupWatchUp() {
  document.removeEventListener('pointermove', onGroupWatchMove);
  document.removeEventListener('pointerup',   onGroupWatchUp);
  pendingGroupDrag = null;
}

function beginGroupDrag(groupId, headerEl, rect, offsetY, firstMoveEvent) {
  const ghost = headerEl.cloneNode(true);
  ghost.classList.add('drag-ghost');
  ghost.style.width  = rect.width + 'px';
  ghost.style.left   = rect.left + 'px';
  ghost.style.top    = (firstMoveEvent.clientY - offsetY) + 'px';
  document.body.appendChild(ghost);

  headerEl.classList.add('drag-placeholder');
  const notesEl = headerEl.nextElementSibling;
  if (notesEl?.classList.contains('group-notes')) notesEl.classList.add('drag-placeholder');

  state.groupDrag = { groupId, ghost, headerEl, notesEl: notesEl?.classList.contains('group-notes') ? notesEl : null, offsetY, dropTarget: null };

  document.addEventListener('pointermove',   onGroupDragMove, { passive: false });
  document.addEventListener('pointerup',     onGroupDragEnd);
  document.addEventListener('pointercancel', onGroupDragEnd);
}

function onGroupDragMove(e) {
  if (!state.groupDrag) return;
  e.preventDefault();
  state.groupDrag.ghost.style.top = (e.clientY - state.groupDrag.offsetY) + 'px';

  document.querySelectorAll('.group-drop-line').forEach(el => el.remove());

  const headers = [...document.querySelectorAll('.group-header:not(.drag-placeholder):not(.group-header-default)')];
  let insertBefore = null;
  for (const h of headers) {
    const r = h.getBoundingClientRect();
    if (e.clientY < r.top + r.height / 2) { insertBefore = h; break; }
  }

  const line = document.createElement('div');
  line.className = 'group-drop-line';
  const defaultHeader = document.querySelector('.group-header-default');
  if (insertBefore) {
    insertBefore.parentNode.insertBefore(line, insertBefore);
  } else if (defaultHeader) {
    defaultHeader.parentNode.insertBefore(line, defaultHeader);
  } else {
    document.getElementById('notes-list').appendChild(line);
  }

  state.groupDrag.dropTarget = insertBefore;
}

async function onGroupDragEnd(e) {
  if (!state.groupDrag) return;
  e.preventDefault();
  document.removeEventListener('pointermove',   onGroupDragMove);
  document.removeEventListener('pointerup',     onGroupDragEnd);
  document.removeEventListener('pointercancel', onGroupDragEnd);

  const { ghost, headerEl, notesEl, groupId, dropTarget } = state.groupDrag;
  state.groupDrag = null;

  ghost.remove();
  document.querySelectorAll('.group-drop-line').forEach(el => el.remove());
  headerEl.classList.remove('drag-placeholder');
  if (notesEl) notesEl.classList.remove('drag-placeholder');

  const draggedIdx = state.groups.findIndex(g => g.id === groupId);
  if (draggedIdx !== -1) {
    const [dragged] = state.groups.splice(draggedIdx, 1);
    if (dropTarget) {
      const targetIdx = state.groups.findIndex(g => g.id === dropTarget.dataset.groupId);
      state.groups.splice(targetIdx >= 0 ? targetIdx : state.groups.length, 0, dragged);
    } else {
      state.groups.push(dragged);
    }
    await persistGroups();
  }

  renderNoteList(document.getElementById('search-input').value);
}

/* ═══════════════════════════════════════════════════════════════════
   Gestion des groupes
   ═══════════════════════════════════════════════════════════════════ */
export async function createGroup(name) {
  if (!name.trim()) return;
  const group = {
    id: generateId(),
    name: name.trim(),
    color: GROUP_COLORS[state.groups.length % GROUP_COLORS.length],
    collapsed: false,
  };
  state.groups.push(group);
  await persistGroups();
  renderNoteList(document.getElementById('search-input').value);
}

export async function deleteGroup(groupId) {
  const group = state.groups.find(g => g.id === groupId);
  if (!group) return;
  const notesInGroup = state.notes.filter(n => n.groupId === groupId);
  if (notesInGroup.length > 0) {
    if (!confirm(
      `Supprimer le groupe « ${group.name} » ?\n\n` +
      `${notesInGroup.length} note(s) seront conservées sans groupe.\n\nOK pour confirmer.`
    )) return;
    notesInGroup.forEach(n => { n.groupId = null; });
    await persistNotes();
  }
  state.groups = state.groups.filter(g => g.id !== groupId);
  await persistGroups();
  renderNoteList(document.getElementById('search-input').value);
}

export async function renameGroup(groupId, newName) {
  if (!newName.trim()) return;
  const group = state.groups.find(g => g.id === groupId);
  if (!group) return;
  group.name = newName.trim();
  await persistGroups();
  renderNoteList(document.getElementById('search-input').value);
}

export function toggleGroupCollapse(groupId) {
  const group = state.groups.find(g => g.id === groupId);
  if (!group) return;
  group.collapsed = !group.collapsed;
  persistGroups();
  renderNoteList(document.getElementById('search-input').value);
}

export function showNewGroupInput() {
  const list = document.getElementById('notes-list');
  if (document.getElementById('new-group-input-row')) return;

  const row = document.createElement('div');
  row.className = 'new-group-input-row';
  row.id = 'new-group-input-row';
  row.innerHTML = `
    <input type="text" class="new-group-input" placeholder="Nom du groupe…" autocomplete="off">
    <button class="new-group-confirm">OK</button>
    <button class="new-group-cancel">✕</button>
  `;

  const input   = row.querySelector('.new-group-input');
  const confirm = row.querySelector('.new-group-confirm');
  const cancel  = row.querySelector('.new-group-cancel');

  const submit = async () => {
    const name = input.value.trim();
    row.remove();
    if (name) await createGroup(name);
  };
  const close = () => row.remove();

  confirm.addEventListener('click', submit);
  cancel.addEventListener('click', close);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter')  { e.preventDefault(); submit(); }
    if (e.key === 'Escape') close();
  });

  list.insertBefore(row, list.firstChild);
  input.focus();
}

export function startGroupRename(groupId, nameEl) {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'group-rename-input';
  input.value = nameEl.textContent;

  const finish = async () => {
    const newName = input.value.trim();
    input.replaceWith(nameEl);
    if (newName && newName !== nameEl.textContent) {
      await renameGroup(groupId, newName);
    }
  };

  input.addEventListener('blur', finish);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter')  { e.preventDefault(); input.blur(); }
    if (e.key === 'Escape') { input.value = nameEl.textContent; input.blur(); }
  });
  input.addEventListener('click', e => e.stopPropagation());

  nameEl.replaceWith(input);
  input.focus();
  input.select();
}

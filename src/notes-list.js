/* ═══════════════════════════════════════════════════════════════════
   Rendu de la liste
   ═══════════════════════════════════════════════════════════════════ */
import { state } from './state.js';
import { getNoteTitle, getNotePreview, formatDate, escHtml } from './utils.js';
import { persistGroups } from './storage.js';
import { selectNote, createNote, deleteNote } from './notes-crud.js';
import { watchForDrag } from './drag-drop.js';
import { watchForGroupDrag, toggleGroupCollapse, startGroupRename, deleteGroup } from './groups.js';

/* Mise à jour partielle d'un seul item (évite de reconstruire toute la liste) */
export function updateNoteItemDisplay(note) {
  const el = document.querySelector(`.note-item[data-id="${note.id}"]`);
  if (!el) return;
  const titleEl = el.querySelector('.note-title');
  const dateEl  = el.querySelector('.note-date');
  if (titleEl) titleEl.textContent = getNoteTitle(note);
  if (dateEl)  dateEl.textContent  = formatDate(note.updatedAt);
}

export function createNoteItem(note, now) {
  const title   = getNoteTitle(note);
  const preview = getNotePreview(note);
  const item = document.createElement('div');
  item.className = 'note-item' + (note.id === state.currentNoteId ? ' active' : '');
  item.dataset.id = note.id;
  item.draggable = true;
  item.innerHTML = `
    <div class="note-item-header">
      <div class="note-title">${escHtml(title)}</div>
      <div class="note-date">${formatDate(note.updatedAt, now)}</div>
      <button class="note-delete" title="Supprimer la note">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="11" height="11">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  `;
  item.addEventListener('click', () => selectNote(note.id));
  item.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    if (e.target.closest('.note-delete')) return;
    watchForDrag(note.id, item, e);
  });
  item.querySelector('.note-delete').addEventListener('click', e => {
    e.stopPropagation();
    deleteNote(note.id);
  });
  return item;
}

export function renderNoteList(filter = '') {
  const list = document.getElementById('notes-list');
  const q = filter.toLowerCase();
  const now = Date.now();

  const filtered = state.notes.filter(n =>
    !q ||
    (n.title || '').toLowerCase().includes(q) ||
    n.content.toLowerCase().includes(q)
  );

  list.innerHTML = '';

  /* ── Groupes ── */
  state.groups.forEach(group => {
    const groupNotes = filtered.filter(n => n.groupId === group.id);

    const header = document.createElement('div');
    header.className = 'group-header';
    header.dataset.groupId = group.id;
    const chevronD = group.collapsed
      ? 'M9,6 L15,12 L9,18'
      : 'M6,9 L12,15 L18,9';
    header.innerHTML = `
      <button class="group-toggle">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="${chevronD}"/>
        </svg>
      </button>
      <span class="group-dot" style="background:${escHtml(group.color || '#888')}"></span>
      <span class="group-name">${escHtml(group.name)}</span>
      <span class="group-count">${groupNotes.length}</span>
      <button class="group-add-note" title="Ajouter une note dans ce groupe">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="12" height="12">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
      <button class="group-delete" title="Supprimer le groupe">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="11" height="11">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    `;

    /* Clic sur l'en-tête entier = collapse/déplie */
    header.addEventListener('click', () => toggleGroupCollapse(group.id));

    /* Drag pour réordonner les groupes */
    header.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      if (e.target.closest('.group-delete') || e.target.closest('.group-add-note') || e.target.closest('.group-name')) return;
      watchForGroupDrag(group.id, header, e);
    });

    header.querySelector('.group-name').addEventListener('dblclick', e => {
      e.stopPropagation();
      startGroupRename(group.id, e.target);
    });
    header.querySelector('.group-add-note').addEventListener('click', e => {
      e.stopPropagation();
      createNote(group.id);
    });
    header.querySelector('.group-delete').addEventListener('click', e => {
      e.stopPropagation();
      deleteGroup(group.id);
    });
    list.appendChild(header);

    if (!group.collapsed) {
      const container = document.createElement('div');
      container.className = 'group-notes';
      container.dataset.groupId = group.id;
      if (groupNotes.length === 0) {
        const hint = document.createElement('div');
        hint.className = 'group-empty-hint';
        hint.textContent = 'Glisser des notes ici';
        container.appendChild(hint);
      } else {
        groupNotes.forEach(n => container.appendChild(createNoteItem(n, now)));
      }
      list.appendChild(container);
    }
  });

  /* ── Groupe "Sans groupe" (par défaut, non supprimable) ── */
  const ungrouped = filtered.filter(n => !n.groupId || !state.groups.some(g => g.id === n.groupId));

  if (filtered.length === 0 && state.groups.length === 0) {
    list.innerHTML = `<div class="no-notes">${
      q ? `Aucune note pour « ${escHtml(filter)} »` : 'Aucune note'
    }</div>`;
    return;
  }

  const chevronU = state.ungroupedCollapsed ? 'M9,6 L15,12 L9,18' : 'M6,9 L12,15 L18,9';
  const ugHeader = document.createElement('div');
  ugHeader.className = 'group-header group-header-default';
  ugHeader.innerHTML = `
    <button class="group-toggle">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="${chevronU}"/>
      </svg>
    </button>
    <span class="group-dot" style="background:var(--text-muted)"></span>
    <span class="group-name">Sans groupe</span>
    <span class="group-count">${ungrouped.length}</span>
    <button class="group-delete group-delete-disabled" title="Ce groupe par défaut ne peut pas être supprimé">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="11" height="11">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  `;
  ugHeader.addEventListener('click', () => {
    state.ungroupedCollapsed = !state.ungroupedCollapsed;
    persistGroups();
    renderNoteList(document.getElementById('search-input').value);
  });
  list.appendChild(ugHeader);

  if (!state.ungroupedCollapsed) {
    const ugContainer = document.createElement('div');
    ugContainer.className = 'group-notes';
    ugContainer.dataset.groupId = '';
    if (ungrouped.length === 0) {
      const hint = document.createElement('div');
      hint.className = 'group-empty-hint';
      hint.textContent = 'Glisser des notes ici';
      ugContainer.appendChild(hint);
    } else {
      ungrouped.forEach(n => ugContainer.appendChild(createNoteItem(n, now)));
    }
    list.appendChild(ugContainer);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   Export / Import
   ═══════════════════════════════════════════════════════════════════ */
import { state, STORAGE_KEYS } from './state.js';
import { triggerDownload, getNoteTitle, generateId } from './utils.js';
import { applyTheme, applyFont, applyFontSize, applyFontWeight } from './themes.js';
import { persistNotes, persistGroups } from './storage.js';
import { renderNoteList } from './notes-list.js';
import { selectNote } from './notes-crud.js';

export function exportAllNotes() {
  const data = {
    version:    3,
    exportedAt: new Date().toISOString(),
    notes:      state.notes,
    groups:     state.groups,
    images:     state.images,
    settings: {
      theme:             state.currentTheme,
      font:              state.currentFont,
      fontSize:          state.currentFontSize,
      fontWeight:        state.currentFontWeight,
      ungroupedCollapsed: state.ungroupedCollapsed,
    },
  };
  const date = new Date().toISOString().slice(0, 10);
  triggerDownload(JSON.stringify(data, null, 2), `quicknotes-${date}.json`, 'application/json');
}

export function exportCurrentNote() {
  const note = state.notes.find(n => n.id === state.currentNoteId);
  if (!note) return;
  const title   = getNoteTitle(note);
  const content = (note.title ? `# ${note.title}\n\n` : '') + note.content;
  const slug    = title.replace(/[^a-z0-9]/gi, '_').replace(/_+/g, '_').toLowerCase().slice(0, 60);
  triggerDownload(content, `${slug}.md`, 'text/markdown');
}

export async function importFromFile(file) {
  const ext = file.name.split('.').pop().toLowerCase();

  if (ext === 'json') {
    const text = await file.text();
    let data;
    try { data = JSON.parse(text); } catch { alert('Fichier JSON invalide.'); return; }
    if (!Array.isArray(data.notes)) { alert('Format de sauvegarde non reconnu.'); return; }

    const importedGroups = Array.isArray(data.groups) ? data.groups : [];
    const replace = confirm(
      `Importer depuis "${file.name}" :\n` +
      `  • ${data.notes.length} note(s)\n` +
      `  • ${importedGroups.length} groupe(s)\n\n` +
      `OK → Remplacer toutes vos données\n` +
      `Annuler → Fusionner (ajouter uniquement les nouveaux éléments)`
    );

    if (replace) {
      state.notes  = data.notes;
      state.groups = importedGroups;
      state.images = data.images || {};
      if (data.settings) {
        applyTheme(data.settings.theme           || 'brun');
        applyFont(data.settings.font             || 'default');
        applyFontSize(data.settings.fontSize     ?? 13);
        applyFontWeight(data.settings.fontWeight ?? 400);
        if (typeof data.settings.ungroupedCollapsed === 'boolean') {
          state.ungroupedCollapsed = data.settings.ungroupedCollapsed;
        }
      }
    } else {
      /* ── Fusion des groupes ─────────────────────────────────────────── */
      // Remapper les IDs des groupes importés qui entrent en collision
      const groupIdMap = {}; // ancienId → nouvelId
      const existingGroupIds = new Set(state.groups.map(g => g.id));
      importedGroups.forEach(g => {
        if (existingGroupIds.has(g.id)) {
          // Collision d'ID : créer un nouveau groupe avec un nouvel ID
          const newId = generateId();
          groupIdMap[g.id] = newId;
          state.groups.push({ ...g, id: newId });
        } else {
          groupIdMap[g.id] = g.id;
          state.groups.push(g);
          existingGroupIds.add(g.id);
        }
      });

      /* ── Fusion des notes (en appliquant le remapping de groupId) ───── */
      const existingNoteIds = new Set(state.notes.map(n => n.id));
      const newNotes = data.notes
        .filter(n => !existingNoteIds.has(n.id))
        .map(n => {
          if (n.groupId && groupIdMap[n.groupId]) {
            return { ...n, groupId: groupIdMap[n.groupId] };
          }
          return n;
        });
      state.notes = [...state.notes, ...newNotes];

      if (data.images) Object.assign(state.images, data.images);
    }

    await persistNotes();
    await persistGroups();
    await new Promise(r => chrome.storage.local.set({ [STORAGE_KEYS.images]: state.images }, r));

    renderNoteList();
    if (state.notes.length > 0) {
      const sorted = [...state.notes].sort((a, b) => b.updatedAt - a.updatedAt);
      selectNote(sorted[0].id);
    }
    const suffix = replace && data.settings ? ' + paramètres' : '';
    showImportToast(
      `${data.notes.length} note(s) et ${importedGroups.length} groupe(s) importé(s)${suffix}`
    );

  } else if (ext === 'md') {
    const text = await file.text();
    const lines = text.split('\n');
    let title = '', content = text;
    if (lines[0].startsWith('# ')) {
      title   = lines[0].slice(2).trim();
      content = lines.slice(lines[1] === '' ? 2 : 1).join('\n');
    }
    const note = { id: generateId(), title, content, createdAt: Date.now(), updatedAt: Date.now() };
    state.notes.unshift(note);
    await persistNotes();
    renderNoteList();
    selectNote(note.id);
    showImportToast('Note importée');

  } else {
    alert('Format non supporté. Utilisez un fichier .json ou .md');
  }
}

export function showImportToast(msg) {
  const toast = document.getElementById('save-toast');
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
    toast.textContent = 'Note sauvegardée';
  }, 2500);
}

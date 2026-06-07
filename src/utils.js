/* ═══════════════════════════════════════════════════════════════════
   Utilitaires
   ═══════════════════════════════════════════════════════════════════ */
import { state } from './state.js';

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function getNoteTitle(note) {
  if (note.title && note.title.trim()) return note.title.trim();
  const lines = note.content.split('\n');
  const first = lines.find(l => l.trim()) || '';
  return first.trim() || 'Note sans titre';
}

export function getNotePreview(note) {
  const lines = note.content.split('\n');
  if (note.title && note.title.trim()) {
    // titre explicite → aperçu = première ligne du contenu
    return lines.find(l => l.trim()) || '';
  }
  // pas de titre → aperçu = lignes après la première
  const firstIdx = lines.findIndex(l => l.trim());
  return lines.slice(firstIdx + 1).filter(l => l.trim()).join(' ').slice(0, 90);
}

export function parseNote(content) {
  const lines = content.split('\n');
  const titleLine = lines.find(l => l.trim()) || '';
  const title = titleLine.trim() || 'Note sans titre';
  const preview = lines
    .slice(lines.indexOf(titleLine) + 1)
    .filter(l => l.trim())
    .join(' ')
    .slice(0, 90);
  return { title, preview };
}

export function formatDate(ts, now = Date.now()) {
  const d = new Date(ts);
  const diff = now - ts;
  if (diff < 60_000)     return 'À l\'instant';
  if (diff < 3_600_000)  return `${Math.floor(diff / 60_000)} min`;
  if (diff < 86_400_000) return d.toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' });
  if (diff < 604_800_000)return d.toLocaleDateString('fr-FR', { weekday:'short' });
  return d.toLocaleDateString('fr-FR', { day:'numeric', month:'short' });
}

export function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function showToast() {
  const toast = document.getElementById('save-toast');
  toast.classList.add('visible');
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => toast.classList.remove('visible'), 1800);
}

export function triggerDownload(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

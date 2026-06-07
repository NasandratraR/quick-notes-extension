/* ═══════════════════════════════════════════════════════════════════
   Gestion des thèmes
   ═══════════════════════════════════════════════════════════════════ */
import { state, STORAGE_KEYS } from './state.js';
import { THEMES, FONTS, TEXT_COLORS, FONT_WEIGHT_LABELS } from './constants.js';
import { wrapSelection } from './editor-format.js';
import { onEditorInput } from './notes-crud.js';

export function applyTheme(id) {
  const theme = THEMES[id];
  if (!theme) return;
  state.currentTheme = id;
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  document.body.classList.toggle('dark-theme', theme.dark);
  chrome.storage.local.set({ [STORAGE_KEYS.theme]: id });
  document.querySelectorAll('.theme-card').forEach(c =>
    c.classList.toggle('selected', c.dataset.themeId === id)
  );
}

export function renderThemeGrid() {
  const grid = document.getElementById('theme-grid');
  grid.innerHTML = '';
  Object.entries(THEMES).forEach(([id, theme]) => {
    const v = theme.vars;
    const card = document.createElement('div');
    card.className = 'theme-card' + (id === state.currentTheme ? ' selected' : '');
    card.dataset.themeId = id;

    card.innerHTML = `
      <div class="theme-preview-box">
        <div class="tp-sidebar" style="background:${v['--bg-sidebar']}">
          <div class="tp-line" style="background:${v['--bg-note-active']};width:80%"></div>
          <div class="tp-line" style="background:${v['--text-primary']};opacity:.2;width:90%"></div>
          <div class="tp-line" style="background:${v['--text-primary']};opacity:.15;width:70%"></div>
        </div>
        <div class="tp-main" style="background:${v['--bg-main']}">
          <div class="tp-line" style="background:${v['--text-primary']};opacity:.35;width:55%"></div>
          <div class="tp-line" style="background:${v['--text-primary']};opacity:.18;width:85%"></div>
          <div class="tp-line" style="background:${v['--text-primary']};opacity:.18;width:70%"></div>
        </div>
      </div>
      <div class="theme-card-name">${theme.name}</div>
    `;
    card.addEventListener('click', () => applyTheme(id));
    grid.appendChild(card);
  });
}

export function closeColorPicker() {
  document.getElementById('color-picker-dropdown').classList.remove('open');
}

export function applyTextColor(color) {
  state.currentTextColor = color;
  document.getElementById('color-a-bar').style.background = color;
  wrapSelection(document.getElementById('note-editor'), `<span style="color:${color}">`, '</span>');
  closeColorPicker();
}

export function removeTextColor() {
  const editor = document.getElementById('note-editor');
  const start  = editor.selectionStart;
  const end    = editor.selectionEnd;
  if (start >= end) { closeColorPicker(); return; }
  const selected = editor.value.slice(start, end);
  const cleaned  = selected.replace(/<span style="color:#[0-9a-fA-F]{3,8}">([\s\S]*?)<\/span>/g, '$1');
  editor.setRangeText(cleaned, start, end, 'select');
  editor.focus();
  onEditorInput();
  closeColorPicker();
}

export function toggleColorPicker() {
  const dropdown = document.getElementById('color-picker-dropdown');
  if (dropdown.classList.contains('open')) { closeColorPicker(); return; }

  const swatches = document.createElement('div');
  swatches.className = 'color-swatches';
  TEXT_COLORS.forEach(color => {
    const s = document.createElement('div');
    s.className = 'color-swatch' + (color === state.currentTextColor ? ' selected' : '');
    s.style.background = color;
    s.title = color;
    s.addEventListener('click', () => applyTextColor(color));
    swatches.appendChild(s);
  });
  const removeBtn = document.createElement('button');
  removeBtn.className = 'color-remove-btn';
  removeBtn.textContent = '✕ Retirer la couleur';
  removeBtn.addEventListener('click', removeTextColor);

  dropdown.innerHTML = '';
  dropdown.appendChild(swatches);
  dropdown.appendChild(removeBtn);
  dropdown.classList.add('open');
}

export function applyFont(id) {
  const font = FONTS[id];
  if (!font) return;
  state.currentFont = id;
  document.documentElement.style.setProperty('--editor-font', font.family);
  chrome.storage.local.set({ [STORAGE_KEYS.font]: id });
  const label = document.getElementById('font-family-label');
  if (label) label.textContent = font.name;
  document.querySelectorAll('.font-family-item').forEach(c =>
    c.classList.toggle('selected', c.dataset.fontId === id)
  );
}

export function renderFontFamilyPicker() {
  const picker = document.getElementById('font-family-picker');
  if (!picker) return;
  picker.innerHTML = '';
  Object.entries(FONTS).forEach(([id, font]) => {
    const item = document.createElement('div');
    item.className = 'font-family-item' + (id === state.currentFont ? ' selected' : '');
    item.dataset.fontId = id;
    item.innerHTML = `
      <span class="font-family-item-preview" style="font-family:${font.family}">${font.preview}</span>
      <span class="font-family-item-name">${font.name}</span>
    `;
    item.addEventListener('click', () => { applyFont(id); closeFontFamilyPicker(); });
    picker.appendChild(item);
  });
}

export function closeFontFamilyPicker() {
  document.getElementById('font-family-picker').classList.remove('open');
}

export function toggleFontFamilyPicker() {
  document.getElementById('font-family-picker').classList.toggle('open');
}

export function applyFontWeight(weight) {
  state.currentFontWeight = Math.min(900, Math.max(100, Math.round(weight / 100) * 100));
  document.documentElement.style.setProperty('--editor-font-weight', state.currentFontWeight);
  chrome.storage.local.set({ [STORAGE_KEYS.fontWeight]: state.currentFontWeight });
  const el = document.getElementById('fmt-weight-val');
  if (el) el.textContent = FONT_WEIGHT_LABELS[state.currentFontWeight];
}

export function applyFontSize(size) {
  state.currentFontSize = Math.min(24, Math.max(10, size));
  document.documentElement.style.setProperty('--editor-font-size', state.currentFontSize + 'px');
  chrome.storage.local.set({ [STORAGE_KEYS.fontSize]: state.currentFontSize });
  const el = document.getElementById('fmt-size-val');
  if (el) el.textContent = state.currentFontSize + 'px';
}

export function toggleSettingsPanel() {
  const panel = document.getElementById('settings-panel');
  if (panel.style.display === 'none') {
    renderThemeGrid();
    panel.style.display = 'block';
  } else {
    panel.style.display = 'none';
  }
}

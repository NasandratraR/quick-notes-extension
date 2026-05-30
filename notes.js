/* ═══════════════════════════════════════════════════════════════════
   État global
   ═══════════════════════════════════════════════════════════════════ */
let notes = [];
let currentNoteId = null;
let saveTimer = null;
let toastTimer = null;
let isPreviewMode = false;

/* ═══════════════════════════════════════════════════════════════════
   Stockage
   ═══════════════════════════════════════════════════════════════════ */
function loadNotes() {
  return new Promise(resolve => {
    chrome.storage.local.get(['quicknotes'], r => resolve(r.quicknotes || []));
  });
}

function persistNotes() {
  return new Promise(resolve => {
    chrome.storage.local.set({ quicknotes: notes }, resolve);
  });
}

/* ═══════════════════════════════════════════════════════════════════
   Coloration syntaxique
   ═══════════════════════════════════════════════════════════════════ */
const KEYWORDS = {
  javascript: ['function','const','let','var','return','if','else','for','while','do',
    'switch','case','break','continue','class','extends','new','this','super','typeof',
    'instanceof','import','export','default','async','await','try','catch','finally',
    'throw','null','undefined','true','false','of','in','from','static','get','set',
    'delete','void','yield','debugger'],
  typescript: ['function','const','let','var','return','if','else','for','while','do',
    'switch','case','break','continue','class','extends','new','this','super','typeof',
    'instanceof','import','export','default','async','await','try','catch','finally',
    'throw','null','undefined','true','false','of','in','from','static','get','set',
    'interface','type','enum','implements','namespace','declare','abstract','readonly',
    'public','private','protected','override','as','satisfies','keyof','infer'],
  python: ['def','class','return','if','elif','else','for','while','break','continue',
    'import','from','as','with','try','except','finally','raise','pass','lambda',
    'yield','in','not','and','or','is','None','True','False','async','await',
    'global','nonlocal','del','assert','exec','print'],
  java: ['public','private','protected','static','final','class','interface','extends',
    'implements','new','return','if','else','for','while','do','switch','case','break',
    'continue','try','catch','finally','throw','throws','import','package','void',
    'boolean','int','long','short','byte','char','float','double','null','true','false',
    'abstract','synchronized','volatile','transient','native','strictfp','super','this',
    'instanceof','enum','record','var'],
  go: ['func','var','const','type','struct','interface','map','chan','go','select',
    'return','if','else','for','range','switch','case','break','continue','defer',
    'package','import','nil','true','false','error','string','int','bool','byte',
    'rune','float64','float32','make','new','append','len','cap','close','delete'],
  rust: ['fn','let','mut','const','static','struct','enum','trait','impl','for','while',
    'loop','if','else','match','return','use','pub','mod','crate','super','self','Self',
    'type','where','as','in','move','ref','box','break','continue','true','false',
    'unsafe','async','await','dyn','abstract','macro','extern'],
  php: ['function','class','return','if','else','elseif','for','foreach','while','do',
    'switch','case','break','continue','try','catch','finally','throw','new','echo',
    'print','include','require','namespace','use','public','private','protected',
    'static','abstract','final','interface','extends','implements','null','true','false',
    'array','list','match','fn','readonly'],
  sql: ['SELECT','FROM','WHERE','INSERT','INTO','UPDATE','SET','DELETE','CREATE','DROP',
    'ALTER','TABLE','INDEX','VIEW','JOIN','LEFT','RIGHT','INNER','OUTER','FULL','CROSS',
    'ON','AND','OR','NOT','IN','LIKE','BETWEEN','IS','NULL','ORDER','BY','GROUP',
    'HAVING','LIMIT','OFFSET','AS','DISTINCT','COUNT','SUM','AVG','MAX','MIN','UNION',
    'ALL','EXISTS','CASE','WHEN','THEN','ELSE','END','WITH','RETURNING','VALUES',
    'PRIMARY','KEY','FOREIGN','REFERENCES','UNIQUE','DEFAULT','AUTO_INCREMENT'],
  bash: ['if','then','else','elif','fi','for','while','do','done','case','esac',
    'function','return','exit','echo','printf','read','local','export','source',
    'shift','break','continue','in','select','until','true','false'],
};

const LANG_ALIAS = {
  js: 'javascript', ts: 'typescript', jsx: 'javascript', tsx: 'typescript',
  py: 'python', sh: 'bash', shell: 'bash', zsh: 'bash', fish: 'bash',
};

function normalizeLang(lang) {
  if (!lang) return 'generic';
  const l = lang.toLowerCase().trim();
  return LANG_ALIAS[l] || l;
}

/* Tokeniseur caractère par caractère */
function tokenize(code, lang) {
  const kws = new Set(KEYWORDS[lang] || []);
  const tokens = [];
  let i = 0;
  const n = code.length;

  const push = (type, text) => {
    if (!text) return;
    const last = tokens[tokens.length - 1];
    if (type === 'plain' && last && last.type === 'plain') {
      last.text += text;
    } else {
      tokens.push({ type, text });
    }
  };

  while (i < n) {
    const ch = code[i];

    /* ── Commentaires ligne // ou # ── */
    if ((code[i] === '/' && code[i+1] === '/') ||
        (lang === 'python' || lang === 'bash') && ch === '#') {
      const end = code.indexOf('\n', i);
      const text = end === -1 ? code.slice(i) : code.slice(i, end);
      push('comment', text);
      i += text.length;
      continue;
    }

    /* ── Commentaires bloc /* ... *‌/ ── */
    if (ch === '/' && code[i+1] === '*') {
      const end = code.indexOf('*/', i + 2);
      const text = end === -1 ? code.slice(i) : code.slice(i, end + 2);
      push('comment', text);
      i += text.length;
      continue;
    }

    /* ── Commentaires HTML <!-- ... --> ── */
    if (lang === 'html' && code.startsWith('<!--', i)) {
      const end = code.indexOf('-->', i + 4);
      const text = end === -1 ? code.slice(i) : code.slice(i, end + 3);
      push('comment', text);
      i += text.length;
      continue;
    }

    /* ── Chaînes de caractères ── */
    if (ch === '"' || ch === "'" || ch === '`') {
      let j = i + 1;
      while (j < n) {
        if (code[j] === '\\') { j += 2; continue; }
        if (code[j] === ch)   { j++; break; }
        j++;
      }
      push('string', code.slice(i, j));
      i = j;
      continue;
    }

    /* ── Nombres ── */
    if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(code[i+1] || ''))) {
      let j = i;
      while (j < n && /[0-9a-fA-FxXbBoO._]/.test(code[j])) j++;
      push('number', code.slice(i, j));
      i = j;
      continue;
    }

    /* ── HTML tags ── */
    if (lang === 'html' && ch === '<' && /[a-zA-Z/]/.test(code[i+1] || '')) {
      const end = code.indexOf('>', i);
      if (end !== -1) {
        const raw = code.slice(i, end + 1);
        push('tag', raw);
        i = end + 1;
        continue;
      }
    }

    /* ── Identifiants (mots clés ou noms) ── */
    if (/[a-zA-Z_$]/.test(ch)) {
      let j = i;
      while (j < n && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);

      /* Chercher si c'est un appel de fonction */
      let k = j;
      while (k < n && (code[k] === ' ' || code[k] === '\t')) k++;
      const isCall = code[k] === '(';

      if (kws.has(word)) {
        push('keyword', word);
      } else if (isCall) {
        push('function', word);
      } else {
        push('plain', word);
      }
      i = j;
      continue;
    }

    push('plain', ch);
    i++;
  }

  return tokens;
}

function esc(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function highlightCode(rawCode, lang) {
  const normalLang = normalizeLang(lang);

  if (normalLang === 'html') {
    return highlightHtml(rawCode);
  }

  const tokens = tokenize(rawCode, normalLang);
  return tokens.map(tok => {
    const escaped = esc(tok.text);
    if (tok.type === 'plain') return escaped;
    return `<span class="hl-${tok.type}">${escaped}</span>`;
  }).join('');
}

function highlightHtml(rawCode) {
  return esc(rawCode)
    .replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="hl-tag">$2</span>')
    .replace(/\s([\w-:]+)=/g, ' <span class="hl-attr">$1</span>=')
    .replace(/=(&quot;[^&]*&quot;|'[^']*')/g, '=<span class="hl-value">$1</span>')
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="hl-comment">$1</span>');
}

/* ═══════════════════════════════════════════════════════════════════
   Rendu Markdown
   ═══════════════════════════════════════════════════════════════════ */
function renderMarkdown(text) {
  const blocks = [];
  const lines = text.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    /* Blocs de code ``` */
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // sauter la ligne fermante ```
      const rawCode = codeLines.join('\n');
      const highlighted = highlightCode(rawCode, lang);
      const labelLang = lang || 'texte';
      blocks.push(
        `<pre>` +
        `<div class="code-block-header">` +
        `<span class="code-lang-label">${esc(labelLang)}</span>` +
        `<button class="copy-code-btn" data-code="${esc(rawCode).replace(/"/g,'&quot;')}">Copier</button>` +
        `</div>` +
        `<code>${highlighted}</code>` +
        `</pre>`
      );
      continue;
    }

    /* Titres */
    if (/^#{1,3}\s/.test(line)) {
      const level = line.match(/^(#{1,3})/)[1].length;
      const content = inlineFormat(line.slice(level + 1));
      blocks.push(`<h${level}>${content}</h${level}>`);
      i++;
      continue;
    }

    /* Séparateurs */
    if (/^---+$/.test(line.trim())) {
      blocks.push('<hr>');
      i++;
      continue;
    }

    /* Listes non ordonnées */
    if (/^[-*+]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        items.push(`<li>${inlineFormat(lines[i].slice(2))}</li>`);
        i++;
      }
      blocks.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    /* Listes ordonnées */
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(`<li>${inlineFormat(lines[i].replace(/^\d+\.\s/, ''))}</li>`);
        i++;
      }
      blocks.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    /* Lignes vides */
    if (line.trim() === '') {
      blocks.push('<br>');
      i++;
      continue;
    }

    /* Paragraphe normal */
    blocks.push(`<p>${inlineFormat(line)}</p>`);
    i++;
  }

  return blocks.join('\n');
}

function inlineFormat(text) {
  return esc(text)
    /* Code inline `...` */
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    /* Gras **...** */
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    /* Italique *...* */
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    /* Liens [texte](url) */
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

/* ═══════════════════════════════════════════════════════════════════
   Formatage dans l'éditeur
   ═══════════════════════════════════════════════════════════════════ */
function wrapSelection(editor, before, after) {
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

function insertCodeBlock(lang) {
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

/* ═══════════════════════════════════════════════════════════════════
   Mode aperçu
   ═══════════════════════════════════════════════════════════════════ */
function setPreviewMode(preview) {
  isPreviewMode = preview;
  const editorEl  = document.getElementById('note-editor');
  const previewEl = document.getElementById('preview-panel');
  const btnEdit    = document.getElementById('btn-edit-mode');
  const btnPreview = document.getElementById('btn-preview-mode');

  if (preview) {
    const note = notes.find(n => n.id === currentNoteId);
    if (note) {
      previewEl.innerHTML = renderMarkdown(note.content);
    }
    /* Boutons "Copier" dans les blocs de code */
    previewEl.querySelectorAll('.copy-code-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(btn.dataset.code).then(() => {
          const orig = btn.textContent;
          btn.textContent = 'Copié !';
          setTimeout(() => (btn.textContent = orig), 1500);
        });
      });
    });
    editorEl.style.display  = 'none';
    previewEl.style.display = 'block';
    btnEdit.classList.remove('active');
    btnPreview.classList.add('active');
  } else {
    editorEl.style.display  = '';
    previewEl.style.display = 'none';
    btnEdit.classList.add('active');
    btnPreview.classList.remove('active');
    editorEl.focus();
  }
}

/* ═══════════════════════════════════════════════════════════════════
   Utilitaires
   ═══════════════════════════════════════════════════════════════════ */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function getNoteTitle(note) {
  if (note.title && note.title.trim()) return note.title.trim();
  const lines = note.content.split('\n');
  const first = lines.find(l => l.trim()) || '';
  return first.trim() || 'Note sans titre';
}

function getNotePreview(note) {
  const lines = note.content.split('\n');
  if (note.title && note.title.trim()) {
    // titre explicite → aperçu = première ligne du contenu
    return lines.find(l => l.trim()) || '';
  }
  // pas de titre → aperçu = lignes après la première
  const firstIdx = lines.findIndex(l => l.trim());
  return lines.slice(firstIdx + 1).filter(l => l.trim()).join(' ').slice(0, 90);
}

function parseNote(content) {
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

function formatDate(ts) {
  const d = new Date(ts);
  const diff = Date.now() - ts;
  if (diff < 60_000)     return 'À l\'instant';
  if (diff < 3_600_000)  return `${Math.floor(diff / 60_000)} min`;
  if (diff < 86_400_000) return d.toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' });
  if (diff < 604_800_000)return d.toLocaleDateString('fr-FR', { weekday:'short' });
  return d.toLocaleDateString('fr-FR', { day:'numeric', month:'short' });
}

function escHtml(s) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(s));
  return d.innerHTML;
}

function showToast() {
  const toast = document.getElementById('save-toast');
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 1800);
}

/* ═══════════════════════════════════════════════════════════════════
   Rendu de la liste
   ═══════════════════════════════════════════════════════════════════ */
function renderNoteList(filter = '') {
  const list = document.getElementById('notes-list');
  const q = filter.toLowerCase();

  const filtered = notes
    .filter(n => !q || n.content.toLowerCase().includes(q))
    .sort((a, b) => b.updatedAt - a.updatedAt);

  list.innerHTML = '';

  if (filtered.length === 0) {
    list.innerHTML = `<div class="no-notes">${
      q ? `Aucune note pour « ${escHtml(filter)} »` : 'Aucune note'
    }</div>`;
    return;
  }

  filtered.forEach(note => {
    const title   = getNoteTitle(note);
    const preview = getNotePreview(note);
    const item = document.createElement('div');
    item.className = 'note-item' + (note.id === currentNoteId ? ' active' : '');
    item.dataset.id = note.id;
    item.innerHTML = `
      <div class="note-item-header">
        <div class="note-title">${escHtml(title)}</div>
        <div class="note-date">${formatDate(note.updatedAt)}</div>
      </div>
      <div class="note-preview">${preview ? escHtml(preview) : '<em style="opacity:.5">Vide</em>'}</div>
    `;
    item.addEventListener('click', () => selectNote(note.id));
    list.appendChild(item);
  });
}

/* ═══════════════════════════════════════════════════════════════════
   CRUD notes
   ═══════════════════════════════════════════════════════════════════ */
function selectNote(id) {
  const note = notes.find(n => n.id === id);
  if (!note) return;

  currentNoteId = id;
  document.getElementById('note-editor').value      = note.content;
  document.getElementById('note-title-input').value = note.title || '';
  document.getElementById('main-content').style.display        = 'flex';
  document.getElementById('empty-state').style.display         = 'none';
  document.getElementById('view-toggle-toolbar').style.display = 'flex';

  renderNoteList(document.getElementById('search-input').value);
  setPreviewMode(true);
  closeInfoPanel();

  const editor = document.getElementById('note-editor');
  editor.setSelectionRange(editor.value.length, editor.value.length);
  editor.focus();
}

async function createNote() {
  const note = { id: generateId(), title: '', content: '', createdAt: Date.now(), updatedAt: Date.now() };
  notes.unshift(note);
  await persistNotes();
  renderNoteList(document.getElementById('search-input').value);
  selectNote(note.id);
}

async function deleteCurrentNote() {
  if (!currentNoteId) return;
  if (!confirm('Supprimer cette note ? Cette action est irréversible.')) return;

  notes = notes.filter(n => n.id !== currentNoteId);
  currentNoteId = null;
  await persistNotes();

  document.getElementById('main-content').style.display        = 'none';
  document.getElementById('empty-state').style.display         = 'flex';
  document.getElementById('view-toggle-toolbar').style.display = 'none';
  closeInfoPanel();

  const filter = document.getElementById('search-input').value;
  renderNoteList(filter);

  const next = notes
    .filter(n => !filter || n.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.updatedAt - a.updatedAt)[0];
  if (next) selectNote(next.id);
}

function onTitleInput() {
  if (!currentNoteId) return;
  const note = notes.find(n => n.id === currentNoteId);
  if (!note) return;

  note.title     = document.getElementById('note-title-input').value;
  note.updatedAt = Date.now();
  renderNoteList(document.getElementById('search-input').value);

  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    await persistNotes();
    showToast();
  }, 600);
}

function onEditorInput() {
  if (!currentNoteId) return;
  const note = notes.find(n => n.id === currentNoteId);
  if (!note) return;

  note.content   = document.getElementById('note-editor').value;
  note.updatedAt = Date.now();
  renderNoteList(document.getElementById('search-input').value);

  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    await persistNotes();
    showToast();
  }, 600);
}

/* ═══════════════════════════════════════════════════════════════════
   Panneau d'infos
   ═══════════════════════════════════════════════════════════════════ */
function openInfoPanel() {
  if (!currentNoteId) return;
  const note = notes.find(n => n.id === currentNoteId);
  if (!note) return;

  const { title } = parseNote(note.content);
  const words = note.content.trim() ? note.content.trim().split(/\s+/).length : 0;
  const chars = note.content.length;
  const codeBlocks = (note.content.match(/```[\s\S]*?```/g) || []).length;
  const fmt = ts => new Date(ts).toLocaleString('fr-FR', {
    day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit',
  });

  document.getElementById('info-panel-body').innerHTML = `
    <div class="info-row"><span class="info-label">Titre</span><span class="info-value" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(title)}</span></div>
    <div class="info-row"><span class="info-label">Mots</span><span class="info-value">${words}</span></div>
    <div class="info-row"><span class="info-label">Caractères</span><span class="info-value">${chars}</span></div>
    <div class="info-row"><span class="info-label">Blocs de code</span><span class="info-value">${codeBlocks}</span></div>
    <div class="info-row"><span class="info-label">Créée</span><span class="info-value">${fmt(note.createdAt)}</span></div>
    <div class="info-row"><span class="info-label">Modifiée</span><span class="info-value">${fmt(note.updatedAt)}</span></div>
  `;
  document.getElementById('info-panel').style.display = 'block';
}

function closeInfoPanel() {
  document.getElementById('info-panel').style.display = 'none';
}

function toggleInfoPanel() {
  document.getElementById('info-panel').style.display === 'none'
    ? openInfoPanel()
    : closeInfoPanel();
}

/* ═══════════════════════════════════════════════════════════════════
   Dropdown de langages
   ═══════════════════════════════════════════════════════════════════ */
function closeLangPicker() {
  document.getElementById('lang-picker').classList.remove('open');
}

function toggleLangPicker() {
  document.getElementById('lang-picker').classList.toggle('open');
}

/* ═══════════════════════════════════════════════════════════════════
   Raccourcis clavier
   ═══════════════════════════════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  const ctrl = e.ctrlKey || e.metaKey;
  const editor = document.getElementById('note-editor');

  if (ctrl && e.key === 'n')           { e.preventDefault(); createNote(); return; }
  if (ctrl && e.key === 'f')           { e.preventDefault(); document.getElementById('search-input').focus(); return; }
  if (ctrl && e.shiftKey && e.key==='K') { e.preventDefault(); toggleLangPicker(); return; }
  if (ctrl && e.key === 'e')           { e.preventDefault(); wrapSelection(editor, '`', '`'); return; }
  if (ctrl && e.key === 'b' && !isPreviewMode) { e.preventDefault(); wrapSelection(editor, '**', '**'); return; }
  if (ctrl && e.key === 'i' && !isPreviewMode) { e.preventDefault(); wrapSelection(editor, '*', '*'); return; }
  if (ctrl && e.key === 'p')           { e.preventDefault(); setPreviewMode(!isPreviewMode); return; }
  if (e.key === 'Escape')              { closeLangPicker(); closeInfoPanel(); return; }

  /* Tab dans l'éditeur → insérer des espaces */
  if (e.key === 'Tab' && document.activeElement === editor) {
    e.preventDefault();
    const start = editor.selectionStart;
    editor.setRangeText('  ', start, editor.selectionEnd, 'end');
    onEditorInput();
  }
});

/* Fermer le dropdown si on clique ailleurs */
document.addEventListener('click', e => {
  const picker = document.getElementById('lang-picker');
  const btn    = document.getElementById('btn-code-block');
  if (!picker.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
    closeLangPicker();
  }
});

/* ═══════════════════════════════════════════════════════════════════
   Initialisation
   ═══════════════════════════════════════════════════════════════════ */
async function init() {
  notes = await loadNotes();
  renderNoteList();

  if (notes.length > 0) {
    const sorted = [...notes].sort((a, b) => b.updatedAt - a.updatedAt);
    selectNote(sorted[0].id);
  } else {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('empty-state').style.display  = 'flex';
  }

  /* ── Barre principale ── */
  document.getElementById('new-note-btn').addEventListener('click', createNote);
  document.getElementById('delete-btn').addEventListener('click', deleteCurrentNote);
  document.getElementById('info-btn').addEventListener('click', toggleInfoPanel);
  document.getElementById('close-info-btn').addEventListener('click', closeInfoPanel);
  document.getElementById('toggle-sidebar-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  });
  document.getElementById('fullscreen-btn').addEventListener('click', () => {
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
  });
  document.getElementById('create-first-btn').addEventListener('click', createNote);

  /* ── Barre de formatage ── */
  document.getElementById('btn-code-block').addEventListener('click', toggleLangPicker);

  document.getElementById('btn-inline-code').addEventListener('click', () => {
    wrapSelection(document.getElementById('note-editor'), '`', '`');
  });

  document.getElementById('btn-bold').addEventListener('click', () => {
    wrapSelection(document.getElementById('note-editor'), '**', '**');
  });

  document.getElementById('btn-italic').addEventListener('click', () => {
    wrapSelection(document.getElementById('note-editor'), '*', '*');
  });

  document.getElementById('btn-heading').addEventListener('click', () => {
    const editor = document.getElementById('note-editor');
    const start = editor.selectionStart;
    const lineStart = editor.value.lastIndexOf('\n', start - 1) + 1;
    const line = editor.value.slice(lineStart, editor.value.indexOf('\n', start));
    const isHeading = /^#{1,3}\s/.test(line);
    if (isHeading) {
      editor.setRangeText(line.replace(/^#{1,3}\s/, ''), lineStart, lineStart + line.length, 'end');
    } else {
      editor.setRangeText('# ' + line, lineStart, lineStart + line.length, 'end');
    }
    onEditorInput();
  });

  document.getElementById('btn-edit-mode').addEventListener('click', () => setPreviewMode(false));
  document.getElementById('btn-preview-mode').addEventListener('click', () => setPreviewMode(true));

  /* Sélection d'un langage dans le dropdown */
  document.getElementById('lang-picker').addEventListener('click', e => {
    const item = e.target.closest('.lang-picker-item');
    if (!item) return;
    insertCodeBlock(item.dataset.lang);
    closeLangPicker();
  });

  /* ── Titre ── */
  document.getElementById('note-title-input').addEventListener('input', onTitleInput);
  document.getElementById('note-title-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); document.getElementById('note-editor').focus(); }
  });

  /* ── Éditeur ── */
  document.getElementById('note-editor').addEventListener('input', onEditorInput);

  /* ── Recherche ── */
  const searchInput = document.getElementById('search-input');
  const clearBtn    = document.getElementById('clear-search');

  searchInput.addEventListener('input', e => {
    clearBtn.style.display = e.target.value ? 'flex' : 'none';
    renderNoteList(e.target.value);
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    renderNoteList('');
    searchInput.focus();
  });
}

document.addEventListener('DOMContentLoaded', init);

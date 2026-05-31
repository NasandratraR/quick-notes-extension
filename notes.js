/* ═══════════════════════════════════════════════════════════════════
   Thèmes
   ═══════════════════════════════════════════════════════════════════ */
const THEMES = {
  brun: {
    name: 'Marron chaud', dark: false,
    vars: {
      '--bg-main':'#faf7f4','--bg-sidebar':'#f0ebe3','--bg-toolbar':'#ede7de',
      '--bg-note-hover':'#e5ddd3','--bg-note-active':'#c9a882',
      '--bg-search':'#e4ddd4','--bg-editor':'#fefcfa','--bg-tags':'#f5f0ea',
      '--text-primary':'#2c1f14','--text-secondary':'#7a6350',
      '--text-muted':'#b0977e','--text-placeholder':'#c4ad97','--text-on-active':'#1a1008',
      '--border':'#d8cfc5','--border-light':'#e8e0d6',
      '--icon-default':'#9e7f62','--icon-hover':'#5c3d22','--scrollbar-thumb':'#c4b09a',
      '--code-bg':'#f5ede0','--code-border':'#d8c9b5','--code-header':'#ede3d5',
    }
  },
  nuit: {
    name: 'Nuit', dark: true,
    vars: {
      '--bg-main':'#1a1d24','--bg-sidebar':'#1e2130','--bg-toolbar':'#171921',
      '--bg-note-hover':'#252838','--bg-note-active':'#3a5080',
      '--bg-search':'#252838','--bg-editor':'#1c1f2b','--bg-tags':'#171921',
      '--text-primary':'#e2e2e8','--text-secondary':'#9090a8',
      '--text-muted':'#565670','--text-placeholder':'#404058','--text-on-active':'#ffffff',
      '--border':'#2d2f3d','--border-light':'#252838',
      '--icon-default':'#7070a0','--icon-hover':'#e2e2e8','--scrollbar-thumb':'#3a3d50',
      '--code-bg':'#13151e','--code-border':'#2d2f3d','--code-header':'#1a1d28',
    }
  },
  ardoise: {
    name: 'Ardoise', dark: true,
    vars: {
      '--bg-main':'#2a2d38','--bg-sidebar':'#22252f','--bg-toolbar':'#1e2028',
      '--bg-note-hover':'#32364a','--bg-note-active':'#5870a8',
      '--bg-search':'#30334a','--bg-editor':'#2c2f3e','--bg-tags':'#1e2028',
      '--text-primary':'#dde2f0','--text-secondary':'#9098b8',
      '--text-muted':'#606880','--text-placeholder':'#484e68','--text-on-active':'#ffffff',
      '--border':'#383c50','--border-light':'#2e3245',
      '--icon-default':'#7888b8','--icon-hover':'#dde2f0','--scrollbar-thumb':'#484e68',
      '--code-bg':'#1e2130','--code-border':'#383c50','--code-header':'#1a1d28',
    }
  },
  foret: {
    name: 'Forêt', dark: false,
    vars: {
      '--bg-main':'#f4f8f4','--bg-sidebar':'#e8f0e8','--bg-toolbar':'#ddeadd',
      '--bg-note-hover':'#d4e8d4','--bg-note-active':'#5a8a5a',
      '--bg-search':'#d8e8d8','--bg-editor':'#f8fbf8','--bg-tags':'#eef5ee',
      '--text-primary':'#1a2e1a','--text-secondary':'#4a6a4a',
      '--text-muted':'#7a9a7a','--text-placeholder':'#a0c0a0','--text-on-active':'#ffffff',
      '--border':'#c5d8c5','--border-light':'#d8ead8',
      '--icon-default':'#6a8a6a','--icon-hover':'#2a4a2a','--scrollbar-thumb':'#b0c8b0',
      '--code-bg':'#eaf3ea','--code-border':'#c5d8c5','--code-header':'#daeada',
    }
  },
  ocean: {
    name: 'Océan', dark: false,
    vars: {
      '--bg-main':'#f4f7fa','--bg-sidebar':'#e8eef5','--bg-toolbar':'#dce5f0',
      '--bg-note-hover':'#d0dcea','--bg-note-active':'#4a7aa8',
      '--bg-search':'#d8e4f0','--bg-editor':'#f8fafb','--bg-tags':'#edf2f8',
      '--text-primary':'#1a2a3a','--text-secondary':'#4a6a8a',
      '--text-muted':'#7a9aba','--text-placeholder':'#a0b8cc','--text-on-active':'#ffffff',
      '--border':'#c5d2de','--border-light':'#d8e2ec',
      '--icon-default':'#6a8aa8','--icon-hover':'#1a3a5a','--scrollbar-thumb':'#b0c5d8',
      '--code-bg':'#eaf0f8','--code-border':'#c5d2de','--code-header':'#dae4f0',
    }
  },
  rose: {
    name: 'Rose', dark: false,
    vars: {
      '--bg-main':'#fdf8f8','--bg-sidebar':'#f5ecec','--bg-toolbar':'#ece2e2',
      '--bg-note-hover':'#e8d8d8','--bg-note-active':'#c47878',
      '--bg-search':'#e4d5d5','--bg-editor':'#fffafa','--bg-tags':'#f8f0f0',
      '--text-primary':'#2e1a1a','--text-secondary':'#7a5050',
      '--text-muted':'#b09090','--text-placeholder':'#c8a8a8','--text-on-active':'#ffffff',
      '--border':'#d8c5c5','--border-light':'#e8d5d5',
      '--icon-default':'#a87070','--icon-hover':'#5a2a2a','--scrollbar-thumb':'#c8a8a8',
      '--code-bg':'#f8ecec','--code-border':'#d8c5c5','--code-header':'#eedada',
    }
  },
  sable: {
    name: 'Sable', dark: false,
    vars: {
      '--bg-main':'#faf8f0','--bg-sidebar':'#f0ece0','--bg-toolbar':'#e8e2d0',
      '--bg-note-hover':'#dfd8c0','--bg-note-active':'#b09040',
      '--bg-search':'#ddd8c8','--bg-editor':'#fdfcf5','--bg-tags':'#f5f0e0',
      '--text-primary':'#2a2010','--text-secondary':'#6a5830',
      '--text-muted':'#a09070','--text-placeholder':'#c0b090','--text-on-active':'#ffffff',
      '--border':'#d5ccb0','--border-light':'#e5ddc8',
      '--icon-default':'#8a7840','--icon-hover':'#4a3820','--scrollbar-thumb':'#c0b090',
      '--code-bg':'#f0ead8','--code-border':'#d5ccb0','--code-header':'#e8dfc8',
    }
  },
  violet: {
    name: 'Violet', dark: false,
    vars: {
      '--bg-main':'#f8f5fc','--bg-sidebar':'#ede5f5','--bg-toolbar':'#e4d8f0',
      '--bg-note-hover':'#ddd0ec','--bg-note-active':'#8a60b8',
      '--bg-search':'#ddd0ec','--bg-editor':'#fbf8fe','--bg-tags':'#f2ecfa',
      '--text-primary':'#261040','--text-secondary':'#6a4a90',
      '--text-muted':'#a080c0','--text-placeholder':'#c0a0d8','--text-on-active':'#ffffff',
      '--border':'#d0c0e0','--border-light':'#e0d4f0',
      '--icon-default':'#9070b8','--icon-hover':'#3a1868','--scrollbar-thumb':'#c0a8d8',
      '--code-bg':'#f0e8fa','--code-border':'#d0c0e0','--code-header':'#e4d4f5',
    }
  },
};

/* ═══════════════════════════════════════════════════════════════════
   Polices
   ═══════════════════════════════════════════════════════════════════ */
const FONTS = {
  default: {
    name: 'Défaut',
    family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    preview: 'Aa — Belle note',
  },
  indie: {
    name: 'Indie Flower',
    family: "'Indie Flower', cursive",
    preview: 'Aa — Belle note',
  },
  merriweather: {
    name: 'Merriweather',
    family: "'Merriweather', serif",
    preview: 'Aa — Belle note',
  },
  lora: {
    name: 'Lora',
    family: "'Lora', serif",
    preview: 'Aa — Belle note',
  },
  architects: {
    name: 'Architects Daughter',
    family: "'Architects Daughter', cursive",
    preview: 'Aa — Belle note',
  },
  patrick: {
    name: 'Patrick Hand',
    family: "'Patrick Hand', cursive",
    preview: 'Aa — Belle note',
  },
  opensans: {
    name: 'Open Sans',
    family: "'Open Sans', sans-serif",
    preview: 'Aa — Belle note',
  },
};

/* ═══════════════════════════════════════════════════════════════════
   État global
   ═══════════════════════════════════════════════════════════════════ */
let notes = [];
let images = {};          // { imgId: dataUrl }
let currentNoteId = null;
let saveTimer = null;
let renderTimer = null;
let toastTimer = null;
let isPreviewMode = false;
let isSplitMode   = false;
let currentTheme      = 'brun';
let currentFont       = 'default';
let currentFontSize   = 13;
let currentFontWeight = 400;
let tocScrollPending = false;

/* ═══════════════════════════════════════════════════════════════════
   Recherche dans l'éditeur
   ═══════════════════════════════════════════════════════════════════ */
let editorSearchQuery   = '';
let editorSearchMatches = [];
let editorSearchIdx     = -1;

function openEditorSearch() {
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

function closeEditorSearch() {
  document.getElementById('editor-search-bar').style.display = 'none';
  document.getElementById('editor-search-input').value = '';
  document.getElementById('editor-search-count').textContent = '';
  document.getElementById('editor-highlight-layer').innerHTML = '';
  clearPreviewHighlights();
  editorSearchQuery   = '';
  editorSearchMatches = [];
  editorSearchIdx     = -1;
}

function updateEditorSearch() {
  const input   = document.getElementById('editor-search-input');
  const editor  = document.getElementById('note-editor');
  const layer   = document.getElementById('editor-highlight-layer');
  const countEl = document.getElementById('editor-search-count');

  editorSearchQuery = input.value;

  if (!editorSearchQuery) {
    editorSearchMatches = [];
    editorSearchIdx     = -1;
    layer.innerHTML     = '';
    countEl.textContent = '';
    input.classList.remove('no-match');
    clearPreviewHighlights();
    return;
  }

  const text = editor.value;
  const re   = new RegExp(escapeRegex(editorSearchQuery), 'gi');
  editorSearchMatches = [...text.matchAll(re)].map(m => m.index);

  if (editorSearchMatches.length === 0) {
    editorSearchIdx = -1;
    layer.innerHTML = '';
    countEl.textContent = '0 résultat';
    input.classList.add('no-match');
    clearPreviewHighlights();
    return;
  }

  input.classList.remove('no-match');
  if (editorSearchIdx < 0 || editorSearchIdx >= editorSearchMatches.length) editorSearchIdx = 0;
  countEl.textContent = `${editorSearchIdx + 1} / ${editorSearchMatches.length}`;

  if (!isPreviewMode) {
    renderHighlightLayer(text);
    scrollEditorToMatch();
  }
  if (isPreviewMode || isSplitMode) {
    highlightPreviewPanel();
    scrollPreviewToMatch();
  }
}

function renderHighlightLayer(text) {
  const layer = document.getElementById('editor-highlight-layer');
  if (!editorSearchQuery || !editorSearchMatches.length) { layer.innerHTML = ''; return; }

  let html = '';
  let prev = 0;
  let i    = 0;
  const re = new RegExp(escapeRegex(editorSearchQuery), 'gi');
  let m;
  while ((m = re.exec(text)) !== null) {
    html += esc(text.slice(prev, m.index));
    html += `<mark${i === editorSearchIdx ? ' class="current"' : ''}>${esc(m[0])}</mark>`;
    prev = m.index + m[0].length;
    i++;
  }
  html += esc(text.slice(prev));
  layer.innerHTML = html;
}

function navigateEditorSearch(dir) {
  if (!editorSearchMatches.length) return;
  editorSearchIdx = (editorSearchIdx + dir + editorSearchMatches.length) % editorSearchMatches.length;
  document.getElementById('editor-search-count').textContent =
    `${editorSearchIdx + 1} / ${editorSearchMatches.length}`;

  if (!isPreviewMode) {
    renderHighlightLayer(document.getElementById('note-editor').value);
    scrollEditorToMatch(true);
  }
  if (isPreviewMode || isSplitMode) {
    highlightPreviewPanel();
    scrollPreviewToMatch();
  }

  document.getElementById('editor-search-input').focus();
}

function scrollEditorToMatch(grabFocus = false) {
  if (editorSearchIdx < 0 || !editorSearchMatches.length) return;
  const editor     = document.getElementById('note-editor');
  const matchStart = editorSearchMatches[editorSearchIdx];
  const matchEnd   = matchStart + editorSearchQuery.length;
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

function syncHighlightScroll() {
  const editor = document.getElementById('note-editor');
  const layer  = document.getElementById('editor-highlight-layer');
  layer.scrollTop = editor.scrollTop;
}

function clearPreviewHighlights() {
  document.getElementById('preview-panel').querySelectorAll('mark').forEach(mark => {
    const parent = mark.parentNode;
    if (!parent) return;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
}

function highlightPreviewPanel() {
  const panel = document.getElementById('preview-panel');
  clearPreviewHighlights();
  if (!editorSearchQuery) return;

  const re = new RegExp(escapeRegex(editorSearchQuery), 'gi');
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
      if (globalIdx === editorSearchIdx) mark.classList.add('current');
      frag.appendChild(mark);
      prev = m.index + m[0].length;
      globalIdx++;
    });
    if (prev < text.length) frag.appendChild(document.createTextNode(text.slice(prev)));
    textNode.parentNode.replaceChild(frag, textNode);
  });
}

function scrollPreviewToMatch() {
  const current = document.getElementById('preview-panel').querySelector('mark.current');
  if (current) current.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

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
   Stockage des images (séparé des notes)
   ═══════════════════════════════════════════════════════════════════ */
function loadImages() {
  return new Promise(resolve => {
    chrome.storage.local.get(['quicknotes_images'], r => {
      images = r.quicknotes_images || {};
      resolve();
    });
  });
}

function saveImage(id, dataUrl) {
  images[id] = dataUrl;
  return new Promise(resolve => {
    chrome.storage.local.set({ quicknotes_images: images }, resolve);
  });
}

function deleteImages(ids) {
  ids.forEach(id => delete images[id]);
  return new Promise(resolve => {
    chrome.storage.local.set({ quicknotes_images: images }, resolve);
  });
}

function extractImageIds(content) {
  return [...content.matchAll(/!\[[^\]]*\]\(img:([a-z0-9]+)/g)].map(m => m[1]);
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

/* ── Helpers pour les tableaux Markdown ── */
function parseTableRow(line) {
  return line.split('|')
    .map(c => c.trim())
    .filter((c, i, arr) => !(i === 0 && c === '') && !(i === arr.length - 1 && c === ''));
}

function isSeparatorRow(line) {
  const cells = parseTableRow(line);
  return cells.length > 0 && cells.every(c => /^:?-+:?$/.test(c));
}

function getColAlign(cell) {
  const c = cell.trim();
  if (c.startsWith(':') && c.endsWith(':')) return 'center';
  if (c.endsWith(':')) return 'right';
  return 'left';
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

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
  let hIdx = 0; // compteur d'IDs pour les titres

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
    if (/^#{1,6}\s/.test(line)) {
      const level = line.match(/^(#{1,6})/)[1].length;
      const content = inlineFormat(line.slice(level + 1));
      blocks.push(`<h${level} id="h-${hIdx++}">${content}</h${level}>`);
      i++;
      continue;
    }

    /* Séparateurs */
    if (/^---+$/.test(line.trim())) {
      blocks.push('<hr>');
      i++;
      continue;
    }

    /* Tableaux Markdown */
    if (/^\|/.test(line)) {
      const tableLines = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2 && isSeparatorRow(tableLines[1])) {
        const headers  = parseTableRow(tableLines[0]);
        const aligns   = parseTableRow(tableLines[1]).map(getColAlign);
        const dataRows = tableLines.slice(2).map(parseTableRow);
        const key      = esc(headers.join('|'));

        const colgroup = `<colgroup>${headers.map(() => '<col>').join('')}</colgroup>`;
        const ths = headers.map((h, j) =>
          `<th style="text-align:${aligns[j] || 'left'}">${inlineFormat(h)}` +
          (j < headers.length - 1 ? `<div class="col-resize-handle"></div>` : '') +
          `</th>`
        ).join('');
        const trs = dataRows.map(row =>
          `<tr>${row.map((cell, j) =>
            `<td style="text-align:${aligns[j] || 'left'}">${inlineFormat(cell)}</td>`
          ).join('')}</tr>`
        ).join('');

        blocks.push(
          `<div class="md-table-outer">` +
          `<div class="md-table-wrapper"><table class="md-table" data-key="${key}">` +
          colgroup +
          `<thead><tr>${ths}</tr></thead>` +
          (trs ? `<tbody>${trs}</tbody>` : '') +
          `</table></div>` +
          `<div class="tbl-width-handle" title="Redimensionner le tableau"></div>` +
          `</div>`
        );
      } else {
        tableLines.forEach(l => blocks.push(`<p>${inlineFormat(l)}</p>`));
      }
      continue;
    }

    /* Tables TSV (données séparées par tabulations — copier-coller depuis un tableur) */
    if (line.includes('\t')) {
      const tsvLines = [];
      while (i < lines.length && lines[i].includes('\t')) {
        tsvLines.push(lines[i]);
        i++;
      }
      const rows = tsvLines.map(l => l.split('\t').map(c => c.trim()));
      const colCount = Math.max(...rows.map(r => r.length));
      if (tsvLines.length >= 2 && colCount >= 2) {
        const headers  = rows[0];
        const dataRows = rows.slice(1);
        const key      = esc(headers.join('|').slice(0, 100));
        const pad = row => { const r = [...row]; while (r.length < colCount) r.push(''); return r; };
        const colgroup = `<colgroup>${Array(colCount).fill('<col>').join('')}</colgroup>`;
        const ths = pad(headers).map(h => `<th>${inlineFormat(h)}</th>`).join('');
        const trs = dataRows.map(row =>
          `<tr>${pad(row).map(cell => `<td>${inlineFormat(cell)}</td>`).join('')}</tr>`
        ).join('');
        blocks.push(
          `<div class="md-table-outer">` +
          `<div class="md-table-wrapper"><table class="md-table" data-key="${key}">` +
          colgroup + `<thead><tr>${ths}</tr></thead>` +
          (trs ? `<tbody>${trs}</tbody>` : '') +
          `</table></div>` +
          `<div class="tbl-width-handle" title="Redimensionner le tableau"></div>` +
          `</div>`
        );
      } else {
        tsvLines.forEach(l => blocks.push(`<p>${inlineFormat(l)}</p>`));
      }
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
      blocks.push('<div class="blank-line"></div>');
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
    /* Images ![alt](src) ou ![alt](img:ID =300) — avant les liens */
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
      let resolved = '', imgRef = src, width = null;
      if (src.startsWith('img:')) {
        const eqIdx = src.indexOf(' =', 4);
        const imgId = eqIdx === -1 ? src.slice(4) : src.slice(4, eqIdx);
        imgRef = `img:${imgId}`;
        if (eqIdx !== -1) width = parseInt(src.slice(eqIdx + 2)) || null;
        resolved = images[imgId] || '';
      } else {
        resolved = src;
      }
      if (!resolved) return '';
      const wStyle = width ? ` style="width:${width}px"` : '';
      return `<div class="img-wrapper" data-imgref="${imgRef}">`
           + `<img src="${resolved}" alt="${alt}" class="preview-img"${wStyle}>`
           + `<div class="img-resize-handle" title="Redimensionner"></div>`
           + `</div>`;
    })
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
   Rendu du panneau aperçu (partagé entre mode aperçu et split)
   ═══════════════════════════════════════════════════════════════════ */
function renderPreviewPanel() {
  const note = notes.find(n => n.id === currentNoteId);
  const previewEl = document.getElementById('preview-panel');
  if (!note) { previewEl.innerHTML = ''; return; }

  previewEl.innerHTML = renderMarkdown(note.content);
  previewEl.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.code).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copié !';
        setTimeout(() => (btn.textContent = orig), 1500);
      });
    });
  });

  setupImageResize();
  setupTableResize();
  if (isTocOpen) { renderTocPanel(); setupTocScrollSpy(); }
  if (editorSearchQuery) highlightPreviewPanel();
}

/* Poignée de redimensionnement des images en aperçu */
function setupImageResize() {
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
        if (!currentNoteId) return;
        const note   = notes.find(n => n.id === currentNoteId);
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
function setupTableResize() {
  const previewEl = document.getElementById('preview-panel');
  const note = currentNoteId ? notes.find(n => n.id === currentNoteId) : null;
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
      if (!currentNoteId) return;
      const n = notes.find(n => n.id === currentNoteId);
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
   Mode split
   ═══════════════════════════════════════════════════════════════════ */
function setSplitMode(active) {
  isSplitMode = active;
  const wrapper    = document.querySelector('.editor-preview-wrapper');
  const editorEl   = document.getElementById('note-editor');
  const previewEl  = document.getElementById('preview-panel');
  const btn        = document.getElementById('btn-split');
  const viewToggle = document.getElementById('view-toggle-toolbar');

  if (active) {
    wrapper.classList.add('split');
    editorEl.style.display  = '';
    previewEl.style.display = 'block';
    btn.classList.add('split-active');
    viewToggle.style.display = 'none';
    renderPreviewPanel();
  } else {
    wrapper.classList.remove('split');
    btn.classList.remove('split-active');
    viewToggle.style.display = 'flex';
    setPreviewMode(isPreviewMode);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   Mode aperçu
   ═══════════════════════════════════════════════════════════════════ */
function setPreviewMode(preview) {
  isPreviewMode = preview;
  const editorEl     = document.getElementById('note-editor');
  const wrapperEl    = document.querySelector('.editor-wrapper');
  const previewEl    = document.getElementById('preview-panel');
  const btnEdit      = document.getElementById('btn-edit-mode');
  const btnPreview   = document.getElementById('btn-preview-mode');

  if (preview) {
    renderPreviewPanel();
    if (wrapperEl) wrapperEl.style.display = 'none';
    previewEl.style.display = 'block';
    btnEdit.classList.remove('active');
    btnPreview.classList.add('active');
  } else {
    if (wrapperEl) wrapperEl.style.display = '';
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

function formatDate(ts, now = Date.now()) {
  const d = new Date(ts);
  const diff = now - ts;
  if (diff < 60_000)     return 'À l\'instant';
  if (diff < 3_600_000)  return `${Math.floor(diff / 60_000)} min`;
  if (diff < 86_400_000) return d.toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' });
  if (diff < 604_800_000)return d.toLocaleDateString('fr-FR', { weekday:'short' });
  return d.toLocaleDateString('fr-FR', { day:'numeric', month:'short' });
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

/* Mise à jour partielle d'un seul item (évite de reconstruire toute la liste) */
function updateNoteItemDisplay(note) {
  const el = document.querySelector(`.note-item[data-id="${note.id}"]`);
  if (!el) return;
  const titleEl   = el.querySelector('.note-title');
  const previewEl = el.querySelector('.note-preview');
  const dateEl    = el.querySelector('.note-date');
  if (titleEl)   titleEl.textContent  = getNoteTitle(note);
  if (previewEl) {
    const p = getNotePreview(note);
    previewEl.innerHTML = p ? escHtml(p) : '<em style="opacity:.5">Vide</em>';
  }
  if (dateEl)    dateEl.textContent   = formatDate(note.updatedAt);
}

function renderNoteList(filter = '') {
  const list = document.getElementById('notes-list');
  const q = filter.toLowerCase();
  const now = Date.now();

  // Respecte l'ordre du tableau ; le tri ne s'applique que lors du filtre de recherche
  const filtered = notes.filter(n =>
    !q ||
    (n.title || '').toLowerCase().includes(q) ||
    n.content.toLowerCase().includes(q)
  );

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
    item.draggable = true;
    item.innerHTML = `
      <div class="note-item-header">
        <div class="note-title">${escHtml(title)}</div>
        <div class="note-date">${formatDate(note.updatedAt, now)}</div>
      </div>
      <div class="note-preview">${preview ? escHtml(preview) : '<em style="opacity:.5">Vide</em>'}</div>
    `;

    item.addEventListener('click', () => selectNote(note.id));
    item.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      watchForDrag(note.id, item, e);
    });

    list.appendChild(item);
  });
}

/* ═══════════════════════════════════════════════════════════════════
   Drag & drop (pointer events — fluide, avec seuil de déclenchement)
   ═══════════════════════════════════════════════════════════════════ */
const DRAG_THRESHOLD = 6; // px avant de déclencher le drag
let pendingDrag = null;   // en attente du seuil
let pointerDrag = null;   // drag actif

/* Étape 1 : surveiller si c'est un vrai drag ou un simple clic */
function watchForDrag(noteId, item, e) {
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

  const siblings = [...listEl.querySelectorAll('.note-item:not(.drag-placeholder)')];
  let placed = false;
  for (const sib of siblings) {
    const r = sib.getBoundingClientRect();
    if (e.clientY < r.top + r.height / 2) {
      listEl.insertBefore(item, sib);
      placed = true;
      break;
    }
  }
  if (!placed) listEl.appendChild(item);
}

async function onDragEnd(e) {
  if (!pointerDrag) return;
  e.preventDefault(); // empêche le click event après un drag
  document.removeEventListener('pointermove',   onDragMove);
  document.removeEventListener('pointerup',     onDragEnd);
  document.removeEventListener('pointercancel', onDragEnd);

  const { ghost, item, listEl } = pointerDrag;
  pointerDrag = null;

  ghost.remove();
  item.classList.remove('drag-placeholder');

  const newOrder = [...listEl.querySelectorAll('.note-item')].map(el => el.dataset.id);
  notes.sort((a, b) => {
    const ai = newOrder.indexOf(a.id);
    const bi = newOrder.indexOf(b.id);
    return (ai < 0 ? 9999 : ai) - (bi < 0 ? 9999 : bi);
  });

  await persistNotes();
  renderNoteList(document.getElementById('search-input').value);
}

/* ═══════════════════════════════════════════════════════════════════
   CRUD notes
   ═══════════════════════════════════════════════════════════════════ */
function selectNote(id) {
  const note = notes.find(n => n.id === id);
  if (!note) return;

  currentNoteId = id;
  closeEditorSearch();
  document.getElementById('note-editor').value      = note.content;
  document.getElementById('note-title-input').value = note.title || '';
  document.getElementById('main-content').style.display        = 'flex';
  document.getElementById('empty-state').style.display         = 'none';
  document.getElementById('view-toggle-toolbar').style.display = 'flex';

  renderNoteList(document.getElementById('search-input').value);
  if (isSplitMode) { renderPreviewPanel(); } else { setPreviewMode(true); }
  closeInfoPanel();

  /* Restaurer la largeur de la TOC pour cette note */
  if (isTocOpen) {
    const tocPanel = document.getElementById('toc-panel');
    tocPanel.style.width = (note.tocWidth || 280) + 'px';
    renderTocPanel();
    setupTocScrollSpy();
  }

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

  const dying = notes.find(n => n.id === currentNoteId);
  if (dying) await deleteImages(extractImageIds(dying.content));

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
  updateNoteItemDisplay(note);

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

  updateNoteItemDisplay(note);
  if (editorSearchQuery) updateEditorSearch();

  /* Rendus coûteux debounced : preview + TOC */
  clearTimeout(renderTimer);
  renderTimer = setTimeout(() => {
    if (isSplitMode) renderPreviewPanel();
    if (isTocOpen)   renderTocPanel();
  }, 150);

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
   Listes à puces / numérotées
   ═══════════════════════════════════════════════════════════════════ */
function insertList(ordered) {
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
   Raccourcis clavier
   ═══════════════════════════════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  const ctrl = e.ctrlKey || e.metaKey;
  const editor = document.getElementById('note-editor');

  if (ctrl && e.key === 'n')           { e.preventDefault(); createNote(); return; }
  if (ctrl && e.key === 'f') {
    e.preventDefault();
    if (currentNoteId) {
      openEditorSearch();
    } else {
      document.getElementById('search-input').focus();
    }
    return;
  }
  if (ctrl && e.shiftKey && e.key==='K') { e.preventDefault(); toggleLangPicker(); return; }
  if (ctrl && e.shiftKey && e.key==='U') { e.preventDefault(); insertList(false); return; }
  if (ctrl && e.shiftKey && e.key==='O') { e.preventDefault(); insertList(true);  return; }
  if (ctrl && e.key === 'e')           { e.preventDefault(); wrapSelection(editor, '`', '`'); return; }
  if (ctrl && e.key === 'b' && !isPreviewMode) { e.preventDefault(); wrapSelection(editor, '**', '**'); return; }
  if (ctrl && e.key === 'i' && !isPreviewMode) { e.preventDefault(); wrapSelection(editor, '*', '*'); return; }
  if (ctrl && e.key === 'p')           { e.preventDefault(); setPreviewMode(!isPreviewMode); return; }
  if (ctrl && e.key === '\\')          { e.preventDefault(); setSplitMode(!isSplitMode); return; }
  if (ctrl && e.key === 't')           { e.preventDefault(); toggleToc(); return; }
  if (e.key === 'Escape') {
    const searchBar = document.getElementById('editor-search-bar');
    if (searchBar && searchBar.style.display !== 'none') {
      closeEditorSearch();
      document.getElementById('note-editor').focus();
      return;
    }
    closeLangPicker();
    closeInfoPanel();
    return;
  }

  /* Tab dans l'éditeur → insérer des espaces */
  if (e.key === 'Tab' && document.activeElement === editor) {
    e.preventDefault();
    const start = editor.selectionStart;
    editor.setRangeText('  ', start, editor.selectionEnd, 'end');
    onEditorInput();
  }
});


/* ═══════════════════════════════════════════════════════════════════
   Table des matières
   ═══════════════════════════════════════════════════════════════════ */
let isTocOpen = true;

function parseToc(content) {
  const headings = [];
  let hIdx = 0;
  content.split('\n').forEach((line, lineIdx) => {
    const m = line.match(/^(#{1,6})\s+(.+)/);
    if (m) headings.push({ level: m[1].length, text: m[2].trim(), lineIdx, id: `h-${hIdx++}` });
  });
  return headings;
}

function setActiveTocItem(idx) {
  document.querySelectorAll('.toc-item').forEach(el =>
    el.classList.toggle('active', parseInt(el.dataset.idx) === idx)
  );
}

function renderTocPanel() {
  const tocEl = document.getElementById('toc-items');
  if (!tocEl || !isTocOpen) return;

  const note = notes.find(n => n.id === currentNoteId);
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

function scrollToHeading(idx, item) {
  if (isPreviewMode || isSplitMode) {
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

function setupTocScrollSpy() {
  const previewEl = document.getElementById('preview-panel');
  previewEl.removeEventListener('scroll', onTocScroll);
  if (isTocOpen && (isPreviewMode || isSplitMode)) {
    previewEl.addEventListener('scroll', onTocScroll);
  }
}

function onTocScroll() {
  if (tocScrollPending) return;
  tocScrollPending = true;
  requestAnimationFrame(() => {
    tocScrollPending = false;
    const previewEl = document.getElementById('preview-panel');
    const headings = [...previewEl.querySelectorAll('[id^="h-"]')];
    if (!headings.length) return;
    const scrollTop = previewEl.scrollTop + 24;
    let activeIdx = 0;
    headings.forEach((h, i) => { if (h.offsetTop <= scrollTop) activeIdx = i; });
    setActiveTocItem(activeIdx);
  });
}

function toggleToc() {
  isTocOpen = !isTocOpen;
  const panel = document.getElementById('toc-panel');
  const btn   = document.getElementById('btn-toc');
  panel.style.display = isTocOpen ? 'flex' : 'none';
  btn.classList.toggle('split-active', isTocOpen);
  if (isTocOpen) { renderTocPanel(); setupTocScrollSpy(); }
}

/* ═══════════════════════════════════════════════════════════════════
   Gestion des thèmes
   ═══════════════════════════════════════════════════════════════════ */
function applyTheme(id) {
  const theme = THEMES[id];
  if (!theme) return;
  currentTheme = id;
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  document.body.classList.toggle('dark-theme', theme.dark);
  chrome.storage.local.set({ quicknotes_theme: id });
  document.querySelectorAll('.theme-card').forEach(c =>
    c.classList.toggle('selected', c.dataset.themeId === id)
  );
}

function renderThemeGrid() {
  const grid = document.getElementById('theme-grid');
  grid.innerHTML = '';
  Object.entries(THEMES).forEach(([id, theme]) => {
    const v = theme.vars;
    const card = document.createElement('div');
    card.className = 'theme-card' + (id === currentTheme ? ' selected' : '');
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

function applyFont(id) {
  const font = FONTS[id];
  if (!font) return;
  currentFont = id;
  document.documentElement.style.setProperty('--editor-font', font.family);
  chrome.storage.local.set({ quicknotes_font: id });
  const label = document.getElementById('font-family-label');
  if (label) label.textContent = font.name;
  document.querySelectorAll('.font-family-item').forEach(c =>
    c.classList.toggle('selected', c.dataset.fontId === id)
  );
}

function renderFontFamilyPicker() {
  const picker = document.getElementById('font-family-picker');
  if (!picker) return;
  picker.innerHTML = '';
  Object.entries(FONTS).forEach(([id, font]) => {
    const item = document.createElement('div');
    item.className = 'font-family-item' + (id === currentFont ? ' selected' : '');
    item.dataset.fontId = id;
    item.innerHTML = `
      <span class="font-family-item-preview" style="font-family:${font.family}">${font.preview}</span>
      <span class="font-family-item-name">${font.name}</span>
    `;
    item.addEventListener('click', () => { applyFont(id); closeFontFamilyPicker(); });
    picker.appendChild(item);
  });
}

function closeFontFamilyPicker() {
  document.getElementById('font-family-picker').classList.remove('open');
}

function toggleFontFamilyPicker() {
  document.getElementById('font-family-picker').classList.toggle('open');
}

const FONT_WEIGHT_LABELS = {
  100: 'Fin',  200: 'Extra-fin', 300: 'Léger',
  400: 'Normal', 500: 'Moyen',
  600: 'Semi-gras', 700: 'Gras', 800: 'Extra-gras', 900: 'Noir',
};

function applyFontWeight(weight) {
  currentFontWeight = Math.min(900, Math.max(100, Math.round(weight / 100) * 100));
  document.documentElement.style.setProperty('--editor-font-weight', currentFontWeight);
  chrome.storage.local.set({ quicknotes_font_weight: currentFontWeight });
  const el = document.getElementById('fmt-weight-val');
  if (el) el.textContent = FONT_WEIGHT_LABELS[currentFontWeight];
}

function applyFontSize(size) {
  currentFontSize = Math.min(24, Math.max(10, size));
  document.documentElement.style.setProperty('--editor-font-size', currentFontSize + 'px');
  chrome.storage.local.set({ quicknotes_font_size: currentFontSize });
  const el = document.getElementById('fmt-size-val');
  if (el) el.textContent = currentFontSize + 'px';
}

function toggleSettingsPanel() {
  const panel = document.getElementById('settings-panel');
  if (panel.style.display === 'none') {
    renderThemeGrid();
    panel.style.display = 'block';
  } else {
    panel.style.display = 'none';
  }
}

/* ═══════════════════════════════════════════════════════════════════
   Export / Import
   ═══════════════════════════════════════════════════════════════════ */
function triggerDownload(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportAllNotes() {
  const data = {
    version:    2,
    exportedAt: new Date().toISOString(),
    notes:      notes,
    images:     images,
    settings: {
      theme:      currentTheme,
      font:       currentFont,
      fontSize:   currentFontSize,
      fontWeight: currentFontWeight,
    },
  };
  const date = new Date().toISOString().slice(0, 10);
  triggerDownload(JSON.stringify(data, null, 2), `quicknotes-${date}.json`, 'application/json');
}

function exportCurrentNote() {
  const note = notes.find(n => n.id === currentNoteId);
  if (!note) return;
  const title   = getNoteTitle(note);
  const content = (note.title ? `# ${note.title}\n\n` : '') + note.content;
  const slug    = title.replace(/[^a-z0-9]/gi, '_').replace(/_+/g, '_').toLowerCase().slice(0, 60);
  triggerDownload(content, `${slug}.md`, 'text/markdown');
}

async function importFromFile(file) {
  const ext = file.name.split('.').pop().toLowerCase();

  if (ext === 'json') {
    const text = await file.text();
    let data;
    try { data = JSON.parse(text); } catch { alert('Fichier JSON invalide.'); return; }
    if (!Array.isArray(data.notes)) { alert('Format de sauvegarde non reconnu.'); return; }

    const replace = confirm(
      `Importer ${data.notes.length} note(s) depuis "${file.name}".\n\n` +
      `OK → Remplacer toutes vos notes existantes\n` +
      `Annuler → Fusionner (ajouter uniquement les nouvelles notes)`
    );

    if (replace) {
      notes  = data.notes;
      images = data.images || {};
      if (data.settings) {
        applyTheme(data.settings.theme      || 'brun');
        applyFont(data.settings.font        || 'default');
        applyFontSize(data.settings.fontSize   ?? 13);
        applyFontWeight(data.settings.fontWeight ?? 400);
      }
    } else {
      const existingIds = new Set(notes.map(n => n.id));
      notes = [...notes, ...data.notes.filter(n => !existingIds.has(n.id))];
      if (data.images) Object.assign(images, data.images);
    }

    await persistNotes();
    await new Promise(r => chrome.storage.local.set({ quicknotes_images: images }, r));

    renderNoteList();
    if (notes.length > 0) {
      const sorted = [...notes].sort((a, b) => b.updatedAt - a.updatedAt);
      selectNote(sorted[0].id);
    }
    const settingsRestored = replace && data.settings ? ' + paramètres' : '';
    showImportToast(`${data.notes.length} note(s) importée(s)${settingsRestored}`);

  } else if (ext === 'md') {
    const text = await file.text();
    const lines = text.split('\n');
    let title = '', content = text;
    if (lines[0].startsWith('# ')) {
      title   = lines[0].slice(2).trim();
      content = lines.slice(lines[1] === '' ? 2 : 1).join('\n');
    }
    const note = { id: generateId(), title, content, createdAt: Date.now(), updatedAt: Date.now() };
    notes.unshift(note);
    await persistNotes();
    renderNoteList();
    selectNote(note.id);
    showImportToast('Note importée');

  } else {
    alert('Format non supporté. Utilisez un fichier .json ou .md');
  }
}

function showImportToast(msg) {
  const toast = document.getElementById('save-toast');
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
    toast.textContent = 'Note sauvegardée';
  }, 2500);
}

/* ═══════════════════════════════════════════════════════════════════
   Initialisation
   ═══════════════════════════════════════════════════════════════════ */
async function init() {
  const [loadedNotes, , savedTheme, savedFont, savedFontSize, savedFontWeight] = await Promise.all([
    loadNotes(),
    loadImages(),
    new Promise(r => chrome.storage.local.get(['quicknotes_theme'], d => r(d.quicknotes_theme || 'brun'))),
    new Promise(r => chrome.storage.local.get(['quicknotes_font'], d => r(d.quicknotes_font || 'default'))),
    new Promise(r => chrome.storage.local.get(['quicknotes_font_size'], d => r(d.quicknotes_font_size || 13))),
    new Promise(r => chrome.storage.local.get(['quicknotes_font_weight'], d => r(d.quicknotes_font_weight || 400))),
  ]);
  notes = loadedNotes;
  applyTheme(savedTheme);
  applyFont(savedFont);
  applyFontSize(savedFontSize);
  applyFontWeight(savedFontWeight);
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
  /* ── Redimensionnement de la TOC ── */
  const tocHandle = document.getElementById('toc-resize-handle');
  const tocPanel  = document.getElementById('toc-panel');
  let tocResizing = false;

  tocHandle.addEventListener('pointerdown', e => {
    e.preventDefault();
    tocResizing = true;
    tocHandle.classList.add('resizing');
    document.addEventListener('pointermove', onTocResize, { passive: false });
    document.addEventListener('pointerup', onTocResizeEnd);
  });

  function onTocResize(e) {
    if (!tocResizing) return;
    const rect = tocPanel.getBoundingClientRect();
    const newWidth = rect.right - e.clientX;
    const clamped = Math.min(520, Math.max(140, newWidth));
    tocPanel.style.width = clamped + 'px';
  }

  function onTocResizeEnd() {
    tocResizing = false;
    tocHandle.classList.remove('resizing');
    document.removeEventListener('pointermove', onTocResize);
    document.removeEventListener('pointerup', onTocResizeEnd);
    /* Sauvegarder la largeur dans la note courante */
    if (currentNoteId) {
      const note = notes.find(n => n.id === currentNoteId);
      if (note) {
        note.tocWidth = parseInt(tocPanel.style.width);
        persistNotes();
      }
    }
  }

  document.getElementById('btn-toc').classList.add('split-active');
  document.getElementById('btn-toc').addEventListener('click', toggleToc);
  document.getElementById('btn-split').addEventListener('click', () => setSplitMode(!isSplitMode));
  document.getElementById('settings-btn').addEventListener('click', toggleSettingsPanel);
  document.getElementById('close-settings-btn').addEventListener('click', () => {
    document.getElementById('settings-panel').style.display = 'none';
  });

  renderFontFamilyPicker();
  document.getElementById('btn-font-family').addEventListener('click', toggleFontFamilyPicker);
  document.getElementById('fmt-size-dec').addEventListener('click', () => applyFontSize(currentFontSize - 1));
  document.getElementById('fmt-size-inc').addEventListener('click', () => applyFontSize(currentFontSize + 1));
  document.getElementById('fmt-weight-dec').addEventListener('click', () => applyFontWeight(currentFontWeight - 100));
  document.getElementById('fmt-weight-inc').addEventListener('click', () => applyFontWeight(currentFontWeight + 100));

  document.getElementById('export-json-btn').addEventListener('click', exportAllNotes);
  document.getElementById('export-md-btn').addEventListener('click', exportCurrentNote);

  const importFileInput = document.getElementById('import-file-input');
  document.getElementById('import-btn').addEventListener('click', () => importFileInput.click());
  importFileInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) { importFromFile(file); importFileInput.value = ''; }
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
    document.getElementById('heading-picker').classList.toggle('open');
  });

  document.getElementById('heading-picker').addEventListener('click', e => {
    const item = e.target.closest('.heading-picker-item');
    if (!item) return;
    const level = parseInt(item.dataset.level);
    const editor = document.getElementById('note-editor');
    const start = editor.selectionStart;
    const lineStart = editor.value.lastIndexOf('\n', start - 1) + 1;
    const lineEnd = editor.value.indexOf('\n', start);
    const lineEndPos = lineEnd === -1 ? editor.value.length : lineEnd;
    const line = editor.value.slice(lineStart, lineEndPos);
    const cleanLine = line.replace(/^#{1,6}\s*/, '');
    const newLine = '#'.repeat(level) + ' ' + cleanLine;
    editor.setRangeText(newLine, lineStart, lineEndPos, 'end');
    editor.focus();
    onEditorInput();
    document.getElementById('heading-picker').classList.remove('open');
  });

  /* Fermer les dropdowns si clic ailleurs (listener unique) */
  document.addEventListener('click', e => {
    const langPicker = document.getElementById('lang-picker');
    const langBtn    = document.getElementById('btn-code-block');
    if (!langPicker.contains(e.target) && e.target !== langBtn && !langBtn.contains(e.target)) {
      closeLangPicker();
    }
    const hPicker = document.getElementById('heading-picker');
    const hBtn    = document.getElementById('btn-heading');
    if (!hPicker.contains(e.target) && !hBtn.contains(e.target)) {
      hPicker.classList.remove('open');
    }
    const fPicker = document.getElementById('font-family-picker');
    const fBtn    = document.getElementById('btn-font-family');
    if (!fPicker.contains(e.target) && !fBtn.contains(e.target)) {
      closeFontFamilyPicker();
    }
  });

  document.getElementById('btn-ul').addEventListener('click', () => insertList(false));
  document.getElementById('btn-ol').addEventListener('click', () => insertList(true));

  document.getElementById('btn-edit-mode').addEventListener('click', () => setPreviewMode(false));
  document.getElementById('btn-preview-mode').addEventListener('click', () => setPreviewMode(true));

  /* ── Emojis ── */
  document.getElementById('emoji-bar').addEventListener('click', e => {
    const btn = e.target.closest('.emoji-btn');
    if (!btn) return;
    if (isSplitMode || !isPreviewMode) {
      const editor = document.getElementById('note-editor');
      const pos = editor.selectionStart;
      editor.setRangeText(btn.dataset.emoji, pos, editor.selectionEnd, 'end');
      editor.focus();
      onEditorInput();
    } else {
      setPreviewMode(false);
      const editor = document.getElementById('note-editor');
      const pos = editor.value.length;
      editor.setRangeText(btn.dataset.emoji, pos, pos, 'end');
      editor.focus();
      onEditorInput();
    }
  });

  /* Sélection d'un langage dans le dropdown */
  document.getElementById('lang-picker').addEventListener('click', e => {
    const item = e.target.closest('.lang-picker-item');
    if (!item) return;
    insertCodeBlock(item.dataset.lang);
    closeLangPicker();
  });

  /* ── Collage d'image (Ctrl+V) ── */
  document.addEventListener('paste', e => {
    if (!currentNoteId) return;
    const items = Array.from(e.clipboardData?.items || []);
    const imageItem = items.find(it => it.type.startsWith('image/'));
    if (!imageItem) return;

    e.preventDefault();
    const blob = imageItem.getAsFile();
    const reader = new FileReader();
    reader.onload = async () => {
      const imgId = generateId();
      await saveImage(imgId, reader.result);

      if (isPreviewMode) setPreviewMode(false);
      const editor = document.getElementById('note-editor');
      const pos = editor.selectionStart;
      const needsNewline = pos > 0 && editor.value[pos - 1] !== '\n';
      const insertion = (needsNewline ? '\n' : '') + `![](img:${imgId})\n`;
      editor.setRangeText(insertion, pos, editor.selectionEnd, 'end');
      editor.focus();
      onEditorInput();
    };
    reader.readAsDataURL(blob);
  });

  /* ── Titre ── */
  document.getElementById('note-title-input').addEventListener('input', onTitleInput);
  document.getElementById('note-title-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); document.getElementById('note-editor').focus(); }
  });

  /* ── Recherche dans l'éditeur ── */
  document.getElementById('editor-search-input').addEventListener('input', updateEditorSearch);
  document.getElementById('editor-search-input').addEventListener('keydown', e => {
    if (e.key === 'Enter')  { e.preventDefault(); navigateEditorSearch(e.shiftKey ? -1 : 1); }
    if (e.key === 'Escape') { closeEditorSearch(); document.getElementById('note-editor').focus(); }
  });
  document.getElementById('editor-search-prev').addEventListener('click', () => navigateEditorSearch(-1));
  document.getElementById('editor-search-next').addEventListener('click', () => navigateEditorSearch(1));
  document.getElementById('editor-search-close').addEventListener('click', closeEditorSearch);

  /* ── Éditeur ── */
  document.getElementById('note-editor').addEventListener('input', onEditorInput);
  document.getElementById('note-editor').addEventListener('scroll', syncHighlightScroll);

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

/* ═══════════════════════════════════════════════════════════════════
   Coloration syntaxique
   ═══════════════════════════════════════════════════════════════════ */
import { state } from './state.js';
import { KEYWORDS, LANG_ALIAS } from './constants.js';

export function normalizeLang(lang) {
  if (!lang) return 'generic';
  const l = lang.toLowerCase().trim();
  return LANG_ALIAS[l] || l;
}

/* ── Helpers pour les tableaux Markdown ── */
export function parseTableRow(line) {
  return line.split('|')
    .map(c => c.trim())
    .filter((c, i, arr) => !(i === 0 && c === '') && !(i === arr.length - 1 && c === ''));
}

export function isSeparatorRow(line) {
  const cells = parseTableRow(line);
  return cells.length > 0 && cells.every(c => /^:?-+:?$/.test(c));
}

export function getColAlign(cell) {
  const c = cell.trim();
  if (c.startsWith(':') && c.endsWith(':')) return 'center';
  if (c.endsWith(':')) return 'right';
  return 'left';
}

/* Tokeniseur caractère par caractère */
export function tokenize(code, lang) {
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

export function esc(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

export function highlightCode(rawCode, lang) {
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

export function highlightHtml(rawCode) {
  return esc(rawCode)
    .replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="hl-tag">$2</span>')
    .replace(/\s([\w-:]+)=/g, ' <span class="hl-attr">$1</span>=')
    .replace(/=(&quot;[^&]*&quot;|'[^']*')/g, '=<span class="hl-value">$1</span>')
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="hl-comment">$1</span>');
}

/* ═══════════════════════════════════════════════════════════════════
   Rendu Markdown
   ═══════════════════════════════════════════════════════════════════ */
export function renderMarkdown(text) {
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

    /* Listes de tâches : - [ ] ou - [x] */
    if (/^[-*+]\s\[[ xX]\]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*+]\s\[[ xX]\]\s/.test(lines[i])) {
        const checked = /^[-*+]\s\[[xX]\]/.test(lines[i]);
        const text    = lines[i].replace(/^[-*+]\s\[[ xX]\]\s*/, '');
        items.push(
          `<li class="task-item" data-line="${i}">` +
          `<input type="checkbox" class="task-checkbox" data-line="${i}"${checked ? ' checked' : ''}>` +
          `<span class="task-label${checked ? ' task-done' : ''}">${inlineFormat(text)}</span>` +
          `</li>`
        );
        i++;
      }
      blocks.push(`<ul class="task-list">${items.join('')}</ul>`);
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

export function processInlineMarkdown(text) {
  return esc(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
      let resolved = '', imgRef = src, width = null;
      if (src.startsWith('img:')) {
        const eqIdx = src.indexOf(' =', 4);
        const imgId = eqIdx === -1 ? src.slice(4) : src.slice(4, eqIdx);
        imgRef = `img:${imgId}`;
        if (eqIdx !== -1) width = parseInt(src.slice(eqIdx + 2)) || null;
        resolved = state.images[imgId] || '';
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
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

export function inlineFormat(text) {
  const re = /<span style="color:(#[0-9a-fA-F]{3,8})">([\s\S]*?)<\/span>/g;
  const parts = [];
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ type: 'text',  value: text.slice(last, m.index) });
    parts.push({ type: 'color', color: m[1], value: m[2] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) });
  if (!parts.length) return processInlineMarkdown(text);
  return parts.map(p =>
    p.type === 'color'
      ? `<span style="color:${p.color}">${processInlineMarkdown(p.value)}</span>`
      : processInlineMarkdown(p.value)
  ).join('');
}

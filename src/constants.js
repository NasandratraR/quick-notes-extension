/* ═══════════════════════════════════════════════════════════════════
   Thèmes
   ═══════════════════════════════════════════════════════════════════ */
export const THEMES = {
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
export const FONTS = {
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

export const FONT_WEIGHT_LABELS = {
  100: 'Fin',  200: 'Extra-fin', 300: 'Léger',
  400: 'Normal', 500: 'Moyen',
  600: 'Semi-gras', 700: 'Gras', 800: 'Extra-gras', 900: 'Noir',
};

/* ═══════════════════════════════════════════════════════════════════
   Couleurs de texte
   ═══════════════════════════════════════════════════════════════════ */
export const TEXT_COLORS = [
  '#e74c3c','#e67e22','#f1c40f','#2ecc71',
  '#1abc9c','#3498db','#9b59b6','#e91e8c',
  '#c0392b','#d35400','#27ae60','#2980b9',
  '#795548','#607d8b','#2c3e50','#bdc3c7',
];

/* ═══════════════════════════════════════════════════════════════════
   Couleurs de groupes
   ═══════════════════════════════════════════════════════════════════ */
export const GROUP_COLORS = ['#e06c6c','#e09640','#c4aa30','#5aa85a','#4a8fc4','#8060b8','#b84080','#38a89a'];

/* ═══════════════════════════════════════════════════════════════════
   Coloration syntaxique — mots-clés par langage
   ═══════════════════════════════════════════════════════════════════ */
export const KEYWORDS = {
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

export const LANG_ALIAS = {
  js: 'javascript', ts: 'typescript', jsx: 'javascript', tsx: 'typescript',
  py: 'python', sh: 'bash', shell: 'bash', zsh: 'bash', fish: 'bash',
};

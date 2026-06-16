// ============================================================
// Isaac Arnold Portfolio — app.js
// Theme · Nav · Reveal on scroll · Project detail · Terminal mode
// ============================================================

// ---- Inline SVG strings ----
const SVG = {
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
  arrowUR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.23.72-.5v-1.76c-2.92.64-3.54-1.4-3.54-1.4-.48-1.22-1.17-1.54-1.17-1.54-.95-.65.07-.64.07-.64 1.06.07 1.61 1.09 1.61 1.09.94 1.6 2.46 1.14 3.06.87.1-.68.37-1.14.67-1.4-2.33-.27-4.78-1.17-4.78-5.2 0-1.15.41-2.09 1.09-2.83-.11-.27-.47-1.34.1-2.8 0 0 .89-.28 2.91 1.08a10.1 10.1 0 0 1 5.3 0c2.02-1.36 2.9-1.08 2.9-1.08.58 1.46.22 2.53.11 2.8.68.74 1.09 1.68 1.09 2.83 0 4.04-2.46 4.93-4.8 5.19.38.33.71.97.71 1.96v2.9c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5z"/></svg>',
};

// ---- Web3Forms access key ----
const WEB3FORMS_KEY = 'PASTE-YOUR-KEY-HERE'; // from web3forms.com dashboard

// ---- Utility ----
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---- Theme ----
function getTheme() {
  try { return JSON.parse(localStorage.getItem('ia_prefs') || '{}').theme || 'dark'; } catch (e) { return 'dark'; }
}

function saveTheme(t) {
  try { localStorage.setItem('ia_prefs', JSON.stringify({ theme: t })); } catch (e) {}
}

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  const btn = document.getElementById('theme-btn');
  if (btn) btn.innerHTML = t === 'dark' ? SVG.sun : SVG.moon;
  saveTheme(t);
}

function toggleTheme() {
  applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

// ---- Nav scroll ----
function initNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  update();
  window.addEventListener('scroll', update, { passive: true });
  document.getElementById('theme-btn').addEventListener('click', toggleTheme);
}

// ---- Reveal on scroll ----
function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(e => io.observe(e));
}

// ---- Project data ----
const PROJECTS = {
  moonlight: {
    kicker: 'Open Source · VS Code Theme',
    name: 'Electronic Moonlight',
    tag: 'A beautifully muted dark theme with subtle vibrance — built for VS Code and ported to iTerm, JetBrains and Xcode.',
    ph: 'Theme screenshot — editor with syntax highlighting',
    href: 'https://github.com/IsaacArnold/electronic-moonlight-theme',
    live: 'https://marketplace.visualstudio.com/items?itemName=IsaacArnold.electronic-moonlight-theme',
    liveLabel: 'VS Marketplace',
    overview: 'Electronic Moonlight is a dark editor theme that blends the calm, muted base of the Electron Color Theme with the soft vibrance of Moonlight II Italics. The goal: a palette that stays easy on the eyes through long sessions while keeping syntax legible and the accent colours genuinely pleasant.',
    role: 'Sole designer &amp; maintainer. Tuned the colour palette, authored the VS Code theme definition, wrote Python build scripts to generate the variants, and published &amp; maintain it on the marketplace (8★, with community forks).',
    meta: [
      { k: 'Type', v: 'Editor theme' },
      { k: 'Platforms', v: 'VS Code · iTerm · JetBrains · Xcode' },
      { k: 'Stars', v: '8 ★ · 2 forks' },
      { k: 'Status', v: 'Published &amp; maintained' },
    ],
    highlights: [
      'Muted base with carefully chosen vibrant accents for syntax tokens.',
      'One source palette ported to four developer environments.',
      'Python scripts generate platform variants from a shared definition.',
      'Live on the VS Code Marketplace with real-world users and forks.',
    ],
    stack: ['VS Code API', 'JSON', 'Python', 'iTerm', 'JetBrains'],
  },
  buyourstuff: {
    kicker: 'Full-Stack · Headless Commerce',
    name: 'Buy Our Stuff',
    tag: 'A storefront for displaying products for sale — a Gatsby frontend wired to Sanity as a headless CMS for product management.',
    ph: 'Storefront screenshot — product grid &amp; detail pages',
    href: 'https://github.com/IsaacArnold/buy-our-stuff',
    live: 'https://goodgoods.netlify.app/',
    liveLabel: 'Live demo',
    overview: 'Buy Our Stuff is an e-commerce build exploring the headless-CMS pattern: a fast, statically-generated Gatsby storefront that pulls product data from Sanity over GraphQL, so non-technical editors can manage the catalogue without touching code.',
    role: 'Built end-to-end — modelled the Sanity content schema, set up the Gatsby data layer and GraphQL queries, built the storefront UI and product pages, and deployed to Netlify.',
    meta: [
      { k: 'Type', v: 'Headless e-commerce' },
      { k: 'Frontend', v: 'Gatsby + React' },
      { k: 'CMS', v: 'Sanity (headless)' },
      { k: 'Hosting', v: 'Netlify' },
    ],
    highlights: [
      'Decoupled architecture — editors manage products in Sanity Studio.',
      'GraphQL data layer feeding statically-generated product pages.',
      'Fast, CDN-served storefront deployed continuously to Netlify.',
      'Demonstrates the modern Jamstack / headless content pattern.',
    ],
    stack: ['Gatsby', 'React', 'Sanity', 'GraphQL', 'Netlify'],
  },
};

// ---- Project detail panel ----
function openDetail(projectId) {
  const p = PROJECTS[projectId];
  if (!p) return;

  const metaHtml = p.meta.map(m =>
    `<div class="cell"><div class="k">${m.k}</div><div class="v">${m.v}</div></div>`
  ).join('');

  const highlightsHtml = p.highlights.map(h =>
    `<li>${SVG.check}<span>${esc(h)}</span></li>`
  ).join('');

  const stackHtml = p.stack.map(s => `<span>${esc(s)}</span>`).join('');

  const liveBtn = p.live
    ? `<a class="btn btn-ghost" href="${p.live}" target="_blank" rel="noreferrer">${SVG.arrowUR} ${esc(p.liveLabel)}</a>`
    : '';

  const root = document.getElementById('detail-root');
  root.innerHTML = `
    <div class="detail-scrim" id="detail-scrim">
      <div class="detail" role="dialog" aria-modal="true" aria-label="${esc(p.name)}">
        <div class="detail-hero">
          <button class="detail-close" id="detail-close" aria-label="Close">${SVG.close}</button>
          <div class="detail-kicker">${p.kicker}</div>
          <h2>${esc(p.name)}</h2>
          <p>${p.tag}</p>
        </div>
        <div class="detail-body">
          <div class="detail-shot">
            <span><b>${p.ph}</b>drop a screenshot here</span>
          </div>
          <div class="detail-meta">${metaHtml}</div>
          <div class="detail-section">
            <h3>Overview</h3>
            <p>${p.overview}</p>
          </div>
          <div class="detail-section">
            <h3>My role</h3>
            <p>${p.role}</p>
          </div>
          <div class="detail-section">
            <h3>Highlights</h3>
            <ul class="detail-list">${highlightsHtml}</ul>
          </div>
          <div class="detail-section">
            <h3>Stack</h3>
            <div class="proj-stack">${stackHtml}</div>
          </div>
          <div class="detail-cta">
            <a class="btn btn-primary" href="${p.href}" target="_blank" rel="noreferrer">${SVG.github} View code</a>
            ${liveBtn}
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    const scrim = document.getElementById('detail-scrim');
    if (scrim) scrim.classList.add('show');
  });

  function closeDetail() {
    const scrim = document.getElementById('detail-scrim');
    if (!scrim) return;
    scrim.classList.remove('show');
    setTimeout(() => { root.innerHTML = ''; document.body.style.overflow = ''; }, 360);
    window.removeEventListener('keydown', onKey);
  }

  function onKey(e) { if (e.key === 'Escape') closeDetail(); }

  document.getElementById('detail-close').addEventListener('click', closeDetail);
  document.getElementById('detail-scrim').addEventListener('mousedown', e => {
    if (e.target === e.currentTarget) closeDetail();
  });
  window.addEventListener('keydown', onKey);
}

function initProjects() {
  document.querySelectorAll('.proj[data-project]').forEach(card => {
    card.addEventListener('click', () => openDetail(card.dataset.project));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetail(card.dataset.project); }
    });
    card.querySelectorAll('.proj-ext').forEach(link => {
      link.addEventListener('click', e => e.stopPropagation());
    });
  });
}

// ---- Terminal mode data ----
const TM_DATA = {
  experience: [
    { role: 'Software Engineer', company: 'The Lottery Corporation', at: 'Brisbane', when: 'Mar 2023', end: 'Present', desc: 'Drive feature delivery, emerging API work, and AI-first engineering practices across customer-facing products and internal platform work — shaping how the team builds software.', tags: ['React', 'AureliaJS', 'AEM', 'Contentful', 'Claude Code', 'API'] },
    { role: 'Junior Developer', company: 'TalkVia', at: 'Brisbane · Remote', when: 'Feb 2022', end: 'Feb 2023', desc: 'Built voice and conversational-AI applications across Google Assistant, Alexa, iOS, Android and web for a range of clients.', tags: ['Flutter', 'Voice UI', 'Alexa', 'Google Assistant', 'QA'] },
    { role: 'Marketing → Engineering', company: 'Earlier career', at: 'New Zealand', when: '2018', end: '2021', desc: 'Digital marketing and paid-media roles at Link NZ and Dubzz Digital — managing web operations, SEO and campaigns — before retraining into software engineering via the Treehouse Front End Techdegree.', tags: ['SEO', 'Paid Media', 'Self-taught', 'Treehouse'] },
  ],
  projects: [
    { glyph: '◑', name: 'Electronic Moonlight', stars: '8', tag: 'A beautifully muted dark theme with subtle vibrance — built for VS Code and ported to iTerm, JetBrains and Xcode.', stack: ['VS Code API', 'JSON', 'Python', 'iTerm', 'JetBrains'], href: 'https://github.com/IsaacArnold/electronic-moonlight-theme', live: 'https://marketplace.visualstudio.com/items?itemName=IsaacArnold.electronic-moonlight-theme', liveLabel: 'VS Marketplace' },
    { glyph: '⌘', name: 'Buy Our Stuff', tag: 'A storefront for displaying products for sale — a Gatsby frontend wired to Sanity as a headless CMS for product management.', stack: ['Gatsby', 'React', 'Sanity', 'GraphQL', 'Netlify'], href: 'https://github.com/IsaacArnold/buy-our-stuff', live: 'https://goodgoods.netlify.app/', liveLabel: 'Live demo' },
  ],
  skills: [
    { title: 'Languages & Frameworks', tags: ['JavaScript', 'TypeScript', 'React', 'AureliaJS', 'GatsbyJS', 'HTML & CSS'] },
    { title: 'AI & Tooling', tags: ['Claude Code (daily)', 'Prompt Engineering', 'AI Workflow Design', 'CLAUDE.md guardrails', 'Reusable Skills', 'BMAD Methodology', 'AI-first Design Systems'] },
    { title: 'Testing & QA', tags: ['WDIO', 'Component Testing', 'Integration Testing'] },
    { title: 'Platforms & CMS', tags: ['Adobe AEM', 'Contentful (headless)', 'Sanity', 'Jira · Agile / Scrum'] },
  ],
};

// ---- Terminal mode ----
function initTerminal() {
  const btn = document.getElementById('terminal-btn');
  if (btn) btn.addEventListener('click', openTerminal);
}

function openTerminal() {
  const root = document.getElementById('terminal-root');
  let history = [];

  function tool(name, arg) {
    return `<div class="tool"><span class="pill">⏺ ${esc(name)}</span><span class="dimarrow"> → </span>${esc(arg)}</div>`;
  }

  const CMDS = {
    welcome: () => `
      <div class="tm-banner">
        <div class="logo-row">
          <span class="spark">ia</span>
          <b>isaac.dev</b><span class="v">v2026.6 · interactive shell</span>
        </div>
        <p>Welcome — you're talking to Isaac's portfolio in terminal mode. Ask away, or run a command.</p>
        <p class="hint">Try <code>about</code>, <code>projects</code>, <code>skills</code>, <code>experience</code>, <code>contact</code> · <code>help</code> for everything · <code>gui</code> to switch to the visual site.</p>
      </div>`,

    help: () => `
      <div class="tm-resp">
        ${tool('man', 'commands')}
        <span class="tm-h">Available commands</span>
        ${[['about','who I am & what I do'],['experience',"where I've worked"],['projects',"things I've built"],['skills','languages, AI tooling, QA, platforms'],['contact','how to reach me'],['resume','download my résumé'],['socials','github · linkedin · instagram'],['theme','toggle dark / light'],['clear','clear the screen'],['gui','exit to the visual website']]
          .map(([c, d]) => `<span class="tm-line"><span class="tm-violet" style="display:inline-block;min-width:130px">${c}</span><span class="tm-dim">${d}</span></span>`).join('')}
      </div>`,

    about: () => `
      <div class="tm-resp">
        ${tool('cat', 'about.md')}
        <span class="tm-h">Isaac Arnold</span>
        <p><span class="tm-key">role</span> = <span class="tm-str">"Software Engineer · AI-Assisted Development"</span></p>
        <p><span class="tm-key">location</span> = <span class="tm-str">"Brisbane, Australia"</span> <span class="tm-faint">🤚 left-handed</span></p>
        <p>Software engineer working across frontend, an emerging API layer and a frontend design system at <span class="tm-cyan">The Lottery Corporation</span> — while driving the AI-first engineering practices the team builds with.</p>
        <p>Pivoted into tech from digital marketing, retrained via the Treehouse Front End Techdegree, and now obsess over making speed and code quality coexist.</p>
        <p class="tm-dim">off-clock: <span class="tm-yellow">⛳ golf</span> · <span class="tm-yellow">☕ coffee</span> · <span class="tm-yellow">🎵 vinyl</span> · <span class="tm-yellow">🎮 games</span></p>
      </div>`,

    experience: () => `
      <div class="tm-resp">
        ${tool('cat', 'experience.log')}
        ${TM_DATA.experience.map(e => `
          <div class="tm-card">
            <div class="ct">${esc(e.role)} <span class="star">${esc(e.when)} — ${esc(e.end)}</span></div>
            <p class="tm-cyan">@ ${esc(e.company)} · ${esc(e.at)}</p>
            <p>${esc(e.desc)}</p>
            <p class="tm-faint">${e.tags.map(esc).join(' · ')}</p>
          </div>`).join('')}
      </div>`,

    projects: () => `
      <div class="tm-resp">
        ${tool('ls', '~/projects')}
        ${TM_DATA.projects.map(p => `
          <div class="tm-card">
            <div class="ct">${p.glyph} ${esc(p.name)} ${p.stars ? `<span class="star">★ ${p.stars}</span>` : ''}</div>
            <p>${esc(p.tag)}</p>
            <p class="tm-faint">${p.stack.map(esc).join(' · ')}</p>
            <p>
              <a href="${p.href}" target="_blank" rel="noreferrer">→ code</a>
              ${p.live ? `&nbsp;&nbsp;&nbsp;<a href="${p.live}" target="_blank" rel="noreferrer">→ ${esc(p.liveLabel.toLowerCase())}</a>` : ''}
            </p>
          </div>`).join('')}
      </div>`,

    skills: () => {
      const bars = [
        { name: 'Frontend', v: 95 }, { name: 'AI-assisted dev', v: 92 },
        { name: 'TypeScript', v: 85 }, { name: 'API / backend', v: 70 },
        { name: 'Testing / QA', v: 78 },
      ];
      return `
        <div class="tm-resp">
          ${tool('analyze', 'skills --stack')}
          <div class="tm-bars">
            ${bars.map(g => `<div class="tm-bar-row"><span class="lab">${g.name}</span><span class="tm-bar-track"><span class="tm-bar-fill" style="width:${g.v}%"></span></span></div>`).join('')}
          </div>
          ${TM_DATA.skills.map(s => `<p><span class="tm-violet">${esc(s.title)}:</span> <span class="tm-dim">${s.tags.map(esc).join(', ')}</span></p>`).join('')}
        </div>`;
    },

    contact: () => `
      <div class="tm-resp">
        ${tool('open', 'contact')}
        <p>Inbox is open — use the <b>contact form</b> on the site (run <span class="tm-violet">gui</span> to switch), or find me here:</p>
        <p><span class="tm-violet">github&nbsp;&nbsp;&nbsp;</span> <a href="https://github.com/IsaacArnold" target="_blank" rel="noreferrer">github.com/IsaacArnold</a></p>
        <p><span class="tm-violet">linkedin&nbsp;</span> <a href="https://www.linkedin.com/in/isaac-arnold-64b54279/" target="_blank" rel="noreferrer">in/isaac-arnold</a></p>
        <p><span class="tm-violet">instagram</span> <a href="https://www.instagram.com/isaac.codes/" target="_blank" rel="noreferrer">@isaac.codes</a></p>
      </div>`,

    resume: () => `
      <div class="tm-resp">
        ${tool('fetch', 'resume.pdf')}
        <p class="tm-ok">✓ Résumé ready.</p>
        <p><a href="/uploads/Isaac_Arnold_Resume_June2026.pdf" target="_blank" rel="noreferrer">→ open / download résumé (PDF)</a></p>
      </div>`,

    notfound: (cmd) => `
      <div class="tm-resp">
        <p class="tm-pink">command not found: ${esc(cmd)}</p>
        <p class="tm-faint">try <span class="tm-violet">help</span> to see what I can do.</p>
      </div>`,
  };

  CMDS.socials = CMDS.contact;

  const ALIASES = { whoami: 'about', work: 'experience', ls: 'projects', project: 'projects', cv: 'resume', '--help': 'help', '-h': 'help', contacts: 'contact' };

  function renderHistory() {
    const screen = document.getElementById('term-screen');
    if (!screen) return;
    screen.innerHTML = history.map(item =>
      item.type === 'user'
        ? `<div class="tm-user"><span class="caret">❯</span><span class="cmd">${esc(item.cmd)}</span></div>`
        : `<div class="tm-block">${item.html}</div>`
    ).join('');
    screen.scrollTop = screen.scrollHeight;
  }

  function run(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === 'clear' || cmd === 'cls') { history = []; renderHistory(); return; }
    if (cmd === 'gui' || cmd === 'exit' || cmd === 'quit') { closeTerminal(); return; }
    if (cmd === 'theme') {
      toggleTheme();
      history.push({ type: 'user', cmd: raw.trim() }, { type: 'resp', html: '<div class="tm-resp"><p class="tm-ok">✓ theme toggled.</p></div>' });
      renderHistory();
      return;
    }
    const key = ALIASES[cmd] || cmd;
    const html = CMDS[key] ? CMDS[key]() : CMDS.notfound(cmd);
    history.push({ type: 'user', cmd: raw.trim() }, { type: 'resp', html });
    renderHistory();
  }

  const chips = ['about', 'experience', 'projects', 'skills', 'contact', 'resume', 'gui'];

  root.innerHTML = `
    <div class="term-root" id="term-root-inner">
      <div class="term-win">
        <div class="term-bar">
          <span class="dots"><i></i><i></i><i></i></span>
          <span class="title"><b>isaac@brisbane</b>: ~/portfolio — zsh</span>
          <button class="term-exit" id="term-exit-btn">${SVG.close} exit to site</button>
        </div>
        <div class="term-screen" id="term-screen"></div>
        <div class="term-input-wrap">
          <div class="term-suggest">
            ${chips.map(c => `<button class="term-chip" data-cmd="${c}"><span class="k">❯</span> ${c}</button>`).join('')}
          </div>
          <div class="term-input">
            <span class="ps">❯</span>
            <input id="term-input" placeholder="type a command, or 'help'…" spellcheck="false" autocomplete="off" />
            <span class="send">↵ enter</span>
          </div>
        </div>
      </div>
    </div>`;

  document.body.style.overflow = 'hidden';
  history = [{ type: 'resp', html: CMDS.welcome() }];
  renderHistory();

  requestAnimationFrame(() => {
    const inner = document.getElementById('term-root-inner');
    if (inner) inner.classList.add('show');
  });

  const input = document.getElementById('term-input');
  setTimeout(() => input && input.focus(), 450);

  document.getElementById('term-exit-btn').addEventListener('click', closeTerminal);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') { run(input.value); input.value = ''; } });
  root.querySelectorAll('.term-chip').forEach(btn => {
    btn.addEventListener('click', () => { run(btn.dataset.cmd); input && input.focus(); });
  });
  document.getElementById('term-screen').addEventListener('click', () => input && input.focus());
}

function closeTerminal() {
  const inner = document.getElementById('term-root-inner');
  if (!inner) return;
  inner.classList.remove('show');
  setTimeout(() => {
    const root = document.getElementById('terminal-root');
    if (root) root.innerHTML = '';
    document.body.style.overflow = '';
  }, 400);
}

// ---- Contact form ----
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fields = {
    name: document.getElementById('cf-name'),
    email: document.getElementById('cf-email'),
    message: document.getElementById('cf-message'),
  };
  const errs = {
    name: document.getElementById('cf-name-err'),
    email: document.getElementById('cf-email-err'),
    message: document.getElementById('cf-message-err'),
  };
  const honeypot = form.querySelector('[name="company_website"]');
  const submitBtn = document.getElementById('cf-submit');
  const errLine = document.getElementById('cf-err-line');
  const successEl = document.getElementById('cf-success');
  const sendAnotherBtn = document.getElementById('cf-send-another');

  function setFieldError(key, msg) {
    const wrap = document.getElementById('cfield-' + key);
    const input = fields[key];
    const err = errs[key];
    if (msg) {
      wrap.classList.add('err');
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', 'cf-' + key + '-err');
      err.textContent = msg;
    } else {
      wrap.classList.remove('err');
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
      err.textContent = '';
    }
  }

  function clearAllErrors() {
    ['name', 'email', 'message'].forEach(k => setFieldError(k, ''));
  }

  function validate() {
    let valid = true;
    const name = fields.name.value.trim();
    const email = fields.email.value.trim();
    const message = fields.message.value.trim();

    if (!name) {
      setFieldError('name', 'Please add your name.');
      valid = false;
    }
    if (!email) {
      setFieldError('email', 'Please add your email.');
      valid = false;
    } else if (!EMAIL_RE.test(email)) {
      setFieldError('email', "That email doesn't look right.");
      valid = false;
    }
    if (message.length < 10) {
      setFieldError('message', 'A few more words? (10+ characters)');
      valid = false;
    }
    return valid;
  }

  // Clear a field's error the moment the user edits it
  Object.keys(fields).forEach(key => {
    fields[key].addEventListener('input', () => setFieldError(key, ''));
  });

  function setStatus(status) {
    if (status === 'sending') {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
      submitBtn.innerHTML = '<span class="cform-spin" aria-hidden="true"></span> Sending…';
      errLine.hidden = true;
    } else if (status === 'idle') {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      submitBtn.textContent = 'Send message →';
      errLine.hidden = true;
    } else if (status === 'success') {
      document.getElementById('cf-check-icon').innerHTML = SVG.check;
      form.hidden = true;
      successEl.hidden = false;
    } else if (status === 'error') {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      submitBtn.textContent = 'Send message →';
      errLine.hidden = false;
    }
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (honeypot.value) return; // bot — silently drop
    if (!validate()) return;

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Portfolio message from ' + fields.name.value.trim(),
          name: fields.name.value.trim(),
          email: fields.email.value.trim(),
          message: fields.message.value.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Send failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  });

  sendAnotherBtn.addEventListener('click', () => {
    form.reset();
    clearAllErrors();
    form.hidden = false;
    successEl.hidden = true;
    setStatus('idle');
  });
}

// ---- Boot ----
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(getTheme());
  initNav();
  initReveal();
  initProjects();
  initTerminal();
  initContactForm();
});

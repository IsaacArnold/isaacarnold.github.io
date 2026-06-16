# Contact Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Web3Forms contact form to the Contact section and remove every email address occurrence from the site source.

**Architecture:** Vanilla JS state machine in `app.js` posts to the Web3Forms API. Form styles live in a new `css/contact-form.css` (same pattern as `css/terminal.css`). All four email occurrences in `index.html` and `app.js` are removed.

**Tech Stack:** Vanilla JS, CSS custom properties (existing design tokens), Web3Forms API (`https://api.web3forms.com/submit`)

---

## File map

| File | Action | Purpose |
|---|---|---|
| `index.html` | Modify | Remove 3 email occurrences; add form HTML; hero scroll link |
| `css/contact-form.css` | Create | All form styles using existing design tokens |
| `js/app.js` | Modify | Add `WEB3FORMS_KEY` const; add `initContactForm()`; fix terminal contact command; call from `DOMContentLoaded` |

---

## Task 1: Get Web3Forms access key

**Files:** none (external setup)

- [ ] **Step 1: Sign up and get key**

  Go to [https://web3forms.com](https://web3forms.com). Enter the destination email address and click "Create Access Key". Copy the UUID that appears (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`). Keep it in your clipboard — you'll paste it in Task 4.

  > The key is public by design: it only routes mail to your inbox; it cannot read submissions. Embedding it in client-side JS is the intended pattern.

- [ ] **Step 2: Verify the key works (optional but recommended)**

  In your terminal:
  ```bash
  curl -X POST https://api.web3forms.com/submit \
    -H "Content-Type: application/json" \
    -d '{"access_key":"YOUR-KEY-HERE","subject":"Test","name":"Test","email":"test@example.com","message":"Hello"}'
  ```
  Expected response: `{"success":true,"message":"Email sent successfully!"}`
  Check your inbox for the test email, then delete it.

---

## Task 2: Remove all email occurrences from `index.html`

**Files:**
- Modify: `index.html`

There are three email occurrences to fix in `index.html`. Do all three in one edit session.

- [ ] **Step 1: Fix the hero meta row (around line 110)**

  Find this block inside `<div class="hero-meta reveal in">`:
  ```html
  <a href="mailto:isaacarnold@icloud.com">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 7 9 6 9-6"/></svg>
    isaacarnold@icloud.com
  </a>
  ```

  Replace it with:
  ```html
  <a href="#contact">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 7 9 6 9-6"/></svg>
    Say hello →
  </a>
  ```

- [ ] **Step 2: Replace the contact-actions div (around line 420)**

  Find and **delete** the entire `<div class="contact-actions">` block:
  ```html
  <div class="contact-actions">
    <a class="btn btn-primary" href="mailto:isaacarnold@icloud.com">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 7 9 6 9-6"/></svg>
      isaacarnold@icloud.com
    </a>
    <a class="btn btn-ghost" href="https://github.com/IsaacArnold" target="_blank" rel="noreferrer">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.23.72-.5v-1.76c-2.92.64-3.54-1.4-3.54-1.4-.48-1.22-1.17-1.54-1.17-1.54-.95-.65.07-.64.07-.64 1.06.07 1.61 1.09 1.61 1.09.94 1.6 2.46 1.14 3.06.87.1-.68.37-1.14.67-1.4-2.33-.27-4.78-1.17-4.78-5.2 0-1.15.41-2.09 1.09-2.83-.11-.27-.47-1.34.1-2.8 0 0 .89-.28 2.91 1.08a10.1 10.1 0 0 1 5.3 0c2.02-1.36 2.9-1.08 2.9-1.08.58 1.46.22 2.53.11 2.8.68.74 1.09 1.68 1.09 2.83 0 4.04-2.46 4.93-4.8 5.19.38.33.71.97.71 1.96v2.9c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5z"/></svg>
      GitHub
    </a>
  </div>
  ```
  This entire div is replaced by the form in Task 3. Delete it now so the insert point is clean.

- [ ] **Step 3: Remove the email icon from the socials row (around line 441)**

  Find and **delete** this anchor from the `<div class="socials">` block:
  ```html
  <a href="mailto:isaacarnold@icloud.com" aria-label="Email">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 7 9 6 9-6"/></svg>
  </a>
  ```
  Leave the GitHub, LinkedIn, and Instagram links intact.

- [ ] **Step 4: Update the contact card intro paragraph**

  Find:
  ```html
  <p>Whether it's a role, a collaboration, or you just want to talk shop about AI-assisted engineering — my inbox is open.</p>
  ```
  Replace with:
  ```html
  <p>Whether it's a role, a collaboration, or you just want to talk shop about AI-assisted engineering — drop me a line below.</p>
  ```

- [ ] **Step 5: Verify — grep for the email**

  ```bash
  grep -n "isaacarnold@icloud" index.html
  ```
  Expected: no output. If any lines appear, remove those occurrences before continuing.

---

## Task 3: Add form HTML to `index.html`

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert the form and success state**

  In the `<div class="contact-card reveal">`, after the closing `</p>` of the intro paragraph and before `<div class="socials">`, insert:

  ```html
      <form class="cform" id="contact-form" novalidate>
        <div class="cform-row">
          <div class="cfield" id="cfield-name">
            <label for="cf-name">Name</label>
            <input type="text" id="cf-name" name="name" autocomplete="name" placeholder="Jane Developer" />
            <span class="cmsg" id="cf-name-err"></span>
          </div>
          <div class="cfield" id="cfield-email">
            <label for="cf-email">Email</label>
            <input type="email" id="cf-email" name="email" autocomplete="email" placeholder="you@company.com" />
            <span class="cmsg" id="cf-email-err"></span>
          </div>
        </div>
        <div class="cfield" id="cfield-message">
          <label for="cf-message">Message</label>
          <textarea id="cf-message" name="message" rows="5" placeholder="Tell me about the role, project, or idea…"></textarea>
          <span class="cmsg" id="cf-message-err"></span>
        </div>
        <!-- honeypot: hidden from humans, traps bots -->
        <input type="text" name="company_website" tabindex="-1" autocomplete="off" class="cform-hp" aria-hidden="true" />
        <button class="cform-submit" type="submit" id="cf-submit">
          Send message →
        </button>
        <p class="cform-err-line" id="cf-err-line" role="alert" hidden>
          Something went wrong sending that. Mind trying again, or reach me on
          <a href="https://www.linkedin.com/in/isaac-arnold-64b54279/" target="_blank" rel="noreferrer">LinkedIn</a>?
        </p>
      </form>

      <div class="cform-success" id="cf-success" role="status" aria-live="polite" hidden>
        <span class="cform-check" id="cf-check-icon" aria-hidden="true"></span>
        <h3>Message sent — thank you!</h3>
        <p>I'll get back to you as soon as I can. Talk soon.</p>
        <button class="btn btn-ghost" id="cf-send-another">Send another</button>
      </div>
  ```

- [ ] **Step 2: Add the CSS link in `<head>`**

  After the existing `<link rel="stylesheet" href="css/terminal.css" />` line, add:
  ```html
  <link rel="stylesheet" href="css/contact-form.css" />
  ```

- [ ] **Step 3: Verify structure in browser**

  Open `index.html` in a browser. Scroll to the Contact section. You should see:
  - Two input fields (Name, Email) side by side
  - A textarea below (unstyled for now — CSS comes next)
  - A submit button
  - The GitHub, LinkedIn, Instagram social icons (no email icon)
  - No email address anywhere visible

---

## Task 4: Create `css/contact-form.css`

**Files:**
- Create: `css/contact-form.css`

- [ ] **Step 1: Create the file with all form styles**

  Create `css/contact-form.css` with this content:

  ```css
  /* ============================================================
     Contact Form — uses design tokens from css/styles.css
     ============================================================ */

  .cform {
    max-width: 540px;
    margin: 28px auto 0;
    text-align: left;
  }

  .cform-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .cfield {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }

  .cfield label {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: var(--text-faint);
  }

  .cfield input,
  .cfield textarea {
    width: 100%;
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: 11px;
    padding: 13px 15px;
    color: var(--text);
    font: inherit;
    font-size: 15px;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }

  .cfield textarea {
    min-height: 132px;
    resize: vertical;
    line-height: 1.55;
  }

  .cfield input::placeholder,
  .cfield textarea::placeholder {
    color: var(--text-faint);
  }

  .cfield input:focus,
  .cfield textarea:focus {
    border-color: var(--acc-1);
    box-shadow: 0 0 0 3px rgba(var(--acc-1-rgb), .18);
  }

  .cfield.err input,
  .cfield.err textarea {
    border-color: #fb7185;
  }

  .cmsg {
    font-family: var(--font-mono);
    font-size: 12px;
    color: #fb7185;
    min-height: 16px;
  }

  /* Honeypot — invisible to humans */
  .cform-hp {
    position: absolute !important;
    left: -9999px;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  .cform-submit {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    height: 50px;
    border: 0;
    border-radius: 12px;
    cursor: pointer;
    background: var(--grad);
    color: #fff;
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 600;
    transition: transform .2s, box-shadow .2s;
  }

  .cform-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 18px 40px -16px rgba(var(--acc-1-rgb), .45);
  }

  .cform-submit:disabled {
    opacity: .75;
    cursor: progress;
  }

  .cform-spin {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, .45);
    border-top-color: #fff;
    animation: cform-spin .7s linear infinite;
  }

  @keyframes cform-spin {
    to { transform: rotate(360deg); }
  }

  .cform-err-line {
    font-family: var(--font-mono);
    font-size: 13px;
    color: #fb7185;
    text-align: center;
    margin: 14px 0 0;
  }

  .cform-err-line a {
    color: inherit;
    text-decoration: underline;
  }

  /* Success state */
  .cform-success {
    max-width: 540px;
    margin: 28px auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    text-align: center;
  }

  .cform-check {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--grad);
    display: grid;
    place-items: center;
    color: #fff;
    animation: cform-pop .45s cubic-bezier(.22, 1, .36, 1) both;
  }

  .cform-check svg {
    width: 26px;
    height: 26px;
    stroke-width: 2.5;
  }

  @keyframes cform-pop {
    0%   { transform: scale(.4); opacity: 0; }
    100% { transform: scale(1);  opacity: 1; }
  }

  @media (max-width: 560px) {
    .cform-row { grid-template-columns: 1fr; gap: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .cform-spin,
    .cform-check { animation: none; }
  }
  ```

- [ ] **Step 2: Verify styles in browser**

  Reload `index.html`. Scroll to Contact. Check:
  - Inputs have dark background (`--bg-2`), subtle border, rounded corners
  - Labels are small monospace uppercase in faint purple
  - Name and Email are side by side on desktop
  - Submit button has the violet→fuchsia gradient
  - Toggle to light theme — form should adapt automatically
  - On a narrow viewport (< 560px), Name and Email stack vertically

---

## Task 5: Add form JS to `app.js`

**Files:**
- Modify: `js/app.js`

- [ ] **Step 1: Add the Web3Forms key constant**

  Near the top of `app.js`, after the `SVG` object (around line 14), add:

  ```js
  // ---- Web3Forms access key ----
  const WEB3FORMS_KEY = 'PASTE-YOUR-KEY-HERE'; // from web3forms.com dashboard
  ```

  Replace `'PASTE-YOUR-KEY-HERE'` with your actual UUID access key from Task 1.

- [ ] **Step 2: Add `initContactForm()` before the `// ---- Boot ----` comment**

  Find the `// ---- Boot ----` comment (around line 433). Immediately before it, insert:

  ```js
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
  ```

- [ ] **Step 3: Call `initContactForm()` from the boot handler**

  Find the `DOMContentLoaded` handler at the bottom of `app.js`:
  ```js
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getTheme());
    initNav();
    initReveal();
    initProjects();
    initTerminal();
  });
  ```

  Add `initContactForm()` as the last call:
  ```js
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getTheme());
    initNav();
    initReveal();
    initProjects();
    initTerminal();
    initContactForm();
  });
  ```

- [ ] **Step 4: Fix the email in the terminal `contact` command**

  Find the `contact` function inside `CMDS` (around line 322):
  ```js
  contact: () => `
    <div class="tm-resp">
      ${tool('open', 'contact')}
      <p>Inbox is open — let's talk.</p>
      <p><span class="tm-violet">email&nbsp;&nbsp;&nbsp;&nbsp;</span> <a href="mailto:isaacarnold@icloud.com">isaacarnold@icloud.com</a></p>
      <p><span class="tm-violet">github&nbsp;&nbsp;&nbsp;</span> <a href="https://github.com/IsaacArnold" target="_blank" rel="noreferrer">github.com/IsaacArnold</a></p>
      <p><span class="tm-violet">linkedin&nbsp;</span> <a href="https://www.linkedin.com/in/isaac-arnold-64b54279/" target="_blank" rel="noreferrer">in/isaac-arnold</a></p>
      <p><span class="tm-violet">instagram</span> <a href="https://www.instagram.com/isaac.codes/" target="_blank" rel="noreferrer">@isaac.codes</a></p>
    </div>`,
  ```

  Replace with:
  ```js
  contact: () => `
    <div class="tm-resp">
      ${tool('open', 'contact')}
      <p>Inbox is open — use the <b>contact form</b> on the site (run <span class="tm-violet">gui</span> to switch), or find me here:</p>
      <p><span class="tm-violet">github&nbsp;&nbsp;&nbsp;</span> <a href="https://github.com/IsaacArnold" target="_blank" rel="noreferrer">github.com/IsaacArnold</a></p>
      <p><span class="tm-violet">linkedin&nbsp;</span> <a href="https://www.linkedin.com/in/isaac-arnold-64b54279/" target="_blank" rel="noreferrer">in/isaac-arnold</a></p>
      <p><span class="tm-violet">instagram</span> <a href="https://www.instagram.com/isaac.codes/" target="_blank" rel="noreferrer">@isaac.codes</a></p>
    </div>`,
  ```

- [ ] **Step 5: Verify — grep for the email in app.js**

  ```bash
  grep -n "isaacarnold@icloud" js/app.js
  ```
  Expected: no output.

---

## Task 6: End-to-end verification

**Files:** none (browser testing)

- [ ] **Step 1: Final email grep across all files**

  ```bash
  grep -rn "isaacarnold@icloud" .
  ```
  Expected: no output. If anything appears, fix it before continuing.

- [ ] **Step 2: Test validation**

  Open `index.html` in a browser. Scroll to Contact. Click "Send message →" with all fields empty.
  - Expected: three error messages appear (name, email, message)
  - Type one character in the Name field — expected: name error clears immediately
  - Enter `notanemail` in Email — expected: "That email doesn't look right."
  - Enter fewer than 10 characters in Message — expected: "A few more words?" error

- [ ] **Step 3: Test sending state**

  Fill all fields with valid data. Click submit.
  - Expected: button becomes disabled, shows spinner + "Sending…"
  - If key is correctly configured: transitions to success state (gradient check badge, "Message sent — thank you!")
  - Check your inbox for the email

- [ ] **Step 4: Test "Send another"**

  After the success state appears, click "Send another".
  - Expected: form resets and returns to idle state, all fields empty, no errors

- [ ] **Step 5: Test error state**

  Temporarily set `WEB3FORMS_KEY = 'invalid-key'` in `app.js`, fill the form, and submit.
  - Expected: error line appears with LinkedIn fallback link
  - Restore the real key after testing

- [ ] **Step 6: Test honeypot**

  In browser DevTools console, run:
  ```js
  document.querySelector('[name="company_website"]').value = 'spam';
  document.getElementById('contact-form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  ```
  Expected: nothing happens (no network request, no error, no state change).

- [ ] **Step 7: Test hero "Say hello →" link**

  Click "Say hello →" in the hero meta row. Expected: page scrolls smoothly to the Contact section.

- [ ] **Step 8: Test terminal contact command**

  Open terminal mode (terminal button in nav). Type `contact` and press Enter.
  Expected: response shows GitHub, LinkedIn, Instagram links — no email address.

- [ ] **Step 9: Test responsive layout**

  Resize browser to below 560px wide. Expected: Name and Email fields stack vertically.

- [ ] **Step 10: Test light theme**

  Toggle to light theme. Expected: form inputs use light-mode tokens — lighter background, dark text.

- [ ] **Step 11: Test `prefers-reduced-motion`**

  In DevTools → Rendering → Emulate CSS media feature: `prefers-reduced-motion: reduce`. Submit a valid form. Expected: no spinner animation while sending; no pop-in animation on success badge.

---

## Task 7: Commit

**Files:** all modified files

- [ ] **Step 1: Stage and commit**

  ```bash
  git add index.html css/contact-form.css js/app.js
  git commit -m "feat: add Web3Forms contact form, remove email from source"
  ```

  Verify the commit includes all three files:
  ```bash
  git show --stat HEAD
  ```
  Expected output shows `index.html`, `css/contact-form.css`, and `js/app.js` modified/created.

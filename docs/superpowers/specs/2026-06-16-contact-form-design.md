# Contact Form — Design Spec

**Date:** 2026-06-16  
**Status:** Approved

---

## Goal

Add a contact form to the Contact section so visitors can send a message without the email address ever appearing in page source, HTML, or compiled output.

**Hard requirement:** zero `mailto:`, zero address strings anywhere in the built output.

---

## Delivery: Web3Forms

Submit via `fetch` to `https://api.web3forms.com/submit` with a free public access key. The key routes mail to the destination inbox (configured in the Web3Forms dashboard only) — it cannot read submissions, so embedding it client-side is the intended and safe pattern for a static site.

The access key lives as a `const` at the top of `js/app.js`. No env-var system exists on this GitHub Pages site, and none is needed.

**Setup (one-time, done before implementation):** sign up at web3forms.com, enter destination email, copy the UUID access key.

---

## Architecture

Three files change; no new dependencies.

| File | Change |
|---|---|
| `index.html` | Contact section: replace mailto buttons with form HTML. Hero meta row: replace email link with "Say hello →" scroll anchor. Remove all three `mailto:` occurrences. |
| `js/app.js` | Add `initContactForm()` — state machine, validation, honeypot check, Web3Forms fetch. Called from the existing `init()` entry point. |
| `scss/components/_contact-form.scss` | New partial with all form styles using existing design tokens. Compiled into `css/styles.css` via the existing SCSS build. |

---

## Email removal checklist

All three current occurrences in `index.html`:

1. **Hero meta row** (around line 110) — visible email text + mailto link → replace with `<a href="#contact">Say hello →</a>` scroll link
2. **Contact section primary button** (around line 422) — mailto email button → remove entirely (replaced by the form)
3. **Contact socials row** (around line 441) — email icon link → remove

---

## Functional spec

**Fields:** `name` (text), `email` (email), `message` (textarea). All required.

**Validation — on submit only** (not on blur, to avoid nagging):

| Field | Rule | Error message |
|---|---|---|
| name | non-empty (trimmed) | "Please add your name." |
| email | non-empty + `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | "Please add your email." / "That email doesn't look right." |
| message | ≥ 10 chars (trimmed) | "A few more words? (10+ characters)" |

Field errors appear below the offending input and clear as soon as the user edits that field.

**Spam protection — two layers:**
1. Honeypot: hidden `<input name="company_website" tabindex="-1" aria-hidden="true">`. If non-empty on submit, silently pretend success and send nothing.
2. Web3Forms server-side filtering (enabled by default on their API).

**State machine:**

| State | UI |
|---|---|
| `idle` | Form editable, button reads "Send message →" |
| `sending` | Button disabled + spinner + "Sending…"; prevents double-submit |
| `success` | Form replaced by: gradient check badge + "Message sent — thank you!" + "Send another" button (resets to `idle`) |
| `error` | Form stays; inline `role="alert"` reads "Something went wrong… or reach me on LinkedIn" |

**Web3Forms payload:**
```json
{
  "access_key": "<key>",
  "subject": "Portfolio message from <name>",
  "name": "<name>",
  "email": "<email>",
  "message": "<message>"
}
```

---

## Accessibility

- Real `<label for="...">` per input
- Invalid fields: `aria-invalid="true"` + `aria-describedby="<field>-err"` pointing at the error node
- Success node: `role="status"` (aria-live polite)
- Error line: `role="alert"`
- Submit button: `aria-busy="true"` while sending
- `prefers-reduced-motion`: spinner and success badge pop-in animations disabled

---

## Visual design

Form sits inside the existing `.contact-card`, centered, `max-width: 540px`, fields left-aligned. The card heading, intro paragraph, and social icons row (GitHub, LinkedIn, Instagram) are unchanged. The email social icon is removed.

**Layout:** Name + Email in a 2-column grid (16px gap), collapses to 1 column below 560px. Message full-width. Submit full-width.

**Token usage** (all already defined in `css/styles.css`):

| Token | Used for |
|---|---|
| `--bg-2` | Input/textarea background |
| `--border` | Input border (default state) |
| `--text` | Input text |
| `--text-faint` | Labels, placeholders |
| `--acc-1` / `--acc-1-rgb` | Focus border + focus ring |
| `--grad` | Submit button, success badge |
| `--font-mono` | Labels, error messages, button text |

**Input/textarea:** 1px `--border`, 11px radius, `13px 15px` padding, 15px font. Textarea `min-height: 132px`, vertical resize only.

**Focus:** `border-color: var(--acc-1)` + `box-shadow: 0 0 0 3px rgba(var(--acc-1-rgb), .18)`.

**Error:** border → `#fb7185`, error text monospace 12px `#fb7185`.

**Submit button:** `--grad` background, white monospace text, `translateY(-2px)` + box-shadow on hover, 0.75 opacity + `cursor: progress` when disabled.

**Success badge:** 60px `--grad` circle, white check icon (reuses `SVG.check` from `app.js`), pop-in via `cubic-bezier(.22,1,.36,1)`.

Works in both dark and light theme automatically — all tokens are already theme-aware.

---

## Acceptance checklist

- [ ] No email address in built output (`grep` for the address — zero hits)
- [ ] Access key is a JS `const`, not hard-coded inline in HTML
- [ ] Empty/invalid submit shows per-field errors; errors clear on edit
- [ ] Valid submit → real email arrives at destination inbox
- [ ] Sending state disables button; success swaps in confirmation; "Send another" resets
- [ ] Network failure shows error line with LinkedIn fallback
- [ ] Honeypot-filled submission sends nothing
- [ ] Keyboard + screen-reader: labels announced, errors associated, live regions fire
- [ ] Dark and light theme both look correct; responsive (fields stack on mobile)
- [ ] `prefers-reduced-motion` disables spinner and pop-in animations

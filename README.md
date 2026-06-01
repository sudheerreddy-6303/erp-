# ERP Portal — Security & Setup Notes

## Quick start
```bash
cp .env.example .env     # then fill in your module URLs
npm install
npm start                # dev
npm run build            # production
```

## What was added

### 1. `.gitignore`
Standard CRA ignore list. Importantly it ignores `node_modules/`, `build/`,
and all `.env*` files (except the committed `.env.example`).

### 2. `.env` + `.env.example`
All module URLs and the logo URL now live in `.env` instead of being
hard-coded. `projects.js` reads them via `process.env.REACT_APP_*`.

> ⚠️ **Important — this is NOT a secret store.**
> Create React App compiles every `REACT_APP_*` value straight into the
> public JavaScript bundle. Anyone can read them in the browser. Use `.env`
> here for *configuration*, never for API keys, passwords, or tokens. (These
> module links are public website addresses anyway, so there is nothing
> secret to hide.)

### 3. Link security — `src/utils/safeUrl.js`
Every outbound link is routed through `openSafely()`, which:
- allows **https:// only** — blocks `javascript:`, `data:`, `file:`, etc.
  (prevents script-injection through a malformed/poisoned URL),
- parses & normalises the URL before use (junk fails closed),
- opens new tabs with `noopener,noreferrer` **and** nulls `window.opener`
  (prevents reverse tab-nabbing).

A module is now only shown as **Live** when it has a valid https URL; a
missing or malformed URL safely degrades to **Coming Soon**.

### 4. Content-Security-Policy & headers
- `public/index.html` carries a CSP plus `X-Content-Type-Options`,
  `Referrer-Policy`, and `Permissions-Policy` meta tags.
- `public/_headers` provides the same set as real HTTP headers for hosts
  that read it (Netlify, Cloudflare Pages). It also adds
  `Strict-Transport-Security` and `X-Frame-Options`.

> **For production, set these as real HTTP response headers at your host.**
> Meta-tag CSP is a fallback and cannot express HSTS. On **Render** static
> sites, add the headers under *Settings → Headers* (or in `render.yaml`),
> since Render does not read `_headers` automatically.

## Honest scope
This hardens a *frontend link launcher*: safe link handling, URL validation,
CSP/click-jacking/MIME protections. Real authentication, authorization, and
data security must live in each linked module's own backend — a static
frontend cannot enforce those.

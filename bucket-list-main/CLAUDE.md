# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Single-page bucket-list web app written in vanilla HTML/CSS/JS. No build step, no package manager, no test framework, no backend — all state lives in `localStorage` under the key `bucketList`. Tailwind is loaded from a CDN; only `css/styles.css` contains hand-written styles.

## Running locally

There are no build/lint/test commands. To run, either:

- Open `index.html` directly in a browser, or
- Serve the directory: `python -m http.server 8000` and visit `http://localhost:8000`.

There is no automated test suite — verify changes manually in a browser.

## Architecture

Two-layer split between **data** (`js/storage.js`) and **UI** (`js/app.js`), wired together at runtime via globals. Script tags in `index.html` load `storage.js` before `app.js`.

### `js/storage.js` — `BucketStorage` (global object)

Pure data-access layer over `localStorage`. Every mutating method (`addItem`, `updateItem`, `deleteItem`, `toggleComplete`) follows the same pattern: `load()` → mutate in memory → `save()`. There is no in-memory cache — each call re-parses JSON from `localStorage`. `getStats()` and `getFilteredList(filter)` are read-only views.

Item shape:
```js
{ id, title, completed, createdAt, completedAt }
```
`id` is `Date.now().toString()` — collisions are possible if two items are added in the same millisecond.

### `js/app.js` — `BucketListApp` (class, instantiated as global `app`)

UI/event/render layer. Constructed on `DOMContentLoaded` and assigned to `window.app`. Three things to know:

1. **Full re-render on every change.** Every handler ends with `this.render()`, which calls `BucketStorage.getFilteredList()` and rewrites `bucketListContainer.innerHTML` from scratch. Don't try to do partial DOM updates — the whole pattern assumes a full rebuild.

2. **Inline `onclick` handlers depend on the global `app`.** `createBucketItemHTML()` emits strings like `onclick="app.handleToggle('${item.id}')"`. If you rename the class instance, refactor away from `innerHTML`, or move to modules/scoped scripts, these break. Prefer keeping the pattern or migrating everything to event delegation at once.

3. **XSS surface in `createBucketItemHTML()`.** User-entered `title` is rendered via `innerHTML`. `escapeHtml()` is used for the visible text, and titles passed to `onclick="..."` are additionally `.replace(/'/g, "\\'")`-escaped. When adding any new field that comes from user input, route it through `escapeHtml()` and apply the same quote-escaping if it ends up inside an `onclick` attribute.

### `index.html` and `css/styles.css`

Markup uses Tailwind utility classes inline; `styles.css` only adds what Tailwind can't easily express: `.filter-btn` active state, `@keyframes` animations (`slideIn`, `fadeIn`, `scaleIn`), the mobile breakpoint at `max-width: 640px` that re-stacks `.bucket-item`, and a `prefers-color-scheme: dark` block. The dark-mode block overrides specific Tailwind class selectors (`.bg-white`, `.text-gray-800`, etc.) — if you swap those utility classes in the markup, dark mode will silently stop applying to those elements.

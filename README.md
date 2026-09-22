# Attendance Assistant

A simple, offline-first class attendance web app. Mark students present, late,
or absent with a tap, or type plain-English commands to a built-in assistant
("Aisha late, Ben absent, everyone else present"). Includes a weekly history
grid and a local-storage-only data model — nothing is sent to a server.

## Files
- `index.html` — page structure
- `style.css` — all styling (light/dark aware)
- `script.js` — app logic (attendance parsing, roster, weekly history)

## Run locally
Just open `index.html` in a browser. No build step, no dependencies.

## Deploy on GitHub Pages
1. Create a new GitHub repository and add these three files to it.
2. Commit and push to the `main` branch.
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch",
   branch `main`, folder `/ (root)`. Save.
5. GitHub gives you a live URL shortly after, usually
   `https://<your-username>.github.io/<repo-name>/`.

## About the AI assistant and CSV export
The version of this app you're looking at was originally built as a Claude
artifact, where it could optionally call Claude directly from the page (for
open-ended questions like "who's been absent most this week?") and offer a
"Save file" prompt for CSV export. Those two features only work inside
Claude's own artifact viewer — they rely on a `window.claude` bridge that
doesn't exist on a plain website.

On GitHub Pages (or any other static host), the app still runs fully:
- Tap-to-mark attendance, roster editing, the built-in command parser
  ("Aisha late", "who is absent?", "add Priya Nair", "undo"), and the weekly
  history table all work exactly the same.
- The AI-only chat replies, the "Get AI insights" button, and the CSV export
  buttons simply won't appear, since the app detects `window.claude` is
  missing and hides them automatically — no errors, no broken buttons.

If you'd like real AI answers or CSV export on your own site, that would
need your own backend (e.g. a small server calling the Anthropic API) — let
me know if you want help wiring that up.

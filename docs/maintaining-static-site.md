# Maintaining the static website

## Distribution and source

This repository is the GitHub Pages distribution. The main HTML and application bundles were built from a separate source project; there is no `package.json` here. The `aerorepair-scan/` and `repair-workflow/` modules can be maintained directly.

The readable publishing layer includes:

| File | Purpose |
| --- | --- |
| `assets/site-polish.css` | Homepage, controls, focus styles, and responsive layout |
| `assets/site-enhancements.js` | Concept image, module cards, labels, and skip navigation |
| `assets/site-mobile-workspace.css` | Scrolling panels and timeline layout on small screens |
| `assets/timeline-navigation.js` | Stage selection with a 1 ms offset to avoid timeline rounding |
| `assets/site-theme.css` | Shared page, header, and panel colors across all four entries |

The shared page background is `#122d36`, the header is `#15313a`, and panels use `#1a3943`. Load the shared theme after other styles. Update the four `theme-color` tags and serialized RSC metadata when changing the page color. Scientific rendering colors remain independent.

All public copy is in English, including static HTML, serialized metadata, client-rendered labels, chart tooltips, module data descriptions, and documentation. Keep server-rendered text and client strings consistent to avoid hydration errors. Repair data and the generator use neutral field names such as `title`, `description`, and `position`.

Every AbsorbEvo entry is a normal anchor to `https://github.com/ZhichengFeng/AbsorbEvo`. Preserve the link in the top navigation, intro, parameter controls, project overview, and module card. Refer to that repository for the current method, benchmark, and citation.

## Choosing where to edit

- Change scientific calculations and scene behavior in the complete source project, then rebuild.
- Use the readable publishing layer for local visual changes. Check both the homepage and `/demo/`.
- Maintain the native modules in their HTML, CSS, JavaScript, and JSON files.
- Keep titles, descriptions, accessibility labels, and navigation consistent across all four entries.

The English release uses versioned application asset names so returning visitors receive the translated modules. When replacing those assets, update every import and both HTML entries. The timeline adapter must continue to import the same timeline singleton used by the application.

## Rebuilding the main application

1. Build with `/ZhichengFeng-Stealth-lab/` as the public base path.
2. Replace HTML and its matching application assets together.
3. Preserve both native modules, entry scripts, publishing-layer files, local dependencies, data, provenance, documentation, and `.nojekyll`.
4. Keep English copy and AbsorbEvo links when incorporating a new build.
5. Refresh `docs/screenshots/home-desktop.png` after visible homepage changes.

The `_headers` file is for other static hosts; GitHub Pages does not use it.

## Validation and publishing

Serve the parent directory with:

```powershell
python -m http.server 3000 --bind 127.0.0.1
```

Run the read-only checker from the repository root:

```powershell
python tools/check_site.py
```

The checker uses Python 3.10+ standard libraries. It validates local page and asset references, CSS URLs, literal JavaScript paths, and manifest sizes and SHA-256 values. JSON and CSV checks normalize CRLF to LF to match Git's published blobs. It does not execute scripts or validate external URLs.

In a browser, verify:

- All four entries load and return links work.
- Every AbsorbEvo entry reaches the independent project page.
- Demo playback, stage selection, structure and polarization controls, and charts work.
- Scan reset, repair state selection, play/pause, and the guided tour work.
- English labels fit desktop and mobile layouts, with no horizontal overflow.
- Visible copy, accessibility labels, notifications, and metadata are English.
- No missing resources, script exceptions, or WebGL initialization failures occur.
- Synthetic data and the independent CST reference remain clearly labeled.

After pushing, verify the GitHub Pages deployment and the live website. A successful Git push alone does not confirm deployment.

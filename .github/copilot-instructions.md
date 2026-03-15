# Portfolio — Copilot Instructions

## Architecture

Single-page static portfolio (`index.html` + `assets/`). No framework, no build pipeline.

```
index.html          # All sections in one file
assets/
  css/styles.css    # Compiled output — edit this for CSS changes
  scss/styles.scss  # SCSS source — keep in sync with styles.css
  js/main.js        # Vanilla JS: mobile menu, active links, ScrollReveal
  img/              # Images and PDF resume (RauchdiMehdi_CvANG.pdf)
```

**Deployed to Azure Static Web Apps** via `.github/workflows/azure-static-web-apps-brave-cliff-08d330910.yml` — every push to `main` auto-deploys.

## Dependencies (CDN only — no package.json)

- **ScrollReveal** — scroll animations; removing it breaks the visual experience
- **Box Icons v2.0.6** — social/UI icons
- **Google Fonts** — Poppins (400, 600, 700)

## Naming Conventions

BEM-like classes throughout: `.block__element` (`.nav__menu`, `.home__title`, `.skills__data`).

CSS custom properties defined in `:root`:

- Colors: `--first-color` (#4070F4), `--second-color` (#0E2431)
- Font sizes: `--big-font-size`, `--h2-font-size`, `--normal-font-size`
- Spacing: `--mb-1` … `--mb-6`
- Z-index: `--z-back`, `--z-normal`, `--z-tooltip`, `--z-fixed`

## SCSS / CSS Sync

There is **no automated SCSS compiler**. After editing `styles.scss`, manually compile to `styles.css` (e.g. via the VS Code Live Sass Compiler extension or `sass` CLI). Always commit both files together.

## Known Issues to Be Aware Of

- **Skills bar class mismatch**: HTML uses `.skills__aws`, `.skills__Devops`, `.skills__Py` but SCSS defines `.skills__html`, `.skills__css`, `.skills__js`. Update both sides consistently.
- **Contact form is non-functional**: No backend or action handler. `type="mail"` should be `type="email"`.
- **`Jenkins_vm.pem`** exists in the root — do not commit or expose this AWS key.

## Deployment

Push to `main` → Azure Static Web Apps CI/CD kicks in automatically.
Use `./update.sh` for a quick `git add . && git commit -m "changes made on <date>" && git push`.

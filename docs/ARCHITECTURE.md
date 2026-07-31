# Architecture

## Current deployment

The application is deployed as a static GitHub Pages site on `www.opth.net`.

## Design principles

- No patient account is required.
- Calculations should remain in the browser.
- No identifiable or health-selection data should be transmitted by default.
- Clinical rules must be separated conceptually from presentation changes.
- Every interactive control must be keyboard accessible.
- Arabic and English must be treated as equal first-class interfaces.
- The site must remain functional on mobile devices and slower connections.

## Target structure

- `index.html`: semantic application shell
- `styles.css`: compiled, dependency-free production styles
- `app.js`: UI controller and event binding
- `rules.js`: clinical-rule definitions and date calculations
- `i18n.js`: Arabic/English strings
- `manifest.webmanifest`: PWA metadata
- `sw.js`: offline caching
- `tests/`: calculation and browser regression tests

The current branch begins the governance, PWA, SEO, and automated quality foundation. The next implementation pass should split the current large inline document into these modules while preserving all approved behaviors.

## Data handling

Date of birth, last-visit date, selected conditions, and generated recommendations should remain in runtime memory only. They should not be persisted to local storage, analytics, logs, or a backend.

## Release controls

All changes should enter `main` through a pull request. Automated checks must pass before merge. Clinical-rule changes require an explicit entry in `docs/CLINICAL_RULES.md`.

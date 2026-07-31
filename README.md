# Ophth-Scheduler

A bilingual Arabic/English ophthalmology follow-up scheduling tool published at **https://www.opth.net**.

## Purpose

Ophth-Scheduler helps users estimate a routine ophthalmology follow-up date from their last visit, age group, and selected ophthalmic or systemic risk factors. Calculations run locally in the browser. The application is educational and does not diagnose disease or replace an ophthalmologist.

## Current capabilities

- Arabic and English interface with RTL/LTR switching
- Light and dark appearance
- Adjustable text size
- Follow-up calculations for supported conditions
- Diabetes-severity intervals
- No-previous-visit safety override
- Earliest-date selection when multiple conditions are chosen
- Calendar export, printing, copy/share, and offline-ready foundations
- Custom domain through GitHub Pages

## Clinical governance

Every scheduling rule must document:

1. The condition and intended population
2. The interval or follow-up window
3. Exceptions and urgent-symptom exclusions
4. The supporting guideline or clinical source
5. The date reviewed
6. The reviewer and rule version

Medical rules are not to be changed solely for visual or technical reasons. Any clinically meaningful change should be separately reviewed and recorded in `docs/CLINICAL_RULES.md`.

## Privacy

The scheduler is designed to calculate locally in the browser and should not collect names, medical-record numbers, dates of birth, or health selections. See `privacy.html`.

## Development

The production site is intentionally dependency-light so GitHub Pages remains reliable. Automated checks validate HTML, JavaScript syntax, links, accessibility basics, and security-sensitive files.

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Repository structure

- `index.html` — application shell and current production logic
- `manifest.webmanifest` — installable web-app metadata
- `sw.js` — offline cache and update handling
- `privacy.html` — privacy notice
- `terms.html` — terms and medical disclaimer
- `404.html` — branded not-found page
- `robots.txt` / `sitemap.xml` — search-engine configuration
- `docs/` — architecture, clinical governance, release process
- `.github/workflows/quality.yml` — automated quality checks

## Release process

1. Create a feature branch.
2. Make focused changes.
3. Run automated checks.
4. Review clinical-rule changes separately from UI changes.
5. Merge through a pull request.
6. Verify the live site, Arabic and English modes, mobile layout, and calculations.

## Safety

Urgent eye symptoms require prompt professional assessment. The scheduler must never delay emergency evaluation for sudden vision loss, a curtain or shadow, new flashes or floaters, severe eye pain, trauma, chemical exposure, or acute redness with reduced vision.

## Ownership

© Sultan Abdulrahman Alhassan. All rights reserved.
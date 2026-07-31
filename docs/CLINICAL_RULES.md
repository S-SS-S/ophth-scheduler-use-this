# Clinical Rules Register

This document is the controlled register for all scheduling logic used by Ophth-Scheduler.

## Safety boundary

The tool is for routine follow-up planning only. It does not triage emergencies, diagnose disease, or override a treating ophthalmologist. Sudden vision loss, a curtain or shadow, new flashes or floaters, severe eye pain, trauma, chemical exposure, or acute redness with reduced vision require urgent professional assessment.

## Rule-change policy

A medical rule change must include:

- condition and population
- existing behavior
- proposed behavior
- supporting guideline or source
- review date
- reviewer
- version
- test cases

UI-only changes must not alter clinical intervals.

## Current implemented rules

| Rule | Current application behavior | Status |
|---|---|---|
| Type 1 diabetes | Severity-selected interval: severe 3 months; moderate 6 months; mild 9 months; unknown 12 months | Requires source documentation |
| Type 2 diabetes | Severity-selected interval: severe 3 months; moderate 6 months; mild 9 months; unknown 12 months | Requires source documentation |
| Anti-VEGF treatment | 1 month from last visit during active therapy | Treating ophthalmologist may override |
| HbA1c above normal | 1 year from last visit | Requires source documentation |
| Semaglutide or tirzepatide use | 1 year from last visit | Requires source documentation |
| Glaucoma suspect / ocular hypertension | 1 year from last visit | Individual risk may require earlier review |
| First-degree relative with glaucoma | 1 year from last visit | Requires source documentation |
| High myopia | 1 year from last visit | Requires source documentation |
| Thyroid eye disease | Active: 3–6 months; stable: 1 year | Individual activity may require earlier review |
| Previous retinal laser | 1 year from last visit | Procedure indication may require earlier review |
| Adults without known risk factors | Age-based intervals already implemented in the application | Requires source documentation |
| No previous ophthalmology visit | Recommend assessment as soon as possible | Safety override |

## Review backlog

Before describing the tool as clinically validated, every rule above must be matched to a citable guideline and reviewed by a qualified ophthalmologist. Until then, the public interface must retain the educational disclaimer and treating-clinician override language.

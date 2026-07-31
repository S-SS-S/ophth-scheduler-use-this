const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('language, theme, and font controls remain interactive', async ({ page }) => {
  await page.click('#lang-en');
  await expect(page.locator('[data-i18n="heroTitle"]')).toContainText('Understand when');
  await page.click('#theme-dark');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.click('#fontPlus');
  await expect(page.locator('#fontPct')).not.toHaveText('100%');
});

test('retinal laser produces a yearly follow-up result', async ({ page }) => {
  await page.click('#lang-en');
  await page.fill('#dob', '1990-01-01');
  await page.fill('#lastVisit', '2025-01-15');
  await page.check('#c_retLaser');
  await page.click('#btnCalc');
  await expect(page.locator('#resultsCard')).toBeVisible();
  await expect(page.locator('#details')).toContainText('Previous retinal laser');
  await expect(page.locator('#summary')).toContainText('15/01/2026');
});

test('no previous visit safety override is displayed', async ({ page }) => {
  await page.fill('#dob', '1990-01-01');
  await page.check('#noOphthVisit');
  await page.click('#btnCalc');
  await expect(page.locator('#resultsCard')).toBeVisible();
  await expect(page.locator('#summary')).toContainText('في أقرب وقت ممكن');
});

test('result tools are localized', async ({ page }) => {
  await page.click('#lang-en');
  await expect(page.locator('#copyBtn')).toHaveText('Copy / Share');
  await expect(page.locator('#icsBtn')).toContainText('Add to Calendar');
  await expect(page.locator('#printBtn')).toContainText('Print');
  await expect(page.locator('[data-i18n="disclaimer"]')).toContainText('educational tool');
});
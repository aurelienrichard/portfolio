import { expect, test } from '@playwright/test'

test('homepage should have correct title', async ({ page }) => {
	await page.goto('/')
	await expect(page).toHaveTitle('SvelteFlix')
})

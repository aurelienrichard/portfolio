import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
	await page.goto('/search')
})

test('user should be able to type in the input field', async ({ page }) => {
	const input = page.getByRole('textbox')
	await input.type('avatar')
	await expect(input).toHaveValue('avatar')
})

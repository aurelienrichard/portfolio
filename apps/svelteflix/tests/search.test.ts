import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
	await page.goto('/search')
})

test('submit button should be disabled', async ({ page }) => {
	const button = page.getByRole('button', { name: /find movies/i })
	await expect(button).toBeDisabled()
})

test('user should be able to type in the input field', async ({ page }) => {
	const input = page.getByRole('textbox')
	await input.type('avatar')
	await expect(input).toHaveValue('avatar')
})

test('submit button should be enabled when input field is not empty', async ({ page }) => {
	const input = page.getByRole('textbox')
	const button = page.getByRole('button', { name: /find movies/i })
	await input.type('avatar')
	await expect(button).toBeEnabled()
})

test('submitting search query should update page title', async ({ page }) => {
	const input = page.getByRole('textbox')
	await input.type('avatar')
	await page.getByRole('button', { name: /find movies/i }).click()
	await expect(page).toHaveTitle('avatar')
})

test('valid search query should return results', async ({ page }) => {
	const input = page.getByRole('textbox')
	await input.type('avatar')
	await page.getByRole('button', { name: /find movies/i }).click()
	await expect(page.getByRole('link', { name: 'Avatar: The Way of Water' })).toBeVisible()
})

test('invalid search query should return message', async ({ page }) => {
	const input = page.getByRole('textbox')
	await input.type('aaaaaaaaaaaaa')
	await page.getByRole('button', { name: /find movies/i }).click()
	await expect(page.getByText('No results')).toBeVisible()
})

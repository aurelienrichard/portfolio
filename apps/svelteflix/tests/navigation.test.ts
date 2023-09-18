import { expect, test } from '@playwright/test'

test('homepage should have correct title and heading', async ({ page }) => {
	await page.goto('/')
	await expect(page).toHaveTitle('SvelteFlix')
	await expect(page.getByRole('heading', { name: "Today's top movies" })).toBeVisible()
})

test('clicking search page link should navigate to there', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('link', { name: 'Search' }).click()
	await expect(page).toHaveURL('/search')
})

test('search page should have correct title and heading', async ({ page }) => {
	await page.goto('/search')
	await expect(page).toHaveTitle('Search')
	await expect(page.getByRole('heading', { name: 'Search' })).toBeVisible()
})

test('clicking trending page link should navigate to there', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('heading', { name: 'Trending' }).getByRole('link').click()
	await expect(page).toHaveURL('/movies/trending')
})

test('trending page should have correct title and heading', async ({ page }) => {
	await page.goto('/movies/trending')
	await expect(page).toHaveTitle('Trending')
	await expect(page.getByRole('heading', { name: 'Trending' })).toBeVisible()
})

test('clicking playing page link should navigate to there', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('heading', { name: 'Now playing' }).getByRole('link').click()
	await expect(page).toHaveURL('/movies/playing')
})

test('playing page should have correct title and heading', async ({ page }) => {
	await page.goto('/movies/playing')
	await expect(page).toHaveTitle('Now playing')
	await expect(page.getByRole('heading', { name: 'Now playing' })).toBeVisible()
})

test('clicking upcoming page link should navigate to there', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('heading', { name: 'Upcoming' }).getByRole('link').click()
	await expect(page).toHaveURL('/movies/upcoming')
})

test('upcoming page should have correct title and heading', async ({ page }) => {
	await page.goto('/movies/upcoming')
	await expect(page).toHaveTitle('Upcoming')
	await expect(page.getByRole('heading', { name: 'Upcoming' })).toBeVisible()
})

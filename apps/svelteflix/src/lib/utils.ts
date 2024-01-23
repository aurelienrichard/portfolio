import { PUBLIC_SVELTEFLIX_MEDIA_BASE_API_URL } from '$env/static/public'
import type { MovieList } from './apiSchemas'

export const getMediaURL = (path: string, width: number) => {
	const url = `${PUBLIC_SVELTEFLIX_MEDIA_BASE_API_URL}/w${width}${path}`

	return url
}

export const getNumberOfColumns = (width: number) => {
	if (width >= 1024) return 4
	if (width >= 640) return 3
	return 2
}

export const getNextPage = (movies: MovieList) =>
	movies.page < movies.total_pages ? movies.page + 1 : null

export const dollarFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	notation: 'compact'
})

export const countFormatter = new Intl.NumberFormat('en-US', {
	style: 'decimal',
	notation: 'compact'
})

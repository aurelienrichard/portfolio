import { API_READ_ACCESS_TOKEN, BASE_API_URL } from '$env/static/private'
import type { MovieList } from '$lib/types.js'
import type { PageServerLoad } from './$types.js'

export const load: PageServerLoad = async ({ fetch }) => {
	const url = `${BASE_API_URL}trending/movie/day?language=en-US`
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
			accept: 'application/json'
		}
	})

	const trending = (await response.json()) as MovieList

	return {
		trending
	}
}

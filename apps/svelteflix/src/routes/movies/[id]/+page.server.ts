import { movieDetailsSchema } from '$lib/apiSchemas'
import { get } from '$lib/server/api'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase, getSession }, params, fetch }) => {
	let inWatchlist = false
	const session = await getSession()

	if (session) {
		const { data } = await supabase
			.from('watchlist')
			.select('*')
			.eq('user_id', session.user.id)
			.eq('movie_id', params.id)
			.limit(1)

		if (data!.length > 0) inWatchlist = true
	}

	const movie = await get(fetch, `/movie/${params.id}`, movieDetailsSchema, {
		append_to_response: 'images,videos,recommendations'
	})

	return {
		inWatchlist,
		title: movie.title,
		movie
	}
}

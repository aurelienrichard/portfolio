import { error, redirect } from '@sveltejs/kit'
import z from 'zod'
import type { Actions, PageServerLoad } from './$types'
import { get } from '$lib/server/api'
import { movieListResultSchema } from '$lib/apiSchemas'

const formSchema = z.object({
	user_id: z.string().uuid(),
	movie_id: z.number()
})

const dbSchema = z
	.array(formSchema.pick({ movie_id: true }))
	.transform((data) => data.map(({ movie_id }) => movie_id))

export const load: PageServerLoad = async ({ fetch, locals: { getSession, supabase } }) => {
	const session = await getSession()

	if (!session) redirect(303, '/login')

	const { data } = await supabase.from('watchlist').select('*').eq('user_id', session.user.id)
	const ids = dbSchema.parse(data)
	const movies = await Promise.all(
		ids.map((id) => get(fetch, `movie/${id}`, movieListResultSchema))
	)

	return {
		movies,
		title: 'Watchlist'
	}
}

export const actions: Actions = {
	add: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession()

		if (!session) error(401)

		const form = await request.formData()
		const { user_id, movie_id } = formSchema.parse({
			movie_id: Number(form.get('movie_id')),
			user_id: session.user.id
		})

		await supabase.from('watchlist').insert({
			user_id,
			movie_id
		})
	},

	delete: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession()

		if (!session) error(401)

		const form = await request.formData()
		const { user_id, movie_id } = formSchema.parse({
			movie_id: Number(form.get('movie_id')),
			user_id: session.user.id
		})

		await supabase.from('watchlist').delete().eq('user_id', user_id).eq('movie_id', movie_id)
	}
}

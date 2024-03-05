import { redirect, type Actions, error } from '@sveltejs/kit'
import { newUserSchema } from '$lib/types/schemas'
import { supabase } from '$lib/server/supabaseServer'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = ({ params, cookies }) => {
	const userId = cookies.get('userid')
	const username = cookies.get('username')

	if (userId && username) {
		redirect(303, `/room/${params.id}`)
	}

	return {
		title: 'Join - Privelte'
	}
}

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const room = await supabase.from('rooms').select('*').eq('id', params.id!).single()

		if (room.data && room.data.participants < room.data.slots) {
			const form = await request.formData()
			const { username } = newUserSchema.parse({
				username: form.get('username')
			})

			const user = await supabase
				.from('users')
				.insert({ room_id: room.data.id })
				.select()
				.single()

			if (user.error) {
				error(500, { message: 'Internal error.' })
			}

			cookies.set('userid', user.data.id, {
				path: `/room/${params.id}`
			})
			cookies.set('username', username, {
				path: `/room/${params.id}`
			})
		}

		redirect(303, `/room/${params.id}`)
	}
}

import { redirect, type Actions, error } from '@sveltejs/kit'
import { newUserSchema } from '$lib/types/schemas'
import { supabase } from '$lib/server/supabaseServer'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, cookies }) => {
	const userId = cookies.get('userid')
	const username = cookies.get('username')

	if (userId && username) {
		const user = await supabase
			.from('users')
			.select('*')
			.eq('id', userId)
			.eq('room_id', params.id)
			.single()

		if (user.data) {
			redirect(303, `/room/${params.id}`)
		}
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

			const channel = supabase.channel(room.data.id, {
				config: { broadcast: { ack: true } }
			})

			try {
				const response = await channel.send({
					type: 'broadcast',
					event: 'join',
					payload: { username }
				})

				console.info(response)

				if (response !== 'ok') {
					throw Error('Broadcast failed.')
				}
			} catch (e) {
				console.error(e)

				await supabase.from('users').delete().eq('id', user.data.id)

				error(500, { message: 'Internal error.' })
			} finally {
				await supabase.removeChannel(channel)
			}

			cookies.set('userid', user.data.id, {
				path: `/room/${room.data.id}`
			})
			cookies.set('username', username, {
				path: `/room/${room.data.id}`
			})
		}

		redirect(303, `/room/${params.id}`)
	}
}

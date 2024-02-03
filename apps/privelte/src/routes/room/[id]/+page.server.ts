import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { supabase } from '$lib/server/supabaseServer'

export const load: PageServerLoad = async ({ params }) => {
	const room = await supabase.from('room').select('id, slots').eq('id', params.id).single()

	if (room.error) {
		error(404, { message: 'This room does not exist.' })
	}

	const messages = await supabase
		.from('message')
		.select('id, payload')
		.eq('room_id', params.id)
		.order('id', { ascending: false })
		.limit(10)

	if (messages.error) {
		error(500, { message: 'Internal error.' })
	}

	return {
		room: room.data,
		messages: messages.data
	}
}

/* export const actions: Actions = {
	default: async ({ request, params }) => {
		const form = await request.formData()

		const { message } = schema.parse({
			message: form.get('message')
		})

		await supabase.from('message').insert({ payload: message, room_id: params.id })

		const channel = supabase.channel(params.id)

		channel.subscribe((status) => {
			if (status === 'SUBSCRIBED') {
				// eslint-disable-next-line @typescript-eslint/no-floating-promises
				channel.send({
					type: 'broadcast',
					event: 'new message'
				})
			}
		})
	}
}
 */

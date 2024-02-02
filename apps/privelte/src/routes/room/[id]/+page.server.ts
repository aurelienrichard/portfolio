import { error } from '@sveltejs/kit'
import { z } from 'zod'
import type { Actions, PageServerLoad } from './$types'
import { supabase } from '$lib/server/supabaseServer'

const schema = z.object({
	message: z.string().min(1).max(1000)
})

export const load = (async ({ params }) => {
	const room = await supabase.from('room').select('id, slots').eq('id', params.id).single()

	if (room.error) {
		error(404, { message: 'This room does not exist.' })
	}

	const messages = await supabase.from('message').select('id, content').eq('room_id', params.id)

	if (messages.error) {
		error(500, { message: 'Internal error.' })
	}

	return {
		room: room.data,
		messages: messages.data
	}
}) satisfies PageServerLoad

export const actions = {
	default: async ({ request, params }) => {
		const form = await request.formData()

		const { message } = schema.parse({
			message: form.get('message')
		})

		await supabase.from('message').insert({ content: message, room_id: params.id })

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
} satisfies Actions

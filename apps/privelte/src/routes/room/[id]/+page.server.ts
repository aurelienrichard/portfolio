import { error } from '@sveltejs/kit'
import { z } from 'zod'
import type { Actions, PageServerLoad } from './$types'
import { supabase } from '$lib/server/supabase'

// set a character limit
const schema = z.object({
	message: z.string()
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
	default: async ({ request }) => {
		const form = await request.formData()

		const { message } = schema.parse({
			message: form.get('message')
		})

		console.log(message)
		// insert message into database
	}
} satisfies Actions

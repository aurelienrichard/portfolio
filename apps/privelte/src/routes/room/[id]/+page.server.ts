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

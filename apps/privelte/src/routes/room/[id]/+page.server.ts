import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { supabase } from '$lib/server/supabaseServer'
import { PRIVELTE_MESSAGE_BATCH_SIZE } from '$env/static/private'

export const load: PageServerLoad = async ({ params }) => {
	const room = await supabase.from('rooms').select('id, slots').eq('id', params.id).single()

	if (room.error) {
		error(404, { message: 'This room does not exist.' })
	}

	const messages = await supabase
		.from('messages')
		.select('id, content')
		.eq('room_id', params.id)
		.order('id', { ascending: false })
		.limit(Number(PRIVELTE_MESSAGE_BATCH_SIZE))

	if (messages.error) {
		error(500, { message: 'Internal error.' })
	}

	return {
		room: room.data,
		messages: messages.data.reverse()
	}
}

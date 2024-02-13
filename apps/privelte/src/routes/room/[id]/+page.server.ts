import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { supabase } from '$lib/server/supabaseServer'
import { PRIVELTE_MESSAGE_BATCH_SIZE } from '$env/static/private'
import { chattersCount } from '$lib/server/ChattersCount'

export const load: PageServerLoad = async ({ params }) => {
	if (!chattersCount.current.has(params.id)) {
		await supabase.from('rooms').delete().eq('id', params.id)
	}

	const room = await supabase.from('rooms').select('id, slots').eq('id', params.id).single()

	if (room.error) {
		error(404, { message: 'This room does not exist.' })
	}

	const currentChatters = chattersCount.current.get(params.id)!

	if (currentChatters >= room.data.slots) {
		error(403, { message: 'This room is full.' })
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

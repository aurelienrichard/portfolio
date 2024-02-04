import { error, json } from '@sveltejs/kit'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { newMessageSchema } from '$lib/types/schemas'
import type { RequestHandler } from './$types'
import { supabase } from '$lib/server/supabaseServer'
import type { NewMessage } from '$lib/types/schemas'

// export const GET: RequestHandler = async ({ params, url }) => {}

export const POST: RequestHandler = async ({ params, request }) => {
	const body = (await request.json()) as NewMessage
	const { message } = newMessageSchema.parse({
		message: body.message
	})

	const newMessage = await supabase
		.from('message')
		.insert({ payload: message, room_id: params.id })
		.select('id')
		.single()

	if (newMessage.error) {
		error(500, 'Internal error.')
	}

	const channel = supabase.channel(params.id)

	const subscribeToChannel = new Promise<RealtimeChannel>((resolve, reject) => {
		channel.subscribe((status) => {
			if (status === 'SUBSCRIBED') {
				resolve(channel)
			} else {
				reject(new Error())
			}
		})
	})

	try {
		const channelSubscribed = await subscribeToChannel
		await channelSubscribed.send({
			type: 'broadcast',
			event: 'new message'
		})
	} catch {
		error(500, 'Internal error.')
	}

	return json({ id: newMessage.data.id, message: 'Message sent' }, { status: 201 })
}

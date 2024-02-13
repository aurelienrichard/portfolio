import { error, json } from '@sveltejs/kit'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { fetchMessagesSearchParams, newMessageSchema } from '$lib/types/schemas'
import type { RequestHandler } from './$types'
import { supabase } from '$lib/server/supabaseServer'
import { PRIVELTE_MESSAGE_BATCH_SIZE } from '$env/static/private'
import type { NewMessage } from '$lib/types/schemas'

export const GET: RequestHandler = async ({ params, url }) => {
	const { newMessages, lastMessageId } = fetchMessagesSearchParams.parse({
		newmessages: url.searchParams.get('newmessages'),
		lastmessageid: url.searchParams.get('lastmessageid')
	})

	if (newMessages) {
		const messages = await supabase
			.from('messages')
			.select('id, content')
			.eq('room_id', params.id)
			.gt('id', lastMessageId)
			.order('id', { ascending: true })

		if (messages.error) {
			error(500, 'Internal error.')
		}

		return json(messages.data)
	}

	const messages = await supabase
		.from('messages')
		.select('id, content')
		.eq('room_id', params.id)
		.lt('id', lastMessageId)
		.order('id', { ascending: false })
		.limit(Number(PRIVELTE_MESSAGE_BATCH_SIZE))

	if (messages.error) {
		error(500, 'Internal error.')
	}

	return json(messages.data.reverse())
}

export const POST: RequestHandler = async ({ params, request }) => {
	const body = (await request.json()) as NewMessage
	const { message } = newMessageSchema.parse({
		message: body.message
	})

	const newMessage = await supabase
		.from('messages')
		.insert({ content: message, room_id: params.id })
		.select('id')
		.single()

	if (newMessage.error) {
		error(500, 'Internal error.')
	}

	const channel = supabase.channel(params.id, { config: { broadcast: { ack: true } } })

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
			event: 'new-message'
		})
	} catch {
		error(500, 'Internal error.')
	}

	return json({ id: newMessage.data.id, message: 'Message sent' }, { status: 201 })
}

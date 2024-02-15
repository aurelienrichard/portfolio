import { error, json } from '@sveltejs/kit'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'
import { newMessageSchema } from '$lib/types/schemas'
import type { RequestHandler } from './$types'
import { supabase } from '$lib/server/supabaseServer'
import type { NewMessage } from '$lib/types/schemas'

export const POST: RequestHandler = async ({ params, request, cookies }) => {
	const body = (await request.json()) as NewMessage
	const { message } = newMessageSchema.parse({
		message: body.message
	})

	const userId = cookies.get(`privelte_${params.id}_id`)

	if (!userId) {
		error(401, 'Unauthorized.')
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

	const id = nanoid()

	try {
		const channelSubscribed = await subscribeToChannel
		await channelSubscribed.send({
			type: 'broadcast',
			event: 'new-message',
			payload: {
				message,
				userId,
				id
			}
		})
	} catch {
		error(500, 'Internal error.')
	}

	return json({ id, message: 'Message sent' }, { status: 201 })
}

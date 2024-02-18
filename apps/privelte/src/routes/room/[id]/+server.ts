import { error, json } from '@sveltejs/kit'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { newMessageSchema } from '$lib/types/schemas'
import type { RequestHandler } from './$types'
import { supabase } from '$lib/server/supabaseServer'

export const POST: RequestHandler = async ({ params, request, cookies }) => {
	const body = (await request.json()) as { message: string; id: string }

	const { id, message, userId, username } = newMessageSchema.parse({
		id: body.id,
		message: body.message,
		userId: cookies.get('userid'),
		username: cookies.get('username')
	})

	if (!userId || !username) {
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

	try {
		const channelSubscribed = await subscribeToChannel
		await channelSubscribed.send({
			type: 'broadcast',
			event: 'new-message',
			payload: {
				type: 'payload',
				message,
				userId,
				username,
				id
			}
		})
	} catch {
		error(500, 'Internal error.')
	}

	return json({ id, message: 'Message sent' }, { status: 201 })
}

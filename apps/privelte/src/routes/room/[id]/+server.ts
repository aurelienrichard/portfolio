import { error, json } from '@sveltejs/kit'
import { supabase } from '$lib/server/supabaseServer'
import { newMessageSchema, cookieSchema } from '$lib/types/schemas'
import type { Payload } from '$lib/types/types'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request, cookies, params }) => {
	const { userId, username } = cookieSchema.parse({
		userId: cookies.get('userid'),
		username: cookies.get('username')
	})

	if (!userId || !username) {
		error(401, 'Unauthorized.')
	}

	const user = await supabase
		.from('users')
		.select('*')
		.eq('id', userId)
		.eq('room_id', params.id)
		.single()

	if (user.error) {
		error(401, 'Unauthorized.')
	}

	const body = (await request.json()) as Pick<Payload, 'id' | 'message'>

	const { id, message } = newMessageSchema.parse({
		id: body.id,
		message: body.message
	})

	const payload: Payload = { type: 'payload', id, message, userId, username }

	const channel = supabase.channel(params.id, {
		config: { broadcast: { ack: true } }
	})

	try {
		const response = await channel.send({
			type: 'broadcast',
			event: 'message',
			payload
		})

		if (response !== 'ok') {
			throw Error('Broadcast failed.')
		}
	} catch (e) {
		console.error(e)

		error(500, { message: 'Internal error.' })
	} finally {
		await supabase.removeChannel(channel)
	}

	return json({ message: 'Message sent.' }, { status: 201 })
}

export const PATCH: RequestHandler = async ({ cookies, params }) => {
	try {
		const { userId, username } = cookieSchema.parse({
			userId: cookies.get('userid'),
			username: cookies.get('username')
		})

		if (!userId || !username) {
			throw Error('Unauthorized.')
		}

		const user = await supabase
			.from('users')
			.update({ last_heartbeat: new Date().toISOString() })
			.eq('id', userId)
			.eq('room_id', params.id)
			.select()
			.single()

		if (user.error) {
			throw Error(user.error.message)
		}
	} catch (e) {
		console.error(e)
	}

	return new Response(null, { status: 204 })
}

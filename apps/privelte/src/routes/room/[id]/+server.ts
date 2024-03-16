import { error, json } from '@sveltejs/kit'
import { supabase } from '$lib/server/supabaseServer'
import { newMessageSchema } from '$lib/types/schemas'
import type { Payload } from '$lib/types/types'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request, cookies, params }) => {
	const body = (await request.json()) as Pick<Payload, 'id' | 'message'>

	const { id, message, userId, username } = newMessageSchema.parse({
		id: body.id,
		message: body.message,
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
			throw Error()
		}
	} catch (e) {
		console.error(e)

		error(500, { message: 'Internal error.' })
	} finally {
		await supabase.removeChannel(channel)
	}

	return json({ message: 'Message sent.' }, { status: 201 })
}

import { error, json } from '@sveltejs/kit'
import { supabase } from '$lib/server/supabaseServer'
import { verifyToken, createToken } from '$lib/server/auth'
import { newMessageSchema } from '$lib/types/schemas'
import type { Payload } from '$lib/types/types'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request, cookies, params }) => {
	const session = cookies.get('session')
	let userId: string
	let username: string

	try {
		const payload = await verifyToken(session)
		userId = payload.userId
		username = payload.username

		await supabase
			.from('users')
			.select('*')
			.eq('id', userId)
			.eq('room_id', params.id)
			.single()
			.throwOnError()
	} catch (e) {
		console.error(e)
		return error(401, 'Unauthorized.')
	}

	const body = (await request.json()) as Pick<Payload, 'id' | 'message'>
	let payload: Payload

	try {
		const { id, message } = newMessageSchema.parse({
			id: body.id,
			message: body.message
		})

		payload = { type: 'payload', id, message, userId, username }
	} catch (e) {
		console.error(e)
		return error(400, 'Invalid ID or message.')
	}

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
			return error(500, { message: 'Internal error.' })
		}
	} finally {
		await supabase.removeChannel(channel)
	}

	return json({ message: 'Message sent.' }, { status: 201 })
}

export const PATCH: RequestHandler = async ({ cookies, params }) => {
	const session = cookies.get('session')

	try {
		const { userId, username } = await verifyToken(session)

		await supabase
			.from('users')
			.update({ last_heartbeat: new Date().toISOString() })
			.eq('id', userId)
			.eq('room_id', params.id)
			.select()
			.single()
			.throwOnError()

		const { jwt, expires } = await createToken({ userId, username })

		cookies.set('session', jwt, {
			path: `/room/${params.id}`,
			expires
		})
	} catch (e) {
		console.error(e)
		return error(401, 'Unauthorized.')
	}

	return new Response(null, { status: 204 })
}

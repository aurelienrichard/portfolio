import { json } from '@sveltejs/kit'
import { newMessageSchema } from '$lib/schemas'
import type { RequestHandler } from './$types'
import { supabase } from '$lib/server/supabaseServer'
import type { NewMessage } from '$lib/schemas'
/* export const GET: RequestHandler = async ({ params, url }) => {

} */

export const POST: RequestHandler = async ({ params, request }) => {
	const body = (await request.json()) as NewMessage
	const { message } = newMessageSchema.parse({
		message: body.message
	})

	const { data, error } = await supabase
		.from('message')
		.insert({ payload: message, room_id: params.id })
		.select('id')
		.single()

	if (error) {
		return json({ message: 'Internal error.' }, { status: 500 })
	}

	return json({ id: data.id }, { status: 201 })
}

import { error, json } from '@sveltejs/kit'
import { newMessageSchema } from '$lib/types/schemas'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request, cookies }) => {
	const body = (await request.json()) as { message: string; id: string }

	const { userId, username } = newMessageSchema.parse({
		id: body.id,
		message: body.message,
		userId: cookies.get('userid'),
		username: cookies.get('username')
	})

	if (!userId || !username) {
		error(401, 'Unauthorized.')
	}

	return json({ message: 'Authorized.' }, { status: 201 })
}

import { error } from '@sveltejs/kit'
import { supabase } from '$lib/server/supabaseServer'
import type { LayoutServerLoad } from './$types'

let count = 0
let timeout: ReturnType<typeof setTimeout> | undefined

export const load: LayoutServerLoad = async ({ params }) => {
	const room = await supabase.from('rooms').select('id, slots').eq('id', params.id).single()

	if (room.error) {
		error(404, { message: 'This room does not exist.' })
	}

	const channel = supabase.channel(params.id)
	const channelSubscribed = new Promise<void>((resolve, reject) => {
		channel
			.on('presence', { event: 'sync' }, () => {
				if (timeout) {
					clearTimeout(timeout)
					timeout = undefined
				}

				const newCount = Object.keys(channel.presenceState()).length

				if (newCount !== count) {
					count = newCount
				}

				if (count === 0) {
					timeout = setTimeout(async () => {
						try {
							await supabase.from('rooms').delete().eq('id', params.id)
						} catch {
							// log error
						}
					}, 60000)
				}
			})
			.subscribe((status) => {
				if (status === 'SUBSCRIBED') {
					resolve()
				}
				reject()
			})
	})

	try {
		if (!channel.joinedOnce) {
			await channelSubscribed
		}
	} catch {
		error(500, { message: 'Internal error.' })
	}

	if (count === room.data.slots) {
		error(403, { message: 'This room is full.' })
	}

	return {
		room: room.data
	}
}

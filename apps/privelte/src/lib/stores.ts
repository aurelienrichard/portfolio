import { writable } from 'svelte/store'
import type { Payload } from '$lib/types/types'

export interface PendingMessage {
	status: 'loading' | 'error'
	payload: Payload
}

const createPendingMessages = () => {
	const { subscribe, update } = writable<Map<string, PendingMessage>>(new Map())

	return {
		subscribe,
		setStatus: (id: string, status: 'loading' | 'error' | 'success', payload: Payload) =>
			update((map) => {
				if (status === 'success') {
					map.delete(id)
				} else {
					map.set(id, { status, payload })
				}
				return map
			})
	}
}

export const pendingMessages = createPendingMessages()

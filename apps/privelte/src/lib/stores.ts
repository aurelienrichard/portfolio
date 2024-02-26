import { writable } from 'svelte/store'

export const createPendingMessages = () => {
	const { subscribe, update } = writable<Map<string, 'loading' | 'error'>>(new Map())

	return {
		subscribe,
		setStatus: (id: string, status: 'loading' | 'error' | 'success') =>
			update((map) => {
				if (status === 'success') {
					map.delete(id)
				} else if (status === 'error' || status === 'loading') {
					map.set(id, status)
				}
				return map
			})
	}
}

export const pendingMessages = createPendingMessages()

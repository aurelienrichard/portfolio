import { writable } from 'svelte/store'
import { nanoid } from 'nanoid'

interface Notification {
	id: string
	message: string
}

export const newest = writable<string>()

const createNotificationStore = () => {
	const { subscribe, update } = writable<Notification[]>([])
	const deleteNotification = (id: string) => {
		update((notifications) => notifications.filter((notification) => notification.id !== id))
	}

	return {
		subscribe,
		addNotification: (message: string) => {
			const id = nanoid()
			newest.set(id)

			update((notifications) => {
				const notification = {
					id,
					message
				}

				return [notification, ...notifications]
			})

			setTimeout(() => {
				deleteNotification(id)
			}, 4000)
		}
	}
}

export const notifications = createNotificationStore()

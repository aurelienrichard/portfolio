import { spring } from 'svelte/motion'

const delay = () =>
	new Promise((resolve) => {
		setTimeout(resolve, 1800)
	})

const createScore = () => {
	const { subscribe, update } = spring(0, {
		stiffness: 0.2,
		damping: 0.8,
		precision: 0.5
	})

	return {
		subscribe,
		increment: async () => {
			await delay()
			await update((n) => n + 1)
		},
		decrement: async () => {
			await delay()
			await update((n) => n - 1)
		}
	}
}

export const score = createScore()

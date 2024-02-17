export class ChattersCount {
	private chattersCount: Map<string, number>

	constructor() {
		this.chattersCount = new Map()
	}

	current(id: string) {
		if (!this.isInitialized(id)) return null
		return this.chattersCount.get(id)!
	}

	initialize(id: string) {
		if (this.chattersCount.has(id)) return
		this.chattersCount.set(id, 0)
	}

	increment(id: string) {
		if (!this.isInitialized(id)) return
		const oldCount = this.chattersCount.get(id)!

		this.chattersCount.set(id, oldCount + 1)
	}

	decrement(id: string) {
		if (!this.isInitialized(id)) return
		const oldCount = this.chattersCount.get(id)!
		if (oldCount === 0) return

		this.chattersCount.set(id, oldCount - 1)
	}

	delete(id: string) {
		this.chattersCount.delete(id)
	}

	private isInitialized(id: string) {
		return this.chattersCount.has(id)
	}
}

export const chattersCount = new ChattersCount()

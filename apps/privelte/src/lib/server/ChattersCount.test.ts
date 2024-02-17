import { describe, test, expect } from 'vitest'
import { ChattersCount } from './ChattersCount'

describe('ChattersCount class', () => {
	const id = 'individual-coffee-salmon'
	const chattersCount = new ChattersCount()

	test('should not increment if id has not been initialized', () => {
		chattersCount.increment(id)

		expect(chattersCount.current(id)).toBeNull()
	})

	test('should not decrement if id has not been initialized', () => {
		chattersCount.decrement(id)

		expect(chattersCount.current(id)).toBeNull()
	})

	test('should initialize the count for a new room id', () => {
		chattersCount.initialize(id)

		expect(chattersCount.current(id)).toBe(0)
	})

	test('should increment the count for an existing id', () => {
		chattersCount.increment(id)

		expect(chattersCount.current(id)).toBe(1)
	})

	test('should not initialize the count for an existing id', () => {
		chattersCount.initialize(id)

		expect(chattersCount.current(id)).not.toBe(0)
	})

	test('should decrement the count for an existing id', () => {
		chattersCount.decrement(id)

		expect(chattersCount.current(id)).toBe(0)
	})

	test('should not decrement the count below zero', () => {
		chattersCount.decrement(id)

		expect(chattersCount.current(id)).toBe(0)
	})

	test('should delete the count for an existing id', () => {
		chattersCount.delete(id)

		expect(chattersCount.current(id)).toBeNull()
	})
})

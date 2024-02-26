import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import Chat from '$lib/components/Chat.svelte'
import type { Payload, Presence } from '$lib/types/types'

describe('Chat component', () => {
	const userId = '1'

	test('should render the component correctly', () => {
		const { getByRole } = render(Chat, { userId, entries: [] })

		expect(
			getByRole('heading', { level: 1, name: 'Welcome to your new room .' })
		).toBeInTheDocument()
	})

	test('should render share link message and clipboard component', () => {
		const { getByText, getByRole } = render(Chat, { userId, entries: [] })

		expect(getByText('Share the link below to invite participants.')).toBeInTheDocument()
		expect(getByRole('button', { name: 'Copy to clipboard.' })).toBeInTheDocument()
	})

	test('should render presence message when entry type is presence', () => {
		const joinedPresence: Presence = {
			type: 'presence',
			username: 'test1',
			event: 'joined',
			id: '1'
		}
		const leftPresence: Presence = {
			type: 'presence',
			username: 'test2',
			event: 'left',
			id: '2'
		}

		const { getByText } = render(Chat, { userId, entries: [joinedPresence, leftPresence] })

		expect(getByText('test1')).toBeInTheDocument()
		expect(getByText('test2')).toBeInTheDocument()
		expect(getByText('has joined the room.')).toBeInTheDocument()
		expect(getByText('has left the room.')).toBeInTheDocument()
	})

	test('renders Message component when entry type is payload', () => {
		const payload: Payload = {
			type: 'payload',
			userId,
			id: '1',
			message: 'Hello World',
			username: 'John'
		}

		const { getByText } = render(Chat, { entries: [payload], userId })

		expect(getByText('Hello World')).toBeInTheDocument()
	})
})

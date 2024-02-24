import { describe, test, expect, vi } from 'vitest'
import { render } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import Message from './Message.svelte'
import type { Payload } from '$lib/types/types'

const username = 'John'
const message = 'Hello World'

const payload: Payload = {
	type: 'payload',
	message,
	userId: '1',
	username,
	id: '2'
}

describe('Message component', () => {
	test('should render the message correctly', () => {
		const { getByText } = render(Message, { payload, status: 'success', isOwnMessage: false })

		expect(getByText(username)).toBeInTheDocument()
		expect(getByText(message)).toBeInTheDocument()
	})

	test('should render the loading state correctly', () => {
		const { getByText, getByTestId } = render(Message, {
			payload,
			status: 'loading',
			isOwnMessage: true
		})

		expect(getByText('You')).toBeInTheDocument()
		expect(getByTestId('progress-radial')).toBeInTheDocument()
	})

	test('should render the error state correctly', () => {
		const { getByText, getByRole } = render(Message, {
			payload,
			status: 'error',
			isOwnMessage: true
		})

		expect(getByText('Undelivered')).toBeInTheDocument()
		expect(getByRole('button', { name: 'Retry.' })).toBeInTheDocument()
	})

	test('should render the success state correctly', () => {
		const { getByText, getByTestId } = render(Message, {
			payload,
			status: 'success',
			isOwnMessage: true
		})

		expect(getByText('You')).toBeInTheDocument()
		expect(getByTestId('success-icon')).toBeInTheDocument()
	})

	test('should call the retry event when retry button is clicked', async () => {
		const user = userEvent.setup()
		const onRetry = vi.fn()

		const { getByRole, component } = render(Message, {
			payload,
			status: 'error',
			isOwnMessage: true
		})

		component.$on('retry', onRetry)

		await user.click(getByRole('button', { name: 'Retry.' }))

		expect(onRetry).toHaveBeenCalled()
	})
})

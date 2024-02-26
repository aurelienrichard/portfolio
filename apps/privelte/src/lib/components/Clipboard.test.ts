import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import Clipboard from './Clipboard.svelte'

describe('Clipboard component', () => {
	const props = { url: new URL('https://test.com') }

	test('should render the component correctly', () => {
		const { getByRole } = render(Clipboard, props)

		expect(getByRole('button', { name: 'Copy to clipboard.' })).toBeInTheDocument()
		expect(getByRole('textbox')).toHaveValue(props.url.href)
	})

	test('should select the input value when the input element is focused', () => {
		const { getByRole } = render(Clipboard, props)

		const input = getByRole('textbox') as HTMLInputElement

		input.focus()

		const selected = input.value.slice(input.selectionStart!, input.selectionEnd!)

		expect(selected).toBe(props.url.href)
	})
})

import { render } from '@testing-library/svelte'
import { test, expect } from 'vitest'
import Navbar from './Navbar.svelte'

test('should render', () => {
	const { getAllByRole } = render(Navbar)

	expect(getAllByRole('link')).toHaveLength(4)
})

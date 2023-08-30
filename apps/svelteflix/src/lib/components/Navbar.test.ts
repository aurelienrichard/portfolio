import { render, screen } from '@testing-library/svelte'
import { test, expect } from 'vitest'
import Navbar from './Navbar.svelte'

test('should render', () => {
	render(Navbar)

	expect(screen.getAllByRole('link')).toHaveLength(4)
})

import { test, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import { movieDetailsExample } from 'tests/data'
import MovieDetails from './MovieDetails.svelte'

const props = { movie: movieDetailsExample }

test('should render', () => {
	render(MovieDetails, props)
})

test('should show movie title as heading', () => {
	const { getByRole } = render(MovieDetails, props)

	expect(getByRole('heading', { level: 1, name: RegExp(props.movie.title) })).toBeVisible()
})

test('should show movie overview', () => {
	const { getByText } = render(MovieDetails, props)

	expect(getByText(props.movie.overview)).toBeVisible()
})

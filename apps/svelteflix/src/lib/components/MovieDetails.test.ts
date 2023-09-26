import { test, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import { movieDetailsExample } from 'tests/data'
import MovieDetails from './MovieDetails.svelte'
import { dollarFormatter } from '$lib/utils'

const props = { movie: movieDetailsExample, inWatchlist: false, session: null }

test('should render', () => {
	render(MovieDetails, props)
})

test('should show movie title as heading', () => {
	const { getByRole } = render(MovieDetails, props)

	expect(getByRole('heading', { level: 1, name: props.movie.title })).toBeVisible()
})

test('should show movie backdrop', () => {
	const { getByAltText } = render(MovieDetails, props)

	expect(getByAltText(props.movie.title)).toBeInTheDocument()
})

test('should show movie overview', () => {
	const { getByText } = render(MovieDetails, props)

	expect(getByText(props.movie.overview)).toBeVisible()
})

test('should show movie trailer iframe', () => {
	const { getByTitle } = render(MovieDetails, props)

	expect(getByTitle(/youtube video player/i)).toBeVisible()
})

test('should show movie release date', () => {
	const { getByText } = render(MovieDetails, props)

	expect(getByText(props.movie.release_date)).toBeVisible()
})

test('should show movie status', () => {
	const { getByText } = render(MovieDetails, props)

	expect(getByText(props.movie.status)).toBeVisible()
})

test('should show movie runtime', () => {
	const { getByText } = render(MovieDetails, props)

	expect(getByText(`${props.movie.runtime} minutes`)).toBeVisible()
})

test('should show movie budget', () => {
	const { getByText } = render(MovieDetails, props)

	const formattedBudget = dollarFormatter.format(props.movie.budget)

	expect(getByText(formattedBudget)).toBeVisible()
})

test('should show movie revenue', () => {
	const { getByText } = render(MovieDetails, props)

	const formattedRevenue = dollarFormatter.format(props.movie.budget)

	expect(getByText(formattedRevenue)).toBeVisible()
})

test('should show movie genres', () => {
	const { getByText } = render(MovieDetails, props)

	expect(getByText(props.movie.genres)).toBeVisible()
})

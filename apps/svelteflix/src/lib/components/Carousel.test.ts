import { test, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import { movieListResultExample } from 'tests/data'
import Carousel from './Carousel.svelte'
import { views } from '$lib/views'

const props = { view: views.trending, movies: [movieListResultExample] }

test('should render', () => {
	render(Carousel, props)
})

test('should show correct heading based on props', () => {
	const { getByRole } = render(Carousel, props)

	expect(getByRole('heading', { level: 2, name: RegExp(props.view.title) })).toBeVisible()
})

test('should show link when provided to props', () => {
	const { getByRole } = render(Carousel, props)

	expect(getByRole('link', { name: 'see all' })).toBeVisible()
})

test('should show movie posters when passed to props', () => {
	const { getByAltText } = render(Carousel, props)

	expect(getByAltText(movieListResultExample.title)).toBeInTheDocument()
})

test('should show as many movie posters as passed to props', () => {
	const { getAllByRole } = render(Carousel, {
		view: null,
		movies: [
			{ id: 1, title: 'one', poster_path: null },
			{ id: 2, title: 'two', poster_path: null },
			{ id: 3, title: 'third', poster_path: null }
		]
	})

	expect(getAllByRole('img')).toHaveLength(3)
})

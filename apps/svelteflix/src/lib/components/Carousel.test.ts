import { test, expect, afterEach } from 'vitest'
import { render, cleanup, screen } from '@testing-library/svelte'
import Carousel from './Carousel.svelte'
import type { View } from '$lib/views'
import type { MovieListResult } from '$lib/schemas'

const view: View = {
	title: 'Trending',
	endpoint: 'trending/movie/day',
	href: '/movies/trending'
}

const movie: MovieListResult = {
	id: 76600,
	title: 'Avatar: The Way of Water',
	poster_path: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg'
}

afterEach(() => {
	cleanup()
})

test('should render', () => {
	render(Carousel, { view: null, movies: [] })
})

test('should show correct heading based on props', () => {
	render(Carousel, {
		view,
		movies: []
	})

	expect(screen.getByRole('heading', { level: 2, name: /trending/i })).toBeInTheDocument()
})

test('should show link when provided to props', () => {
	render(Carousel, {
		view,
		movies: []
	})

	expect(screen.getByRole('link', { name: 'see all' })).toBeInTheDocument()
})

test('should show movie posters when passed to props', () => {
	render(Carousel, {
		view: null,
		movies: [movie]
	})

	expect(screen.getByAltText(movie.title)).toBeInTheDocument()
})

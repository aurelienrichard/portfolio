import type { MovieDetails, MovieListResult } from '$lib/schemas'

export const movieDetailsExample: MovieDetails = {
	id: 76600,
	budget: 460000000,
	genres: 'Science Fiction, Adventure, Action',
	overview:
		'Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.',
	images: null,
	recommendations: [],
	release_date: '2022-12-14',
	revenue: 2320250281,
	runtime: 192,
	status: 'Released',
	title: 'Avatar: The Way of Water',
	videos: null,
	vote_average: 7.657,
	vote_count: 9776,
	backdrop: {
		aspect_ratio: 1.778,
		file_path: '/8rpDcsfLJypbO6vREc0547VKqEv.jpg',
		iso_639_1: null
	},
	logo: {
		aspect_ratio: 3.651,
		file_path: '/r5gjwzikHYWw6MC2Loq77ZDYCeP.png',
		iso_639_1: 'en'
	},
	trailer: {
		iso_639_1: 'en',
		key: 'o5F8MOz_IDw',
		site: 'YouTube',
		type: 'Trailer',
		official: true
	}
}

export const movieListResultExample: MovieListResult = {
	id: 76600,
	title: 'Avatar: The Way of Water',
	poster_path: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg'
}

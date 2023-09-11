import { z } from 'zod'

export const genreSchema = z.object({
	id: z.number(),
	name: z.string()
})

export type Genre = z.infer<typeof genreSchema>

export const productionCountrySchema = z.object({
	iso_3166_1: z.string(),
	name: z.string()
})

export type ProductionCountry = z.infer<typeof productionCountrySchema>

export const spokenLanguageSchema = z.object({
	iso_639_1: z.string(),
	name: z.string()
})

export type SpokenLanguage = z.infer<typeof spokenLanguageSchema>

export const movieListResultSchema = z.object({
	adult: z.boolean(),
	backdrop_path: z.string(),
	genre_ids: z.array(z.number()),
	id: z.number(),
	original_language: z.string(),
	original_title: z.string(),
	overview: z.string(),
	popularity: z.number(),
	poster_path: z.string(),
	release_date: z.string(),
	title: z.string(),
	video: z.boolean(),
	vote_average: z.number(),
	vote_count: z.number()
})

export type MovieListResult = z.infer<typeof movieListResultSchema>

export const movieListSchema = z.object({
	page: z.number(),
	results: z.array(movieListResultSchema),
	total_pages: z.number(),
	total_results: z.number()
})

export type MovieList = z.infer<typeof movieListSchema>

export const imageSchema = z.object({
	aspect_ratio: z.number(),
	file_path: z.string(),
	height: z.number(),
	iso_639_1: z.string().nullable(),
	vote_average: z.number(),
	vote_count: z.number(),
	width: z.number()
})

export type Image = z.infer<typeof imageSchema>

export const movieImagesSchema = z.object({
	id: z.number(),
	backdrops: z.array(imageSchema),
	posters: z.array(imageSchema)
})

export type MovieImages = z.infer<typeof movieImagesSchema>

export const videoSchema = z.object({
	iso_639_1: z.string(),
	iso_3166_1: z.string(),
	name: z.string(),
	key: z.string(),
	site: z.string(),
	size: z.number(),
	type: z.string(),
	official: z.boolean(),
	published_at: z.string(),
	id: z.string()
})

export type Video = z.infer<typeof videoSchema>

export const movieDetailsSchema = z.object({
	adult: z.boolean(),
	backdrop_path: z.string(),
	budget: z.number(),
	genres: z.array(genreSchema),
	homepage: z.string().optional(),
	id: z.number(),
	images: z.object({
		backdrops: z.array(imageSchema),
		logos: z.array(imageSchema),
		posters: z.array(imageSchema)
	}),
	imdb_id: z.string().optional(),
	original_language: z.string(),
	original_title: z.string(),
	overview: z.string(),
	popularity: z.number(),
	poster_path: z.string(),
	production_countries: z.array(productionCountrySchema),
	// recommendations: z.object({
	// 	page: z.number(),
	// 	results: z.array(movieListResultSchema),
	// 	total_pages: z.number(),
	// 	total_results: z.number()
	// }),
	release_date: z.string(),
	revenue: z.number(),
	runtime: z.number(),
	spoken_languages: z.array(spokenLanguageSchema),
	status: z.enum([
		'Rumored',
		'Planned',
		'In Production',
		'Post Production',
		'Released',
		'Canceled'
	]),
	tagline: z.string(),
	title: z.string(),
	video: z.boolean(),
	// videos: z.object({
	// 	results: z.array(videoSchema)
	// }),
	vote_average: z.number(),
	vote_count: z.number()
})

export type MovieDetails = z.infer<typeof movieDetailsSchema>

export const featuredMovieSchema = movieDetailsSchema
	.pick({ id: true, title: true, images: true })
	.transform((schema) => ({
		...schema,
		backdrop:
			schema.images.backdrops.find(({ iso_639_1 }) => !iso_639_1) ??
			schema.images.backdrops[0]!,
		logo:
			schema.images.logos.find(({ iso_639_1 }) => iso_639_1 === 'en') ??
			schema.images.logos[0]!
	}))

export type FeaturedMovie = z.infer<typeof featuredMovieSchema>

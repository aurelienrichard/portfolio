import { z } from 'zod'

export const genreSchema = z
	.object({
		name: z.string()
	})
	.transform((genre) => genre.name)

export type Genre = z.infer<typeof genreSchema>

export const movieListResultSchema = z.object({
	id: z.number(),
	poster_path: z.string().nullable(),
	title: z.string()
})

export type MovieListResult = z.infer<typeof movieListResultSchema>

export const movieListSchema = z
	.object({
		page: z.number(),
		results: z.array(movieListResultSchema),
		total_pages: z.number(),
		total_results: z.number()
	})
	.transform((schema) => ({
		...schema,
		results: schema.results.filter(
			(result, index, results) => results.findIndex(({ id }) => result.id === id) === index
		)
	}))

export type MovieList = z.infer<typeof movieListSchema>

export const imageSchema = z.object({
	aspect_ratio: z.number(),
	file_path: z.string(),
	iso_639_1: z.string().nullable()
})

export type Image = z.infer<typeof imageSchema>

export const videoSchema = z.object({
	iso_639_1: z.string(),
	key: z.string(),
	site: z.string(),
	type: z.string(),
	official: z.boolean()
})

export type Video = z.infer<typeof videoSchema>

export const movieDetailsSchema = z
	.object({
		id: z.number(),
		budget: z.number(),
		genres: z.array(genreSchema).transform((genres) => genres.join(', ')),
		images: z.object({
			backdrops: z.array(imageSchema),
			logos: z.array(imageSchema)
		}),
		overview: z.string(),
		recommendations: z
			.object({
				results: z.array(movieListResultSchema)
			})
			.transform(({ results }) => results),
		release_date: z.string(),
		revenue: z.number(),
		runtime: z.number(),
		status: z.enum([
			'Rumored',
			'Planned',
			'In Production',
			'Post Production',
			'Released',
			'Canceled'
		]),
		title: z.string(),
		videos: z.object({
			results: z.array(videoSchema)
		}),
		vote_average: z.number(),
		vote_count: z.number()
	})
	.transform((schema) => ({
		...schema,
		backdrop:
			schema.images.backdrops.find(({ iso_639_1 }) => !iso_639_1) ??
			schema.images.backdrops[0] ??
			null,
		logo:
			schema.images.logos.find(({ iso_639_1 }) => iso_639_1 === 'en') ??
			schema.images.logos[0] ??
			null,
		trailer:
			schema.videos.results.find(
				({ iso_639_1, official, site, type }) =>
					official && iso_639_1 === 'en' && type === 'Trailer' && site === 'YouTube'
			) ??
			schema.videos.results.find(
				({ iso_639_1, official, site, type }) =>
					official && iso_639_1 === 'en' && type === 'Teaser' && site === 'YouTube'
			) ??
			schema.videos.results[0] ??
			null,
		images: null,
		videos: null
	}))

export type MovieDetails = z.infer<typeof movieDetailsSchema>

export const views = {
	trending: {
		title: 'Trending',
		endpoint: 'trending/movie/day',
		href: '/movies/trending'
	},
	playing: {
		title: 'Now playing',
		endpoint: 'movie/now_playing',
		href: '/movies/playing'
	},
	upcoming: {
		title: 'Upcoming',
		endpoint: 'movie/upcoming',
		href: '/movies/upcoming'
	}
} as const

export type ViewsKey = keyof typeof views
export type View = (typeof views)[ViewsKey]
export type Title = View['title']
export type Endpoint = View['endpoint']
export type Href = View['href']

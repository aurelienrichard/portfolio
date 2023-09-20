import type { MovieDetails, MovieListResult } from '$lib/schemas'

export const movieDetailsExample: MovieDetails = {
	id: 76600,
	budget: 460000000,
	genres: ['Science Fiction', 'Adventure', 'Action'],
	images: {
		backdrops: [],
		logos: []
	},
	overview:
		'Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.',
	recommendations: [
		{
			id: 136283,
			poster_path: null,
			title: "Dans l'oeil d'un tueur"
		},
		{
			id: 823999,
			poster_path: '/8QVbWBv94BAT9u1q9uJccwOxMzt.jpg',
			title: 'Diabolik - Ginko Attacks'
		},
		{
			id: 183392,
			poster_path: '/26SMEXJl3978dn2svWBSqHbLl5U.jpg',
			title: 'Capturing Avatar'
		},
		{
			id: 1033219,
			poster_path: '/ay8SLFTMKzQ0i5ewOaGHz2bVuZL.jpg',
			title: 'Attack on Titan'
		},
		{
			id: 111332,
			poster_path: '/d9oqcfeCyc3zmMal6eJbfj3gatc.jpg',
			title: 'Avatar: Creating the World of Pandora'
		},
		{
			id: 1064215,
			poster_path: '/3Xq54xQjEPxBg7yg6mv2NPnHdDA.jpg',
			title: 'Rafadan Tayfa: Galaktik Tayfa'
		},
		{
			id: 980078,
			poster_path: '/ewF3IlGscc7FjgGEPcQvZsAsgAW.jpg',
			title: 'Winnie the Pooh: Blood and Honey'
		},
		{
			id: 676841,
			poster_path: '/qiAM7Y8xF8wJDDsjeSuLgzyFGmd.jpg',
			title: 'Unhappily Ever After'
		},
		{
			id: 83121,
			poster_path: '/xJ5XE14dYPcGA0ychIjbnvlnK0d.jpg',
			title: 'The Long Hair of Death'
		},
		{
			id: 874764,
			poster_path: '/aKRuGCWOnhe4JEhgB10j6PbhmM2.jpg',
			title: 'Avatar Ages: Illusions'
		},
		{
			id: 315162,
			poster_path: '/kuf6dutpsT0vSVehic3EZIqkOBt.jpg',
			title: 'Puss in Boots: The Last Wish'
		},
		{
			id: 594767,
			poster_path: '/A3ZbZsmsvNGdprRi2lKgGEeVLEH.jpg',
			title: 'Shazam! Fury of the Gods'
		},
		{
			id: 1007938,
			poster_path: '/mnPEFDN6hb41I536OY8DHdFJ5lN.jpg',
			title: 'Punorjonmo'
		},
		{
			id: 640146,
			poster_path: '/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg',
			title: 'Ant-Man and the Wasp: Quantumania'
		},
		{
			id: 762338,
			poster_path: '/e6RTnLXcvA4TkvYW5rpy9pLUa12.jpg',
			title: 'Mainkar Chipay'
		},
		{
			id: 1109607,
			poster_path: null,
			title: 'N!CE COUPLE'
		},
		{
			id: 1109558,
			poster_path: '/pmLdywG7pffcVtHbevKtbT3T69o.jpg',
			title: 'Bottle George'
		},
		{
			id: 1109559,
			poster_path: null,
			title: 'Ambush Massage 88'
		},
		{
			id: 267805,
			poster_path: '/4qrJiGola6k04RA8YDG7Ac5UVlj.jpg',
			title: 'There Are No Saints'
		},
		{
			id: 965839,
			poster_path: '/n9YWVQRc0zw0nwrFcOkOpffZxjc.jpg',
			title: 'Lord of the Streets'
		}
	],
	release_date: '2022-12-14',
	revenue: 2320250281,
	runtime: 192,
	status: 'Released',
	title: 'Avatar: The Way of Water',
	videos: {
		results: [
			{
				iso_639_1: 'en',
				key: 'pwA0k1oNrhI',
				site: 'YouTube',
				type: 'Behind the Scenes',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'JOPqEV0xa4U',
				site: 'YouTube',
				type: 'Behind the Scenes',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'mBrl8b-pVdw',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'wrhDc_SuqQ0',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'ILOFdzFH6SU',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'PrOET-HCEPY',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'POfC3TrDO24',
				site: 'YouTube',
				type: 'Clip',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'Sw9hdSjzZjc',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'y_0CaX66H9M',
				site: 'YouTube',
				type: 'Behind the Scenes',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'aw6OY4q8-xU',
				site: 'YouTube',
				type: 'Behind the Scenes',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'S3wIOxDRixo',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'qvi5sCZR36U',
				site: 'YouTube',
				type: 'Behind the Scenes',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'xHNMEvYPdZE',
				site: 'YouTube',
				type: 'Clip',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'Cc5Z4Ek_xZA',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: '_siNCDIbZ3s',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'fNx9lIJSQHU',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: '87gmvp8lOjE',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'c3pfyfhZ3CE',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'Xe--hgPX5xw',
				site: 'YouTube',
				type: 'Clip',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'URd5WFB_ly4',
				site: 'YouTube',
				type: 'Behind the Scenes',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'mTQorpZnSIk',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'LonqJIvAx58',
				site: 'YouTube',
				type: 'Clip',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'Ox8_HtUicHk',
				site: 'YouTube',
				type: 'Behind the Scenes',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 's7NqXuRQKnc',
				site: 'YouTube',
				type: 'Behind the Scenes',
				official: true
			},
			{
				iso_639_1: 'en',
				key: '61Ovj4zf1A0',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'T6qEEPZc5Zs',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'LYBkszmJGr8',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'DFcVOY2vnR4',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'ToXAt1v0LFk',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'uGerIQIjuqg',
				site: 'YouTube',
				type: 'Behind the Scenes',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'qtVobvo7AVo',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'yeWJqDn-F8E',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'fuIHQL9GmBk',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: '5gXcUlS2G6Q',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'T7-eMHRbcpg',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: '8QLYI_g9HVU',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'cTjPRrpKXk0',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'WvE8QQbLlVA',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'TpVygGgAS20',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'QLPPQ9Ny08s',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: '7ri_fL38YKY',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'wbcfC92X2Y0',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'pZ9fvr2SdTg',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: '4FzAIGWO7BI',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'YGxCma-Oslw',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'WvsGuklGdzY',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'grmSIR_Z1C4',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'CuyHogczkvw',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'IF-L-ixROGI',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'Ts_u-nZKjeI',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'DBtCotfEpks',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: '_rlZTPO-GAM',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'XflcljqFRKU',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'o5F8MOz_IDw',
				site: 'YouTube',
				type: 'Trailer',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'rfQxu6srHYw',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'SMRHGu3F69w',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'F6-gmubgjzQ',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'gyhWptAufgA',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'GmBtaV4ugbc',
				site: 'YouTube',
				type: 'Teaser',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'd9MyW72ELq0',
				site: 'YouTube',
				type: 'Trailer',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'XiSW80Z2PBU',
				site: 'YouTube',
				type: 'Featurette',
				official: true
			},
			{
				iso_639_1: 'en',
				key: 'a8Gx8wiNbs8',
				site: 'YouTube',
				type: 'Trailer',
				official: true
			}
		]
	},
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

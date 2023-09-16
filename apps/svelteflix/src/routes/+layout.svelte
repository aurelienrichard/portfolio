<script lang="ts">
	import { page } from '$app/stores'
	import tmdb from '$lib/images/tmdb.svg'
	import '../app.css'
	import logo from '$lib/images/logo.svg'
</script>

<nav class="text-accent flex h-14 w-full items-center justify-between py-4">
	<a href="/">
		<img class="h-6" src={logo} alt="SvelteFlix" />
	</a>
	<div class="wrap flex gap-3 whitespace-nowrap font-semibold">
		<a href="/search">Search</a>
		<a href="/watchlist">Watchlist</a>
		<a href="/login">Log in</a>
	</div>
</nav>

<main
	class:h-0={$page.data.infinite}
	class:flex-1={$page.data.infinite}
	class:overflow-clip={$page.data.infinite}
	class="flex w-full flex-col gap-10 sm:gap-16 lg:gap-20"
>
	<slot />
</main>

<footer class="align-center flex w-full flex-col justify-center pb-4 pt-16 text-center text-sm">
	<p>This product uses the</p>
	<a class="m-auto w-fit" href="https://www.themoviedb.org/">
		<img class="h-3" src={tmdb} alt="The Movie Database (TMDB)" />
	</a>
	<p>API but is not endorsed or certified by TMDB.</p>
</footer>

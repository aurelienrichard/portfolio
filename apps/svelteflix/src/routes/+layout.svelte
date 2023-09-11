<script>
	import tmdb from '$lib/images/tmdb.svg'
	import '../app.css'
	import logo from '$lib/images/logo.svg'
</script>

<nav class="text-accent flex h-12 w-full max-w-7xl items-center justify-between px-12">
	<a href="/">
		<img class="h-4" src={logo} alt="SvelteFlix" />
	</a>
	<div class="flex gap-4 font-semibold">
		<a href="/search">Search</a>
		<a href="/watchlist">Watchlist</a>
		<a href="/login">Log in</a>
	</div>
</nav>

<main class="w-full max-w-7xl px-12">
	<slot />
</main>

<footer
	class="align-center flex w-full max-w-7xl flex-col justify-center px-12 py-8 text-center text-xs"
>
	<p>This product uses the</p>
	<a class="m-auto w-fit" href="https://www.themoviedb.org/">
		<img class="h-3" src={tmdb} alt="The Movie Database (TMDB)" />
	</a>
	<p>API but is not endorsed or certified by TMDB.</p>
</footer>

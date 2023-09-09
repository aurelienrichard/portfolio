<script>
	import tmdb from '$lib/images/tmdb.svg'
	import '../app.css'
	import Navbar from '$lib/components/Navbar.svelte'
</script>

<Navbar />

<main>
	<slot />
</main>

<footer
	class="align-center flex w-full max-w-7xl flex-col justify-center gap-1 text-center text-xs"
>
	<p>This product uses the</p>
	<a class="m-auto w-fit" href="https://www.themoviedb.org/">
		<img class="h-3" src={tmdb} alt="The Movie Database (TMDB)" />
	</a>
	<p>API but is not endorsed or certified by TMDB.</p>
</footer>

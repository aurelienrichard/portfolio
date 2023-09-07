<script>
	import tmdb from '$lib/images/tmdb.svg'
	import '../app.css'
	import Navbar from '$lib/components/Navbar.svelte'
</script>

<Navbar />

<main>
	<slot />
</main>

<footer>
	<p>
		Data provided by
		<a href="https://www.themoviedb.org/">
			<img src={tmdb} alt="The Movie Database (TMDB)" />
		</a>
	</p>
</footer>

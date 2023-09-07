<script lang="ts">
	import logo from '$lib/images/logo.svg'
</script>

<nav class="text-accent flex h-12 w-full max-w-7xl items-center justify-between px-4 font-semibold">
	<a href="/">
		<img class="h-4" src={logo} alt="SvelteFlix" />
	</a>
	<div class="flex gap-4">
		<a href="/search">Search</a>
		<a href="/watchlist">Watchlist</a>
		<a href="/login">Log in</a>
	</div>
</nav>

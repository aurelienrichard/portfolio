<script lang="ts">
	import '../styles.css'
	import Game from './Game.svelte'
</script>

<svelte:head>
	<title>rock paper scissors lizard spock</title>
	<meta name="description" content="rock paper scissors lizard spock" />
</svelte:head>

<main>
	<Game />
</main>

<style>
	main {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>

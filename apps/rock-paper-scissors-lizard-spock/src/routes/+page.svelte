<script lang="ts">
	import '../styles.css'
	import Attribution from './Attribution.svelte'
	import Game from './Game.svelte'
</script>

<svelte:head>
	<title>Rock, Paper, Scissors, Lizard, Spock</title>
	<meta name="description" content="play rounds against the computer" />
</svelte:head>

<Attribution fill="var(--white-text)" />

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
		overflow: hidden;
	}
</style>

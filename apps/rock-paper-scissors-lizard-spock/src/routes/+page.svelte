<script lang="ts">
	import '../styles.css'
	import { Attribution } from 'ui'
	import Game from './Game.svelte'
</script>

<svelte:head>
	<title>rock paper scissors lizard spock</title>
	<meta name="description" content="rock paper scissors lizard spock" />
</svelte:head>

<main>
	<Attribution fill="#fff" />
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

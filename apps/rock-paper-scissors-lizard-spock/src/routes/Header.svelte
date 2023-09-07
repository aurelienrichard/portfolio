<script lang="ts">
	import { blur } from 'svelte/transition'

	export let score: number
</script>

<header>
	<img src="/logo.svg" alt="rock paper scissors lizard spock" />
	<div class="score-container">
		<p class="score-label">score</p>
		<h1 transition:blur class="score-value">
			{Math.floor(score)}
		</h1>
	</div>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: inherit;
		margin-bottom: 1em;
		padding: 1em 1.3em;
		border: 0.2em solid var(--header-outline);
		border-radius: 1em;
		box-shadow:
			inset 0 0 0 1.5px rgba(0, 0, 0, 0.05),
			0 0 0 1.5px rgba(0, 0, 0, 0.05);
	}

	img {
		font-size: 7.5em;
		height: 1em;
		width: 1em;
		pointer-events: none;
	}

	.score-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		background: var(--white-text);
		position: absolute;
		height: calc(100% - 2em);
		padding: 1em 3.3em;
		border-radius: 0.5em;
		right: 1.3em;
	}

	.score-label {
		font-size: min(1.5em, 1.2rem);
		color: var(--score-text);
		text-transform: uppercase;
		letter-spacing: 0.12em;
		text-align: center;
		font-weight: 600;
		margin: 0;
	}

	.score-value {
		color: var(--dark-text);
		font-size: 4.5em;
		font-weight: 700;
		margin: 0;
		line-height: 1;
	}
</style>

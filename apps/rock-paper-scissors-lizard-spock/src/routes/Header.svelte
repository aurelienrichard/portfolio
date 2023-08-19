<script lang="ts">
	let score = 12
</script>

<header>
	<img src="/logo.svg" alt="rock paper scissors lizard spock" />
	<div class="score-container">
		<p class="score-label">score</p>
		<h2 class="score-value">{score}</h2>
	</div>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: inherit;
		padding: 1em 1.3em;
		border: 3px solid var(--header-outline);
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
		user-select: none;
	}

	.score-label {
		color: var(--score-text);
		text-transform: uppercase;
		letter-spacing: 1.5px;
		text-align: center;
		font-weight: 600;
		margin: 0;
	}

	.score-value {
		color: var(--dark-text);
		font-size: 4em;
		font-weight: 700;
		margin: 0;
		line-height: 1;
	}
</style>

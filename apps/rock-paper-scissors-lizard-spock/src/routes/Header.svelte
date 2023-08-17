<script lang="ts">
	let score = 0
</script>

<header>
	<img src="/logo.svg" alt="rock paper scissors lizard spock" />
	<div class="score-container">
		<div class="score-label">score</div>
		<div class="score-value">{score}</div>
	</div>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: inherit;
		padding: 1.25em 2em;
		background: red;
	}

	img {
		font-size: 7em;
		height: 1em;
		width: 1em;
		pointer-events: none;
	}
</style>

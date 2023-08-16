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
		width: 50%;
		margin: 0 auto;
		background: red;
	}
</style>

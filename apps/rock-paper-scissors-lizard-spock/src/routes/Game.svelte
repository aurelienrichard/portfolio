<script lang="ts">
	import Header from './Header.svelte'
</script>

<div class="game">
	<Header />
	<div class="move-selection">
		<button class="rock">
			<img src="icon-rock.svg" alt="rock" />
		</button>
		<button class="paper">
			<img src="icon-paper.svg" alt="paper" />
		</button>
		<button class="scissors">
			<img src="icon-scissors.svg" alt="scissors" />
		</button>
		<button class="lizard">
			<img src="icon-lizard.svg" alt="lizard" />
		</button>
		<button class="spock">
			<img src="icon-spock.svg" alt="spock" />
		</button>
	</div>
</div>

<style>
	button {
		position: absolute;
		font-size: 7em;
		height: 1em;
		width: 1em;
		border-radius: 100%;
	}

	img {
		height: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	.game {
		display: flex;
		font-size: min(2vmin, 1rem);
		width: 90vmin;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1em;
	}

	.move-selection {
		background: no-repeat center/min(70%, 20rem) url('bg-pentagon.svg');
		height: 50vmin;
		width: 80vmin;
	}

	.rock {
		top: 50%;
		left: 50%;
		transform: translate(50%, 100%);
	}

	.paper {
		top: 50%;
		left: 50%;
		transform: translate(100%, -100%);
	}

	.scissors {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -200%);
	}

	.lizard {
		top: 50%;
		left: 50%;
		transform: translate(-150%, 100%);
	}

	.spock {
		top: 50%;
		left: 50%;
		transform: translate(-200%, -100%);
	}
</style>

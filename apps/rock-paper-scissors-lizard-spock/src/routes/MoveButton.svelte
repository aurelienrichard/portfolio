<script lang="ts">
	import type { Move } from './moves'
	export let move: Move
</script>

<button class={`${move}-button`}>
	<div class={`border border-${move}`}>
		<div class="icon-background">
			<img src={`icon-${move}.svg`} alt={move} />
		</div>
	</div>
</button>

<style>
	button {
		position: absolute;
		font-size: min(12em, 10rem);
		height: 1em;
		width: 1em;
		border-radius: 100%;
		background: transparent;
		border: 0;
	}

	img {
		height: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	.border-rock img {
		height: 40%;
	}

	.border {
		height: 100%;
		width: 100%;
		border-radius: 100%;
		box-shadow: inset 0 -0.05em 0 -0.01em rgba(0, 0, 0, 0.3);
	}

	.border-rock {
		background: linear-gradient(var(--rock-gradient-top), var(--rock-gradient-bottom));
	}

	.border-paper {
		background: linear-gradient(var(--paper-gradient-top), var(--paper-gradient-bottom));
	}

	.border-scissors {
		background: linear-gradient(var(--scissors-gradient-top), var(--scissors-gradient-bottom));
	}

	.border-lizard {
		background: linear-gradient(var(--lizard-gradient-top), var(--lizard-gradient-bottom));
	}

	.border-spock {
		background: linear-gradient(var(--spock-gradient-top), var(--spock-gradient-bottom));
	}

	.icon-background {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 75%;
		width: 75%;
		background: var(--white-text);
		border-radius: 100%;
		box-shadow: inset 0 0.05em 0 -0.01em rgba(0, 0, 0, 0.15);
	}

	.rock-button {
		top: 50%;
		left: 50%;
		transform: translate(15%, 60%);
	}

	.paper-button {
		top: 50%;
		left: 50%;
		transform: translate(60%, -65%);
	}

	.scissors-button {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -150%);
	}

	.lizard-button {
		top: 50%;
		left: 50%;
		transform: translate(-115%, 60%);
	}

	.spock-button {
		top: 50%;
		left: 50%;
		transform: translate(-160%, -65%);
	}
</style>

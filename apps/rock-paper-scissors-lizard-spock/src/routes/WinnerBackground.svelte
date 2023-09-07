<div class="container">
	<div class="winner-1 winner-layer" />
	<div class="winner-2 winner-layer" />
	<div class="winner-3 winner-layer" />
	<div class="winner-4 winner-layer" />
</div>

<style>
	.container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -3000;
		height: 250%;
		width: 250%;
	}

	.winner-layer {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 100%;
		background: rgba(255, 255, 255, 0.075);
		height: 40%;
		width: 40%;
	}

	.winner-1 {
		animation: scale 6s linear 1.7s infinite;
	}

	.winner-2 {
		animation: scale 6s linear 3.2s infinite;
	}

	.winner-3 {
		animation: scale 6s linear 4.7s infinite;
	}

	.winner-4 {
		animation: scale 6s linear 6.2s infinite;
	}

	@keyframes scale {
		0% {
			transform: translate(-50%, -50%) scale(1);
			opacity: 1;
		}

		100% {
			transform: translate(-50%, -50%) scale(2.5);
			opacity: 0;
		}
	}

	@keyframes fade {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}
</style>

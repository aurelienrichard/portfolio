<div class="winner-layer container">
	<div class="winner-1 winner-layer" />
	<div class="winner-2 winner-layer" />
	<div class="winner-3 winner-layer" />
	<div class="winner-4 winner-layer" />
</div>

<style>
	.container {
		z-index: -3000;
		height: 250%;
		width: 250%;
		opacity: 1;
	}

	.winner-layer {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 100%;
	}

	.winner-1 {
		background: rgba(255, 255, 255, 0.075);
		height: 40%;
		width: 40%;
		z-index: -2997;
		animation: scale 6s linear 1.7s infinite;
	}

	.winner-2 {
		background: rgba(255, 255, 255, 0.075);
		height: 40%;
		width: 40%;
		z-index: -2998;
		animation: scale 6s linear 3.2s infinite;
	}

	.winner-3 {
		background: rgba(255, 255, 255, 0.075);
		height: 40%;
		width: 40%;
		z-index: -2999;
		animation: scale 6s linear 4.7s infinite;
	}

	.winner-4 {
		background: rgba(255, 255, 255, 0.075);
		height: 40%;
		width: 40%;
		z-index: -2999;
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

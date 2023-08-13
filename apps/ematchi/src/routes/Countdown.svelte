<script lang="ts">
	export let duration: number
	export let remaining: number
</script>

<div class="countdown">
	<button>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><title>pause-circle</title><path
				d="M15,16H13V8H15M11,16H9V8H11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
				fill="#999"
			/></svg
		>
	</button>
	<div class="duration">
		<div class="remaining" style="--p: {remaining / duration}" />
	</div>
</div>

<style>
	button {
		font-size: 8em;
		height: 1em;
		width: 1em;
	}

	svg {
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
	}

	.countdown {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1em;
	}

	.duration {
		flex: 1;
		height: 1em;
		background: #ccc;
	}

	.remaining {
		position: absolute;
		width: calc(100% * var(--p));
		height: 100%;
		background: #999;
	}
</style>

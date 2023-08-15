<script lang="ts">
	import { fade, scale } from 'svelte/transition'
	import { cubicOut } from 'svelte/easing'
</script>

<div class="modal-background" transition:fade={{ duration: 200 }}>
	<div class="modal" transition:scale={{ start: 0.9, duration: 400, easing: cubicOut }}>
		<slot />
	</div>
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(10px);
		display: grid;
		place-items: center;
		z-index: 999;
		transition: all 0.2s;
	}
</style>

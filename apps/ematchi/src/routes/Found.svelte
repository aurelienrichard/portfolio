<script lang="ts">
	import type { Emoji } from '../emojis'
	export let found: Emoji[]
</script>

<div class="found">
	{#each found as emoji}
		<img src={emoji.url} alt={emoji.alt} />
	{/each}
</div>

<style>
	.found {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1em;
		height: 100%;
	}

	img {
		width: 5em;
		height: 5em;
		pointer-events: none;
	}
</style>

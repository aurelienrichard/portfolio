<script lang="ts">
	/* 	import type { PageData } from './$types'

	export let data: PageData */

	let slots = 10
</script>

<h1 class="h1 text-surface-600-300-token mb-8 text-center leading-snug md:mb-12">
	<span class="capitalize">create</span>
	a new
	<span
		class="dark:from-gradient-1-dark dark:to-gradient-2-dark from-gradient-1-light to-gradient-2-light bg-gradient-to-br box-decoration-clone bg-clip-text capitalize text-transparent"
		>room</span
	>
</h1>
<div class="flex flex-col gap-3 md:gap-6">
	<label class="label">
		<span>Custom URL</span>
		<div
			class="input-group input-group-divider [&_input]:bg-surface-100-800-token dark:focus-within:border-primary-500 grid-cols-[1fr_auto] focus-within:border-pink-600"
		>
			<input type="text" />
			<button type="button" class="variant-soft-surface" title="hello">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
					/>
				</svg>
			</button>
		</div>
	</label>

	<label class="label">
		<span
			><span
				class="h3 dark:from-gradient-1-dark dark:to-gradient-2-dark from-gradient-1-light to-gradient-2-light bg-gradient-to-br box-decoration-clone bg-clip-text font-bold text-transparent"
				>{slots}</span
			> slots</span
		>
		<input type="range" bind:value={slots} min="2" max="10" />
	</label>
</div>

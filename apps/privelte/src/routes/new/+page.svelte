<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import type { PageData } from './$types'

	export let data: PageData
	let slots = 10
</script>

<h1 class="h1 text-surface-600-300-token mb-8 text-center leading-snug md:mb-12">
	Create a new
	<span
		class="dark:from-gradient-1-dark dark:to-gradient-2-dark from-gradient-1-light to-gradient-2-light bg-gradient-to-br box-decoration-clone bg-clip-text capitalize text-transparent"
		>room</span
	>.
</h1>

<form method="POST">
	<div class="grid gap-3 md:grid-cols-2 md:gap-6">
		<label class="label capitalize">
			<span>identifier</span>
			<div
				class="input-group input-group-divider [&_input]:bg-surface-100-800-token dark:focus-within:border-primary-500 grid-cols-[1fr_auto] focus-within:border-indigo-600"
			>
				<input type="text" name="id" value={data.id} readonly />
				<button
					type="button"
					on:click={async () => {
						await invalidateAll()
					}}
					class="dark:variant-soft-tertiary variant-soft-surface"
					title="Generate a new identifier"
				>
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

		<label class="label capitalize">
			<span
				><span
					class="h2 dark:from-gradient-1-dark dark:to-gradient-2-dark from-gradient-1-light to-gradient-2-light bg-gradient-to-br box-decoration-clone bg-clip-text text-transparent"
					>{slots}</span
				> slots</span
			>
			<input type="range" name="slots" bind:value={slots} min="2" max="10" />
		</label>
	</div>
	<div class="mt-8 flex md:mt-12">
		<button
			type="submit"
			class="btn md:btn-lg dark:from-gradient-1-dark dark:to-gradient-2-dark from-gradient-1-light to-gradient-2-light mx-auto bg-gradient-to-br font-semibold capitalize"
		>
			Let's chat
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="ml-1 h-5 w-5 md:h-6 md:w-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
				/>
			</svg>
		</button>
	</div>
</form>

<script lang="ts">
	/* import type { PageData } from './$types'

	export let data: PageData */
	let currentMessage = ''
	const messages = [
		'message 1',
		'message 2',
		'message 3',
		'message 4',
		'message 5',
		'message 6',
		'message 7',
		'message 8',
		'message 9',
		'message 10',
		'message 11',
		'message 12',
		'message 13',
		'message 14',
		'message 15',
		'message 16',
		'message 17',
		'message 18',
		'message 19',
		'message 20'
	]
</script>

<div class="flex h-full flex-col">
	<div class="relative flex-1">
		<div class="absolute left-0 top-0 h-full w-full space-y-4 overflow-y-auto">
			{#each messages as message}
				<p class="h1">{message}</p>
			{/each}
		</div>
	</div>
	<hr class="my-4" />
	<div
		class="input-group input-group-divider dark:focus-within:border-primary-500 mt-auto grid-cols-[1fr_auto] focus-within:border-indigo-600"
	>
		<textarea
			bind:value={currentMessage}
			class="resize-none border-0 bg-transparent ring-0"
			name="message"
			placeholder="Write a message..."
			rows="1"
		/>
		<button
			type="submit"
			class="dark:from-gradient-1-dark dark:to-gradient-2-dark from-gradient-1-light to-gradient-2-light bg-gradient-to-br transition-opacity disabled:opacity-65"
			disabled={!currentMessage}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="h-6 w-6"
			>
				<path
					d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"
				/>
			</svg>
		</button>
	</div>
</div>

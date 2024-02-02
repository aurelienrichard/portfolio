<script lang="ts">
	import { clipboard } from '@skeletonlabs/skeleton'
	import { page } from '$app/stores'
	import type { PageData } from './$types'

	export let data: PageData
	let inputElement: HTMLInputElement
	let newMessage = ''

	const handleFocus = () => {
		inputElement.select()
	}
</script>

<div class="flex h-full flex-col">
	<div class="relative flex-1">
		<div class="absolute left-0 top-0 h-full w-full space-y-4 overflow-y-auto">
			<h1 class="h1 text-surface-600-300-token mb-3 text-center leading-snug md:mb-6">
				Your
				<span
					class="dark:from-gradient-1-dark dark:to-gradient-2-dark from-gradient-1-light to-gradient-2-light bg-gradient-to-br box-decoration-clone bg-clip-text capitalize text-transparent"
					>private</span
				>
				conversation starts
				<span
					class="dark:from-gradient-1-dark dark:to-gradient-2-dark from-gradient-1-light to-gradient-2-light bg-gradient-to-br box-decoration-clone bg-clip-text capitalize text-transparent"
					>here</span
				>.
			</h1>
			<p class="text-center md:text-xl">Share the link below to invite participants.</p>

			<div
				class="input-group input-group-divider [&_input]:bg-surface-100-800-token dark:focus-within:border-primary-500 grid-cols-[1fr_auto] focus-within:border-indigo-600"
			>
				<input
					bind:this={inputElement}
					on:focus={handleFocus}
					type="text"
					value={$page.url}
					data-clipboard="url"
					readonly
				/>
				<button
					type="button"
					class="dark:variant-soft-tertiary variant-soft-surface"
					use:clipboard={{ input: 'url' }}
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
							d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
						/>
					</svg>
				</button>
			</div>
			{#each data.messages as message (message.id)}
				<p class="h1">{message.content}</p>
			{/each}
		</div>
	</div>
	<hr class="my-4" />
	<form method="POST">
		<div
			class="input-group input-group-divider dark:focus-within:border-primary-500 mt-auto grid-cols-[1fr_auto] focus-within:border-indigo-600"
		>
			<textarea
				on:keydown={(e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault()
						e.currentTarget.form?.submit()
					}
				}}
				bind:value={newMessage}
				class="resize-none border-0 bg-transparent ring-0"
				name="message"
				placeholder={`Message @${data.room.id}`}
				rows="1"
			/>
			<button
				type="submit"
				class="dark:from-gradient-1-dark dark:to-gradient-2-dark from-gradient-1-light to-gradient-2-light bg-gradient-to-br transition-opacity disabled:opacity-65"
				disabled={!newMessage}
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
	</form>
</div>

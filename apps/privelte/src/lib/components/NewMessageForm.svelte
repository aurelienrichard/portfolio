<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { nanoid } from 'nanoid'
	import { page } from '$app/stores'
	import { invalidateAll } from '$app/navigation'

	export let roomId: string

	const dispatch = createEventDispatcher()
	let textarea: HTMLTextAreaElement
	let newMessage = ''

	const handleNewMessage = async () => {
		const id = nanoid()

		const response = await fetch($page.url.pathname, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, message: newMessage })
		})

		if (response.status !== 201) {
			await invalidateAll()

			return
		}

		dispatch('new-message', { newMessage, id })
		newMessage = ''
	}

	const setHeight = () => {
		if (textarea) {
			textarea.style.height = '40px'
			textarea.style.height = `${textarea.scrollHeight}px`
		}
	}
</script>

<div
	class="input-group input-group-divider dark:focus-within:border-primary-500 mt-auto grid-cols-[1fr_auto] focus-within:border-indigo-500 [&>div]:p-0"
>
	<div class="flex items-start">
		<textarea
			on:keydown={async (e) => {
				if (e.key === 'Enter' && !e.shiftKey) {
					e.preventDefault()
					if (newMessage) {
						await handleNewMessage()
					}
				}
			}}
			bind:this={textarea}
			bind:value={newMessage}
			on:input={setHeight}
			class="h-10 max-h-28 grow resize-none border-0 bg-transparent ring-0"
			name="message"
			placeholder={`Message @${roomId}`}
			maxlength="1000"
			rows="1"
		/>
	</div>
	<button
		disabled={!newMessage}
		type="submit"
		class="dark:from-primary-700 dark:to-primary-700 bg-gradient-to-br from-indigo-400 to-pink-400 transition-opacity disabled:opacity-50 disabled:hover:cursor-not-allowed"
		on:click={handleNewMessage}
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

<script lang="ts">
	import { clipboard } from '@skeletonlabs/skeleton'
	import { afterUpdate } from 'svelte'
	import Message from './Message.svelte'
	import { pendingMessages } from '$lib/stores'
	import { page } from '$app/stores'
	import type { Payload, Presence } from '$lib/types/types'

	export let entries: (Payload | Presence)[] = []
	export let userId: string

	let bottom: HTMLDivElement
	let inputElement: HTMLInputElement

	const handleFocus = () => {
		inputElement.select()
	}

	$: getStatus = (id: string) => {
		if (!$pendingMessages.get(id)) {
			return 'success'
		}

		const status = $pendingMessages.get(id)!

		return status
	}

	afterUpdate(() => {
		bottom.scrollIntoView({ behavior: 'smooth' })
	})
</script>

<div class="absolute left-0 top-0 h-full w-full space-y-4 overflow-y-auto overflow-x-clip px-4">
	<h1 class="h1 text-surface-600-300-token mb-3 text-center leading-snug md:mb-6">
		Welcome to your new
		<span
			class="dark:from-gradient-1-dark dark:to-gradient-2-dark from-gradient-1-light to-gradient-2-light bg-gradient-to-br box-decoration-clone bg-clip-text capitalize text-transparent"
			>room</span
		>
	</h1>
	<p class="text-center md:text-xl">Share the link below to invite participants.</p>
	<div
		class="input-group input-group-divider [&_input]:bg-surface-100-800-token dark:focus-within:border-primary-500 grid-cols-[1fr_auto] focus-within:border-indigo-500"
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
			title="Copy to clipboard."
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
	<hr class="my-4" />
	{#each entries as entry (entry.id)}
		{#if entry.type === 'presence'}
			<p class="text-surface-600-300-token">
				<span class="font-semibold">{entry.username}</span> has {entry.event} the room.
			</p>
		{:else}
			<Message
				on:retry
				payload={entry}
				status={getStatus(entry.id)}
				isOwnMessage={entry.userId === userId}
			/>
		{/if}
	{/each}
	<div bind:this={bottom} />
</div>

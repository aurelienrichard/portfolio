<script lang="ts">
	import { afterUpdate } from 'svelte'
	import Message from './Message.svelte'
	import { pendingMessages } from '$lib/stores'
	import { page } from '$app/stores'
	import type { Payload, Presence } from '$lib/types/types'
	import Clipboard from './Clipboard.svelte'

	export let entries: (Payload | Presence)[] = []
	export let userId: string

	let bottom: HTMLDivElement

	$: getStatus = (id: string) => {
		if (!$pendingMessages.get(id)) {
			return 'success'
		}

		const status = $pendingMessages.get(id)!

		return status
	}

	afterUpdate(() => {
		bottom.scrollIntoView?.({ behavior: 'smooth' })
	})
</script>

<div class="absolute left-0 top-0 h-full w-full space-y-4 overflow-y-auto overflow-x-clip px-4">
	<h1 class="h1 text-surface-600-300-token mb-3 text-center leading-snug md:mb-6">
		Welcome to your new
		<span
			class="dark:from-gradient-1-dark dark:to-gradient-2-dark from-gradient-1-light to-gradient-2-light bg-gradient-to-br box-decoration-clone bg-clip-text capitalize text-transparent"
			>room</span
		>.
	</h1>
	<p class="text-center md:text-xl">Share the link below to invite participants.</p>
	<Clipboard url={$page.url} />
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

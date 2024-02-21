<script lang="ts">
	import { ProgressRadial, clipboard } from '@skeletonlabs/skeleton'
	import { afterUpdate } from 'svelte'
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

	$: isLoading = (id: string) => {
		if (!$pendingMessages.get(id)) {
			return false
		}
		const { status } = $pendingMessages.get(id)!

		return status === 'loading'
	}

	$: isError = (id: string) => {
		if (!$pendingMessages.get(id)) {
			return false
		}
		const { status } = $pendingMessages.get(id)!

		return status === 'error'
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
		{:else if entry.userId === userId}
			<div
				class="card dark:from-primary-700 dark:to-primary-700 ml-auto max-w-prose space-y-2 break-words rounded-tr-none bg-gradient-to-br from-indigo-400 to-pink-400 px-4 py-2"
			>
				<header class="flex items-center justify-center">
					<span class="text-lg font-semibold">You</span>
					{#if isLoading(entry.id)}
						<ProgressRadial width="ml-auto w-5 h-5 mr-[0.11rem]" />
					{:else if isError(entry.id)}
						<span class="dark:text-tertiary-600 text-tertiary-900 ml-auto mr-1 text-lg"
							>Undelivered</span
						>
						<button type="button" class="mr-[0.05rem]" title="Retry.">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="dark:text-tertiary-600 text-tertiary-900 h-[1.45rem] w-[1.45rem]"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
								/>
							</svg>
						</button>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="ml-auto h-[1.49rem] w-[1.49rem]"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
					{/if}
				</header>
				<section class="">{entry.message}</section>
			</div>
		{:else}
			<div
				class="card variant-soft-surface dark:variant-soft-tertiary mr-auto max-w-prose space-y-2 break-words rounded-tl-none px-4 py-2"
			>
				<header class="text-lg font-semibold">
					{entry.username}
				</header>
				<section class="">{entry.message}</section>
			</div>
		{/if}
	{/each}
	<div bind:this={bottom} />
</div>

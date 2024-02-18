<script lang="ts">
	import { ProgressRadial, clipboard } from '@skeletonlabs/skeleton'
	import { onMount, afterUpdate } from 'svelte'
	import type { RealtimePresenceState } from '@supabase/supabase-js'
	import { nanoid } from 'nanoid'
	import { page } from '$app/stores'
	import type { PageData } from './$types'
	import { supabase } from '$lib/supabaseClient'
	import { invalidateAll } from '$app/navigation'

	interface Payload {
		type: 'payload'
		message: string
		userId: string
		username: string
		id: string
	}

	interface Presence {
		type: 'presence'
		username: string
		event: 'joined' | 'left'
		id: string
	}

	let presenceState: RealtimePresenceState
	const leftUserTimers = new Map<string, ReturnType<typeof setTimeout>>()
	export let data: PageData
	let inputElement: HTMLInputElement
	let newMessage = ''
	let loading = false
	let bottom: HTMLDivElement
	let chat: (Payload | Presence)[] = []

	const handleFocus = () => {
		inputElement.select()
	}

	const handleSubmit = async () => {
		if (loading) return

		loading = true
		const id = nanoid()

		const response = await fetch($page.url.pathname, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, message: newMessage })
		})

		if (response.status !== 201) {
			loading = false

			if (response.status === 500) {
				// display some error message
			}

			if (response.status === 401) {
				await invalidateAll()
			}

			return
		}

		newMessage = ''
		loading = false
	}

	onMount(() => {
		const channel = supabase.channel(data.room.id, {
			config: { presence: { key: data.userId } }
		})

		channel
			.on('presence', { event: 'sync' }, async () => {
				presenceState = channel.presenceState()

				if (!Object.hasOwnProperty.call(presenceState, data.userId)) {
					await channel.track({
						userId: data.userId,
						username: data.username
					})
				}
			})
			.on('presence', { event: 'join' }, ({ key, newPresences }) => {
				if (leftUserTimers.has(key)) {
					const timer = leftUserTimers.get(key)!
					clearTimeout(timer)
					leftUserTimers.delete(key)
					return
				}

				const { username } = newPresences.find(
					({ userId }) => userId === key
				) as unknown as { username: string }

				const id = nanoid()
				const presence: Presence = {
					type: 'presence',
					username,
					event: 'joined',
					id
				}

				chat = [...chat, presence]
			})
			.on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
				const { username } = leftPresences.find(
					({ userId }) => userId === key
				) as unknown as { username: string }

				const id = nanoid()
				const presence: Presence = {
					type: 'presence',
					username,
					event: 'left',
					id
				}

				leftUserTimers.set(
					key,
					setTimeout(() => {
						chat = [...chat, presence]
						leftUserTimers.delete(key)
					}, 15000)
				)
			})
			.on('broadcast', { event: 'new-message' }, ({ payload }: { payload: Payload }) => {
				chat = [...chat, payload]
			})
			.subscribe()

		return async () => {
			if (!Object.hasOwnProperty.call(presenceState, data.userId)) {
				await channel.untrack()
			}
			await supabase.removeChannel(channel)
		}
	})

	afterUpdate(() => {
		bottom.scrollIntoView({ behavior: 'smooth' })
	})
</script>

<div class="flex h-full flex-col">
	<div class="relative flex-1">
		<div
			class="absolute left-0 top-0 h-full w-full space-y-4 overflow-y-auto overflow-x-clip px-4"
		>
			<h1 class="h1 text-surface-600-300-token mb-3 text-center leading-snug md:mb-6">
				Your
				<span
					class="dark:from-gradient-1-dark dark:to-gradient-2-dark from-gradient-1-light to-gradient-2-light bg-gradient-to-br box-decoration-clone bg-clip-text capitalize text-transparent drop-shadow"
					>private</span
				>
				conversation starts
				<span
					class="dark:from-gradient-1-dark dark:to-gradient-2-dark from-gradient-1-light to-gradient-2-light bg-gradient-to-br box-decoration-clone bg-clip-text capitalize text-transparent drop-shadow"
					>here</span
				>.
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
					title="Copy to clipboard"
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
			{#each chat as entry (entry.id)}
				{#if entry.type === 'presence'}
					<p class="text-surface-600-300-token">
						<span class="font-semibold">{entry.username}</span> has {entry.event} the room.
					</p>
				{:else if entry.userId === data.userId}
					<div
						class="card dark:from-gradient-1-dark dark:to-gradient-2-dark ml-auto max-w-prose space-y-2 break-words rounded-tr-none bg-gradient-to-br from-indigo-400 to-pink-400 p-4 shadow"
					>
						<header class="text-lg font-semibold">You</header>
						<section class="">{entry.message}</section>
					</div>
				{:else}
					<div
						class="card variant-soft-surface dark:variant-soft-tertiary mr-auto max-w-prose space-y-2 break-words rounded-tl-none p-4 shadow"
					>
						<header class="text-lg font-semibold">{entry.username}</header>
						<section class="">{entry.message}</section>
					</div>
				{/if}
			{/each}
			<div bind:this={bottom} />
		</div>
	</div>
	<hr class="my-1" />
	<p class="dark:text-surface-600-300-token mb-1">
		Joined as <span class="dark:text-primary-500 font-semibold text-indigo-500"
			>{data.username}</span
		>
	</p>
	<div
		class="input-group input-group-divider dark:focus-within:border-primary-500 mt-auto grid-cols-[1fr_auto] focus-within:border-indigo-500"
	>
		<textarea
			on:keydown={async (e) => {
				if (e.key === 'Enter' && !e.shiftKey) {
					e.preventDefault()
					if (newMessage) {
						await handleSubmit()
					}
				}
			}}
			bind:value={newMessage}
			class="resize-none border-0 bg-transparent ring-0"
			name="message"
			placeholder={`Message @${data.room.id}`}
			rows="1"
			maxlength="1000"
		/>
		<button
			disabled={!newMessage || loading}
			type="submit"
			class="dark:from-gradient-1-dark dark:to-gradient-2-dark bg-gradient-to-br from-indigo-400 to-pink-400 transition-opacity disabled:opacity-50 disabled:hover:cursor-not-allowed"
			on:click={handleSubmit}
		>
			{#if loading}
				<ProgressRadial width="w-6" />
			{:else}
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
			{/if}
		</button>
	</div>
</div>

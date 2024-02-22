<script lang="ts">
	import { onMount } from 'svelte'
	import type { RealtimePresenceState } from '@supabase/supabase-js'
	import { nanoid } from 'nanoid'
	import { pendingMessages } from '$lib/stores'
	import type { Payload, Presence } from '$lib/types/types'
	import { page } from '$app/stores'
	import type { PageData } from './$types'
	import { supabase } from '$lib/supabaseClient'
	import { invalidateAll } from '$app/navigation'
	import Chat from '$lib/components/Chat.svelte'

	export let data: PageData
	let newMessage = ''
	let entries: (Payload | Presence)[] = [
		{
			type: 'payload',
			message: 'Welcome to the room!',
			userId: data.userId,
			username: data.username,
			id: nanoid()
		},
		{
			type: 'payload',
			message: 'Thanks buddy!',
			userId: '1',
			username: 'Romulus',
			id: nanoid()
		}
	]
	let presenceState: RealtimePresenceState

	const channel = supabase.channel(data.room.id, {
		config: { presence: { key: data.userId }, broadcast: { ack: true } }
	})

	const handleRetry = async (event: CustomEvent) => {
		const { payload } = event.detail as { payload: Payload }

		pendingMessages.setStatus(payload.id, 'loading')

		try {
			await channel.send({
				type: 'broadcast',
				event: 'new-message',
				payload
			})
			pendingMessages.setStatus(payload.id, 'success')
		} catch {
			pendingMessages.setStatus(payload.id, 'error')
		}
	}

	const handleSubmit = async () => {
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

		const payload: Payload = {
			type: 'payload',
			message: newMessage,
			userId: data.userId,
			username: data.username,
			id
		}

		pendingMessages.setStatus(id, 'loading')
		entries = [...entries, payload]

		try {
			await channel.send({
				type: 'broadcast',
				event: 'new-message',
				payload
			})
			pendingMessages.setStatus(id, 'success')
		} catch {
			pendingMessages.setStatus(id, 'error')
		}

		newMessage = ''
	}

	onMount(() => {
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

				entries = [...entries, presence]
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

				entries = [...entries, presence]
			})
			.on('broadcast', { event: 'new-message' }, ({ payload }: { payload: Payload }) => {
				entries = [...entries, payload]
			})
			.subscribe()

		return async () => {
			if (!Object.hasOwnProperty.call(presenceState, data.userId)) {
				await channel.untrack()
			}
			await supabase.removeChannel(channel)
		}
	})
</script>

<div class="flex h-full flex-col">
	<div class="relative flex-1">
		<Chat {entries} userId={data.userId} on:retry={handleRetry} />
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
			disabled={!newMessage}
			type="submit"
			class="dark:from-primary-700 dark:to-primary-700 bg-gradient-to-br from-indigo-400 to-pink-400 transition-opacity disabled:opacity-50 disabled:hover:cursor-not-allowed"
			on:click={handleSubmit}
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

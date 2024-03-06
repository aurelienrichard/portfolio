<script lang="ts">
	import { onMount } from 'svelte'
	import type { RealtimePresenceState } from '@supabase/supabase-js'
	import { nanoid } from 'nanoid'
	import { pendingMessages } from '$lib/stores'
	import type { Payload, Presence } from '$lib/types/types'
	import type { PageData } from './$types'
	import { supabase } from '$lib/supabaseClient'
	import Chat from '$lib/components/Chat.svelte'
	import NewMessageForm from '$lib/components/NewMessageForm.svelte'

	export let data: PageData
	let entries: (Payload | Presence)[] = []
	let presenceState: RealtimePresenceState

	const channel = supabase.channel(data.roomId, {
		config: { presence: { key: data.userId }, broadcast: { ack: true } }
	})

	const updatePresence = (username: string, event: 'joined' | 'left') => {
		const id = nanoid()
		const presence: Presence = {
			type: 'presence',
			username,
			event,
			id
		}

		entries = [...entries, presence]
	}

	const handleRetry = async (event: CustomEvent) => {
		const { payload } = event.detail as { payload: Payload }

		pendingMessages.setStatus(payload.id, 'loading')

		try {
			await channel.send({
				type: 'broadcast',
				event: 'message',
				payload
			})
			pendingMessages.setStatus(payload.id, 'success')
		} catch {
			pendingMessages.setStatus(payload.id, 'error')
		}
	}

	const handleSubmit = async (event: CustomEvent<{ id: string; message: string }>) => {
		const { id, message } = event.detail

		const payload: Payload = {
			type: 'payload',
			message,
			userId: data.userId,
			username: data.username,
			id
		}

		pendingMessages.setStatus(id, 'loading')
		entries = [...entries, payload]

		try {
			await channel.send({
				type: 'broadcast',
				event: 'message',
				payload
			})
			pendingMessages.setStatus(id, 'success')
		} catch {
			pendingMessages.setStatus(id, 'error')
		}
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
			.on('broadcast', { event: 'message' }, ({ payload }: { payload: Payload }) => {
				entries = [...entries, payload]
			})
			.on(
				'broadcast',
				{ event: 'join' },
				({ payload: { username } }: { payload: { username: string } }) => {
					updatePresence(username, 'joined')
				}
			)
			.subscribe((status) => {
				if (status === 'SUBSCRIBED') {
					updatePresence(data.username, 'joined')
				}
			})

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
	<NewMessageForm roomId={data.roomId} on:message={handleSubmit} />
</div>

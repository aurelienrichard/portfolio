<script lang="ts">
	import { onMount } from 'svelte'
	import { nanoid } from 'nanoid'
	import { pendingMessages } from '$lib/stores'
	import type { Payload, Presence } from '$lib/types/types'
	import type { PageData } from './$types'
	import { supabase } from '$lib/supabaseClient'
	import Chat from '$lib/components/Chat.svelte'
	import NewMessageForm from '$lib/components/NewMessageForm.svelte'

	export let data: PageData
	let entries: (Payload | Presence)[] = []
	let subscribed: 'loading' | 'ok' | 'error' = 'loading'

	const channel = supabase.channel(data.roomId)

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
		const { id, message } = event.detail as Pick<Payload, 'id' | 'message'>

		pendingMessages.setStatus(id, 'loading')

		const response = await fetch(data.roomId, {
			method: 'POST',
			body: JSON.stringify({ message, id }),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (response.ok) {
			pendingMessages.setStatus(id, 'success')
		} else {
			pendingMessages.setStatus(id, 'error')
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

		const response = await fetch(data.roomId, {
			method: 'POST',
			body: JSON.stringify({ message, id }),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (response.ok) {
			pendingMessages.setStatus(id, 'success')
		} else {
			pendingMessages.setStatus(id, 'error')
		}
	}

	onMount(() => {
		channel
			.on('broadcast', { event: 'message' }, ({ payload }: { payload: Payload }) => {
				if (payload.userId !== data.userId) {
					entries = [...entries, payload]
				}
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
					subscribed = 'ok'
				} else {
					subscribed = 'error'
				}
			})

		return async () => {
			await supabase.removeChannel(channel)
		}
	})
</script>

<div class="flex h-full flex-col">
	<div class="relative flex-1">
		<Chat {entries} userId={data.userId} {subscribed} on:retry={handleRetry} />
	</div>
	<hr class="my-4" />
	<NewMessageForm roomId={data.roomId} on:message={handleSubmit} />
</div>

<script lang="ts">
	import { onMount } from 'svelte'
	import { nanoid } from 'nanoid'
	import { supabase } from '$lib/supabaseClient'
	import { pendingMessages } from '$lib/stores'
	import type { Payload, Presence } from '$lib/types/types'
	import type { PageData } from './$types'
	import Chat from '$lib/components/Chat.svelte'
	import NewMessageForm from '$lib/components/NewMessageForm.svelte'

	export let data: PageData
	let entries: (Payload | Presence)[] = []
	let subscribed: 'loading' | 'ok' | 'error' = 'loading'

	const channel = supabase.channel(data.roomId)

	const sendMessage = async (message: string, id: string) => {
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

	const handleRetry = async (event: CustomEvent) => {
		const { id, message } = event.detail as Pick<Payload, 'id' | 'message'>

		await sendMessage(message, id)
	}

	const handleSubmit = async (event: CustomEvent) => {
		const { id, message } = event.detail as Pick<Payload, 'id' | 'message'>

		const payload: Payload = {
			type: 'payload',
			message,
			userId: data.userId,
			username: data.username,
			id
		}

		entries = [...entries, payload]

		await sendMessage(message, id)
	}

	onMount(() => {
		const intervalId = setInterval(async () => {
			await fetch(data.roomId, {
				method: 'PATCH'
			})
		}, 12000)

		channel
			.on('broadcast', { event: 'presence' }, ({ payload }) => {
				const { username, event } = payload as {
					username: string
					event: 'joined' | 'left'
				}

				const id = nanoid()
				const presence: Presence = {
					type: 'presence',
					username,
					event,
					id
				}

				entries = [...entries, presence]
			})
			.on('broadcast', { event: 'message' }, ({ payload }: { payload: Payload }) => {
				if (payload.userId !== data.userId) {
					entries = [...entries, payload]
				}
			})
			.subscribe((status) => {
				if (status === 'SUBSCRIBED') {
					subscribed = 'ok'
				} else {
					subscribed = 'error'
				}
			})

		return async () => {
			clearInterval(intervalId)
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

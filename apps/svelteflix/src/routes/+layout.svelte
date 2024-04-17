<script lang="ts">
	import { onMount } from 'svelte'
	import type { Session, SupabaseClient } from '@supabase/supabase-js'
	import { fade, fly } from 'svelte/transition'
	import { cubicOut } from 'svelte/easing'
	import { invalidate } from '$app/navigation'
	import { page, navigating } from '$app/stores'
	import tmdb from '$lib/images/tmdb.svg'
	import '../app.css'
	import logo from '$lib/images/logo.svg'
	import NavigatingIndicator from '$lib/components/NavigatingIndicator.svelte'
	import { enhance } from '$app/forms'
	import Attribution from '$lib/components/Attribution.svelte'
	import Notifications from '$lib/components/Notifications.svelte'
	import { notifications } from '$lib/stores'
	import type { SubmitFunction } from './logout/$types'

	export let data: {
		supabase: SupabaseClient
		session: Session | null
		pathname: string
	}

	let { supabase, session } = data
	$: ({ supabase, session } = data)
	$: pathname = data.pathname
	let loading = false

	onMount(() => {
		const auth = supabase.auth.onAuthStateChange(async (event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				if (event === 'SIGNED_IN') {
					notifications.addNotification('You are now logged in')
				}
				await invalidate('supabase:auth')
			}
		})

		return () => auth.data.subscription.unsubscribe()
	})

	const handleSubmit: SubmitFunction = () => {
		loading = true

		return async ({ update, result }) => {
			await update()
			if (result.type === 'redirect') {
				notifications.addNotification('You are now logged out')
			} else if (result.type === 'failure') {
				notifications.addNotification('An unexpected error happened')
			}
			loading = false
		}
	}
</script>

<svelte:head>
	<title>{$page.data.title ?? 'SvelteFlix'}</title>
	<meta name="description" content="Discover today's most popular movies" />
</svelte:head>

<Notifications />

<nav class="text-accent flex h-14 w-full items-center justify-between py-4">
	<a href="/">
		<img class="h-6" src={logo} alt="SvelteFlix" />
	</a>
	<div class="wrap flex gap-3 whitespace-nowrap font-semibold">
		<a href="/search">Search</a>
		<a href="/watchlist">Watchlist</a>
		{#if session}
			<form method="POST" action="/logout" use:enhance={handleSubmit}>
				<button type="submit" disabled={loading}>Log out</button>
			</form>
		{:else}
			<a href="/login">Log in</a>
		{/if}
	</div>
</nav>

{#if $navigating}
	<NavigatingIndicator />
{/if}

{#key pathname}
	<main
		in:fly={{ delay: 500, y: 25, easing: cubicOut }}
		out:fade
		class:h-0={$page.data.infinite}
		class:overflow-clip={$page.data.infinite}
		class="flex w-full flex-grow flex-col gap-10 sm:gap-16 lg:gap-20"
	>
		<slot />
	</main>
{/key}

<footer class="w-full pb-4 pt-8">
	<Attribution fill={'#cb3734'} />
	<div class="flex flex-col justify-center text-center text-xs">
		<p>This product uses the</p>
		<a class="m-auto w-fit" href="https://www.themoviedb.org/">
			<img class="my-1 h-2" src={tmdb} alt="The Movie Database (TMDB)" />
		</a>
		<p>API but is not endorsed or certified by TMDB.</p>
	</div>
</footer>

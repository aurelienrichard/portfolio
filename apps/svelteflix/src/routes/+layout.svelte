<script lang="ts">
	import { onMount } from 'svelte'
	import type { Session, SupabaseClient } from '@supabase/supabase-js'
	import { invalidate } from '$app/navigation'
	import { page, navigating } from '$app/stores'
	import '../app.css'
	import logo from '$lib/images/logo.svg'
	import NavigatingIndicator from '$lib/components/NavigatingIndicator.svelte'
	import { enhance } from '$app/forms'
	import Footer from '$lib/components/Footer.svelte'

	export let data: {
		supabase: SupabaseClient
		session: Session | null
	}

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	onMount(() => {
		const auth = supabase.auth.onAuthStateChange(async (event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				await invalidate('supabase:auth')
			}
		})

		return () => auth.data.subscription.unsubscribe()
	})
</script>

<svelte:head>
	<title>{$page.data.title ?? 'SvelteFlix'}</title>
	<meta name="description" content="Discover today's most popular movies" />
</svelte:head>

<nav class="text-accent flex h-14 w-full items-center justify-between py-4">
	<a href="/">
		<img class="h-6" src={logo} alt="SvelteFlix" />
	</a>
	<div class="wrap flex gap-3 whitespace-nowrap font-semibold">
		<a href="/search">Search</a>
		<a href="/watchlist">Watchlist</a>
		{#if session}
			<form method="POST" action="/logout" use:enhance>
				<button type="submit">Log out</button>
			</form>
		{:else}
			<a href="/login">Log in</a>
		{/if}
	</div>
</nav>

{#if $navigating}
	<NavigatingIndicator />
{/if}

<main
	class:h-0={$page.data.infinite}
	class:flex-1={$page.data.infinite}
	class:overflow-clip={$page.data.infinite}
	class="flex w-full flex-col gap-10 sm:gap-16 lg:gap-20"
>
	<slot />
</main>

<Footer />

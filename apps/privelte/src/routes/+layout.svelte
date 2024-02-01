<script lang="ts">
	import '../app.css'
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton'
	import logo from '$lib/images/github-mark.svg'
</script>

<svelte:head>
	<title>Privelte</title>
	<meta name="description" content="chat privately and anonymously." />
</svelte:head>

<AppShell regionPage="max-w-6xl mx-auto">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/" class="select-none text-2xl font-semibold">
					<span class="text-surface-600-300-token underline">Priv</span><span
						class="dark:from-gradient-1-dark dark:to-gradient-2-dark from-gradient-1-light to-gradient-2-light bg-gradient-to-br box-decoration-clone bg-clip-text text-transparent"
						>elte</span
					>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a href="/new" class="btn btn-sm variant-filled-surface capitalize"
					><span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-[19px] w-[19px]"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
					</span>room</a
				>
				<LightSwitch
					bgLight="dark:from-surface-50 dark:to-surface-50 bg-gradient-to-br from-gradient-1-light to-gradient-2-light"
					bgDark="bg-gradient-to-br from-surface-900 to-surface-900 dark:from-gradient-1-dark dark:to-gradient-2-dark"
				/>
				<span class="divider-vertical h-6" />
				<a
					href="https://github.com/aurelienrichard"
					aria-label="Link to the developer's profile on GitHub"
				>
					<img class="h-6" src={logo} alt="GitHub logo" />
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="h-full px-4 py-8 md:py-12">
		<slot />
	</div>
	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>

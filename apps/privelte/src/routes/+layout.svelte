<script lang="ts">
	import '../app.css'
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton'
	import logo from '$lib/images/github-mark.svg'
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/" class="text-2xl font-semibold">
					<span class="text-surface-400 underline">Priv</span><span
						class="dark:from-gradient-1-dark dark:to-gradient-2-dark from-gradient-1-light to-gradient-2-light bg-gradient-to-br box-decoration-clone bg-clip-text text-transparent"
						>elte</span
					>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
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
	<div class="h-full px-4 py-12">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>

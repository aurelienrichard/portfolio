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
					<span class="text-surface-400">Priv</span><span class="text-[#ff3e00]"
						>elte</span
					>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
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
	<slot />
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>

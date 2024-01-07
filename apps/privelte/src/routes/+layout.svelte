<script lang="ts">
	import '../app.css'
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton'
</script>

<header>
	<AppBar>
		<svelte:fragment slot="lead">
			<a href="/">
				<span class="text-primary-600 text-2xl font-semibold">(Privelte)</span>
			</a>
		</svelte:fragment>
		<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
	</AppBar>
</header>
<slot />

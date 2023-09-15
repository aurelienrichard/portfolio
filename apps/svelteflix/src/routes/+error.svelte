<script lang="ts">
	import { page } from '$app/stores'
</script>

<div class="pt-10 text-center">
	<h1 class="text-4xl font-bold sm:text-5xl lg:text-6xl">
		{$page.status}
	</h1>
	<p class="text-accent text-xl sm:text-2xl lg:text-3xl">{$page.error?.message}</p>
</div>

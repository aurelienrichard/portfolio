<script lang="ts">
	import { countFormatter } from '$lib/utils'

	export let average: number
	export let total: number
</script>

<div class="flex items-center gap-2 pt-1 sm:pt-2 lg:pt-4">
	<span class="relative inline-block aspect-[5/1] h-4 sm:h-6 lg:h-8">
		<span class="absolute h-full w-full bg-[url('$lib/images/star-outline.svg')]" />
		<span
			class="absolute h-full w-full bg-[url('$lib/images/star.svg')] [clip-path:inset(0_calc(100%-(var(--rating)*10%))0_0)]"
			style="--rating: {average}"
		/>
	</span>
	<span class="text-base sm:text-lg lg:text-xl">({countFormatter.format(total)})</span>
</div>

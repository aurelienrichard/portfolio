<script lang="ts">
	import { enhance } from '$app/forms'

	export let data: {
		title: string
	}

	let email = ''
	$: disabled = !email
</script>

<div class="pt-10">
	<h1 class="text-4xl font-bold sm:text-5xl lg:text-6xl">{data.title}</h1>
	<form
		method="POST"
		use:enhance
		class="flex flex-col gap-2 py-4 sm:gap-4 sm:py-6 lg:gap-6 lg:py-8"
	>
		<label>
			<h2 class="pb-1 text-lg font-semibold sm:pb-2 sm:text-xl lg:pb-3 lg:text-2xl">email</h2>
			<input
				bind:value={email}
				class="focus-visible:outline-accent w-full rounded-md bg-[rgba(255,255,255,0.1)] p-2 text-xl focus-visible:outline focus-visible:outline-2 sm:text-2xl lg:text-3xl"
				type="email"
				name="email"
				required
			/>
		</label>
		<button
			class:bg-zinc-700={disabled}
			class="bg-accent rounded-md p-1 text-base transition-colors duration-200 sm:p-2 sm:text-lg lg:p-3 lg:text-xl"
			type="submit"
			{disabled}>Receive magic link</button
		>
	</form>
</div>

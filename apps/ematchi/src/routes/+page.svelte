<script lang="ts">
	import { confetti } from '@neoconfetti/svelte'
	import Attribution from './Attribution.svelte'
	import Game from './Game.svelte'
	import Modal from './Modal.svelte'
	import { levels } from './levels'
	import '../styles.css'

	let state: 'waiting' | 'playing' | 'paused' | 'won' | 'lost' = 'waiting'
	let game: Game
</script>

<svelte:head>
	<title>ematchi</title>
	<meta name="description" content="the emoji matching game" />
</svelte:head>

<Attribution fill="var(--accent)" />

<main>
	<Game
		bind:this={game}
		on:play={() => {
			state = 'playing'
		}}
		on:pause={() => {
			state = 'paused'
		}}
		on:win={() => {
			state = 'won'
		}}
		on:lose={() => {
			state = 'lost'
		}}
	/>

	{#if state !== 'playing'}
		<Modal>
			<header>
				<h1>e<span>match</span>i</h1>
				<p>the emoji matching game</p>
			</header>
			{#if state === 'won' || state === 'lost'}
				<p>you have {state} the game!</p>
			{:else if state === 'paused'}
				<p>game paused</p>
			{:else}
				<p>choose a level</p>
			{/if}

			<div class="buttons">
				{#if state === 'paused'}
					<button
						on:click={() => {
							game.resume()
						}}>resume</button
					>
					<button
						on:click={() => {
							state = 'waiting'
						}}>quit</button
					>
				{:else}
					{#each levels as level}
						<button
							on:click={() => {
								game.start(level)
								state = 'playing'
							}}>{level.label}</button
						>
					{/each}
				{/if}
			</div>
		</Modal>
	{/if}

	{#if state === 'won'}
		<div
			class="confetti"
			use:confetti={{
				stageWidth: window.innerWidth,
				stageHeight: window.innerHeight
			}}
		/>
	{/if}
</main>

<style>
	main {
		text-align: center;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	header {
		color: var(--accent-2);
		font-size: min(5vw, 2rem);
		font-family: poppins;
		user-select: none;
	}

	h1 {
		font-size: 4em;
		margin: 0;
		height: 1em;
	}

	span {
		color: var(--accent);
	}

	p {
		margin: 0.5em 0 1em 0;
	}

	p:not(header > p) {
		color: var(--accent-2);
	}

	button {
		background: var(--accent);
		color: white;
		font-size: inherit;
		font-family: inherit;
		border: none;
		padding: min(2vmin, 1em);
		border-radius: 0.5em;
	}

	.buttons {
		display: flex;
		justify-content: center;
		gap: 0.5em;
	}

	.confetti {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 50%;
		top: 30%;
		pointer-events: none;
	}
</style>

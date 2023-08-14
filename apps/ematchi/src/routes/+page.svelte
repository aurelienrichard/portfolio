<script lang="ts">
	import Game from './Game.svelte'
	import { levels } from '../levels'
	import '../styles.css'
	import Modal from './Modal.svelte'

	let game: Game
	let state: 'waiting' | 'playing' | 'paused' | 'won' | 'lost' = 'waiting'
</script>

<svelte:head>
	<title>ematchi</title>
	<meta name="description" content="the emoji matching game" />
</svelte:head>

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

<style>
	h1 {
		font-size: 5em;
	}

	span {
		color: #ffcc4d;
	}
</style>

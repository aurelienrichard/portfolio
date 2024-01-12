<script lang="ts">
	import '../app.css'
	import {
		Modal,
		AppShell,
		AppBar,
		LightSwitch,
		initializeStores,
		getModalStore
	} from '@skeletonlabs/skeleton'
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton'
	import logo from '$lib/images/github-mark.svg'
	import NewRoomModal from '$lib/components/NewRoomModal.svelte'

	initializeStores()

	const modalStore: ModalStore = getModalStore()
	const modal: ModalSettings = {
		type: 'component',
		component: 'newRoomModal'
	}
	const modalRegistry: Record<string, ModalComponent> = {
		newRoomModal: { ref: NewRoomModal }
	}
</script>

<Modal components={modalRegistry} regionBackdrop="backdrop-blur-sm" />

<AppShell regionPage="max-w-7xl mx-auto">
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
				<button
					on:click={() => modalStore.trigger(modal)}
					type="button"
					class="btn btn-sm variant-filled-surface"
					><span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-5 w-5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
					</span>New Room</button
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
	<div class="h-full px-4 py-12">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>

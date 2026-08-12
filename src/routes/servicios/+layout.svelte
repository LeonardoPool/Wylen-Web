<script lang="ts">
	import { setContext, onMount } from 'svelte';
	import { HomeState } from '$lib/homeState.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '$lib/styles/home.css';
	import '$lib/styles/pages.css';

	let { children } = $props();
	const homeState = new HomeState();
	setContext('homeState', homeState);

	onMount(() => {
		homeState.initLanguage();
	});
</script>

<div class="page-container">
	<Navbar state={homeState} />
	{@render children()}
	<Footer state={homeState} />
</div>

{#if homeState.activeModal}
	<div
		class="modal-backdrop"
		onclick={homeState.closeModal}
		onkeydown={(e) => e.key === 'Escape' && homeState.closeModal()}
		role="presentation"
	>
		<div
			class="modal-content"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<button class="modal-close" onclick={homeState.closeModal} aria-label="Cerrar">✕</button>
			<h3>{homeState.activeModal}</h3>
			<p>{@html homeState.t('modal.thanks')}</p>
			<div class="modal-actions">
				<button class="btn btn-dark" onclick={homeState.closeModal}>{homeState.t('modal.continue')}</button>
			</div>
		</div>
	</div>
{/if}

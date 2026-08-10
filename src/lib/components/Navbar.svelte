<script lang="ts">
	import { tick, onMount } from 'svelte';
	import type { HomeState } from '$lib/homeState.svelte';
	import Logo from '$lib/components/Logo.svelte';

	// Rename state prop to homeState to prevent store-rune conflict in Svelte 5
	let { state: homeState }: { state: HomeState } = $props();

	let mobileMenuContainer: HTMLDivElement | undefined = $state();

	// Body scroll lock effect
	$effect(() => {
		if (homeState.isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});

	// Focus trap for mobile accessibility
	function handleKeydown(event: KeyboardEvent) {
		if (!homeState.isMobileMenuOpen) return;

		if (event.key === 'Escape') {
			homeState.closeMobileMenu();
			return;
		}

		if (event.key === 'Tab' && mobileMenuContainer) {
			const focusableEls = mobileMenuContainer.querySelectorAll<HTMLAnchorElement>('a[href]');
			if (focusableEls.length === 0) return;

			const firstEl = focusableEls[0];
			const lastEl = focusableEls[focusableEls.length - 1];

			if (event.shiftKey) {
				if (document.activeElement === firstEl) {
					lastEl.focus();
					event.preventDefault();
				}
			} else {
				if (document.activeElement === lastEl) {
					firstEl.focus();
					event.preventDefault();
				}
			}
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="navbar-wrapper">
	<div class="navbar">
		<div class="nav-brand">
			<Logo />
		</div>

		<nav class="nav-links desktop-only" aria-label="Navegación principal">
			<a href="#bikes" class="nav-item">PROYECTOS</a>
			<a href="#adaptive-power" class="nav-item">INGENIERÍA</a>
			<a href="#connect" class="nav-item">NOSOTROS</a>
			<a href="#care" class="nav-item">CONTACTO</a>
		</nav>

		<div class="nav-actions">
			<button class="order-btn desktop-only" onclick={() => homeState.openModal('Order Now')}>
				<span>Conversemos</span>
				<svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</button>

			<button 
				class="mobile-menu-toggle mobile-only" 
				onclick={homeState.toggleMobileMenu}
				aria-expanded={homeState.isMobileMenuOpen}
				aria-label="Abrir menú de navegación"
				class:open={homeState.isMobileMenuOpen}
			>
				<span class="bar bar-1"></span>
				<span class="bar bar-2"></span>
			</button>
		</div>
	</div>

	<!-- Mobile Nav Drawer -->
	{#if homeState.isMobileMenuOpen}
		<div 
			class="mobile-menu" 
			bind:this={mobileMenuContainer}
			role="dialog" 
			aria-modal="true" 
			aria-label="Menú móvil"
		>
			<a href="#bikes" onclick={homeState.closeMobileMenu}>Proyectos</a>
			<a href="#adaptive-power" onclick={homeState.closeMobileMenu}>Ingeniería</a>
			<a href="#connect" onclick={homeState.closeMobileMenu}>Nosotros</a>
			<a href="#care" onclick={homeState.closeMobileMenu}>Contacto</a>
			<a href="#" class="mobile-menu-cta" onclick={(e) => { e.preventDefault(); homeState.closeMobileMenu(); homeState.openModal('Order Now'); }}>Conversemos</a>
		</div>
	{/if}
</header>

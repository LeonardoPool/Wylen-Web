<script lang="ts">
	import { tick, onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { HomeState } from '$lib/homeState.svelte';
	import Logo from '$lib/components/Logo.svelte';

	let { state: homeState }: { state: HomeState } = $props();

	let mobileMenuContainer: HTMLDivElement | undefined = $state();
	let closeTimer: ReturnType<typeof setTimeout> | undefined;

	// Route awareness for active state
	let currentPath = $derived($page.url.pathname);
	let isServiciosActive = $derived(currentPath.startsWith('/servicios'));
	let isEmpresaActive = $derived(currentPath.startsWith('/empresa'));

	// Mega menu items
	const serviceItems = [
		{ key: 'enterprise', href: '/servicios/software-empresarial', icon: 'layers' },
		{ key: 'digital', href: '/servicios/productos-digitales', icon: 'zap' },
		{ key: 'consulting', href: '/servicios/consultoria-tecnica', icon: 'compass' },
		{ key: 'automation', href: '/servicios/automatizacion', icon: 'cpu' },
		{ key: 'integrations', href: '/servicios/integraciones', icon: 'link' }
	];

	const companyItems = [
		{ key: 'about', href: '/empresa/nosotros', icon: 'users' },
		{ key: 'engineering', href: '/empresa/ingenieria', icon: 'settings' },
		{ key: 'philosophy', href: '/empresa/filosofia', icon: 'book' },
		{ key: 'team', href: '/empresa/equipo', icon: 'heart' },
		{ key: 'careers', href: '/empresa/carreras', icon: 'briefcase' }
	];

	// Body scroll lock effect
	$effect(() => {
		if (homeState.isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});

	// Auto-close menu and dropdowns on route navigation
	$effect(() => {
		const href = $page.url.href;
		homeState.closeMobileMenu();
		homeState.closeDropdown();
	});

	// Click outside handler for mobile menu and dropdowns
	function handleWindowClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		// Close mobile menu if clicked outside
		if (homeState.isMobileMenuOpen && mobileMenuContainer && !mobileMenuContainer.contains(target)) {
			if (!target.closest('.mobile-menu-toggle')) {
				homeState.closeMobileMenu();
			}
		}
		// Close desktop dropdowns if clicked outside
		if (homeState.activeDropdown) {
			if (!target.closest('.nav-dropdown-wrapper') && !target.closest('.mega-menu-panel')) {
				homeState.closeDropdown();
			}
		}
	}

	// Desktop mega menu hover handlers with delay
	function handleDropdownEnter(name: string) {
		if (closeTimer) clearTimeout(closeTimer);
		homeState.openDropdown(name);
	}

	function handleDropdownLeave() {
		closeTimer = setTimeout(() => {
			homeState.closeDropdown();
		}, 200);
	}

	function handlePanelEnter() {
		if (closeTimer) clearTimeout(closeTimer);
	}

	function handlePanelLeave() {
		closeTimer = setTimeout(() => {
			homeState.closeDropdown();
		}, 150);
	}

	// Focus trap for mobile accessibility
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			if (homeState.activeDropdown) {
				homeState.closeDropdown();
				return;
			}
			if (homeState.isMobileMenuOpen) {
				homeState.closeMobileMenu();
				return;
			}
		}

		if (!homeState.isMobileMenuOpen || !mobileMenuContainer) return;

		if (event.key === 'Tab') {
			const focusableEls = mobileMenuContainer.querySelectorAll<HTMLElement>('a[href], button');
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

	// Mobile accordion state
	let mobileAccordion = $state<string | null>(null);

	function toggleMobileAccordion(section: string) {
		mobileAccordion = mobileAccordion === section ? null : section;
	}
</script>

<svelte:window onkeydown={handleKeydown} onclick={handleWindowClick} />

<header class="navbar-wrapper">
	<div class="navbar">
		<a href="/" class="nav-brand">
			<Logo />
		</a>

		<nav class="nav-links desktop-only" aria-label="Navegación principal">
			<!-- Servicios Dropdown -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="nav-dropdown-wrapper"
				onmouseenter={() => handleDropdownEnter('services')}
				onmouseleave={handleDropdownLeave}
			>
				<button
					class="nav-item nav-dropdown-trigger"
					class:active={isServiciosActive}
					class:open={homeState.activeDropdown === 'services'}
					aria-expanded={homeState.activeDropdown === 'services'}
					aria-haspopup="true"
					onclick={() => homeState.toggleDropdown('services')}
				>
					{homeState.t('nav.services')}
					<svg class="chevron-icon" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M2.5 3.5L5 6L7.5 3.5"/>
					</svg>
				</button>
			</div>

			<!-- Empresa Dropdown -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="nav-dropdown-wrapper"
				onmouseenter={() => handleDropdownEnter('company')}
				onmouseleave={handleDropdownLeave}
			>
				<button
					class="nav-item nav-dropdown-trigger"
					class:active={isEmpresaActive}
					class:open={homeState.activeDropdown === 'company'}
					aria-expanded={homeState.activeDropdown === 'company'}
					aria-haspopup="true"
					onclick={() => homeState.toggleDropdown('company')}
				>
					{homeState.t('nav.company')}
					<svg class="chevron-icon" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M2.5 3.5L5 6L7.5 3.5"/>
					</svg>
				</button>
			</div>

			<a href="/proyectos" class="nav-item">{homeState.t('nav.projects')}</a>
			<a href="/contacto" class="nav-item">{homeState.t('nav.contact')}</a>
		</nav>

		<div class="nav-actions">
			<!-- Language Toggle Switcher -->
			<button 
				class="lang-toggle-btn desktop-only" 
				onclick={() => homeState.setLanguage(homeState.currentLanguage === 'es' ? 'en' : 'es')}
				aria-label="Cambiar idioma / Switch language"
			>
				<span class:active={homeState.currentLanguage === 'es'}>ES</span>
				<span class="separator">/</span>
				<span class:active={homeState.currentLanguage === 'en'}>EN</span>
			</button>

			<a href="/contacto" class="order-btn desktop-only">
				<span>{homeState.t('nav.cta')}</span>
				<svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>

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

	<!-- Desktop Mega Menu Panels -->
	{#if homeState.activeDropdown === 'services'}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="mega-menu-panel"
			onmouseenter={handlePanelEnter}
			onmouseleave={handlePanelLeave}
			role="menu"
		>
			<div class="mega-menu-inner">
				<span class="mega-menu-label">{homeState.t('mega.services.label')}</span>
				<div class="mega-menu-grid">
					{#each serviceItems as item}
						<a href={item.href} class="mega-menu-item" class:mega-active={currentPath === item.href} onclick={() => homeState.closeDropdown()} role="menuitem">
							<div class="mega-item-icon">
								{#if item.icon === 'layers'}
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
								{:else if item.icon === 'zap'}
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
								{:else if item.icon === 'compass'}
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
								{:else if item.icon === 'cpu'}
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
								{:else if item.icon === 'link'}
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
								{/if}
							</div>
							<div class="mega-item-text">
								<span class="mega-item-title">{homeState.t(`mega.services.${item.key}.title`)}</span>
								<span class="mega-item-desc">{homeState.t(`mega.services.${item.key}.desc`)}</span>
							</div>
							<svg class="mega-item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
						</a>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	{#if homeState.activeDropdown === 'company'}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="mega-menu-panel"
			onmouseenter={handlePanelEnter}
			onmouseleave={handlePanelLeave}
			role="menu"
		>
			<div class="mega-menu-inner">
				<span class="mega-menu-label">{homeState.t('mega.company.label')}</span>
				<div class="mega-menu-grid">
					{#each companyItems as item}
						<a href={item.href} class="mega-menu-item" class:mega-active={currentPath === item.href} onclick={() => homeState.closeDropdown()} role="menuitem">
							<div class="mega-item-icon">
								{#if item.icon === 'users'}
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
								{:else if item.icon === 'settings'}
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
								{:else if item.icon === 'book'}
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
								{:else if item.icon === 'heart'}
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
								{:else if item.icon === 'briefcase'}
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
								{/if}
							</div>
							<div class="mega-item-text">
								<span class="mega-item-title">{homeState.t(`mega.company.${item.key}.title`)}</span>
								<span class="mega-item-desc">{homeState.t(`mega.company.${item.key}.desc`)}</span>
							</div>
							<svg class="mega-item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
						</a>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- Mobile Nav Drawer -->
	{#if homeState.isMobileMenuOpen}
		<div 
			class="mobile-menu" 
			bind:this={mobileMenuContainer}
			role="dialog" 
			aria-modal="true" 
			aria-label="Menú móvil"
		>
			<!-- Mobile Servicios Accordion -->
			<div class="mobile-accordion-section">
				<button class="mobile-accordion-trigger" onclick={() => toggleMobileAccordion('services')} aria-expanded={mobileAccordion === 'services'}>
					<span>{homeState.t('nav.services')}</span>
					<svg class="mobile-accordion-chevron" class:open={mobileAccordion === 'services'} width="14" height="14" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M2.5 3.5L5 6L7.5 3.5"/>
					</svg>
				</button>
				{#if mobileAccordion === 'services'}
					<div class="mobile-accordion-body">
						{#each serviceItems as item}
							<a href={item.href} class="mobile-accordion-link" class:active-route={currentPath === item.href} onclick={homeState.closeMobileMenu}>
								{homeState.t(`mega.services.${item.key}.title`)}
							</a>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Mobile Empresa Accordion -->
			<div class="mobile-accordion-section">
				<button class="mobile-accordion-trigger" onclick={() => toggleMobileAccordion('company')} aria-expanded={mobileAccordion === 'company'}>
					<span>{homeState.t('nav.company')}</span>
					<svg class="mobile-accordion-chevron" class:open={mobileAccordion === 'company'} width="14" height="14" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M2.5 3.5L5 6L7.5 3.5"/>
					</svg>
				</button>
				{#if mobileAccordion === 'company'}
					<div class="mobile-accordion-body">
						{#each companyItems as item}
							<a href={item.href} class="mobile-accordion-link" class:active-route={currentPath === item.href} onclick={homeState.closeMobileMenu}>
								{homeState.t(`mega.company.${item.key}.title`)}
							</a>
						{/each}
					</div>
				{/if}
			</div>

			<a href="/proyectos" onclick={homeState.closeMobileMenu}>{homeState.t('nav.projects')}</a>
			<a href="/contacto" class="mobile-contact-link" onclick={homeState.closeMobileMenu}>{homeState.t('nav.contact')}</a>
			
			<a href="/contacto" class="mobile-menu-cta" onclick={homeState.closeMobileMenu}>{homeState.t('nav.cta')}</a>

			<!-- Mobile Language Switcher -->
			<div class="mobile-lang-switcher">
				<button class="mobile-lang-btn" onclick={() => { homeState.setLanguage('es'); homeState.closeMobileMenu(); }} class:active={homeState.currentLanguage === 'es'}>Español</button>
				<span class="mobile-lang-separator">|</span>
				<button class="mobile-lang-btn" onclick={() => { homeState.setLanguage('en'); homeState.closeMobileMenu(); }} class:active={homeState.currentLanguage === 'en'}>English</button>
			</div>
		</div>
	{/if}
</header>

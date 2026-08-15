<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { HomeState } from '$lib/homeState.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '$lib/styles/home.css';
	import '$lib/styles/pages.css';

	const homeState = new HomeState();
	const lang = $derived(homeState.currentLanguage);

	onMount(() => {
		homeState.initLanguage();
	});

	// Dynamic category state from URL query parameters
	let activeCategory = $derived($page.url.searchParams.get('categoria') || 'all');

	const categories = ['all', 'software', 'products', 'automation', 'integrations'];

	// Array of projects matching our translations
	const projects = $derived([
		{
			id: 'p1',
			category: 'software',
			titleKey: 'portfolio.p1.title',
			descKey: 'portfolio.p1.desc',
			stack: ['SvelteKit', 'TypeScript', 'PostgreSQL', 'FastAPI', 'Docker']
		},
		{
			id: 'p2',
			category: 'products',
			titleKey: 'portfolio.p2.title',
			descKey: 'portfolio.p2.desc',
			stack: ['SvelteKit', 'WebSockets', 'Redis', 'Node.js', 'Tailwind CSS']
		},
		{
			id: 'p3',
			category: 'automation',
			titleKey: 'portfolio.p3.title',
			descKey: 'portfolio.p3.desc',
			stack: ['Python', 'PyTorch', 'FastAPI', 'AWS Textract', 'PostgreSQL']
		},
		{
			id: 'p4',
			category: 'integrations',
			titleKey: 'portfolio.p4.title',
			descKey: 'portfolio.p4.desc',
			stack: ['Go', 'gRPC', 'Redis', 'Kubernetes', 'Grafana']
		},
		{
			id: 'p5',
			category: 'software',
			titleKey: 'portfolio.p5.title',
			descKey: 'portfolio.p5.desc',
			stack: ['Rust', 'MQTT', 'InfluxDB', 'SvelteKit', 'WebSockets']
		}
	]);

	// Filtered projects
	const filteredProjects = $derived(
		activeCategory === 'all'
			? projects
			: projects.filter(p => p.category === activeCategory)
	);

	function changeCategory(cat: string) {
		const targetUrl = cat === 'all' ? '?' : `?categoria=${cat}`;
		goto(targetUrl, { replaceState: true, noScroll: true, keepFocus: true });
	}

	// Accessibility tab focus references
	let tabRefs = $state<HTMLButtonElement[]>([]);

	function handleTabKeydown(event: KeyboardEvent, index: number) {
		let newIndex = index;
		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			newIndex = (index + 1) % categories.length;
			event.preventDefault();
		} else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			newIndex = (index - 1 + categories.length) % categories.length;
			event.preventDefault();
		} else if (event.key === 'Home') {
			newIndex = 0;
			event.preventDefault();
		} else if (event.key === 'End') {
			newIndex = categories.length - 1;
			event.preventDefault();
		}

		if (newIndex !== index) {
			tabRefs[newIndex]?.focus();
			changeCategory(categories[newIndex]);
		}
	}
</script>

<svelte:head>
	<title>{lang === 'es' ? 'Proyectos — WYLEN' : 'Projects — WYLEN'}</title>
	<meta name="description" content={lang === 'es'
		? 'Descubre nuestro portafolio de proyectos de software empresarial, productos digitales, automatizaciones e integraciones en producción.'
		: 'Discover our portfolio of custom enterprise software, digital products, automations, and integrations in active production.'} 
	/>
</svelte:head>

<div class="page-container">
	<!-- Navbar -->
	<Navbar state={homeState} />

	<!-- Hero Section -->
	<section class="page-hero">
		<span class="page-hero-label">{homeState.t('projects.hero.label')}</span>
		<h1 class="page-hero-title">{homeState.t('projects.hero.title')}</h1>
		<p class="page-hero-description">{homeState.t('projects.hero.desc')}</p>
	</section>

	<!-- Filters & Portfolio Section -->
	<section class="page-section" style="padding-top: 1rem; padding-bottom: 8rem;">
		<div class="page-section-inner">
			
			<!-- Category Tabs (A11y Tablist) -->
			<div 
				class="filter-tabs-wrapper" 
				role="tablist" 
				aria-label={lang === 'es' ? 'Filtrar proyectos' : 'Filter projects'}
			>
				{#each categories as cat, i}
					<button
						bind:this={tabRefs[i]}
						role="tab"
						aria-selected={activeCategory === cat}
						tabindex={activeCategory === cat ? 0 : -1}
						class="filter-tab-btn"
						class:active={activeCategory === cat}
						onclick={() => changeCategory(cat)}
						onkeydown={(e) => handleTabKeydown(e, i)}
					>
						{homeState.t(`projects.filter.${cat}`)}
					</button>
				{/each}
			</div>

			<!-- Projects Grid / Empty State -->
			{#if filteredProjects.length === 0}
				<!-- Clean, Anthropic-style empty state card -->
				<div class="projects-empty-state" aria-live="polite">
					<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/>
					</svg>
					<h2>{homeState.t('projects.empty.title')}</h2>
					<p>{homeState.t('projects.empty.desc')}</p>
					<button class="page-cta-btn" onclick={() => changeCategory('all')} style="background-color: var(--bg-dark); color: var(--text-light); margin-top: 1.5rem;">
						{homeState.t('projects.empty.btn')}
					</button>
				</div>
			{:else}
				<!-- Grid of dynamic project cards -->
				<div class="projects-grid" aria-live="polite">
					{#each filteredProjects as project (project.id)}
						<article class="project-card page-card">
							<div class="project-card-header">
								<span class="project-category-badge">
									{homeState.t(`projects.filter.${project.category}`)}
								</span>
							</div>
							
							<h2 class="project-card-title">
								{homeState.t(project.titleKey)}
							</h2>
							
							<p class="project-card-description">
								{homeState.t(project.descKey)}
							</p>
							
							<!-- Stack Badge container -->
							<div class="project-stack-wrap">
								{#each project.stack as tech}
									<span class="tech-badge">{tech}</span>
								{/each}
							</div>
						</article>
					{/each}
				</div>
			{/if}

		</div>
	</section>

	<!-- Footer -->
	<Footer state={homeState} />
</div>

<style>
	/* Tab List styling */
	.filter-tabs-wrapper {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.6rem;
		margin-bottom: 4rem;
		border-bottom: 1.5px solid rgba(18, 18, 17, 0.08);
		padding-bottom: 1.2rem;
		animation: pageHeroIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.filter-tab-btn {
		font-family: inherit;
		font-size: 0.92rem;
		font-weight: 600;
		color: var(--text-muted);
		padding: 0.6rem 1.3rem;
		border-radius: 9999px;
		background: transparent;
		transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		border: 1px solid transparent;
	}

	.filter-tab-btn:hover {
		color: var(--text-dark);
		background-color: rgba(18, 18, 17, 0.04);
	}

	.filter-tab-btn.active {
		color: var(--text-light);
		background-color: var(--bg-dark);
		border-color: var(--bg-dark);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.filter-tab-btn:focus-visible {
		outline: 2px solid var(--text-dark);
		outline-offset: 2px;
	}

	/* Projects Grid layout */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2.5rem;
		animation: pageHeroIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.project-card {
		display: flex;
		flex-direction: column;
		background: rgba(255, 255, 255, 0.45);
		border: 1px solid rgba(18, 18, 17, 0.05);
		border-radius: 24px;
		padding: 2.8rem;
		min-height: 280px;
		justify-content: space-between;
	}

	.project-card-header {
		margin-bottom: 1.2rem;
	}

	.project-category-badge {
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-muted);
		background-color: rgba(18, 18, 17, 0.05);
		padding: 0.35rem 0.8rem;
		border-radius: 6px;
		display: inline-block;
	}

	.project-card-title {
		font-family: var(--font-brand);
		font-size: 1.6rem;
		font-weight: 800;
		color: var(--text-dark);
		margin-bottom: 1rem;
		line-height: 1.25;
		letter-spacing: -0.01em;
	}

	.project-card-description {
		font-size: 0.98rem;
		line-height: 1.65;
		color: var(--text-muted);
		margin-bottom: 2rem;
		flex-grow: 1;
	}

	.project-stack-wrap {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tech-badge {
		font-size: 0.72rem;
		font-weight: 600;
		background-color: rgba(255, 255, 255, 0.7);
		border: 1px solid rgba(18, 18, 17, 0.06);
		color: var(--text-dark);
		padding: 0.25rem 0.6rem;
		border-radius: 6px;
	}

	/* Empty State */
	.projects-empty-state {
		text-align: center;
		padding: 5rem 2rem;
		background: rgba(255, 255, 255, 0.35);
		border: 1px dashed rgba(18, 18, 17, 0.15);
		border-radius: 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.2rem;
		max-width: 580px;
		margin: 0 auto;
		animation: pageHeroIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.projects-empty-state svg {
		color: var(--text-muted);
		opacity: 0.6;
		margin-bottom: 0.5rem;
	}

	.projects-empty-state h2 {
		font-family: var(--font-brand);
		font-size: 1.8rem;
		font-weight: 800;
		color: var(--text-dark);
	}

	.projects-empty-state p {
		font-size: 1rem;
		color: var(--text-muted);
		max-width: 420px;
		line-height: 1.5;
	}

	/* Responsive */
	@media (max-width: 900px) {
		.projects-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.project-card {
			padding: 2.2rem;
			min-height: auto;
		}
	}

	@media (max-width: 640px) {
		.filter-tabs-wrapper {
			margin-bottom: 2.5rem;
			padding-bottom: 0.8rem;
		}

		.filter-tab-btn {
			padding: 0.45rem 1rem;
			font-size: 0.85rem;
		}

		.project-card-title {
			font-size: 1.35rem;
		}

		.project-card-description {
			margin-bottom: 1.5rem;
		}
	}
</style>

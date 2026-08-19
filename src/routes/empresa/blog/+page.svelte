<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { HomeState } from '$lib/homeState.svelte';
	import { getBlogPosts, getLocalizedPost, translateCategory, type BlogPost } from '$lib/firebase';
	import '$lib/styles/blog.css';

	const homeState = getContext<HomeState>('homeState');
	const lang = $derived(homeState?.currentLanguage || 'es');

	let posts = $state<BlogPost[]>([]);
	let loading = $state(true);
	let selectedCategoryKey = $state<string>('Todos');
	let searchQuery = $state<string>('');
	let emailInput = $state<string>('');
	let subscribed = $state(false);

	const categoryKeys = ['Todos', 'Ingeniería', 'Inteligencia Artificial', 'Filosofía', 'Diseño'];

	onMount(async () => {
		try {
			posts = await getBlogPosts();
		} catch (err) {
			console.error('Error loading posts:', err);
		} finally {
			loading = false;
		}
	});

	// Localized posts list depending on lang
	let localizedPosts = $derived(posts.map((p) => getLocalizedPost(p, lang)));

	// Filtered posts based on category and search query
	let filteredPosts = $derived(
		localizedPosts.filter((post, idx) => {
			const rawPost = posts[idx];
			const matchesCategory =
				selectedCategoryKey === 'Todos' || rawPost.category === selectedCategoryKey;
			const matchesSearch =
				searchQuery.trim() === '' ||
				post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
			return matchesCategory && matchesSearch;
		})
	);

	// Featured post (the one marked featured or the first post)
	let featuredPost = $derived(
		filteredPosts.find((p) => p.featured) || filteredPosts[0]
	);

	// Remaining posts grid
	let gridPosts = $derived(
		featuredPost ? filteredPosts.filter((p) => p.id !== featuredPost.id) : filteredPosts
	);

	function handleSubscribe(e: Event) {
		e.preventDefault();
		if (emailInput.trim()) {
			subscribed = true;
			emailInput = '';
		}
	}
</script>

<svelte:head>
	<title>{lang === 'es' ? 'Blog & Perspectivas — WYLEN' : 'Blog & Insights — WYLEN'}</title>
	<meta
		name="description"
		content={lang === 'es'
			? 'Artículos, publicaciones e investigación sobre ingeniería de software, inteligencia artificial y sistemas digitales.'
			: 'Articles, publications and research on software engineering, artificial intelligence and digital systems.'}
	/>
</svelte:head>

<div class="blog-page">
	<div class="blog-container">
		<!-- Header -->
		<header class="blog-header">
			<div class="blog-label-badge">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
					<path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
				</svg>
				<span>{lang === 'es' ? 'BLOG & PERSPECTIVAS' : 'BLOG & INSIGHTS'}</span>
			</div>
			<h1 class="blog-header-title">
				{lang === 'es'
					? 'Ideas, ingeniería y tecnología construidas con intención.'
					: 'Ideas, engineering, and technology built with intention.'}
			</h1>
			<p class="blog-header-desc">
				{lang === 'es'
					? 'Exploramos el diseño de software resiliente, la inteligencia artificial en producción y la estrategia detrás de los sistemas que perduran.'
					: 'We explore resilient software design, artificial intelligence in production, and the strategy behind systems built to last.'}
			</p>
		</header>

		<!-- Filters & Search Bar -->
		<div class="blog-filter-bar">
			<div class="blog-tabs">
				{#each categoryKeys as catKey}
					<button
						class="blog-tab-btn"
						class:active={selectedCategoryKey === catKey}
						onclick={() => (selectedCategoryKey = catKey)}
					>
						{translateCategory(catKey, lang)}
					</button>
				{/each}
			</div>

			<div class="blog-search-box">
				<svg class="blog-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8"/>
					<path d="M21 21l-4.35-4.35"/>
				</svg>
				<input
					type="text"
					class="blog-search-input"
					placeholder={lang === 'es' ? 'Buscar artículos...' : 'Search articles...'}
					bind:value={searchQuery}
				/>
			</div>
		</div>

		<!-- Skeleton loading state -->
		{#if loading}
			<div style="padding: 4rem 0; text-align: center; color: var(--blog-text-muted);">
				<div style="display: inline-block; width: 32px; height: 32px; border: 3px solid rgba(22,21,19,0.1); border-top-color: var(--blog-accent); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
				<p style="margin-top: 1rem; font-size: 0.95rem;">{lang === 'es' ? 'Cargando perspectivas...' : 'Loading insights...'}</p>
			</div>
		{:else if filteredPosts.length === 0}
			<div style="padding: 4rem 0; text-align: center; color: var(--blog-text-muted); background: #FFFFFF; border-radius: 16px; border: 1px solid var(--blog-border);">
				<h3 style="font-family: var(--blog-font-serif); font-size: 1.4rem; color: var(--blog-text-main); margin-bottom: 0.5rem;">
					{lang === 'es' ? 'No se encontraron artículos' : 'No articles found'}
				</h3>
				<p>{lang === 'es' ? 'Intenta con otro término de búsqueda o categoría.' : 'Try a different search term or category.'}</p>
			</div>
		{:else}
			<!-- Featured Post Banner (if on 'Todos' or has match) -->
			{#if featuredPost}
				<a href="/empresa/blog/{featuredPost.slug}" class="blog-featured">
					<div class="blog-featured-grid">
						<div>
							<span class="blog-tag">{featuredPost.category}</span>
							<h2 class="blog-featured-title">{featuredPost.title}</h2>
							<p class="blog-featured-excerpt">{featuredPost.excerpt}</p>
							<div class="blog-author-meta">
								<div class="blog-author-avatar">
									{featuredPost.author.name.charAt(0)}
								</div>
								<div class="blog-author-info">
									<span class="blog-author-name">{featuredPost.author.name}</span>
									<span class="blog-author-sub">{featuredPost.date} • {featuredPost.readTime} • <span style="color: #E25C5C; font-weight: 600;">♥ {featuredPost.likes || 0}</span></span>
								</div>
							</div>
						</div>
						<div style="background: rgba(217, 119, 87, 0.05); border: 1px solid rgba(217, 119, 87, 0.15); border-radius: 16px; padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; min-height: 220px;">
							<div style="font-family: var(--blog-font-serif); font-size: 1.15rem; font-style: italic; color: var(--blog-text-main); line-height: 1.6; margin-bottom: 1rem;">
								«{featuredPost.subtitle || featuredPost.excerpt}»
							</div>
							<span style="font-size: 0.85rem; font-weight: 600; color: var(--blog-accent); display: inline-flex; align-items: center; gap: 0.4rem;">
								{lang === 'es' ? 'Leer artículo completo' : 'Read full article'}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
							</span>
						</div>
					</div>
				</a>
			{/if}

			<!-- Grid of Articles -->
			{#if gridPosts.length > 0}
				<div class="blog-grid">
					{#each gridPosts as post}
						<a href="/empresa/blog/{post.slug}" class="blog-card">
							<div class="blog-card-header">
								<span class="blog-tag">{post.category}</span>
								<h3 class="blog-card-title">{post.title}</h3>
								<p class="blog-card-excerpt">{post.excerpt}</p>
							</div>
							<div class="blog-card-footer" style="display: flex; align-items: center; justify-content: space-between;">
								<span>{post.date}</span>
								<div style="display: flex; align-items: center; gap: 0.75rem;">
									<span>{post.readTime}</span>
									<span style="display: inline-flex; align-items: center; gap: 0.25rem; font-weight: 600; color: #E25C5C;">
										<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
											<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
										</svg>
										{post.likes || 0}
									</span>
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		{/if}

		<!-- Newsletter Subscription Box -->
		<section class="blog-subscribe-box">
			<h2 class="blog-subscribe-title">
				{lang === 'es' ? 'Recibe nuestras publicaciones' : 'Subscribe to our insights'}
			</h2>
			<p class="blog-subscribe-desc">
				{lang === 'es'
					? 'Sin spam. Solo reflexiones de ingeniería, arquitectura de software e IA aplicada directo a tu correo.'
					: 'No spam. Direct reflections on software engineering, architecture, and applied AI.'}
			</p>
			{#if subscribed}
				<div style="background: rgba(255,255,255,0.15); color: #FFFFFF; padding: 1rem 1.5rem; border-radius: 9999px; display: inline-block; font-weight: 500;">
					✓ {lang === 'es' ? '¡Gracias por suscribirte! Te mantendremos informado.' : 'Thank you for subscribing! We will keep you updated.'}
				</div>
			{:else}
				<form class="blog-subscribe-form" onsubmit={handleSubscribe}>
					<input
						type="email"
						required
						class="blog-subscribe-input"
						placeholder={lang === 'es' ? 'tu.correo@empresa.com' : 'your.email@company.com'}
						bind:value={emailInput}
					/>
					<button type="submit" class="blog-subscribe-btn">
						{lang === 'es' ? 'Suscribirse' : 'Subscribe'}
					</button>
				</form>
			{/if}
		</section>
	</div>
</div>

<style>
	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>

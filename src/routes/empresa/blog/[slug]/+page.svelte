<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { HomeState } from '$lib/homeState.svelte';
	import { getBlogPostBySlug, getBlogPosts, getLocalizedPost, toggleArticleLike, type BlogPost } from '$lib/firebase';
	import '$lib/styles/blog.css';

	const homeState = getContext<HomeState>('homeState');
	const lang = $derived(homeState?.currentLanguage || 'es');

	let rawPost = $state<BlogPost | null>(null);
	let rawRelatedPosts = $state<BlogPost[]>([]);
	let loading = $state(true);

	// Like state tracking
	let liked = $state(false);
	let likesCount = $state(0);

	let post = $derived(rawPost ? getLocalizedPost({ ...rawPost, likes: likesCount }, lang) : null);
	let relatedPosts = $derived(rawRelatedPosts.map((p) => getLocalizedPost(p, lang)));

	let currentSlug = $derived($page.params.slug);

	onMount(async () => {
		await loadArticle(currentSlug);
	});

	// Re-load when slug changes
	$effect(() => {
		if (currentSlug) {
			loadArticle(currentSlug);
		}
	});

	async function loadArticle(slug: string) {
		loading = true;
		try {
			rawPost = await getBlogPostBySlug(slug);
			if (rawPost) {
				likesCount = typeof rawPost.likes === 'number' ? rawPost.likes : 0;
				// Check local storage for liked status
				const storageKey = `wylen_liked_${rawPost.id || rawPost.slug}`;
				liked = typeof window !== 'undefined' && localStorage.getItem(storageKey) === 'true';
			}
			const allPosts = await getBlogPosts();
			rawRelatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);
		} catch (err) {
			console.error('Error fetching article:', err);
		} finally {
			loading = false;
		}
	}

	async function handleToggleLike() {
		if (!rawPost) return;
		const targetSlug = rawPost.id || rawPost.slug;
		const nextLiked = !liked;
		const delta = nextLiked ? 1 : -1;
		
		// Optimistic UI update
		liked = nextLiked;
		likesCount = Math.max(0, likesCount + delta);

		// LocalStorage sync
		const storageKey = `wylen_liked_${targetSlug}`;
		if (nextLiked) {
			localStorage.setItem(storageKey, 'true');
		} else {
			localStorage.removeItem(storageKey);
		}

		// Asynchronous Firestore atomic update
		try {
			const updatedCount = await toggleArticleLike(targetSlug, nextLiked);
			if (typeof updatedCount === 'number') {
				likesCount = updatedCount;
			}
		} catch (err) {
			console.error('Error syncing like with Firestore:', err);
		}
	}
</script>

<svelte:head>
	{#if post}
		<title>{post.title} — Blog WYLEN</title>
		<meta name="description" content={post.excerpt} />
	{:else}
		<title>Artículo — Blog WYLEN</title>
	{/if}
</svelte:head>

<div class="article-page">
	<div class="article-wrapper">
		<!-- Back Button -->
		<a href="/empresa/blog" class="article-nav-back">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
			<span>{lang === 'es' ? 'Volver al Blog' : 'Back to Blog'}</span>
		</a>

		{#if loading}
			<div style="padding: 6rem 0; text-align: center; color: var(--blog-text-muted);">
				<div style="display: inline-block; width: 36px; height: 36px; border: 3px solid rgba(22,21,19,0.1); border-top-color: var(--blog-accent); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
				<p style="margin-top: 1.25rem;">{lang === 'es' ? 'Cargando lectura...' : 'Loading article...'}</p>
			</div>
		{:else if !post}
			<div style="padding: 5rem 0; text-align: center; background: #FFFFFF; border-radius: 16px; border: 1px solid var(--blog-border);">
				<h1 style="font-family: var(--blog-font-serif); font-size: 2rem; margin-bottom: 1rem;">
					{lang === 'es' ? 'Artículo no encontrado' : 'Article Not Found'}
				</h1>
				<p style="color: var(--blog-text-muted); margin-bottom: 2rem;">
					{lang === 'es'
						? 'El artículo solicitado no existe o ha sido movido.'
						: 'The requested article does not exist or has been moved.'}
				</p>
				<a href="/empresa/blog" class="blog-subscribe-btn" style="text-decoration: none; display: inline-block;">
					{lang === 'es' ? 'Explorar otros artículos' : 'Explore other articles'}
				</a>
			</div>
		{:else}
			<!-- Article Header -->
			<header class="article-header">
				<span class="blog-tag">{post.category}</span>
				<h1 class="article-title">{post.title}</h1>
				{#if post.subtitle}
					<p class="article-subtitle">{post.subtitle}</p>
				{/if}

				<div class="article-meta-bar">
					<div class="blog-author-meta">
						<div class="blog-author-avatar">
							{post.author.name.charAt(0)}
						</div>
						<div class="blog-author-info">
							<span class="blog-author-name">{post.author.name}</span>
							<span class="blog-author-sub">{post.author.role}</span>
						</div>
					</div>
					<div style="font-size: 0.85rem; color: var(--blog-text-muted); display: flex; align-items: center; gap: 0.75rem;">
						<span>{post.date}</span> • <span>{post.readTime}</span>
						<button
							class="article-like-btn"
							class:liked={liked}
							onclick={handleToggleLike}
							style="padding: 0.35rem 0.85rem; font-size: 0.825rem;"
							title={liked ? (lang === 'es' ? 'Quitar Me gusta' : 'Unlike') : (lang === 'es' ? 'Me gusta' : 'Like')}
						>
							<svg class="heart-icon" width="15" height="15" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2">
								<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
							</svg>
							<span>{likesCount}</span>
						</button>
					</div>
				</div>
			</header>

			{#if post.coverImage}
				<div class="article-cover-wrapper">
					<img src={post.coverImage} alt={post.title} class="article-cover-img" />
				</div>
			{/if}

			<!-- Article Body Content -->
			<article class="article-body">
				{@html post.content}
			</article>

			<!-- Tags -->
			{#if post.tags && post.tags.length > 0}
				<div class="article-tags-row">
					{#each post.tags as tag}
						<span class="blog-tag" style="background: rgba(22,21,19,0.04); color: var(--blog-text-muted);">#{tag}</span>
					{/each}
				</div>
			{/if}

			<!-- Author Card -->
			<div class="article-author-card">
				<div class="blog-author-avatar" style="width: 54px; height: 54px; font-size: 1.2rem;">
					{post.author.name.charAt(0)}
				</div>
				<div>
					<h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.25rem; color: var(--blog-text-main);">
						{post.author.name}
					</h3>
					<p style="font-size: 0.9rem; color: var(--blog-text-muted); margin: 0;">
						{post.author.role} — {lang === 'es' ? 'Integrante del equipo de ingeniería y estrategia tecnológica en Wylen.' : 'Member of the engineering and technology strategy team at Wylen.'}
					</p>
				</div>
			</div>

			<!-- Interactive Likes Section -->
			<div class="article-like-section">
				<button class="article-like-btn" class:liked={liked} onclick={handleToggleLike}>
					<svg class="heart-icon" width="22" height="22" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2">
						<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
					</svg>
					<span>{liked ? (lang === 'es' ? 'Te ha gustado este artículo' : 'You liked this article') : (lang === 'es' ? 'Me gusta este artículo' : 'Like this article')}</span>
					<span class="like-badge">{likesCount}</span>
				</button>
				<p class="like-subtitle">
					{#if likesCount === 0}
						{lang === 'es' ? 'Sé el primero en indicar que te gusta este artículo.' : 'Be the first to like this article.'}
					{:else if likesCount === 1}
						{lang === 'es' ? 'A 1 persona le gusta este artículo.' : '1 person likes this article.'}
					{:else}
						{lang === 'es' ? `A ${likesCount} personas les gusta este artículo.` : `${likesCount} people like this article.`}
					{/if}
				</p>
			</div>

			<!-- Related Articles Section -->
			{#if relatedPosts.length > 0}
				<div style="margin-top: 4rem; padding-top: 3rem; border-top: 1px solid var(--blog-border);">
					<h3 style="font-family: var(--blog-font-serif); font-size: 1.6rem; font-weight: 500; margin-bottom: 2rem;">
						{lang === 'es' ? 'Lecturas recomendadas' : 'Recommended readings'}
					</h3>
					<div class="blog-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
						{#each relatedPosts as rPost}
							<a href="/empresa/blog/{rPost.slug}" class="blog-card">
								<div class="blog-card-header">
									<span class="blog-tag">{rPost.category}</span>
									<h4 class="blog-card-title" style="font-size: 1.15rem;">{rPost.title}</h4>
									<p class="blog-card-excerpt" style="font-size: 0.875rem;">{rPost.excerpt}</p>
								</div>
								<div class="blog-card-footer" style="display: flex; align-items: center; justify-content: space-between;">
									<span>{rPost.readTime}</span>
									<div style="display: flex; align-items: center; gap: 0.6rem;">
										<span style="font-size: 0.8rem; font-weight: 600; color: #E25C5C; display: inline-flex; align-items: center; gap: 0.2rem;">
											<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
												<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
											</svg>
											{rPost.likes || 0}
										</span>
										<span style="color: var(--blog-accent); font-weight: 600;">{lang === 'es' ? 'Leer →' : 'Read →'}</span>
									</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>

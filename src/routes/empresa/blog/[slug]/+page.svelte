<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { HomeState } from '$lib/homeState.svelte';
	import { getBlogPostBySlug, getBlogPosts, getLocalizedPost, toggleArticleLike, type BlogPost } from '$lib/firebase';
	import EditorialSectionBlock from '$lib/components/blog/EditorialSectionBlock.svelte';
	import ChartBlock from '$lib/components/blog/ChartBlock.svelte';
	import '$lib/styles/blog.css';

	const homeState = getContext<HomeState>('homeState');
	const lang = $derived(homeState?.currentLanguage || 'es');

	let rawPost = $state<BlogPost | null>(null);
	let rawRelatedPosts = $state<BlogPost[]>([]);
	let loading = $state(true);

	// Like state tracking
	let liked = $state(false);
	let likesCount = $state(0);

	// Image Lightbox Modal State
	let activeImageModal = $state<{ url: string; alt?: string; caption?: string } | null>(null);

	function openImageModal(url: string, alt?: string, caption?: string) {
		activeImageModal = { url, alt: alt || '', caption: caption || '' };
	}

	function closeImageModal() {
		activeImageModal = null;
	}

	function handleWindowKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && activeImageModal) {
			closeImageModal();
		}
	}

	function handleArticleClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (target && target.tagName === 'IMG') {
			const img = target as HTMLImageElement;
			if (img.src) {
				const figure = img.closest('figure');
				const captionEl = figure ? figure.querySelector('figcaption') : null;
				const caption = captionEl ? captionEl.innerText : (img.title || '');
				openImageModal(img.src, img.alt || post?.title || '', caption);
			}
		}
	}

	let post = $derived(rawPost ? getLocalizedPost({ ...rawPost, likes: likesCount }, lang) : null);
	let relatedPosts = $derived(rawRelatedPosts.map((p) => getLocalizedPost(p, lang)));

	let currentSlug = $derived($page.params.slug);

	onMount(async () => {
		if (currentSlug) {
			await loadArticle(currentSlug);
		}
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
				likesCount = typeof rawPost.likes === 'number' ? rawPost.likes : (rawPost.likesCount || 0);
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

	// Helper to extract cover image URL, ALT, and Caption safely
	let coverData = $derived.by(() => {
		if (!post || !post.coverImage) return null;
		if (typeof post.coverImage === 'string') {
			return { url: post.coverImage, alt: post.title, caption: '' };
		}
		return post.coverImage;
	});
</script>

<svelte:window onkeydown={handleWindowKeydown} />

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
			<!-- Article Header (Anthropic Warm Minimalist Meta & Portada) -->
			<header class="article-header">
				<div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
					<span class="blog-tag" style="background: rgba(217,119,87,0.12); color: #D97757; font-weight: 700; letter-spacing: 0.08em;">
						PUBLICACIÓN • {post.category.toUpperCase()}
					</span>
					<span style="font-size: 0.85rem; color: #73726C; font-weight: 500;">
						{post.date}
					</span>
				</div>

				<h1 class="article-title">{post.title}</h1>
				
				{#if post.subtitle}
					<h2 class="article-subtitle">{post.subtitle}</h2>
				{/if}

				{#if post.excerpt}
					<p style="font-size: 1.1rem; line-height: 1.65; color: #141413; opacity: 0.9; margin: 1.25rem 0 1.5rem 0;">
						{post.excerpt}
					</p>
				{/if}

				<hr style="border: none; border-top: 1px solid #E8E6DD; margin: 1.5rem 0 1.75rem 0;" />

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
						<span>{post.readTime}</span>
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

			<!-- Cover Image -->
			{#if coverData}
				<figure class="article-cover-wrapper" style="margin-bottom: 2.5rem;">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<img
						src={coverData.url}
						alt={coverData.alt || post.title}
						class="article-cover-img image-zoomable"
						style="border-radius: 10px;"
						onclick={() => openImageModal(coverData.url, coverData.alt, coverData.caption)}
					/>
					{#if coverData.caption}
						<figcaption style="text-align: center; font-style: italic; font-size: 0.85rem; color: #73726C; margin-top: 0.65rem;">
							{coverData.caption}
						</figcaption>
					{/if}
				</figure>
			{/if}

			<!-- Article Body (Dynamic Block Renderer with delegated image click) -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<article class="article-body" onclick={handleArticleClick}>
				{#if post.body && post.body.length > 0}
					{#each post.body as block}
						{#if block.type === 'text'}
							<div class="article-text-block">
								{@html block.data.html || block.data.text || ''}
							</div>
						{:else if block.type === 'image' && block.data.url}
							<figure class="block-figure" style="margin: 2.25rem 0;">
								<img
									src={block.data.url}
									alt={block.data.alt || post.title}
									loading="lazy"
									class="image-zoomable"
									style="width: 100%; height: auto; border-radius: 10px; border: 1px solid #E8E6DD; display: block;"
									onclick={() => openImageModal(block.data.url, block.data.alt, block.data.caption)}
								/>
								{#if block.data.caption}
									<figcaption style="text-align: center; font-style: italic; font-size: 0.85rem; color: #73726C; margin-top: 0.6rem;">
										{block.data.caption}
									</figcaption>
								{/if}
							</figure>
						{:else if block.type === 'quote'}
							<blockquote class="anthropic-quote">
								<p>«{block.data.text || block.data.quote || ''}»</p>
								{#if block.data.author}
									<cite>— {block.data.author}</cite>
								{/if}
							</blockquote>
						{:else if block.type === 'editorial-section'}
							<EditorialSectionBlock data={block.data} />
						{:else if block.type === 'chart'}
							<ChartBlock data={block.data} />
						{:else if block.data && block.data.html}
							<div class="article-text-block">
								{@html block.data.html}
							</div>
						{/if}
					{/each}
				{:else}
					{@html post.content}
				{/if}
			</article>

			<!-- Secondary Collections: Image Gallery -->
			{#if post.images && post.images.length > 0}
				<section class="article-gallery-section">
					<h3 class="secondary-section-title">Galería de imágenes</h3>
					<div class="blog-gallery-grid">
						{#each post.images as img}
							<div class="gallery-card">
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
								<img
									src={img.url}
									alt={img.alt || post.title}
									class="gallery-card-img image-zoomable"
									loading="lazy"
									onclick={() => openImageModal(img.url, img.alt, img.caption)}
								/>
								{#if img.caption}
									<div class="gallery-card-caption">{img.caption}</div>
								{/if}
							</div>
						{/each}
					</div>
				</section>
			{/if}

			<!-- Secondary Collections: Standalone Charts -->
			{#if post.charts && post.charts.length > 0}
				<section class="article-charts-section">
					<h3 class="secondary-section-title">Análisis gráfico</h3>
					{#each post.charts as chartData}
						<ChartBlock data={chartData} />
					{/each}
				</section>
			{/if}

			<!-- Secondary Collections: External Links & Resources -->
			{#if post.externalLinks && post.externalLinks.length > 0}
				<section class="article-resources-section">
					<h3 class="secondary-section-title">Recursos y enlaces externos</h3>
					<div class="external-links-grid">
						{#each post.externalLinks as link}
							<a href={link.url} target="_blank" rel="noopener noreferrer" class="external-link-card">
								<div class="external-link-info">
									<span class="external-link-label">{link.label}</span>
									<span class="external-link-url">{link.url}</span>
								</div>
								<svg class="external-link-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
								</svg>
							</a>
						{/each}
					</div>
				</section>
			{/if}

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

<!-- Image Lightbox Modal -->
{#if activeImageModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="image-modal-backdrop"
		onclick={closeImageModal}
		role="dialog"
		aria-modal="true"
		aria-label="Vista ampliada de imagen"
		tabindex="-1"
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="image-modal-content" onclick={(e) => e.stopPropagation()}>
			<button class="image-modal-close" onclick={closeImageModal} aria-label="Cerrar vista ampliada">
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
			<img src={activeImageModal.url} alt={activeImageModal.alt || ''} class="image-modal-img" />
			{#if activeImageModal.caption}
				<p class="image-modal-caption">{activeImageModal.caption}</p>
			{/if}
		</div>
	</div>
{/if}

<style>
	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>

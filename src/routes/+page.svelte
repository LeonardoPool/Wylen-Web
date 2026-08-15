<script lang="ts">
	import { onMount } from 'svelte';
	import { HomeState } from '$lib/homeState.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Graph from '$lib/components/graph/Graph.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '$lib/styles/home.css';
	import macImage from '$lib/images/Hero/Mac copy.png';
	import landingVideo from '$lib/images/app/Landing.mp4';

	const homeState = new HomeState();

	onMount(() => {
		homeState.initLanguage();
	});
</script>

<svelte:head>
	<title>{homeState.currentLanguage === 'es' ? 'WYLEN — Ingeniería que inspira.' : 'WYLEN — Engineering that inspires.'}</title>
	<script src="https://embed.mckp.live/embed.js" async></script>
</svelte:head>

<div class="page-container">
	<!-- Navbar Component -->
	<Navbar state={homeState} />

	<!-- Hero Section -->
	<section class="hero-section">
		<div class="hero-grid">
			<div class="hero-text-content">
				<h1 class="hero-title">{homeState.t('hero.title')}</h1>
				<p class="hero-subtitle">
					{homeState.t('hero.subtitle')}
				</p>
				<div class="hero-buttons">
					<a href="/contacto" class="btn btn-dark">
						{homeState.t('hero.cta.talk')}
					</a>
					<a href="/proyectos" class="btn btn-light">
						{homeState.t('hero.cta.work')}
					</a>
				</div>
			</div>

			<!-- Mockup Player Container -->
			<div class="hero-mockup-container">
				<img src={macImage} alt="Hero Mac" style="width: 100%; max-width: 650px; max-height: 450px; object-fit: contain; margin: 0 auto; transform: scale(1.1);" />
			</div>
		</div>
	</section>

	<!-- Two-Column Bike Grid (Classic & Cruiser) -->
	<section id="proyectos" class="bike-cards-section">
		<div class="bike-grid">
			<!-- Classic Card (Dark Charcoal) -->
			<div class="bike-card card-dark">
				<div class="card-badge">{homeState.t('projects.badge')}</div>
				<div class="card-content">
					<h2 class="card-title">{homeState.t('projects.classic.title')}</h2>
					<p class="card-description">
						{homeState.t('projects.classic.desc')}
					</p>
					<a href="/servicios/software-empresarial" class="btn btn-pill-sand">
						{homeState.t('projects.more')}
					</a>
				</div>
			</div>

			<!-- Cruiser Card (Taupe / Beige) -->
			<div class="bike-card card-taupe">
				<div class="card-badge dark-badge">{homeState.t('projects.badge')}</div>
				<div class="card-content">
					<h2 class="card-title">{homeState.t('projects.cruiser.title')}</h2>
					<p class="card-description">
						{homeState.t('projects.cruiser.desc')}
					</p>
					<a href="/servicios/productos-digitales" class="btn btn-pill-sand">
						{homeState.t('projects.more')}
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Content Section ABOVE Graph -->
	<section class="content-section-beige">
		<div class="content-section-inner">
			<div class="content-section-grid">
				<div class="content-section-text">
					<span class="content-section-label">{homeState.t('philosophy.label')}</span>
					<h2 class="content-section-title">{homeState.t('philosophy.title')}</h2>
					<p class="content-section-description">
						{homeState.t('philosophy.desc')}
					</p>
				</div>
				<div class="content-section-text">
					<span class="content-section-label">{homeState.t('approach.label')}</span>
					<h2 class="content-section-title">{homeState.t('approach.title')}</h2>
					<p class="content-section-description">
						{homeState.t('approach.desc')}
					</p>
				</div>
			</div>
		</div>
	</section>

	<section id="nosotros" class="app-promo-section">
		<div class="graph-section-wrapper" style="position: relative; width: 100vw; margin-left: calc(-50vw + 50%); display: flex; align-items: center; justify-content: center;">
			<Graph state={homeState} />
		</div>
	</section>

	<!-- Content Section BELOW Graph -->
	<section class="content-section-beige">
		<div class="content-section-inner">
			<div class="content-section-centered">
				<span class="content-section-label">{homeState.t('process.label')}</span>
				<h2 class="content-section-title-lg">{@html homeState.t('process.title')}</h2>
				<p class="content-section-description-lg">
					{homeState.t('process.desc')}
				</p>
			</div>

			<div class="content-stats-grid">
				<div class="content-stat">
					<span class="content-stat-number">{homeState.t('stats.retention.num')}</span>
					<span class="content-stat-label">{homeState.t('stats.retention.label')}</span>
				</div>
				<div class="content-stat">
					<span class="content-stat-number">{homeState.t('stats.speed.num')}</span>
					<span class="content-stat-label">{homeState.t('stats.speed.label')}</span>
				</div>
				<div class="content-stat">
					<span class="content-stat-number">{homeState.t('stats.production.num')}</span>
					<span class="content-stat-label">{homeState.t('stats.production.label')}</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Video Banner Section -->
	<section class="video-banner-section">
		<!-- svelte-ignore a11y_media_has_caption -->
		<video
			src={landingVideo}
			autoplay
			loop
			muted
			playsinline
			class="video-banner-bg"
		></video>
	</section>

	<!-- Content Section BELOW Video -->
	<section class="content-section-beige">
		<div class="content-section-inner">
			<div class="content-section-grid content-section-grid-3">
				<div class="content-section-card">
					<div class="content-card-icon">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
						</svg>
					</div>
					<h3 class="content-card-title">{homeState.t('features.architecture.title')}</h3>
					<p class="content-card-description">
						{homeState.t('features.architecture.desc')}
					</p>
				</div>
				<div class="content-section-card">
					<div class="content-card-icon">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<circle cx="12" cy="12" r="10"/>
							<path d="M12 6v6l4 2"/>
						</svg>
					</div>
					<h3 class="content-card-title">{homeState.t('features.delivery.title')}</h3>
					<p class="content-card-description">
						{homeState.t('features.delivery.desc')}
					</p>
				</div>
				<div class="content-section-card">
					<div class="content-card-icon">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
							<circle cx="9" cy="7" r="4"/>
							<path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
						</svg>
					</div>
					<h3 class="content-card-title">{homeState.t('features.teams.title')}</h3>
					<p class="content-card-description">
						{homeState.t('features.teams.desc')}
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<Footer state={homeState} />
</div>

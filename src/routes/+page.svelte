<script lang="ts">
	import { HomeState } from '$lib/homeState.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Graph from '$lib/components/graph/Graph.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '$lib/styles/home.css';
	import macImage from '$lib/images/Hero/Mac copy.png';

	const state = new HomeState();
</script>

<svelte:head>
	<title>WYLEN — Engineering that inspires.</title>
	<script src="https://embed.mckp.live/embed.js" async></script>
</svelte:head>

<div class="page-container">
	<!-- Navbar Component -->
	<Navbar {state} />

	<!-- Hero Section -->
	<section class="hero-section">
		<div class="hero-grid">
			<div class="hero-text-content">
				<h1 class="hero-title">Engineering that inspires.</h1>
				<p class="hero-subtitle">
					Construimos herramientas digitales que impulsan el crecimiento de las personas y las organizaciones.
				</p>
				<div class="hero-buttons">
					<button class="btn btn-dark" onclick={() => state.openModal('Explore Models')}>
						Conversemos
					</button>
					<button class="btn btn-light" onclick={() => state.openModal('Book Your Ride')}>
						Nuestro trabajo
					</button>
				</div>
			</div>

			<!-- Mockup Player Container -->
			<div class="hero-mockup-container">
				<img src={macImage} alt="Hero Mac" style="width: 100%; max-width: 650px; max-height: 450px; object-fit: contain; margin: 0 auto; transform: scale(1.1);" />
			</div>
		</div>
	</section>

	<!-- Two-Column Bike Grid (Classic & Cruiser) -->
	<section id="bikes" class="bike-cards-section">
		<div class="bike-grid">
			<!-- Classic Card (Dark Charcoal) -->
			<div class="bike-card card-dark">
				<div class="card-badge">WYLEN</div>
				<div class="card-content">
					<h2 class="card-title">Software empresarial</h2>
					<p class="card-description">
						Plataformas diseñadas para crecer con tu negocio.
					</p>
					<button class="btn btn-pill-sand" onclick={() => state.openModal('Book Your Ride - Classic')}>
						Saber más
					</button>
				</div>
			</div>

			<!-- Cruiser Card (Taupe / Beige) -->
			<div class="bike-card card-taupe">
				<div class="card-badge dark-badge">WYLEN</div>
				<div class="card-content">
					<h2 class="card-title">Productos digitales</h2>
					<p class="card-description">
						Aplicaciones rápidas, intuitivas y construidas para durar.					</p>
					<button class="btn btn-pill-sand" onclick={() => state.openModal('Book Your Ride - Cruiser')}>
						Saber más
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- Content Section ABOVE Graph -->
	<section class="content-section-beige">
		<div class="content-section-inner">
			<div class="content-section-grid">
				<div class="content-section-text">
					<span class="content-section-label">FILOSOFÍA</span>
					<h2 class="content-section-title">Cada línea de código debería tener un propósito claro</h2>
					<p class="content-section-description">
						No creemos en la complejidad por la complejidad. Cada decisión técnica que tomamos
						responde a una necesidad real, medible y conectada con el resultado final. Cuando la tecnología
						se diseña con intención, el impacto se multiplica.
					</p>
				</div>
				<div class="content-section-text">
					<span class="content-section-label">ENFOQUE</span>
					<h2 class="content-section-title">Construimos para las personas que usarán lo que creamos</h2>
					<p class="content-section-description">
						El software más sofisticado no es el que tiene más funciones, sino el que resuelve problemas
						reales con la menor fricción posible. Nuestro trabajo empieza escuchando, entendiendo
						contextos y traduciendo necesidades en soluciones elegantes.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section id="connect" class="app-promo-section">
		<div class="graph-section-wrapper" style="position: relative; width: 100vw; margin-left: calc(-50vw + 50%); display: flex; align-items: center; justify-content: center;">
			<Graph {state} />
		</div>
	</section>

	<!-- Content Section BELOW Graph -->
	<section class="content-section-beige">
		<div class="content-section-inner">
			<div class="content-section-centered">
				<span class="content-section-label">PROCESO</span>
				<h2 class="content-section-title-lg">Ingeniería con disciplina,<br />diseño con empatía</h2>
				<p class="content-section-description-lg">
					Nuestro proceso combina rigor técnico con una comprensión profunda del contexto humano.
					No entregamos proyectos: entregamos sistemas que evolucionan, herramientas que perduran
					y experiencias que las personas realmente quieren usar.
				</p>
			</div>

			<div class="content-stats-grid">
				<div class="content-stat">
					<span class="content-stat-number">97%</span>
					<span class="content-stat-label">Retención de clientes a largo plazo</span>
				</div>
				<div class="content-stat">
					<span class="content-stat-number">3x</span>
					<span class="content-stat-label">Velocidad promedio de iteración</span>
				</div>
				<div class="content-stat">
					<span class="content-stat-number">40+</span>
					<span class="content-stat-label">Sistemas en producción activa</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Video Banner Section -->
	<section class="video-banner-section">
		{#if state.isPlayingVideo}
			<div class="video-player-container">
				<iframe 
					src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1" 
					title="Cowboy Feature Video" 
					allow="autoplay; encrypted-media" 
					allowfullscreen
				></iframe>
				<button class="close-video-btn" onclick={state.toggleVideo}>✕ Close Video</button>
			</div>
		{:else}
			<div class="video-overlay">
				<button class="play-button" onclick={state.toggleVideo} aria-label="Play video">
					<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
						<path d="M8 5v14l11-7z"/>
					</svg>
				</button>
			</div>
		{/if}
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
					<h3 class="content-card-title">Arquitectura escalable</h3>
					<p class="content-card-description">
						Diseñamos sistemas que crecen contigo. Cada componente se construye pensando en el siguiente nivel
						de complejidad, sin sacrificar la simplicidad actual.
					</p>
				</div>
				<div class="content-section-card">
					<div class="content-card-icon">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<circle cx="12" cy="12" r="10"/>
							<path d="M12 6v6l4 2"/>
						</svg>
					</div>
					<h3 class="content-card-title">Entrega continua</h3>
					<p class="content-card-description">
						Iteraciones rápidas con despliegues automatizados. Cada cambio pasa por pruebas rigurosas
						antes de llegar a producción.
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
					<h3 class="content-card-title">Equipos dedicados</h3>
					<p class="content-card-description">
						Un equipo que conoce tu negocio, tu contexto y tus ambiciones. No rotamos personas:
						construimos relaciones de largo plazo.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<Footer />
</div>

<!-- Modal Overlay -->
{#if state.activeModal}
	<div 
		class="modal-backdrop" 
		onclick={state.closeModal} 
		onkeydown={(e) => e.key === 'Escape' && state.closeModal()}
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
			<button class="modal-close" onclick={state.closeModal} aria-label="Close modal">✕</button>
			<h3>{state.activeModal}</h3>
			<p>Gracias por tu interés en <strong>WYLEN.</strong> Pronto nos pondremos en contacto.</p>
			<div class="modal-actions">
				<button class="btn btn-dark" onclick={state.closeModal}>Continuar</button>
			</div>
		</div>
	</div>
{/if}

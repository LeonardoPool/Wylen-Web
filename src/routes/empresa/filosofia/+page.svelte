<script lang="ts">
	import { getContext } from 'svelte';
	import type { HomeState } from '$lib/homeState.svelte';

	const homeState = getContext<HomeState>('homeState');
	const lang = $derived(homeState.currentLanguage);

	// Carousel state for the 5 principles
	let activeSlide = $state(0);
	const totalSlides = 5;

	function nextSlide() {
		activeSlide = (activeSlide + 1) % totalSlides;
	}

	function prevSlide() {
		activeSlide = (activeSlide - 1 + totalSlides) % totalSlides;
	}

	const principles = $derived([
		{
			index: '01',
			titleEs: 'Silencio',
			titleEn: 'Silence',
			descEs: 'La excelencia no necesita hacer ruido. Wylen no busca presumir de tecnología ni de términos difíciles para impresionar. La calidad de los sistemas construidos debe hablar por sí misma.',
			descEn: 'Excellence doesn\'t need to make noise. Wylen does not seek to show off technology or use difficult terms to impress. The quality of the built systems must speak for itself.',
			visualSvg: `
				<svg viewBox="0 0 100 100" width="80" height="80">
					<circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="1.5" />
					<line x1="50" y1="20" x2="50" y2="35" stroke="currentColor" stroke-width="1.5" />
					<line x1="50" y1="65" x2="50" y2="80" stroke="currentColor" stroke-width="1.5" />
				</svg>
			`
		},
		{
			index: '02',
			titleEs: 'Elegancia',
			titleEn: 'Elegance',
			descEs: 'Menos es más. Cada componente, cada línea de código y cada sección visual de una herramienta debe tener una razón para existir. Evitamos añadir complejidad innecesaria.',
			descEn: 'Less is more. Every component, line of code, and visual section of a tool must have a reason to exist. We avoid adding unnecessary complexity.',
			visualSvg: `
				<svg viewBox="0 0 100 100" width="80" height="80">
					<rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" stroke-width="1.5" rx="4" />
					<line x1="25" y1="25" x2="75" y2="75" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 3" />
				</svg>
			`
		},
		{
			index: '03',
			titleEs: 'Inteligencia',
			titleEn: 'Intelligence',
			descEs: 'La tecnología debe simplificar lo complejo. No buscamos complicar una solución para demostrar conocimiento técnico. Buscamos utilizar el conocimiento para hacer las cosas más sencillas.',
			descEn: 'Technology should simplify the complex. We don\'t seek to complicate a solution to demonstrate technical knowledge. We seek to use knowledge to make things simpler.',
			visualSvg: `
				<svg viewBox="0 0 100 100" width="80" height="80">
					<circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="1.5" />
					<path d="M50 22v56M22 50h56" stroke="currentColor" stroke-width="1" />
					<circle cx="50" cy="50" r="6" fill="currentColor" />
				</svg>
			`
		},
		{
			index: '04',
			titleEs: 'Claridad',
			titleEn: 'Clarity',
			descEs: 'Respetamos el tiempo y la atención de las personas. Una buena solución tecnológica debe ser comprensible, intuitiva y directa, reduciendo la fricción desde el primer minuto.',
			descEn: 'We respect people\'s time and attention. A good technological solution must be understandable, intuitive, and direct, reducing friction from the very first minute.',
			visualSvg: `
				<svg viewBox="0 0 100 100" width="80" height="80">
					<path d="M30 50h40M30 38h40M30 62h40" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			`
		},
		{
			index: '05',
			titleEs: 'Humano',
			titleEn: 'Human',
			descEs: 'La tecnología existe para servir a personas reales. Detrás de cada base de datos, cada proceso automático y cada sistema, existen personas con necesidades, objetivos y limitaciones.',
			descEn: 'Technology exists to serve real people. Behind every database, automatic process, and system, there are people with needs, goals, and limitations.',
			visualSvg: `
				<svg viewBox="0 0 100 100" width="80" height="80">
					<circle cx="50" cy="40" r="14" fill="none" stroke="currentColor" stroke-width="1.5" />
					<path d="M26 80c0-12 10-18 24-18s24 6 24 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			`
		}
	]);
</script>

<svelte:head>
	<title>{lang === 'es' ? 'Filosofía — WYLEN' : 'Philosophy — WYLEN'}</title>
	<meta name="description" content={lang === 'es'
		? 'Nuestra filosofía de ingeniería: tecnología hecha con claridad, simplicidad y propósito.'
		: 'Our engineering philosophy: technology made with clarity, simplicity, and purpose.'
	} />
</svelte:head>

<!-- Centered Hero -->
<section class="page-hero">
	<span class="page-hero-label">{lang === 'es' ? 'EMPRESA — FILOSOFÍA' : 'COMPANY — PHILOSOPHY'}</span>
	<h1 class="page-hero-title">
		{lang === 'es'
			? 'Tecnología hecha para simplificar, no para complicar.'
			: 'Technology made to simplify, not to complicate.'}
	</h1>
	<p class="page-hero-description">
		{lang === 'es'
			? 'Creemos que las herramientas de software deben ser intuitivas, predecibles y enfocadas en resolver necesidades reales con elegancia.'
			: 'We believe software tools should be intuitive, predictable, and focused on solving real needs with elegance.'}
	</p>
</section>

<!-- Principles Carousel Section -->
<section class="page-section" style="background-color: #ece3d4; border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 3.5rem;">
			<span class="page-section-label">{lang === 'es' ? 'PRINCIPIOS' : 'PRINCIPLES'}</span>
			<h2 class="page-section-title">{lang === 'es' ? 'Nuestras 5 directrices' : 'Our 5 guidelines'}</h2>
		</div>

		<!-- Interactive Carousel (Anthropic Careers style) -->
		<div class="custom-carousel">
			<div class="carousel-viewport">
				<div class="carousel-container-inner" style="transform: translateX(-{activeSlide * 100}%);">
					{#each principles as p}
						<div class="carousel-slide-item">
							<div class="carousel-visual">
								{@html p.visualSvg}
							</div>
							<div class="carousel-info">
								<span class="carousel-index">{p.index} / 05</span>
								<h3 class="carousel-title-text">{lang === 'es' ? p.titleEs : p.titleEn}</h3>
								<p class="carousel-body-text">{lang === 'es' ? p.descEs : p.descEn}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Controls -->
			<div class="carousel-nav-controls">
				<div class="carousel-indicators">
					{#each Array(5) as _, i}
						<button 
							class="carousel-dot-indicator" 
							class:active={activeSlide === i} 
							onclick={() => activeSlide = i}
							aria-label="Ir a diapositiva {i + 1}"
						></button>
					{/each}
				</div>
				<div class="carousel-arrow-buttons">
					<button class="carousel-arrow-btn" onclick={prevSlide} aria-label="Anterior">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M19 12H5M12 19l-7-7 7-7"/>
						</svg>
					</button>
					<button class="carousel-arrow-btn" onclick={nextSlide} aria-label="Siguiente">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M5 12h14M12 5l7 7-7 7"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Radial Radar SVG Graphic Section -->
<section class="page-section" style="border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-grid-2-narrow">
			<div>
				<span class="page-section-label">{lang === 'es' ? 'NUESTRO EQUILIBRIO' : 'OUR BALANCE'}</span>
				<h2 class="page-section-title">
					{lang === 'es'
						? 'Cómo equilibramos cada decisión de ingeniería'
						: 'How we balance every engineering decision'}
				</h2>
				<p class="page-section-text">
					{lang === 'es'
						? 'En Wylen, no favorecemos un principio sobre otro. Creemos que la armonía entre lo humano, la claridad y el silencio técnico genera el mejor impacto.'
						: 'At Wylen, we don\'t prioritize one principle over another. We believe the harmony between human focus, clarity, and technical silence generates the best impact.'}
				</p>
			</div>
			<div style="display: flex; align-items: center; justify-content: center;">
				<!-- Radar chart representation of our focus -->
				<svg viewBox="0 0 220 220" style="width: 100%; max-width: 260px;" class="chart-svg">
					<!-- Circular grids -->
					<circle cx="110" cy="110" r="80" fill="none" class="radar-grid-line" />
					<circle cx="110" cy="110" r="50" fill="none" class="radar-grid-line" />
					<circle cx="110" cy="110" r="20" fill="none" class="radar-grid-line" />

					<!-- Axis Lines -->
					<!-- Humano -->
					<line x1="110" y1="110" x2="110" y2="30" class="radar-grid-line" />
					<!-- Claridad -->
					<line x1="110" y1="110" x2="186" y2="85" class="radar-grid-line" />
					<!-- Inteligencia -->
					<line x1="110" y1="110" x2="157" y2="175" class="radar-grid-line" />
					<!-- Elegancia -->
					<line x1="110" y1="110" x2="63" y2="175" class="radar-grid-line" />
					<!-- Silencio -->
					<line x1="110" y1="110" x2="34" y2="85" class="radar-grid-line" />

					<!-- Radar Polygon area representing our balance -->
					<!-- Nodes: Humano(110,40), Claridad(170,90), Inteligencia(140,150), Elegancia(80,150), Silencio(50,90) -->
					<polygon points="110,45 170,90 145,150 75,150 50,90" class="radar-area" />

					<!-- Axis labels -->
					<text x="110" y="24" text-anchor="middle" font-size="8" font-weight="700" fill="var(--text-dark)">HUMANO</text>
					<text x="194" y="88" text-anchor="start" font-size="8" font-weight="700" fill="var(--text-dark)">CLARIDAD</text>
					<text x="26" y="88" text-anchor="end" font-size="8" font-weight="700" fill="var(--text-dark)">SILENCIO</text>
				</svg>
			</div>
		</div>
	</div>
</section>

<!-- Quote block and CTA -->
<section class="page-section page-section-dark">
	<div class="page-section-inner">
		<div class="page-grid-2">
			<div>
				<p class="page-quote" style="border-left-width: 4px; font-family: Georgia, serif; font-style: italic;">
					{lang === 'es'
						? '«No construimos tecnología para demostrar lo que podemos hacer. Construimos tecnología para mejorar lo que puede hacerse.»'
						: '"We don\'t build technology to demonstrate what we can do. We build technology to improve what can be done."'}
				</p>
			</div>
			<div style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 1.5rem;">
				<h3 style="font-size: 1.8rem; font-weight: 700; color: var(--text-light);">{lang === 'es' ? '¿Quieres ver nuestra filosofía en acción?' : 'Want to see our philosophy in action?'}</h3>
				<button class="btn btn-pill-sand" onclick={() => homeState.openModal('Filosofía')}>
					{lang === 'es' ? 'Trabajar con Wylen' : 'Work with Wylen'}
				</button>
			</div>
		</div>
	</div>
</section>

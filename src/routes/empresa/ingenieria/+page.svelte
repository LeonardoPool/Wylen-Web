<script lang="ts">
	import { getContext } from 'svelte';
	import type { HomeState } from '$lib/homeState.svelte';

	const homeState = getContext<HomeState>('homeState');
	const lang = $derived(homeState.currentLanguage);

	// State for comparing visual metrics in chart
	let hoverMetric = $state<'stability' | 'time' | 'cost' | null>(null);
</script>

<svelte:head>
	<title>{lang === 'es' ? 'Ingeniería — WYLEN' : 'Engineering — WYLEN'}</title>
	<meta name="description" content={lang === 'es'
		? 'Ingeniería significa construir con intención. Rigor, precisión y código resiliente.'
		: 'Engineering means building with intention. Rigor, precision, and resilient code.'
	} />
</svelte:head>

<!-- Asymmetric Hero with SVG Circuit Diagram -->
<section class="page-hero page-hero-left">
	<div class="page-hero-left-grid">
		<div>
			<span class="page-hero-label">{lang === 'es' ? 'EMPRESA — INGENIERÍA' : 'COMPANY — ENGINEERING'}</span>
			<h1 class="page-hero-title" style="text-align: left; margin-bottom: 1.5rem;">
				{lang === 'es'
					? 'La ingeniería no es programar rápido; es modelar con rigor.'
					: 'Engineering isn\'t coding fast; it is modeling with rigor.'}
			</h1>
			<p class="page-hero-description" style="text-align: left;">
				{lang === 'es'
					? 'Diseñamos sistemas preparados para escalar, con una arquitectura clara que disminuye costes de mantenimiento y responde con flexibilidad.'
					: 'We design systems prepared to scale, with a clear architecture that reduces maintenance costs and adapts flexibly.'}
			</p>
		</div>
		<div>
			<!-- Animated SVG Circuit/Nodes Diagram -->
			<div class="chart-box" style="padding: 0;">
				<svg class="chart-svg" viewBox="0 0 200 200" style="max-width: 280px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.05));">
					<!-- Center Node -->
					<circle cx="100" cy="100" r="16" fill="var(--text-dark)" />
					<circle cx="100" cy="100" r="28" fill="none" stroke="var(--text-dark)" stroke-width="1" stroke-dasharray="4 2" class="diagram-link" style="animation-duration: 40s;" />
					
					<!-- Connections -->
					<line x1="100" y1="100" x2="40" y2="60" stroke="var(--text-dark)" stroke-width="1.5" stroke-dasharray="5 3" class="diagram-link" />
					<line x1="100" y1="100" x2="160" y2="60" stroke="var(--text-dark)" stroke-width="1.5" stroke-dasharray="5 3" class="diagram-link" />
					<line x1="100" y1="100" x2="100" y2="170" stroke="var(--text-dark)" stroke-width="1.5" stroke-dasharray="5 3" class="diagram-link" />

					<!-- Peripheral Nodes -->
					<circle cx="40" cy="60" r="8" fill="var(--text-dark)" class="diagram-node" />
					<circle cx="40" cy="60" r="16" fill="none" stroke="var(--text-dark)" stroke-width="1" class="pulse-circle" />

					<circle cx="160" cy="60" r="8" fill="var(--text-dark)" class="diagram-node" />
					<circle cx="160" cy="60" r="16" fill="none" stroke="var(--text-dark)" stroke-width="1" class="pulse-circle" style="animation-delay: 1s;" />

					<circle cx="100" cy="170" r="8" fill="var(--text-dark)" class="diagram-node" />
					<circle cx="100" cy="170" r="16" fill="none" stroke="var(--text-dark)" stroke-width="1" class="pulse-circle" style="animation-delay: 2s;" />

					<!-- Small satellite dots -->
					<circle cx="70" cy="40" r="3" fill="#b5aa97" />
					<circle cx="130" cy="150" r="3" fill="#b5aa97" />
				</svg>
			</div>
		</div>
	</div>
</section>

<!-- Data presentation: SVG Bar Chart -->
<section class="page-section" style="background-color: #ece3d4; border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-grid-2-narrow">
			<div>
				<span class="page-section-label">{lang === 'es' ? 'MÉTRICAS Y CONTROL' : 'METRICS & CONTROL'}</span>
				<h2 class="page-section-title">
					{lang === 'es'
						? 'El impacto real del software bien estructurado'
						: 'The real impact of well-structured software'}
				</h2>
				<p class="page-section-text">
					{lang === 'es'
						? 'Pasa el cursor por las barras de la gráfica para analizar las diferencias entre un desarrollo convencional (sin arquitectura intencional) y nuestro enfoque de ingeniería.'
						: 'Hover over the chart bars to analyze the differences between conventional development (without intentional architecture) and our engineering approach.'}
				</p>

				<div style="margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem;">
					<!-- Active metric info display -->
					<div style="background: rgba(255,255,255,0.4); border-radius: 12px; padding: 1.2rem; border: 1px solid rgba(18,18,17,0.05); min-height: 120px;">
						{#if hoverMetric === 'stability'}
							<h4 style="font-weight: 700; margin-bottom: 0.4rem;">{lang === 'es' ? 'Estabilidad del código' : 'Code stability'}</h4>
							<p style="font-size: 0.9rem; color: var(--text-muted);">
								{lang === 'es'
									? 'Nuestras pruebas automatizadas garantizan que nuevos despliegues no afecten flujos de trabajo críticos existentes. 98% estabilidad vs 60% promedio.'
									: 'Our automated tests guarantee new deployments do not affect existing critical workflows. 98% stability vs 60% average.'}
							</p>
						{:else}
							<h4 style="font-weight: 700; margin-bottom: 0.4rem;">{lang === 'es' ? 'Mantenibilidad técnica' : 'Technical maintainability'}</h4>
							<p style="font-size: 0.9rem; color: var(--text-muted);">
								{lang === 'es'
									? 'Un sistema ordenado permite añadir nuevas integraciones y funciones sin romper los módulos operativos principales.'
									: 'An ordered system allows adding new integrations and functions without breaking core operational modules.'}
							</p>
						{/if}
					</div>
				</div>
			</div>

			<div style="display: flex; align-items: center; justify-content: center;">
				<!-- SVG Comparison Bar Chart -->
				<svg viewBox="0 0 320 220" style="width: 100%; max-width: 360px;" class="chart-svg">
					<!-- Grid lines -->
					<line x1="40" y1="40" x2="300" y2="40" stroke="rgba(18,18,17,0.05)" />
					<line x1="40" y1="90" x2="300" y2="90" stroke="rgba(18,18,17,0.05)" />
					<line x1="40" y1="140" x2="300" y2="140" stroke="rgba(18,18,17,0.05)" />
					<line x1="40" y1="190" x2="300" y2="190" stroke="rgba(18,18,17,0.2)" />

					<!-- Stability Metric -->
					<!-- Wylen (Beige/Sand) -->
					<rect x="60" y="50" width="30" height="140" fill="var(--text-dark)" rx="4" class="bar-chart-rect bar-hover-effect" onmouseenter={() => hoverMetric = 'stability'} />
					<!-- Generic (Grey) -->
					<rect x="95" y="110" width="30" height="80" fill="#b5aa97" opacity="0.6" rx="4" class="bar-chart-rect bar-hover-effect" onmouseenter={() => hoverMetric = 'stability'} />
					
					<!-- Maintenance Cost Metric -->
					<!-- Wylen (Dark) -->
					<rect x="180" y="80" width="30" height="110" fill="var(--text-dark)" rx="4" class="bar-chart-rect bar-hover-effect" onmouseenter={() => hoverMetric = 'cost'} />
					<!-- Generic (Grey) -->
					<rect x="215" y="150" width="30" height="40" fill="#b5aa97" opacity="0.6" rx="4" class="bar-chart-rect bar-hover-effect" onmouseenter={() => hoverMetric = 'cost'} />

					<!-- X Labels -->
					<text x="92" y="210" text-anchor="middle" font-size="9" font-weight="700" fill="var(--text-dark)">
						{lang === 'es' ? 'Estabilidad' : 'Stability'}
					</text>
					<text x="212" y="210" text-anchor="middle" font-size="9" font-weight="700" fill="var(--text-dark)">
						{lang === 'es' ? 'Mantenimiento' : 'Maintainability'}
					</text>
				</svg>
			</div>
		</div>
	</div>
</section>

<!-- Deep Essay Section (Two Column Layout style) -->
<section class="page-section" style="border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-grid-2">
			<div>
				<span class="page-section-label">{lang === 'es' ? 'EL MANIFIESTO' : 'THE MANIFESTO'}</span>
				<h2 class="page-section-title">
					{lang === 'es'
						? '¿Por qué la velocidad sin dirección es un engaño?'
						: 'Why speed without direction is an illusion?'}
				</h2>
			</div>
			<div>
				<p class="page-section-text" style="font-size: 1.1rem; line-height: 1.85;">
					{lang === 'es'
						? 'En el desarrollo convencional de software se premia el «terminar rápido» a costa del orden técnico. Esto genera parches temporales, bases de datos inconsistentes y, finalmente, un sistema que nadie quiere tocar por miedo a romperlo.'
						: 'In conventional software development, "finishing fast" is rewarded at the cost of technical order. This generates temporary patches, inconsistent databases, and eventually, a system no one wants to touch for fear of breaking it.'}
				</p>
				<p class="page-section-text">
					{lang === 'es'
						? 'La verdadera velocidad nace del orden técnico. Construir con intención desde el principio reduce costes a mediano plazo y permite que el software crezca de forma paralela a las necesidades de la organización.'
						: 'True speed comes from technical order. Building with intention from the beginning reduces medium-term costs and allows software to grow in parallel with the organization\'s needs.'}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Intention Cards Section -->
<section class="page-section page-section-dark">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 3.5rem;">
			<span class="page-section-label">{lang === 'es' ? 'NUESTRO PROCESO TÉCNICO' : 'OUR TECHNICAL PROCESS'}</span>
			<h2 class="page-section-title">{lang === 'es' ? 'Construir con rigor estructural' : 'Building with structural rigor'}</h2>
		</div>

		<div class="page-grid-3">
			<div class="page-card page-card-dark">
				<div class="page-card-number">01</div>
				<h3 class="page-card-title">{lang === 'es' ? 'Análisis de flujos' : 'Flow Analysis'}</h3>
				<p class="page-card-text">
					{lang === 'es'
						? 'Evaluamos el flujo de datos e información en detalle antes de escribir código, evitando reescribir módulos en fases avanzadas.'
						: 'We evaluate the flow of data and information in detail before coding, avoiding rewriting modules in advanced phases.'}
				</p>
			</div>
			<div class="page-card page-card-dark">
				<div class="page-card-number">02</div>
				<h3 class="page-card-title">{lang === 'es' ? 'Modularidad real' : 'Real Modularity'}</h3>
				<p class="page-card-text">
					{lang === 'es'
						? 'Cada componente tiene una sola responsabilidad. Esto permite sustituir piezas o integrar nuevas herramientas de forma aislada.'
						: 'Each component has a single responsibility. This allows replacing parts or integrating new tools in isolation.'}
				</p>
			</div>
			<div class="page-card page-card-dark">
				<div class="page-card-number">03</div>
				<h3 class="page-card-title">{lang === 'es' ? 'Pruebas e Integración' : 'Testing & Integration'}</h3>
				<p class="page-card-text">
					{lang === 'es'
						? 'Automatizamos la verificación del software en cada despliegue, asegurando que cada cambio funcione en producción.'
						: 'We automate software verification on each deployment, ensuring every change works in production.'}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Quote block and CTA -->
<section class="page-section" style="border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-grid-2">
			<div>
				<p class="page-quote" style="border-left-width: 4px; font-family: Georgia, serif; font-style: italic;">
					{lang === 'es'
						? '«El código limpio e inteligente no es más caro de escribir; lo que realmente sale caro es mantener software mal estructurado.»'
						: '"Clean and smart code isn\'t more expensive to write; what is truly expensive is maintaining poorly structured software."'}
				</p>
			</div>
			<div style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 1.5rem;">
				<h3 style="font-size: 1.8rem; font-weight: 700; color: var(--text-dark);">{lang === 'es' ? 'Hablemos de código con intención' : 'Let\'s talk about code with intention'}</h3>
				<a href="/contacto" class="btn btn-dark">
					{lang === 'es' ? 'Escribir a Wylen' : 'Write to Wylen'}
				</a>
			</div>
		</div>
	</div>
</section>

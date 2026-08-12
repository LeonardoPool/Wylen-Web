<script lang="ts">
	import { getContext } from 'svelte';
	import type { HomeState } from '$lib/homeState.svelte';

	const homeState = getContext<HomeState>('homeState');
	const lang = $derived(homeState.currentLanguage);
</script>

<svelte:head>
	<title>{lang === 'es' ? 'Consultoría técnica — WYLEN' : 'Technical Consulting — WYLEN'}</title>
	<meta name="description" content={lang === 'es'
		? 'Te ayudamos a tomar decisiones de arquitectura, escalabilidad y herramientas con honestidad e independencia comercial.'
		: 'We help you make architecture, scalability, and tooling decisions with honesty and commercial independence.'
	} />
</svelte:head>

<!-- Asymmetric Hero -->
<section class="page-hero page-hero-left">
	<div class="page-hero-left-grid">
		<div>
			<span class="page-hero-label">{lang === 'es' ? 'SERVICIOS — CONSULTORÍA' : 'SERVICES — CONSULTING'}</span>
			<h1 class="page-hero-title" style="text-align: left; margin-bottom: 1.5rem;">
				{lang === 'es'
					? 'Una mala decisión tecnológica se nota tarde y cuesta el doble.'
					: 'A bad technology decision shows up late and costs twice as much.'}
			</h1>
			<p class="page-hero-description" style="text-align: left;">
				{lang === 'es'
					? 'Evaluamos tu infraestructura actual, definimos arquitecturas robustas y te orientamos sobre qué herramientas elegir sin compromisos comerciales.'
					: 'We evaluate your current infrastructure, define robust architectures, and guide you on tool selection without commercial commitments.'}
			</p>
		</div>
		<div>
			<!-- Evaluation Diagram SVG (Flowchart) -->
			<div class="chart-box" style="padding: 0;">
				<svg class="chart-svg" viewBox="0 0 200 200" style="max-width: 280px;">
					<!-- Decision Node 1 -->
					<rect x="50" y="20" width="100" height="30" rx="6" fill="var(--text-dark)" />
					<text x="100" y="38" fill="var(--text-light)" font-size="8" font-weight="700" text-anchor="middle">
						{lang === 'es' ? 'Problema de Negocio' : 'Business Problem'}
					</text>

					<!-- Connector Line -->
					<line x1="100" y1="50" x2="100" y2="80" stroke="var(--text-dark)" stroke-width="1.5" />
					<polygon points="100,80 96,74 104,74" fill="var(--text-dark)" />

					<!-- Decision Node 2 (Diamond representation or clean box) -->
					<rect x="40" y="80" width="120" height="35" rx="6" fill="none" stroke="var(--text-dark)" stroke-width="1.5" />
					<text x="100" y="101" fill="var(--text-dark)" font-size="7" font-weight="700" text-anchor="middle">
						{lang === 'es' ? '¿Requiere software a medida?' : 'Requires custom software?'}
					</text>

					<!-- Branch Yes -->
					<line x1="60" y1="115" x2="40" y2="150" stroke="var(--text-dark)" stroke-width="1" />
					<text x="42" y="130" font-size="7" font-weight="700" fill="var(--text-dark)">SI / YES</text>
					<rect x="10" y="150" width="70" height="30" rx="6" fill="#b5aa97" opacity="0.8" />
					<text x="45" y="168" fill="var(--text-dark)" font-size="7" font-weight="700" text-anchor="middle">
						{lang === 'es' ? 'Diseño de arquitectura' : 'Architecture Design'}
					</text>

					<!-- Branch No -->
					<line x1="140" y1="115" x2="160" y2="150" stroke="var(--text-dark)" stroke-width="1" />
					<text x="156" y="130" font-size="7" font-weight="700" fill="var(--text-dark)">NO</text>
					<rect x="120" y="150" width="70" height="30" rx="6" fill="#b5aa97" opacity="0.8" />
					<text x="155" y="168" fill="var(--text-dark)" font-size="7" font-weight="700" text-anchor="middle">
						{lang === 'es' ? 'SaaS / Integración' : 'SaaS / Integration'}
					</text>
				</svg>
			</div>
		</div>
	</div>
</section>

<!-- Interactive checklist section -->
<section class="page-section" style="background-color: #ece3d4; border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-grid-2-narrow">
			<div>
				<span class="page-section-label">{lang === 'es' ? 'NUESTRO COMPROMISO' : 'OUR COMMITMENT'}</span>
				<h2 class="page-section-title">
					{lang === 'es'
						? 'Evaluaciones honestas e independientes'
						: 'Honest and independent evaluations'}
				</h2>
				<p class="page-section-text">
					{lang === 'es'
						? 'En Wylen no distribuimos herramientas específicas ni recibimos comisiones. Nuestro único compromiso es el éxito de tu operación.'
						: 'At Wylen, we do not distribute specific tools or receive commissions. Our only commitment is the success of your operation.'}
				</p>
			</div>
			<div>
				<div class="interactive-check-item">
					<div class="check-bullet-circle">✓</div>
					<div>
						<h4 style="font-weight: 700; margin-bottom: 0.2rem;">{lang === 'es' ? 'Análisis de procesos existentes' : 'Analysis of existing processes'}</h4>
						<p style="font-size: 0.9rem; color: var(--text-muted);">
							{lang === 'es' ? 'Comprendemos cómo opera tu equipo antes de aconsejar cambios.' : 'We understand how your team operates before advising changes.'}
						</p>
					</div>
				</div>
				<div class="interactive-check-item">
					<div class="check-bullet-circle">✓</div>
					<div>
						<h4 style="font-weight: 700; margin-bottom: 0.2rem;">{lang === 'es' ? 'Diseño de arquitectura de software' : 'Software architecture design'}</h4>
						<p style="font-size: 0.9rem; color: var(--text-muted);">
							{lang === 'es' ? 'Definimos bases de datos y módulos escalables que impiden el desorden técnico.' : 'We define databases and scalable modules that prevent technical mess.'}
						</p>
					</div>
				</div>
				<div class="interactive-check-item">
					<div class="check-bullet-circle">✓</div>
					<div>
						<h4 style="font-weight: 700; margin-bottom: 0.2rem;">{lang === 'es' ? 'Evaluación de proveedores y presupuestos' : 'Vendor and budget evaluation'}</h4>
						<p style="font-size: 0.9rem; color: var(--text-muted);">
							{lang === 'es' ? 'Te orientamos sobre costes reales de infraestructura en la nube y licencias.' : 'We guide you on actual cloud infrastructure and licensing costs.'}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Numeric list sections style of Anthropic Policy -->
<section class="page-section" style="border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 4rem;">
			<span class="page-section-label">{lang === 'es' ? 'ÁREAS TÉCNICAS' : 'TECHNICAL AREAS'}</span>
			<h2 class="page-section-title">{lang === 'es' ? 'Cómo te podemos orientar' : 'How we can guide you'}</h2>
		</div>

		<div class="page-grid-3">
			<div class="page-card" style="background: rgba(255,255,255,0.45); border: 1px solid rgba(18,18,17,0.05);">
				<div style="font-size: 2.2rem; font-weight: 800; font-family: var(--font-brand); opacity: 0.15; margin-bottom: 1rem;">01</div>
				<h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.6rem;">{lang === 'es' ? 'Arquitectura de Datos' : 'Data Architecture'}</h3>
				<p style="font-size: 0.95rem; line-height: 1.55; color: var(--text-muted);">
					{lang === 'es'
						? 'Modelamos la estructura de tu base de datos para impedir redundancias y asegurar la integridad de la información empresarial.'
						: 'We model your database structure to prevent redundancies and ensure the integrity of business information.'}
				</p>
			</div>
			<div class="page-card" style="background: rgba(255,255,255,0.45); border: 1px solid rgba(18,18,17,0.05);">
				<div style="font-size: 2.2rem; font-weight: 800; font-family: var(--font-brand); opacity: 0.15; margin-bottom: 1rem;">02</div>
				<h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.6rem;">{lang === 'es' ? 'Migración a la Nube' : 'Cloud Migration'}</h3>
				<p style="font-size: 0.95rem; line-height: 1.55; color: var(--text-muted);">
					{lang === 'es'
						? 'Diseñamos planes para migrar sistemas locales a la nube de manera progresiva, reduciendo riesgos operativos.'
						: 'We design plans to migrate local systems to the cloud progressively, reducing operational risks.'}
				</p>
			</div>
			<div class="page-card" style="background: rgba(255,255,255,0.45); border: 1px solid rgba(18,18,17,0.05);">
				<div style="font-size: 2.2rem; font-weight: 800; font-family: var(--font-brand); opacity: 0.15; margin-bottom: 1rem;">03</div>
				<h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.6rem;">{lang === 'es' ? 'Auditoría de Código' : 'Code Audit'}</h3>
				<p style="font-size: 0.95rem; line-height: 1.55; color: var(--text-muted);">
					{lang === 'es'
						? 'Analizamos el estado del software construido por terceros, identificando debilidades de seguridad y escalabilidad.'
						: 'We analyze the state of software built by third parties, identifying security and scalability weaknesses.'}
				</p>
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
						? '«El objetivo de la consultoría técnica no es proponer la tecnología más moderna, sino la que mejor resuelva la necesidad de negocio con menor mantenimiento.»'
						: '"The goal of technical consulting is not to suggest the most modern technology, but the one that best solves the business need with the lowest maintenance."'}
				</p>
			</div>
			<div style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 1.5rem;">
				<h3 style="font-size: 1.8rem; font-weight: 700; color: var(--text-light);">{lang === 'es' ? '¿Dudas sobre tu dirección tecnológica?' : 'Doubts about your technical direction?'}</h3>
				<button class="btn btn-pill-sand" onclick={() => homeState.openModal('Consultoría')}>
					{lang === 'es' ? 'Agendar consulta' : 'Schedule consultation'}
				</button>
			</div>
		</div>
	</div>
</section>

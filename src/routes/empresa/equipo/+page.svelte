<script lang="ts">
	import { getContext } from 'svelte';
	import type { HomeState } from '$lib/homeState.svelte';

	const homeState = getContext<HomeState>('homeState');
	const lang = $derived(homeState.currentLanguage);

	// Accordion state
	let openDrawer = $state<string | null>(null);

	function toggleDrawer(name: string) {
		if (openDrawer === name) {
			openDrawer = null;
		} else {
			openDrawer = name;
		}
	}
</script>

<svelte:head>
	<title>{lang === 'es' ? 'Equipo — WYLEN' : 'Team — WYLEN'}</title>
	<meta name="description" content={lang === 'es'
		? 'Cómo trabaja el equipo de Wylen. Equipos dedicados sin rotación permanente y enfocados en el contexto real del negocio.'
		: 'How Wylen\'s team works. Dedicated teams without permanent rotation and focused on the actual business context.'
	} />
</svelte:head>

<!-- Left-aligned Hero with inline statistics -->
<section class="page-hero page-hero-left">
	<div class="page-hero-left-grid">
		<div>
			<span class="page-hero-label">{lang === 'es' ? 'EMPRESA — EQUIPO' : 'COMPANY — TEAM'}</span>
			<h1 class="page-hero-title" style="text-align: left; margin-bottom: 1.5rem;">
				{lang === 'es'
					? 'La estabilidad del equipo garantiza la estabilidad del sistema.'
					: 'Team stability guarantees system stability.'}
			</h1>
			<p class="page-hero-description" style="text-align: left;">
				{lang === 'es'
					? 'Formamos equipos dedicados de ingeniería y diseño que se sumergen en tu operación para resolver problemas desde adentro.'
					: 'We build dedicated engineering and design teams that immerse themselves in your operation to solve problems from within.'}
			</p>
		</div>
		<div>
			<!-- Large typographic callouts inline style of Anthropic -->
			<div style="background: rgba(18,18,17,0.03); border-radius: 20px; padding: 2rem; border: 1px solid rgba(18,18,17,0.05); display: flex; flex-direction: column; gap: 1.5rem;">
				<div>
					<span style="font-size: 2.2rem; font-weight: 800; font-family: var(--font-brand);">97%</span>
					<p style="font-size: 0.82rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; margin-top: 0.2rem;">
						{lang === 'es' ? 'Retención a largo plazo' : 'Long-term retention'}
					</p>
				</div>
				<div style="width: 100%; height: 1px; background: rgba(18,18,17,0.08);"></div>
				<div>
					<span style="font-size: 2.2rem; font-weight: 800; font-family: var(--font-brand);">100%</span>
					<p style="font-size: 0.82rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; margin-top: 0.2rem;">
						{lang === 'es' ? 'Foco en el cliente' : 'Client focus'}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Columns by Department (Inspired by Anthropic "The Team" structure) -->
<section class="page-section" style="background-color: #ece3d4; border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 4rem;">
			<span class="page-section-label">{lang === 'es' ? 'NUESTRAS ÁREAS' : 'OUR DEPARTMENTS'}</span>
			<h2 class="page-section-title">{lang === 'es' ? 'Cómo se divide nuestra práctica' : 'How our practice is divided'}</h2>
		</div>

		<div class="page-grid-2">
			<!-- Area 1: Ingeniería -->
			<div class="page-card" style="background: rgba(255,255,255,0.4);">
				<h3 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.8rem; color: var(--text-dark);">
					{lang === 'es' ? 'Ingeniería y arquitectura' : 'Engineering & Architecture'}
				</h3>
				<p class="page-card-text" style="line-height: 1.65;">
					{lang === 'es'
						? 'Responsables del modelado lógico, la resiliencia del código, las automatizaciones e integraciones y el rendimiento operativo en producción.'
						: 'Responsible for logical modeling, code resilience, automations and integrations, and operational performance in production.'}
				</p>
			</div>

			<!-- Area 2: Producto y UX -->
			<div class="page-card" style="background: rgba(255,255,255,0.4);">
				<h3 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.8rem; color: var(--text-dark);">
					{lang === 'es' ? 'Producto y experiencia (UX)' : 'Product & Experience (UX)'}
				</h3>
				<p class="page-card-text" style="line-height: 1.65;">
					{lang === 'es'
						? 'Enfocados en investigar el comportamiento de los usuarios, simplificar interfaces, validar flujos y garantizar simplicidad extrema.'
						: 'Focused on researching user behavior, simplifying interfaces, validating flows, and guaranteeing extreme simplicity.'}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Values in Collapsible Drawers (Accordions) -->
<section class="page-section" style="border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 3.5rem;">
			<span class="page-section-label">{lang === 'es' ? 'CULTURA' : 'CULTURE'}</span>
			<h2 class="page-section-title">{lang === 'es' ? 'Lo que define nuestro trabajo' : 'What defines our work'}</h2>
		</div>

		<div class="accordion-wrapper">
			<!-- Drawer 1 -->
			<div class="accordion-drawer" class:open={openDrawer === 'honesty'}>
				<button class="accordion-head" onclick={() => toggleDrawer('honesty')} aria-expanded={openDrawer === 'honesty'}>
					<span class="accordion-trigger-title">{lang === 'es' ? 'Honestidad técnica' : 'Technical honesty'}</span>
					<div class="accordion-icon-wrap">
						<div class="accordion-icon-line accordion-icon-line-h"></div>
						<div class="accordion-icon-line accordion-icon-line-v"></div>
					</div>
				</button>
				<div class="accordion-body">
					<p class="accordion-desc-text">
						{lang === 'es'
							? 'Preferimos decir «esto no es lo que necesitas» antes que construir un módulo innecesario. Creemos en dar respuestas honestas y de valor real.'
							: 'We prefer to say "this is not what you need" rather than building an unnecessary module. We believe in providing honest answers with real value.'}
					</p>
				</div>
			</div>

			<!-- Drawer 2 -->
			<div class="accordion-drawer" class:open={openDrawer === 'curiosity'}>
				<button class="accordion-head" onclick={() => toggleDrawer('curiosity')} aria-expanded={openDrawer === 'curiosity'}>
					<span class="accordion-trigger-title">{lang === 'es' ? 'Curiosidad permanente' : 'Permanent curiosity'}</span>
					<div class="accordion-icon-wrap">
						<div class="accordion-icon-line accordion-icon-line-h"></div>
						<div class="accordion-icon-line accordion-icon-line-v"></div>
					</div>
				</button>
				<div class="accordion-body">
					<p class="accordion-desc-text">
						{lang === 'es'
							? 'Cada negocio tiene complejidades operativas únicas. Indagamos y hacemos preguntas hasta comprender el fondo del problema.'
							: 'Every business has unique operational complexities. We query and ask questions until we understand the root of the problem.'}
					</p>
				</div>
			</div>

			<!-- Drawer 3 -->
			<div class="accordion-drawer" class:open={openDrawer === 'accountability'}>
				<button class="accordion-head" onclick={() => toggleDrawer('accountability')} aria-expanded={openDrawer === 'accountability'}>
					<span class="accordion-trigger-title">{lang === 'es' ? 'Responsabilidad sobre el resultado' : 'Accountability for results'}</span>
					<div class="accordion-icon-wrap">
						<div class="accordion-icon-line accordion-icon-line-h"></div>
						<div class="accordion-icon-line accordion-icon-line-v"></div>
					</div>
				</button>
				<div class="accordion-body">
					<p class="accordion-desc-text">
						{lang === 'es'
							? 'El desarrollo no termina cuando el código compila. Nos hacemos responsables de que el sistema funcione en el día a día real de la organización.'
							: 'Development doesn\'t end when code compiles. We hold ourselves responsible for the system working in the organization\'s actual day-to-day operations.'}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Stat Strip Banner Section -->
<section class="page-section page-section-dark" style="padding: 4.5rem 2.5rem;">
	<div class="page-section-inner">
		<div style="display: flex; flex-wrap: wrap; justify-content: space-around; gap: 3rem; text-align: center;">
			<div>
				<span style="font-size: 2.2rem; font-weight: 800; font-family: var(--font-brand); color: var(--text-light);">97%</span>
				<p style="font-size: 0.72rem; color: var(--text-dim-light); font-weight: 700; text-transform: uppercase; margin-top: 0.4rem; letter-spacing: 0.05em;">
					{lang === 'es' ? 'Retención de clientes' : 'Client retention'}
				</p>
			</div>
			<div>
				<span style="font-size: 2.2rem; font-weight: 800; font-family: var(--font-brand); color: var(--text-light);">3x</span>
				<p style="font-size: 0.72rem; color: var(--text-dim-light); font-weight: 700; text-transform: uppercase; margin-top: 0.4rem; letter-spacing: 0.05em;">
					{lang === 'es' ? 'Velocidad de iteración' : 'Iteration speed'}
				</p>
			</div>
			<div>
				<span style="font-size: 2.2rem; font-weight: 800; font-family: var(--font-brand); color: var(--text-light);">40+</span>
				<p style="font-size: 0.72rem; color: var(--text-dim-light); font-weight: 700; text-transform: uppercase; margin-top: 0.4rem; letter-spacing: 0.05em;">
					{lang === 'es' ? 'Sistemas activos' : 'Active systems'}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="page-cta">
	{#if lang === 'es'}
		<h2 class="page-cta-title">¿Quieres un equipo dedicado a tu proyecto?</h2>
		<p class="page-cta-text">Conversemos sobre cómo podemos integrarnos para resolver tus problemas de negocio.</p>
	{:else}
		<h2 class="page-cta-title">Need a dedicated team for your project?</h2>
		<p class="page-cta-text">Let's talk about how we can integrate to solve your business problems.</p>
	{/if}
	<button class="page-cta-btn" onclick={() => homeState.openModal('Equipo')}>
		{lang === 'es' ? 'Conversemos' : "Let's talk"}
	</button>
</section>

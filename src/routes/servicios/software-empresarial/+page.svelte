<script lang="ts">
	import { getContext } from 'svelte';
	import type { HomeState } from '$lib/homeState.svelte';

	const homeState = getContext<HomeState>('homeState');
	const lang = $derived(homeState.currentLanguage);
</script>

<svelte:head>
	<title>{lang === 'es' ? 'Software empresarial — WYLEN' : 'Enterprise Software — WYLEN'}</title>
	<meta name="description" content={lang === 'es'
		? 'Diseñamos software que ayuda a las empresas a organizar, controlar y mejorar sus operaciones. Partimos del problema de negocio, no de la tecnología.'
		: 'We design software that helps companies organize, control, and improve their operations. We start from the business problem, not the technology.'
	} />
</svelte:head>

<!-- Hero -->
<section class="page-hero">
	<span class="page-hero-label">{lang === 'es' ? 'SERVICIOS' : 'SERVICES'}</span>
	{#if lang === 'es'}
		<h1 class="page-hero-title">Tu negocio genera información cada día. La pregunta es si esa información trabaja para ti.</h1>
		<p class="page-hero-description">
			Diseñamos y desarrollamos software que ayuda a las empresas a organizar, controlar y mejorar sus operaciones. No partimos de una tecnología específica. Partimos del problema de negocio.
		</p>
	{:else}
		<h1 class="page-hero-title">Your business generates data every day. The question is whether that data works for you.</h1>
		<p class="page-hero-description">
			We design and build software that helps companies organize, control, and improve their operations. We don't start from a specific technology. We start from the business problem.
		</p>
	{/if}
</section>

<!-- The Real Problem -->
<section class="page-section">
	<div class="page-section-inner">
		<div class="page-grid-2">
			<div>
				<span class="page-section-label">{lang === 'es' ? 'EL PROBLEMA REAL' : 'THE REAL PROBLEM'}</span>
				{#if lang === 'es'}
					<h2 class="page-section-title">Muchas empresas gestionan operaciones críticas con hojas de cálculo y procesos manuales</h2>
				{:else}
					<h2 class="page-section-title">Many companies manage critical operations with spreadsheets and manual processes</h2>
				{/if}
			</div>
			<div>
				{#if lang === 'es'}
					<p class="page-section-text">
						Funciona, hasta que el equipo crece, los clientes se multiplican o alguien comete un error que nadie detecta a tiempo.
					</p>
					<p class="page-section-text">
						El problema no es la falta de datos. Es que los datos están dispersos, duplicados o atrapados en herramientas que no se comunican entre sí. Y cada vez que alguien necesita una respuesta, tiene que buscarla manualmente.
					</p>
					<p class="page-section-text">
						Un sistema diseñado para tu operación cambia eso. Centraliza la información, reduce la fricción y permite que tu equipo se concentre en lo que realmente importa.
					</p>
				{:else}
					<p class="page-section-text">
						It works, until the team grows, clients multiply, or someone makes a mistake that nobody catches in time.
					</p>
					<p class="page-section-text">
						The problem isn't a lack of data. It's that data is scattered, duplicated, or trapped in tools that don't talk to each other. And every time someone needs an answer, they have to find it manually.
					</p>
					<p class="page-section-text">
						A system designed for your operation changes that. It centralizes information, reduces friction, and lets your team focus on what actually matters.
					</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- What we build -->
<section class="page-section page-section-dark">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 3.5rem;">
			<span class="page-section-label">{lang === 'es' ? 'QUÉ CONSTRUIMOS' : 'WHAT WE BUILD'}</span>
			{#if lang === 'es'}
				<h2 class="page-section-title" style="max-width: 700px;">Software que responde a cómo funciona tu negocio, no al revés</h2>
			{:else}
				<h2 class="page-section-title" style="max-width: 700px;">Software that adapts to how your business works, not the other way around</h2>
			{/if}
		</div>
		<div class="page-grid-3">
			<div class="page-card page-card-dark">
				<div class="page-card-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
					</svg>
				</div>
				{#if lang === 'es'}
					<h3 class="page-card-title">Gestión operativa</h3>
					<p class="page-card-text">Sistemas que centralizan tu información y te dan visibilidad en tiempo real sobre lo que sucede en tu negocio. Sin depender de preguntar o buscar en múltiples fuentes.</p>
				{:else}
					<h3 class="page-card-title">Operations management</h3>
					<p class="page-card-text">Systems that centralize your information and give you real-time visibility into what's happening in your business. No more asking around or searching through multiple sources.</p>
				{/if}
			</div>
			<div class="page-card page-card-dark">
				<div class="page-card-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
						<polyline points="22 4 12 14.01 9 11.01"/>
					</svg>
				</div>
				{#if lang === 'es'}
					<h3 class="page-card-title">Flujos de trabajo</h3>
					<p class="page-card-text">Procesos que antes dependían de seguimiento manual ahora suceden de forma ordenada y rastreable. Menos errores, menos olvidos, más control.</p>
				{:else}
					<h3 class="page-card-title">Workflows</h3>
					<p class="page-card-text">Processes that used to rely on manual tracking now happen in an orderly, traceable way. Fewer errors, fewer oversights, more control.</p>
				{/if}
			</div>
			<div class="page-card page-card-dark">
				<div class="page-card-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M18 20V10M12 20V4M6 20v-6"/>
					</svg>
				</div>
				{#if lang === 'es'}
					<h3 class="page-card-title">Dashboards y reportes</h3>
					<p class="page-card-text">Herramientas que convierten datos dispersos en información clara para tomar decisiones. No más consolidar reportes manualmente cada semana.</p>
				{:else}
					<h3 class="page-card-title">Dashboards & reports</h3>
					<p class="page-card-text">Tools that turn scattered data into clear information for decision making. No more manually consolidating reports every week.</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- How we work -->
<section class="page-section">
	<div class="page-section-inner">
		<div class="page-grid-2">
			<div>
				<span class="page-section-label">{lang === 'es' ? 'CÓMO TRABAJAMOS' : 'HOW WE WORK'}</span>
				{#if lang === 'es'}
					<h2 class="page-section-title">No empezamos escribiendo código. Empezamos entendiendo tu operación.</h2>
				{:else}
					<h2 class="page-section-title">We don't start by writing code. We start by understanding your operation.</h2>
				{/if}
			</div>
			<div>
				{#if lang === 'es'}
					<p class="page-section-text">
						Antes de diseñar una solución, necesitamos comprender qué funciona, qué no funciona y qué podría funcionar mejor. Hablamos con las personas que realizan el trabajo diario, no solamente con quienes lo supervisan.
					</p>
					<p class="page-section-text">
						Después diseñamos un sistema que resuelva los problemas reales, no los que imaginamos desde afuera. Y lo construimos de forma incremental, validando cada etapa antes de avanzar a la siguiente.
					</p>
					<p class="page-section-text">
						El resultado es software que las personas realmente quieren usar, porque fue diseñado con su contexto en mente.
					</p>
				{:else}
					<p class="page-section-text">
						Before designing a solution, we need to understand what works, what doesn't, and what could work better. We talk to the people who do the daily work, not just those who supervise it.
					</p>
					<p class="page-section-text">
						Then we design a system that solves the real problems, not the ones we imagined from the outside. And we build it incrementally, validating each stage before moving to the next.
					</p>
					<p class="page-section-text">
						The result is software that people actually want to use, because it was designed with their context in mind.
					</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="page-cta">
	{#if lang === 'es'}
		<h2 class="page-cta-title">¿Tu operación necesita un mejor sistema?</h2>
		<p class="page-cta-text">Conversemos sobre lo que podría mejorar. Sin compromiso, sin jerga técnica innecesaria.</p>
	{:else}
		<h2 class="page-cta-title">Does your operation need a better system?</h2>
		<p class="page-cta-text">Let's talk about what could improve. No commitment, no unnecessary jargon.</p>
	{/if}
	<a href="/contacto" class="page-cta-btn">
		{lang === 'es' ? 'Conversemos' : "Let's talk"}
	</a>
</section>

<script lang="ts">
	import { getContext } from 'svelte';
	import type { HomeState } from '$lib/homeState.svelte';

	const homeState = getContext<HomeState>('homeState');
	const lang = $derived(homeState.currentLanguage);
</script>

<svelte:head>
	<title>{lang === 'es' ? 'Productos digitales — WYLEN' : 'Digital Products — WYLEN'}</title>
	<meta name="description" content={lang === 'es'
		? 'Creamos productos digitales diseñados desde el problema real del usuario. No otra aplicación más, sino herramientas que resuelven algo concreto.'
		: 'We create digital products designed from the user\'s real problem. Not just another app, but tools that solve something specific.'
	} />
</svelte:head>

<!-- Hero -->
<section class="page-hero">
	<span class="page-hero-label">{lang === 'es' ? 'SERVICIOS' : 'SERVICES'}</span>
	{#if lang === 'es'}
		<h1 class="page-hero-title">Un producto digital tiene valor cuando alguien lo necesita, lo entiende y lo usa.</h1>
		<p class="page-hero-description">
			Creamos productos digitales diseñados desde el problema real del usuario. No otra aplicación más. Una herramienta que resuelve algo concreto y genera valor.
		</p>
	{:else}
		<h1 class="page-hero-title">A digital product has value when someone needs it, understands it, and uses it.</h1>
		<p class="page-hero-description">
			We create digital products designed from the user's real problem. Not just another app. A tool that solves something specific and creates value.
		</p>
	{/if}
</section>

<!-- Starting from the problem -->
<section class="page-section">
	<div class="page-section-inner">
		<div class="page-grid-2">
			<div>
				<span class="page-section-label">{lang === 'es' ? 'NUESTRO ENFOQUE' : 'OUR APPROACH'}</span>
				{#if lang === 'es'}
					<h2 class="page-section-title">No empezamos por la tecnología. Empezamos por la necesidad.</h2>
				{:else}
					<h2 class="page-section-title">We don't start with the technology. We start with the need.</h2>
				{/if}
			</div>
			<div>
				{#if lang === 'es'}
					<p class="page-section-text">
						Muchos productos digitales fracasan porque se construyeron desde supuestos, no desde problemas reales. Alguien imaginó lo que los usuarios necesitaban y, cuando el producto llegó a sus manos, no resolvía lo que debía resolver.
					</p>
					<p class="page-section-text">
						Nuestro trabajo empieza entendiendo a las personas que usarán el producto: qué intentan lograr, qué les cuesta trabajo, qué les frustra. Después convertimos esa comprensión en una solución funcional.
					</p>
					<p class="page-section-text">
						El resultado no es un producto con más funciones. Es un producto que resuelve mejor.
					</p>
				{:else}
					<p class="page-section-text">
						Many digital products fail because they were built from assumptions, not real problems. Someone imagined what users needed and, when the product reached their hands, it didn't solve what it was supposed to.
					</p>
					<p class="page-section-text">
						Our work begins by understanding the people who will use the product: what they're trying to achieve, what's hard for them, what frustrates them. Then we turn that understanding into a working solution.
					</p>
					<p class="page-section-text">
						The result isn't a product with more features. It's a product that solves better.
					</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- What we create -->
<section class="page-section page-section-dark">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 3.5rem;">
			<span class="page-section-label">{lang === 'es' ? 'QUÉ CREAMOS' : 'WHAT WE CREATE'}</span>
			{#if lang === 'es'}
				<h2 class="page-section-title" style="max-width: 700px;">Productos que las personas eligen usar, no que están obligadas a usar</h2>
			{:else}
				<h2 class="page-section-title" style="max-width: 700px;">Products that people choose to use, not that they're forced to use</h2>
			{/if}
		</div>
		<div class="page-grid-3">
			<div class="page-card page-card-dark">
				<div class="page-card-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
						<line x1="8" y1="21" x2="16" y2="21"/>
						<line x1="12" y1="17" x2="12" y2="21"/>
					</svg>
				</div>
				{#if lang === 'es'}
					<h3 class="page-card-title">Plataformas web</h3>
					<p class="page-card-text">Sistemas accesibles desde cualquier navegador, diseñados para que equipos completos puedan trabajar de forma coordinada sin depender de instalaciones locales.</p>
				{:else}
					<h3 class="page-card-title">Web platforms</h3>
					<p class="page-card-text">Systems accessible from any browser, designed so that entire teams can work in coordination without depending on local installations.</p>
				{/if}
			</div>
			<div class="page-card page-card-dark">
				<div class="page-card-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
						<line x1="12" y1="18" x2="12.01" y2="18"/>
					</svg>
				</div>
				{#if lang === 'es'}
					<h3 class="page-card-title">Aplicaciones móviles</h3>
					<p class="page-card-text">Herramientas que acompañan al usuario donde esté. Diseñadas para ser rápidas, intuitivas y útiles en el contexto real de uso.</p>
				{:else}
					<h3 class="page-card-title">Mobile applications</h3>
					<p class="page-card-text">Tools that accompany users wherever they are. Designed to be fast, intuitive, and useful in the real context of use.</p>
				{/if}
			</div>
			<div class="page-card page-card-dark">
				<div class="page-card-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<circle cx="12" cy="12" r="10"/>
						<path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
					</svg>
				</div>
				{#if lang === 'es'}
					<h3 class="page-card-title">Experiencias digitales</h3>
					<p class="page-card-text">Productos que combinan diseño, funcionalidad e ingeniería para crear experiencias que las personas recuerdan y recomiendan.</p>
				{:else}
					<h3 class="page-card-title">Digital experiences</h3>
					<p class="page-card-text">Products that combine design, functionality, and engineering to create experiences that people remember and recommend.</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- Our process -->
<section class="page-section">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 3.5rem;">
			<span class="page-section-label">{lang === 'es' ? 'PROCESO' : 'PROCESS'}</span>
			{#if lang === 'es'}
				<h2 class="page-section-title" style="max-width: 700px;">Cada producto sigue un camino claro desde la idea hasta el impacto</h2>
			{:else}
				<h2 class="page-section-title" style="max-width: 700px;">Every product follows a clear path from idea to impact</h2>
			{/if}
		</div>
		<div class="page-process">
			<div class="page-process-step">
				{#if lang === 'es'}
					<h3 class="page-process-step-title">Entender</h3>
					<p class="page-process-step-text">Investigamos el problema, las personas y el contexto antes de proponer cualquier solución.</p>
				{:else}
					<h3 class="page-process-step-title">Understand</h3>
					<p class="page-process-step-text">We research the problem, the people, and the context before proposing any solution.</p>
				{/if}
			</div>
			<div class="page-process-step">
				{#if lang === 'es'}
					<h3 class="page-process-step-title">Diseñar</h3>
					<p class="page-process-step-text">Convertimos la comprensión en una estructura clara, funcional y coherente con los objetivos del producto.</p>
				{:else}
					<h3 class="page-process-step-title">Design</h3>
					<p class="page-process-step-text">We turn understanding into a clear structure, functional and aligned with the product's goals.</p>
				{/if}
			</div>
			<div class="page-process-step">
				{#if lang === 'es'}
					<h3 class="page-process-step-title">Construir</h3>
					<p class="page-process-step-text">Desarrollamos de forma iterativa, validando cada etapa con las personas que usarán el producto.</p>
				{:else}
					<h3 class="page-process-step-title">Build</h3>
					<p class="page-process-step-text">We develop iteratively, validating each stage with the people who will use the product.</p>
				{/if}
			</div>
			<div class="page-process-step">
				{#if lang === 'es'}
					<h3 class="page-process-step-title">Mejorar</h3>
					<p class="page-process-step-text">Medimos, aprendemos y evolucionamos el producto cuando las necesidades cambian.</p>
				{:else}
					<h3 class="page-process-step-title">Improve</h3>
					<p class="page-process-step-text">We measure, learn, and evolve the product as needs change.</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="page-cta">
	{#if lang === 'es'}
		<h2 class="page-cta-title">¿Tienes una idea que necesita convertirse en producto?</h2>
		<p class="page-cta-text">Podemos ayudarte a convertir esa idea en algo funcional, útil y bien construido.</p>
	{:else}
		<h2 class="page-cta-title">Have an idea that needs to become a product?</h2>
		<p class="page-cta-text">We can help you turn that idea into something functional, useful, and well built.</p>
	{/if}
	<button class="page-cta-btn" onclick={() => homeState.openModal('Conversemos')}>
		{lang === 'es' ? 'Conversemos' : "Let's talk"}
	</button>
</section>

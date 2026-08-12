<script lang="ts">
	import { getContext } from 'svelte';
	import type { HomeState } from '$lib/homeState.svelte';

	const homeState = getContext<HomeState>('homeState');
	const lang = $derived(homeState.currentLanguage);

	// Carousel state
	let activeValueSlide = $state(0);
	const values = $derived([
		{
			titleEs: 'Curiosidad genuina',
			titleEn: 'Genuine curiosity',
			descEs: 'Hacer preguntas difíciles y profundizar en los problemas de negocio antes de proponer líneas de código. Buscamos entender.',
			descEn: 'Asking hard questions and looking deep into business problems before proposing code. We seek to understand.',
			index: '01'
		},
		{
			titleEs: 'Criterio propio',
			titleEn: 'Own judgment',
			descEs: 'No esperamos recibir instrucciones estáticas para ejecutarlas sin cuestionar. Proponemos mejores caminos cuando los identificamos.',
			descEn: 'We don\'t expect to receive static instructions to execute blindly. We suggest better paths when we identify them.',
			index: '02'
		},
		{
			titleEs: 'Compromiso con la calidad',
			titleEn: 'Commitment to quality',
			descEs: 'No entregamos soluciones «suficientemente buenas». Los detalles importan y el código robusto y limpio es una cuestión de respeto.',
			descEn: 'We don\'t deliver "good enough" solutions. Details matter, and clean, robust code is a matter of respect.',
			index: '03'
		}
	]);

	// Accordion state for FAQs
	let activeFaq = $state<string | null>(null);
	function toggleFaq(key: string) {
		activeFaq = activeFaq === key ? null : key;
	}
</script>

<svelte:head>
	<title>{lang === 'es' ? 'Carreras — WYLEN' : 'Careers — WYLEN'}</title>
	<meta name="description" content={lang === 'es'
		? 'Únete a Wylen. Buscamos personas que quieran construir tecnología con propósito e ingeniería con intención.'
		: 'Join Wylen. We are looking for people who want to build technology with purpose and engineering with intention.'
	} />
</svelte:head>

<!-- Hero -->
<section class="page-hero page-hero-left">
	<div class="page-hero-left-grid">
		<div>
			<span class="page-hero-label">{lang === 'es' ? 'EMPRESA — CARRERAS' : 'COMPANY — CAREERS'}</span>
			<h1 class="page-hero-title" style="text-align: left; margin-bottom: 1.5rem;">
				{lang === 'es'
					? 'Construye tecnología que tenga un sentido real.'
					: 'Build technology that has a real purpose.'}
			</h1>
			<p class="page-hero-description" style="text-align: left; margin-bottom: 2rem;">
				{lang === 'es'
					? 'No nos importan los títulos ostentosos. Buscamos ingenieros y diseñadores autónomos que prefieran resolver problemas antes que seguir directrices.'
					: 'We don\'t care about flashy titles. We seek autonomous engineers and designers who prefer solving problems over following directions.'}
			</p>
			<button class="btn btn-dark" onclick={() => {
				const section = document.getElementById('faqs');
				if (section) section.scrollIntoView({ behavior: 'smooth' });
			}}>
				{lang === 'es' ? 'Ver vacantes y preguntas' : 'View positions & FAQs'}
			</button>
		</div>
		<div>
			<div style="background: rgba(18,18,17,0.03); border-radius: 24px; padding: 3rem 2rem; border: 1px solid rgba(18,18,17,0.05); text-align: center;">
				<h3 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.6rem;">{lang === 'es' ? '¿Autonomía completa?' : 'Complete autonomy?'}</h3>
				<p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">
					{lang === 'es'
						? 'En Wylen valoramos tu criterio técnico. Tú decides cómo resolver el problema.'
						: 'At Wylen we value your technical judgment. You decide how to solve the problem.'}
				</p>
				<div style="width: 40px; height: 1px; background: rgba(18,18,17,0.15); margin: 0 auto 1.5rem;"></div>
				<span style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted); opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em;">
					{lang === 'es' ? '100% remoto y asíncrono' : '100% remote & async'}
				</span>
			</div>
		</div>
	</div>
</section>

<!-- Values Carousel Slider (Anthropic style) -->
<section class="page-section" style="background-color: #ece3d4; border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 3.5rem;">
			<span class="page-section-label">{lang === 'es' ? 'QUÉ BUSCAMOS' : 'WHAT WE VALUE'}</span>
			<h2 class="page-section-title">{lang === 'es' ? 'Tres cualidades esenciales' : 'Three essential qualities'}</h2>
		</div>

		<!-- Interactive Carousel slider -->
		<div class="custom-carousel" style="max-width: 800px;">
			<div class="carousel-viewport">
				<div class="carousel-container-inner" style="transform: translateX(-{activeValueSlide * 100}%);">
					{#each values as val}
						<div class="carousel-slide-item" style="grid-template-columns: 1fr; padding: 3rem 2.5rem; text-align: center;">
							<div class="carousel-info" style="align-items: center;">
								<span class="carousel-index" style="font-size: 3rem; font-weight: 800; font-family: var(--font-brand); opacity: 0.08; line-height: 1; margin-bottom: 0.5rem;">
									{val.index}
								</span>
								<h3 class="carousel-title-text" style="font-size: 1.8rem; margin-bottom: 1rem;">
									{lang === 'es' ? val.titleEs : val.titleEn}
								</h3>
								<p class="carousel-body-text" style="max-width: 500px; margin: 0 auto; font-size: 1.05rem; line-height: 1.7;">
									{lang === 'es' ? val.descEs : val.descEn}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Controls -->
			<div class="carousel-nav-controls" style="margin-top: 1.5rem;">
				<div class="carousel-indicators">
					{#each Array(3) as _, i}
						<button 
							class="carousel-dot-indicator" 
							class:active={activeValueSlide === i} 
							onclick={() => activeValueSlide = i}
							aria-label="Ir a diapositiva {i + 1}"
						></button>
					{/each}
				</div>
				<div class="carousel-arrow-buttons">
					<button class="carousel-arrow-btn" onclick={() => activeValueSlide = (activeValueSlide - 1 + 3) % 3} aria-label="Anterior">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M19 12H5M12 19l-7-7 7-7"/>
						</svg>
					</button>
					<button class="carousel-arrow-btn" onclick={() => activeValueSlide = (activeValueSlide + 1) % 3} aria-label="Siguiente">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M5 12h14M12 5l7 7-7 7"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- FAQs Expandable Accordions -->
<section id="faqs" class="page-section" style="border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 3.5rem;">
			<span class="page-section-label">{lang === 'es' ? 'PREGUNTAS' : 'QUESTIONS'}</span>
			<h2 class="page-section-title">{lang === 'es' ? 'Preguntas sobre Wylen' : 'Questions about Wylen'}</h2>
		</div>

		<div class="accordion-wrapper">
			<!-- Accordion 1 -->
			<div class="accordion-drawer" class:open={activeFaq === 'positions'}>
				<button class="accordion-head" onclick={() => toggleFaq('positions')} aria-expanded={activeFaq === 'positions'}>
					<span class="accordion-trigger-title">{lang === 'es' ? '¿Tienen vacantes abiertas actualmente?' : 'Do you have open positions right now?'}</span>
					<div class="accordion-icon-wrap">
						<div class="accordion-icon-line accordion-icon-line-h"></div>
						<div class="accordion-icon-line accordion-icon-line-v"></div>
					</div>
				</button>
				<div class="accordion-body">
					<p class="accordion-desc-text">
						{lang === 'es'
							? 'No mantenemos una lista rígida de vacantes. Si eres la persona adecuada y te importa resolver problemas reales de negocio con software de alta calidad, siempre habrá un espacio para ti.'
							: 'We don\'t maintain a rigid list of open roles. If you are the right person and you care about solving real business problems with high-quality software, there will always be a place for you.'}
					</p>
				</div>
			</div>

			<!-- Accordion 2 -->
			<div class="accordion-drawer" class:open={activeFaq === 'process'}>
				<button class="accordion-head" onclick={() => toggleFaq('process')} aria-expanded={activeFaq === 'process'}>
					<span class="accordion-trigger-title">{lang === 'es' ? '¿Cómo es el proceso de selección?' : 'What is the selection process like?'}</span>
					<div class="accordion-icon-wrap">
						<div class="accordion-icon-line accordion-icon-line-h"></div>
						<div class="accordion-icon-line accordion-icon-line-v"></div>
					</div>
				</button>
				<div class="accordion-body">
					<p class="accordion-desc-text">
						{lang === 'es'
							? 'Es una conversación honesta. Evaluamos tu criterio técnico analizando un problema del mundo real y conversando sobre soluciones. Sin exámenes de memoria ni ejercicios irrelevantes.'
							: 'It is an honest conversation. We evaluate your technical judgment by analyzing a real-world problem and talking about solutions. No memory tests or irrelevant exercises.'}
					</p>
				</div>
			</div>

			<!-- Accordion 3 -->
			<div class="accordion-drawer" class:open={activeFaq === 'tech'}>
				<button class="accordion-head" onclick={() => toggleFaq('tech')} aria-expanded={activeFaq === 'tech'}>
					<span class="accordion-trigger-title">{lang === 'es' ? '¿Qué tecnologías utilizan?' : 'What technologies do you use?'}</span>
					<div class="accordion-icon-wrap">
						<div class="accordion-icon-line accordion-icon-line-h"></div>
						<div class="accordion-icon-line accordion-icon-line-v"></div>
					</div>
				</button>
				<div class="accordion-body">
					<p class="accordion-desc-text">
						{lang === 'es'
							? 'Elegimos la herramienta adecuada para cada problema de negocio. Trabajamos frecuentemente con TypeScript, Node, Svelte, PostgreSQL y arquitecturas en la nube bien estructuradas.'
							: 'We choose the right tool for each business problem. We work frequently with TypeScript, Node, Svelte, PostgreSQL, and well-structured cloud architectures.'}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Human CTA (direct email callout) -->
<section class="page-cta" style="background-color: var(--bg-dark); padding: 6.5rem 2.5rem;">
	<div class="page-section-inner" style="max-width: 600px; text-align: center;">
		<h2 class="page-cta-title" style="margin-bottom: 1.2rem;">
			{lang === 'es' ? 'Escríbenos directamente' : 'Write to us directly'}
		</h2>
		<p class="page-cta-text" style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 2rem;">
			{lang === 'es'
				? 'No envíes un currículum genérico. Cuéntanos sobre algo que hayas construido de lo que te sientas orgulloso, o sobre un problema técnico que hayas resuelto.'
				: 'Don\'t send a generic résumé. Tell us about something you built that you are proud of, or about a technical problem you solved.'}
		</p>
		<button class="page-cta-btn" onclick={() => homeState.openModal('Carreras')}>
			{lang === 'es' ? 'Conversemos' : "Let's talk"}
		</button>
	</div>
</section>

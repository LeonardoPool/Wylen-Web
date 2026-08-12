<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { HomeState } from '$lib/homeState.svelte';

	const homeState = getContext<HomeState>('homeState');
	const lang = $derived(homeState.currentLanguage);

	// Animated counter values
	let retention = $state(0);
	let speed = $state(1.0);
	let systems = $state(0);

	onMount(() => {
		// Animate retention to 97
		const retInterval = setInterval(() => {
			if (retention < 97) retention++;
			else clearInterval(retInterval);
		}, 15);

		// Animate speed to 3.0
		const speedInterval = setInterval(() => {
			if (speed < 3.0) {
				speed = parseFloat((speed + 0.1).toFixed(1));
			} else clearInterval(speedInterval);
		}, 60);

		// Animate systems to 40
		const sysInterval = setInterval(() => {
			if (systems < 40) systems++;
			else clearInterval(sysInterval);
		}, 25);

		return () => {
			clearInterval(retInterval);
			clearInterval(speedInterval);
			clearInterval(sysInterval);
		};
	});
</script>

<svelte:head>
	<title>{lang === 'es' ? 'Nosotros — WYLEN' : 'About Us — WYLEN'}</title>
	<meta name="description" content={lang === 'es'
		? 'Conoce Wylen. Un socio tecnológico de ingeniería que entiende tus problemas reales antes de construir la solución adecuada.'
		: 'Meet Wylen. An engineering technology partner that understands your real problems before building the right solution.'
	} />
</svelte:head>

<!-- Asymmetric Hero -->
<section class="page-hero page-hero-left">
	<div class="page-hero-left-grid">
		<div>
			<span class="page-hero-label">{lang === 'es' ? 'EMPRESA — NOSOTROS' : 'COMPANY — ABOUT US'}</span>
			<h1 class="page-hero-title" style="text-align: left; margin-bottom: 1.5rem;">
				{lang === 'es' 
					? 'La tecnología no debería ser una complicación, sino una herramienta de claridad.' 
					: 'Technology shouldn\'t be a complication, but a tool for clarity.'}
			</h1>
			<p class="page-hero-description" style="text-align: left;">
				{lang === 'es'
					? 'Wylen es una firma de ingeniería dedicada a crear soluciones digitales que resuelven problemas de verdad, construyendo con intención y midiendo el impacto.'
					: 'Wylen is an engineering firm dedicated to creating digital solutions that solve real problems, building with intention and measuring impact.'}
			</p>
		</div>
		<div>
			<!-- Minimalist geometric/artistic container inspired by Anthropic's clean spaces -->
			<div style="width: 100%; height: 260px; background: rgba(18, 18, 17, 0.03); border-radius: 24px; border: 1px solid rgba(18, 18, 17, 0.05); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
				<div style="position: absolute; width: 140px; height: 140px; border-radius: 50%; border: 1.5px dashed rgba(18, 18, 17, 0.15); animation: spin 40s linear infinite;"></div>
				<div style="position: absolute; width: 80px; height: 80px; border-radius: 50%; background: var(--bg-dark); opacity: 0.05; transform: translate(-20px, 20px);"></div>
				<span style="font-family: var(--font-brand); font-size: 2.2rem; font-weight: 800; letter-spacing: 0.1em; color: var(--text-dark); opacity: 0.85;">WYLEN</span>
			</div>
		</div>
	</div>
</section>

<!-- Editorial Narrative: Our Purpose -->
<section class="page-section" style="background-color: #ece3d4; border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-grid-2-narrow">
			<div>
				<span class="page-section-label">{lang === 'es' ? 'NUESTRO PROPÓSITO' : 'OUR PURPOSE'}</span>
				<h2 class="page-section-title">
					{lang === 'es' 
						? 'Entender lo que existe, ver lo que puede mejorar, construir lo que perdura.' 
						: 'Understand what exists, see what can improve, build what endures.'}
				</h2>
			</div>
			<div>
				<p class="page-section-text" style="font-size: 1.15rem; line-height: 1.8;">
					{lang === 'es'
						? 'No nos interesa el desarrollo masivo de software sin dirección. Nos importa el porqué. Cada línea de código que escribimos responde a una necesidad específica que hemos analizado junto a ti.'
						: 'We are not interested in directionless mass software development. We care about the why. Every line of code we write answers a specific need that we have analyzed together with you.'}
				</p>
				<p class="page-section-text" style="font-size: 1.1rem;">
					{lang === 'es'
						? 'Combinamos estrategia de negocio con diseño centrado en el usuario y rigor técnico de ingeniería. La tecnología no es un fin en sí mismo; es el medio para que las personas y las empresas operen mejor.'
						: 'We combine business strategy with user-centered design and technical engineering rigor. Technology is not an end in itself; it is the means for people and companies to operate better.'}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Horizontal Timeline Section -->
<section class="page-section" style="border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 2rem;">
			<span class="page-section-label">{lang === 'es' ? 'NUESTRA NARRATIVA' : 'OUR NARRATIVE'}</span>
			<h2 class="page-section-title">El ciclo de valor de Wylen</h2>
		</div>

		<div class="timeline-container">
			<div class="timeline-line-bg"></div>
			<div class="timeline-grid">
				<div class="timeline-node">
					<div class="timeline-dot"></div>
					<div class="timeline-card">
						<span class="timeline-step">01</span>
						<h3 class="timeline-title">{lang === 'es' ? 'Entender' : 'Understand'}</h3>
						<p class="timeline-desc">
							{lang === 'es' 
								? 'Analizamos el contexto, conversamos con los usuarios reales y delimitamos el problema.'
								: 'We analyze the context, talk to actual users, and define the problem bounds.'}
						</p>
					</div>
				</div>
				<div class="timeline-node">
					<div class="timeline-dot"></div>
					<div class="timeline-card">
						<span class="timeline-step">02</span>
						<h3 class="timeline-title">{lang === 'es' ? 'Diseñar' : 'Design'}</h3>
						<p class="timeline-desc">
							{lang === 'es' 
								? 'Estructuramos la arquitectura y diseñamos interfaces para que sean claras e intuitivas.'
								: 'We structure the architecture and design interfaces to be clear and intuitive.'}
						</p>
					</div>
				</div>
				<div class="timeline-node">
					<div class="timeline-dot"></div>
					<div class="timeline-card">
						<span class="timeline-step">03</span>
						<h3 class="timeline-title">{lang === 'es' ? 'Construir' : 'Build'}</h3>
						<p class="timeline-desc">
							{lang === 'es' 
								? 'Escribimos código robusto, escalable y con pruebas automatizadas rigorosas.'
								: 'We write robust, scalable code backed by rigorous automated testing.'}
						</p>
					</div>
				</div>
				<div class="timeline-node">
					<div class="timeline-dot"></div>
					<div class="timeline-card">
						<span class="timeline-step">04</span>
						<h3 class="timeline-title">{lang === 'es' ? 'Mejorar' : 'Improve'}</h3>
						<p class="timeline-desc">
							{lang === 'es' 
								? 'Medimos los resultados prácticos de la solución y la optimizamos continuamente.'
								: 'We measure the practical results of the solution and continuously optimize it.'}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Three Pillars Asymmetric Layout -->
<section class="page-section page-section-dark">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 4rem;">
			<span class="page-section-label">{lang === 'es' ? 'NUESTRO NÚCLEO' : 'OUR CORE'}</span>
			<h2 class="page-section-title">{lang === 'es' ? 'Tres ideas inseparables' : 'Three inseparable ideas'}</h2>
		</div>

		<div class="page-grid-2-narrow">
			<div class="page-card page-card-dark" style="padding: 3.5rem 3rem; display: flex; flex-direction: column; justify-content: center; height: 100%;">
				<div style="font-size: 3rem; font-weight: 800; opacity: 0.15; font-family: var(--font-brand); margin-bottom: 1.5rem;">01</div>
				<h3 class="page-card-title" style="font-size: 1.8rem; margin-bottom: 1rem;">{lang === 'es' ? 'Personas' : 'People'}</h3>
				<p class="page-card-text" style="font-size: 1.05rem; line-height: 1.7;">
					{lang === 'es'
						? 'Las personas son la razón de ser de la tecnología. Un sistema solo tiene éxito cuando facilita el trabajo diario de alguien o resuelve una molestia tangible.'
						: 'People are the reason technology exists. A system only succeeds when it facilitates someone\'s daily work or resolves a tangible pain point.'}
				</p>
			</div>

			<div style="display: flex; flex-direction: column; gap: 2rem;">
				<div class="page-card page-card-dark" style="padding: 2.5rem;">
					<div style="font-size: 2rem; font-weight: 800; opacity: 0.15; font-family: var(--font-brand); margin-bottom: 1rem;">02</div>
					<h3 class="page-card-title" style="font-size: 1.4rem; margin-bottom: 0.8rem;">{lang === 'es' ? 'Ingeniería' : 'Engineering'}</h3>
					<p class="page-card-text">
						{lang === 'es'
							? 'Es la disciplina, el rigor y la precisión para modelar problemas complejos en estructuras lógicas escalables y limpias.'
							: 'It represents the discipline, rigor, and precision to model complex problems into clean, scalable logical structures.'}
					</p>
				</div>
				<div class="page-card page-card-dark" style="padding: 2.5rem;">
					<div style="font-size: 2rem; font-weight: 800; opacity: 0.15; font-family: var(--font-brand); margin-bottom: 1rem;">03</div>
					<h3 class="page-card-title" style="font-size: 1.4rem; margin-bottom: 0.8rem;">{lang === 'es' ? 'Propósito' : 'Purpose'}</h3>
					<p class="page-card-text">
						{lang === 'es'
							? 'El impacto real que generamos en las operaciones del cliente. No construimos software para exhibir conocimiento, sino para ser útil.'
							: 'The actual impact we make on client operations. We do not build software to exhibit knowledge, but to be useful.'}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Stat Counters Section -->
<section class="page-section" style="border-top: 1px solid rgba(18,18,17,0.05); background-color: #ece3d4;">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 3.5rem;">
			<span class="page-section-label">{lang === 'es' ? 'MÉTRICAS' : 'METRICS'}</span>
			<h2 class="page-section-title">{lang === 'es' ? 'Resultados que validan nuestro enfoque' : 'Results validating our approach'}</h2>
		</div>

		<div class="page-grid-3">
			<div class="counter-box">
				<span class="counter-value">{retention}%</span>
				<span class="counter-label">{lang === 'es' ? 'Retención de clientes' : 'Client retention'}</span>
			</div>
			<div class="counter-box">
				<span class="counter-value">{speed}x</span>
				<span class="counter-label">{lang === 'es' ? 'Velocidad de iteración' : 'Iteration speed'}</span>
			</div>
			<div class="counter-box">
				<span class="counter-value">{systems}+</span>
				<span class="counter-label">{lang === 'es' ? 'Sistemas activos' : 'Active systems'}</span>
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
						? '«Lo que define a Wylen es la capacidad de convertir problemas reales en soluciones tecnológicas útiles. No creamos ruido, creamos sistemas.»'
						: '"What defines Wylen is the ability to turn real problems into useful technology solutions. We don\'t create noise, we create systems."'}
				</p>
			</div>
			<div style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 1.5rem;">
				<h3 style="font-size: 1.8rem; font-weight: 700; color: var(--text-dark);">{lang === 'es' ? '¿Quieres un socio de ingeniería?' : 'Need an engineering partner?'}</h3>
				<p style="color: var(--text-muted); line-height: 1.6;">
					{lang === 'es'
						? 'Conversemos sobre cómo optimizar tus procesos, eliminar tareas repetitivas y centralizar tu información.'
						: 'Let\'s talk about optimizing your processes, eliminating repetitive tasks, and centralizing your data.'}
				</p>
				<button class="btn btn-dark" onclick={() => homeState.openModal('Conversemos')}>
					{lang === 'es' ? 'Escribir a Wylen' : 'Write to Wylen'}
				</button>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>

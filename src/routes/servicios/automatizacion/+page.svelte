<script lang="ts">
	import { getContext } from 'svelte';
	import type { HomeState } from '$lib/homeState.svelte';

	const homeState = getContext<HomeState>('homeState');
	const lang = $derived(homeState.currentLanguage);
</script>

<svelte:head>
	<title>{lang === 'es' ? 'Automatización — WYLEN' : 'Automation — WYLEN'}</title>
	<meta name="description" content={lang === 'es'
		? 'Identificamos tareas repetitivas y creamos flujos de datos automáticos. Ahorra tiempo y elimina errores humanos en tu operación.'
		: 'We identify repetitive tasks and build automatic data flows. Save time and eliminate human errors in your operation.'
	} />
</svelte:head>

<!-- Asymmetric Hero -->
<section class="page-hero page-hero-left">
	<div class="page-hero-left-grid">
		<div>
			<span class="page-hero-label">{lang === 'es' ? 'SERVICIOS — AUTOMATIZACIÓN' : 'SERVICES — AUTOMATION'}</span>
			<h1 class="page-hero-title" style="text-align: left; margin-bottom: 1.5rem;">
				{lang === 'es'
					? 'Las tareas repetitivas son para las máquinas; el criterio es para las personas.'
					: 'Repetitive tasks are for machines; judgment is for people.'}
			</h1>
			<p class="page-hero-description" style="text-align: left;">
				{lang === 'es'
					? 'Diseñamos flujos de automatización que enlazan tus sistemas operativos, eliminan la transcripción manual de datos y aceleran las respuestas comerciales.'
					: 'We design automation flows that link your operating systems, eliminate manual data transcription, and accelerate business responses.'}
			</p>
		</div>
		<div>
			<!-- Inline highlight impact data box -->
			<div style="background: rgba(18,18,17,0.03); border-radius: 20px; padding: 2rem; border: 1px solid rgba(18,18,17,0.05); display: flex; flex-direction: column; gap: 1.5rem;">
				<div>
					<span style="font-size: 2.2rem; font-weight: 800; font-family: var(--font-brand);">8h → 12m</span>
					<p style="font-size: 0.82rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; margin-top: 0.2rem;">
						{lang === 'es' ? 'Tiempo de procesamiento' : 'Processing time'}
					</p>
				</div>
				<div style="width: 100%; height: 1px; background: rgba(18,18,17,0.08);"></div>
				<div>
					<span style="font-size: 2.2rem; font-weight: 800; font-family: var(--font-brand);">0%</span>
					<p style="font-size: 0.82rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; margin-top: 0.2rem;">
						{lang === 'es' ? 'Errores de transcripción' : 'Transcription errors'}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Before/After SVG Comparison Chart -->
<section class="page-section" style="background-color: #ece3d4; border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-grid-2-narrow">
			<div>
				<span class="page-section-label">{lang === 'es' ? 'COMPARTIVA DE TIEMPO' : 'TIME COMPARISON'}</span>
				<h2 class="page-section-title">
					{lang === 'es'
						? 'Elimina el cuello de botella manual en tu operación'
						: 'Eliminate the manual bottleneck in your operation'}
				</h2>
				<p class="page-section-text">
					{lang === 'es'
						? 'El procesamiento manual de archivos, reportes y alertas desgasta la atención de tu equipo. Al automatizar estos flujos, la velocidad operativa aumenta drásticamente y los fallos se reducen a cero.'
						: 'Manual processing of files, reports, and alerts drains your team\'s attention. By automating these flows, operational speed increases dramatically, and failures drop to zero.'}
				</p>
			</div>
			<div style="display: flex; align-items: center; justify-content: center;">
				<!-- SVG Horizontal Comparison Bars Chart -->
				<svg viewBox="0 0 300 160" style="width: 100%; max-width: 320px;" class="chart-svg">
					<!-- Manual Process Bar -->
					<text x="10" y="30" font-size="9" font-weight="700" fill="var(--text-dark)">
						{lang === 'es' ? 'PROCESOS MANUALES (Horas)' : 'MANUAL PROCESSES (Hours)'}
					</text>
					<rect x="10" y="40" width="260" height="25" fill="#b5aa97" opacity="0.6" rx="4" class="bar-chart-rect" />
					<text x="250" y="56" font-size="9" font-weight="700" fill="var(--text-dark)" text-anchor="end">8h</text>

					<!-- Automated Process Bar -->
					<text x="10" y="95" font-size="9" font-weight="700" fill="var(--text-dark)">
						{lang === 'es' ? 'CON AUTOMATIZACIÓN WYLEN (Minutos)' : 'WITH WYLEN AUTOMATION (Minutes)'}
					</text>
					<rect x="10" y="105" width="20" height="25" fill="var(--text-dark)" rx="4" class="bar-chart-rect" />
					<text x="40" y="121" font-size="9" font-weight="700" fill="var(--text-dark)">12m</text>
				</svg>
			</div>
		</div>
	</div>
</section>

<!-- Statistics Impact callouts -->
<section class="page-section" style="border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 3.5rem;">
			<span class="page-section-label">{lang === 'es' ? 'MÉTRICAS DE IMPACTO' : 'IMPACT METRICS'}</span>
			<h2 class="page-section-title">{lang === 'es' ? 'Datos reales de automatizaciones implementadas' : 'Real data from implemented automations'}</h2>
		</div>

		<div class="page-grid-3">
			<div class="counter-box" style="padding: 2.5rem 1.5rem; text-align: center;">
				<span class="counter-value" style="font-size: 3rem;">0</span>
				<span class="counter-label" style="font-size: 0.8rem;">{lang === 'es' ? 'Errores de transcripción' : 'Transcription errors'}</span>
			</div>
			<div class="counter-box" style="padding: 2.5rem 1.5rem; text-align: center;">
				<span class="counter-value" style="font-size: 3rem;">90%</span>
				<span class="counter-label" style="font-size: 0.8rem;">{lang === 'es' ? 'Reducción de tiempos' : 'Time reduction'}</span>
			</div>
			<div class="counter-box" style="padding: 2.5rem 1.5rem; text-align: center;">
				<span class="counter-value" style="font-size: 3rem;">24/7</span>
				<span class="counter-label" style="font-size: 0.8rem;">{lang === 'es' ? 'Operatividad continua' : 'Continuous operation'}</span>
			</div>
		</div>
	</div>
</section>

<!-- Cards with micro-animations -->
<section class="page-section page-section-dark">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 3.5rem;">
			<span class="page-section-label">{lang === 'es' ? 'QUÉ AUTOMATIZAMOS' : 'WHAT WE AUTOMATE'}</span>
			<h2 class="page-section-title">{lang === 'es' ? 'Módulos operativos recurrentes' : 'Recurring operational modules'}</h2>
		</div>

		<div class="page-grid-3">
			<div class="page-card page-card-dark">
				<div class="page-card-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
						<polyline points="14 2 14 8 20 8"/>
						<line x1="16" y1="13" x2="8" y2="13"/>
					</svg>
				</div>
				<h3 class="page-card-title">{lang === 'es' ? 'Generación de Reportes' : 'Report Generation'}</h3>
				<p class="page-card-text">
					{lang === 'es'
						? 'Recopilamos información dispersa en bases de datos y herramientas externas para construir reportes y enviarlos automáticamente por email o chat.'
						: 'We collect scattered information from databases and external tools to build reports and send them automatically via email or chat.'}
				</p>
			</div>
			<div class="page-card page-card-dark">
				<div class="page-card-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
						<polyline points="22 4 12 14.01 9 11.01"/>
					</svg>
				</div>
				<h3 class="page-card-title">{lang === 'es' ? 'Sincronización de Datos' : 'Data Synchronization'}</h3>
				<p class="page-card-text">
					{lang === 'es'
						? 'Movemos registros de ventas, inventario o datos de clientes entre múltiples sistemas sin intervención manual, eliminando duplicados.'
						: 'We move sales, inventory, or customer records between multiple systems without manual intervention, eliminating duplicates.'}
				</p>
			</div>
			<div class="page-card page-card-dark">
				<div class="page-card-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<circle cx="12" cy="12" r="10"/>
						<path d="M12 6v6l4 2"/>
					</svg>
				</div>
				<h3 class="page-card-title">{lang === 'es' ? 'Alertas y Notificaciones' : 'Alerts & Notifications'}</h3>
				<p class="page-card-text">
					{lang === 'es'
						? 'Configuramos disparadores lógicos para alertar a tu equipo sobre fallos de pago, inventarios mínimos o tareas críticas que requieren atención.'
						: 'We configure logical triggers to alert your team about payment failures, minimum stock levels, or critical tasks requiring attention.'}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="page-cta">
	{#if lang === 'es'}
		<h2 class="page-cta-title">¿Listo para liberar la atención de tu equipo?</h2>
		<p class="page-cta-text">Conversemos sobre qué procesos manuales de tu operación podemos automatizar hoy.</p>
	{:else}
		<h2 class="page-cta-title">Ready to free up your team's attention?</h2>
		<p class="page-cta-text">Let's talk about which manual processes in your operation we can automate today.</p>
	{/if}
	<button class="page-cta-btn" onclick={() => homeState.openModal('Automatización')}>
		{lang === 'es' ? 'Escribir a Wylen' : 'Write to Wylen'}
	</button>
</section>

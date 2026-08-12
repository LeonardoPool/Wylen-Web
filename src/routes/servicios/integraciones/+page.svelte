<script lang="ts">
	import { getContext } from 'svelte';
	import type { HomeState } from '$lib/homeState.svelte';

	const homeState = getContext<HomeState>('homeState');
	const lang = $derived(homeState.currentLanguage);

	// State to toggle connected/disconnected states in the SVG diagram
	let showConnected = $state(true);
</script>

<svelte:head>
	<title>{lang === 'es' ? 'Integraciones — WYLEN' : 'Integrations — WYLEN'}</title>
	<meta name="description" content={lang === 'es'
		? 'Conectamos tus sistemas y herramientas para que la información fluya sin trabas manuales ni archivos intermedios.'
		: 'We connect your systems and tools so information flows without manual blocks or intermediate files.'
	} />
</svelte:head>

<!-- Asymmetric Hero with Interactive Connection Nodes SVG -->
<section class="page-hero page-hero-left">
	<div class="page-hero-left-grid">
		<div>
			<span class="page-hero-label">{lang === 'es' ? 'SERVICIOS — INTEGRACIONES' : 'SERVICES — INTEGRATIONS'}</span>
			<h1 class="page-hero-title" style="text-align: left; margin-bottom: 1.5rem;">
				{lang === 'es'
					? 'Tus sistemas deberían conversar solos, no depender de tu memoria.'
					: 'Your systems should talk to each other, not depend on your memory.'}
			</h1>
			<p class="page-hero-description" style="text-align: left; margin-bottom: 2rem;">
				{lang === 'es'
					? 'Conectamos bases de datos, plataformas web y aplicaciones internas para que los flujos de información sean fluidos y seguros.'
					: 'We connect databases, web platforms, and internal applications so information flows smoothly and securely.'}
			</p>
			
			<div style="display: flex; gap: 0.8rem;">
				<button class="btn btn-dark" onclick={() => showConnected = !showConnected}>
					{lang === 'es' 
						? (showConnected ? 'Ver desconectado' : 'Conectar sistemas') 
						: (showConnected ? 'View disconnected' : 'Connect systems')}
				</button>
			</div>
		</div>
		<div>
			<!-- Connection Nodes Diagram SVG -->
			<div class="chart-box" style="padding: 0;">
				<svg class="chart-svg" viewBox="0 0 200 200" style="max-width: 280px;">
					<!-- Nodes -->
					<!-- Center CRM -->
					<circle cx="100" cy="100" r="14" fill="var(--text-dark)" />
					<text x="100" y="103" fill="var(--text-light)" font-size="6" font-weight="700" text-anchor="middle">CRM</text>

					<!-- DB Left -->
					<circle cx="40" cy="70" r="10" fill={showConnected ? 'var(--text-dark)' : '#b5aa97'} opacity={showConnected ? 1 : 0.6} />
					<text x="40" y="73" fill="var(--text-light)" font-size="6" text-anchor="middle">DB</text>

					<!-- WEB Right -->
					<circle cx="160" cy="70" r="10" fill={showConnected ? 'var(--text-dark)' : '#b5aa97'} opacity={showConnected ? 1 : 0.6} />
					<text x="160" y="73" fill="var(--text-light)" font-size="6" text-anchor="middle">WEB</text>

					<!-- API Bottom -->
					<circle cx="100" cy="160" r="10" fill={showConnected ? 'var(--text-dark)' : '#b5aa97'} opacity={showConnected ? 1 : 0.6} />
					<text x="100" y="163" fill="var(--text-light)" font-size="6" text-anchor="middle">API</text>

					<!-- Animated/Dashed connections -->
					{#if showConnected}
						<line x1="100" y1="100" x2="40" y2="70" stroke="var(--text-dark)" stroke-width="1.5" stroke-dasharray="4 2" class="diagram-link" />
						<line x1="100" y1="100" x2="160" y2="70" stroke="var(--text-dark)" stroke-width="1.5" stroke-dasharray="4 2" class="diagram-link" />
						<line x1="100" y1="100" x2="100" y2="160" stroke="var(--text-dark)" stroke-width="1.5" stroke-dasharray="4 2" class="diagram-link" />

						<circle cx="70" cy="85" r="3" fill="#b5aa97" class="pulse-circle" />
						<circle cx="130" cy="85" r="3" fill="#b5aa97" class="pulse-circle" style="animation-delay: 1s;" />
						<circle cx="100" cy="130" r="3" fill="#b5aa97" class="pulse-circle" style="animation-delay: 2s;" />
					{:else}
						<!-- Disconnected indications -->
						<line x1="100" y1="100" x2="40" y2="70" stroke="#b5aa97" stroke-width="1" stroke-dasharray="2 4" opacity="0.4" />
						<line x1="100" y1="100" x2="160" y2="70" stroke="#b5aa97" stroke-width="1" stroke-dasharray="2 4" opacity="0.4" />
						<line x1="100" y1="100" x2="100" y2="160" stroke="#b5aa97" stroke-width="1" stroke-dasharray="2 4" opacity="0.4" />

						<text x="70" y="80" fill="#b5aa97" font-size="12" font-weight="700">✕</text>
						<text x="125" y="80" fill="#b5aa97" font-size="12" font-weight="700">✕</text>
						<text x="96" y="135" fill="#b5aa97" font-size="12" font-weight="700">✕</text>
					{/if}
				</svg>
			</div>
		</div>
	</div>
</section>

<!-- Editorial: The Cost of Fragmentation (Anthropic style text grids) -->
<section class="page-section" style="background-color: #ece3d4; border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-grid-2-narrow">
			<div>
				<span class="page-section-label">{lang === 'es' ? 'CONSECUENCIAS' : 'CONSEQUENCES'}</span>
				<h2 class="page-section-title">
					{lang === 'es'
						? 'Las herramientas aisladas dividen tu organización.'
						: 'Isolated tools divide your organization.'}
				</h2>
			</div>
			<div>
				<p class="page-section-text" style="font-size: 1.12rem; line-height: 1.8;">
					{lang === 'es'
						? 'Una empresa que utiliza múltiples sistemas desvinculados termina delegando en su equipo la tarea de copiar, pegar y transferir información de un sitio a otro. Esto genera cuellos de botella e inconsistencias en la base de datos.'
						: 'A company using multiple disconnected systems ends up delegating data copying, pasting, and transferring tasks to its team. This generates bottlenecks and inconsistencies in the database.'}
				</p>
				<p class="page-section-text">
					{lang === 'es'
						? 'Al conectar de forma nativa tus bases de datos, APIs y servicios externos, la información fluye sola y se actualiza en tiempo real, garantizando un control real sobre las operaciones.'
						: 'By natively connecting your databases, APIs, and external services, information flows on its own and updates in real time, guaranteeing actual control over operations.'}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Impact callout highlights in editorial format (Anthropic Newsroom style) -->
<section class="page-section" style="border-top: 1px solid rgba(18,18,17,0.05);">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 4rem;">
			<span class="page-section-label">{lang === 'es' ? 'MÉTRICAS' : 'METRICS'}</span>
			<h2 class="page-section-title">{lang === 'es' ? 'El valor de la información integrada' : 'The value of integrated information'}</h2>
		</div>

		<div class="page-grid-3">
			<div class="page-card" style="border: 1px solid rgba(18,18,17,0.05); background: rgba(255,255,255,0.4);">
				<div style="font-size: 3rem; font-weight: 800; font-family: var(--font-brand); opacity: 0.12; margin-bottom: 1rem;">90%</div>
				<h3 style="font-weight: 700; font-size: 1.15rem; margin-bottom: 0.5rem;">{lang === 'es' ? 'Menos tareas manuales' : 'Fewer manual tasks'}</h3>
				<p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5;">
					{lang === 'es' ? 'Eliminamos la transcripción manual de datos entre ERP, CRM y bases de datos.' : 'We eliminate manual data transcription between ERP, CRM, and databases.'}
				</p>
			</div>
			<div class="page-card" style="border: 1px solid rgba(18,18,17,0.05); background: rgba(255,255,255,0.4);">
				<div style="font-size: 3rem; font-weight: 800; font-family: var(--font-brand); opacity: 0.12; margin-bottom: 1rem;">100%</div>
				<h3 style="font-weight: 700; font-size: 1.15rem; margin-bottom: 0.5rem;">{lang === 'es' ? 'Consistencia' : 'Consistency'}</h3>
				<p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5;">
					{lang === 'es' ? 'La información es idéntica en todos los puntos de la organización, sin desactualizaciones.' : 'Information is identical across all points in the organization, without lag.'}
				</p>
			</div>
			<div class="page-card" style="border: 1px solid rgba(18,18,17,0.05); background: rgba(255,255,255,0.4);">
				<div style="font-size: 3rem; font-weight: 800; font-family: var(--font-brand); opacity: 0.12; margin-bottom: 1rem;">Realtime</div>
				<h3 style="font-weight: 700; font-size: 1.15rem; margin-bottom: 0.5rem;">{lang === 'es' ? 'Tiempos de respuesta' : 'Response times'}</h3>
				<p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5;">
					{lang === 'es' ? 'Los disparadores lógicos procesan alertas e información en milisegundos.' : 'Logical triggers process alerts and information in milliseconds.'}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Deep structure connect hover info -->
<section class="page-section page-section-dark">
	<div class="page-section-inner">
		<div class="page-section-centered" style="margin-bottom: 4rem;">
			<span class="page-section-label">{lang === 'es' ? 'NUESTRO MÉTODO' : 'OUR METHOD'}</span>
			<h2 class="page-section-title">{lang === 'es' ? 'Conexiones estructuradas con código limpio' : 'Structured connections with clean code'}</h2>
		</div>

		<div class="page-grid-3">
			<div class="page-card page-card-dark">
				<h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.8rem; color: var(--text-light);">
					{lang === 'es' ? 'APIs e integración nativa' : 'APIs & Native Integration'}
				</h4>
				<p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-dim-light);">
					{lang === 'es'
						? 'Enlazamos tus herramientas existentes mediante sus protocolos de comunicación seguros, garantizando rapidez y escalabilidad.'
						: 'We link your existing tools via their secure communication protocols, guaranteeing speed and scalability.'}
				</p>
			</div>
			<div class="page-card page-card-dark">
				<h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.8rem; color: var(--text-light);">
					{lang === 'es' ? 'Diseño de Middleware' : 'Middleware Design'}
				</h4>
				<p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-dim-light);">
					{lang === 'es'
						? 'Construimos puentes de software personalizados para traducir formatos de datos e interconectar sistemas que no tienen compatibilidad nativa.'
						: 'We build customized software bridges to translate data formats and interconnect systems lacking native compatibility.'}
				</p>
			</div>
			<div class="page-card page-card-dark">
				<h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.8rem; color: var(--text-light);">
					{lang === 'es' ? 'Sincronización segura' : 'Secure Sync'}
				</h4>
				<p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-dim-light);">
					{lang === 'es'
						? 'Implementamos colas de mensajería redundantes que impiden la pérdida de información en caso de caídas temporales de red.'
						: 'We implement redundant messaging queues preventing data loss during temporary network outages.'}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="page-cta">
	{#if lang === 'es'}
		<h2 class="page-cta-title">¿Tus herramientas operan en silos aislados?</h2>
		<p class="page-cta-text">Conversemos sobre cómo interconectar tus sistemas para unificar el control de tu negocio.</p>
	{:else}
		<h2 class="page-cta-title">Are your tools operating in isolated silos?</h2>
		<p class="page-cta-text">Let's talk about interconnecting your systems to unify control of your business.</p>
	{/if}
	<button class="page-cta-btn" onclick={() => homeState.openModal('Integraciones')}>
		{lang === 'es' ? 'Escribir a Wylen' : 'Write to Wylen'}
	</button>
</section>

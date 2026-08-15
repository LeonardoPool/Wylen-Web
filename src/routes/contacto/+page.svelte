<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { enhance } from '$app/forms';
	import { HomeState } from '$lib/homeState.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '$lib/styles/home.css';
	import '$lib/styles/pages.css';

	const homeState = new HomeState();
	const lang = $derived(homeState.currentLanguage);

	onMount(() => {
		homeState.initLanguage();
	});

	// SvelteKit form action result props
	let { form } = $props();
	
	let isSubmitting = $state(false);
	let successContainer = $state<HTMLDivElement | null>(null);

	// Accessibility focus shift to success banner upon form completion
	$effect(() => {
		if (form?.success && successContainer) {
			tick().then(() => {
				successContainer?.focus();
			});
		}
	});
</script>

<svelte:head>
	<title>{lang === 'es' ? 'Contacto — WYLEN' : 'Contact — WYLEN'}</title>
	<meta name="description" content={lang === 'es' 
		? 'Hablemos de tu proyecto. Cuéntanos qué necesitas y un especialista de nuestro equipo se pondrá en contacto contigo.'
		: 'Let\'s talk about your project. Tell us what you need and a specialist from our team will get in touch.'} 
	/>
</svelte:head>

<div class="page-container">
	<!-- Navbar -->
	<Navbar state={homeState} />

	<!-- Hero Section -->
	<section class="page-hero">
		<span class="page-hero-label">{homeState.t('contact.hero.label')}</span>
		<h1 class="page-hero-title">{homeState.t('contact.hero.title')}</h1>
		<p class="page-hero-description">{homeState.t('contact.hero.desc')}</p>
	</section>

	<!-- Contact Form Section -->
	<section class="page-section" style="padding-top: 2rem; padding-bottom: 7rem;">
		<div class="page-section-inner" style="max-width: 680px;">
			
			{#if form?.success}
				<!-- Success Screen with A11y Focus management -->
				<div 
					class="contact-success-card" 
					bind:this={successContainer} 
					tabindex="-1"
					aria-live="polite"
				>
					<div class="success-icon-wrap">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
					</div>
					<h2>{homeState.t('contact.success.title')}</h2>
					<p>{homeState.t('contact.success.message')}</p>
					
					<div style="margin-top: 2rem;">
						<a href="/" class="page-cta-btn" style="background-color: var(--bg-dark); color: var(--text-light);">
							{homeState.t('contact.success.back')}
						</a>
					</div>
				</div>
			{:else}
				<!-- Form Element -->
				<form 
					method="POST" 
					use:enhance={() => {
						isSubmitting = true;
						return async ({ update }) => {
							isSubmitting = false;
							await update();
						};
					}}
					class="contact-form"
					aria-label={lang === 'es' ? 'Formulario de contacto' : 'Contact form'}
				>
					<!-- Anti-Spam Honeypot Field -->
					<div style="display: none;" aria-hidden="true">
						<label for="wylen_hp">Leave this field blank</label>
						<input type="text" id="wylen_hp" name="wylen_hp" tabindex="-1" autocomplete="off" />
					</div>

					<!-- Error Banner -->
					{#if form?.error}
						<div class="contact-error-banner" role="alert">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-top: 0.1rem;">
								<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
							</svg>
							<div class="error-message-content">
								{#if form.error === 'validation'}
									{homeState.t('contact.error.validation')}
								{:else if form.error === 'email'}
									{homeState.t('contact.error.email')}
								{:else if form.error === 'ratelimit'}
									{homeState.t('contact.error.ratelimit')}
								{:else if form.error === 'missing_env'}
									{homeState.t('contact.error.missing_env')}
								{:else if form.error === 'spam'}
									{homeState.t('contact.error.spam')}
								{:else}
									{homeState.t('contact.error.server')}
								{/if}
							</div>
						</div>
					{/if}

					<!-- Fields Grid -->
					<div class="form-grid">
						<div class="form-field">
							<label for="nombre">{homeState.t('contact.form.name.label')} <span class="required">*</span></label>
							<input 
								type="text" 
								id="nombre" 
								name="nombre" 
								placeholder={homeState.t('contact.form.name.placeholder')} 
								required 
								value={form?.fields?.nombre || ''}
								aria-required="true"
							/>
						</div>

						<div class="form-field">
							<label for="email">{homeState.t('contact.form.email.label')} <span class="required">*</span></label>
							<input 
								type="email" 
								id="email" 
								name="email" 
								placeholder={homeState.t('contact.form.email.placeholder')} 
								required 
								value={form?.fields?.email || ''}
								aria-required="true"
							/>
						</div>

						<div class="form-field">
							<label for="empresa">{homeState.t('contact.form.company.label')}</label>
							<input 
								type="text" 
								id="empresa" 
								name="empresa" 
								placeholder={homeState.t('contact.form.company.placeholder')} 
								value={form?.fields?.empresa || ''}
							/>
						</div>

						<div class="form-field">
							<label for="consulta">{homeState.t('contact.form.type.label')} <span class="required">*</span></label>
							<select 
								id="consulta" 
								name="consulta" 
								required 
								aria-required="true"
							>
								<option value="" disabled selected={!form?.fields?.consulta}>
									{homeState.t('contact.form.type.select')}
								</option>
								<option value="software" selected={form?.fields?.consulta === 'software'}>
									{homeState.t('contact.form.type.software')}
								</option>
								<option value="products" selected={form?.fields?.consulta === 'products'}>
									{homeState.t('contact.form.type.products')}
								</option>
								<option value="consulting" selected={form?.fields?.consulta === 'consulting'}>
									{homeState.t('contact.form.type.consulting')}
								</option>
								<option value="automation" selected={form?.fields?.consulta === 'automation'}>
									{homeState.t('contact.form.type.automation')}
								</option>
								<option value="integrations" selected={form?.fields?.consulta === 'integrations'}>
									{homeState.t('contact.form.type.integrations')}
								</option>
								<option value="other" selected={form?.fields?.consulta === 'other'}>
									{homeState.t('contact.form.type.other')}
								</option>
							</select>
						</div>

						<div class="form-field full-width">
							<label for="mensaje">{homeState.t('contact.form.message.label')} <span class="required">*</span></label>
							<textarea 
								id="mensaje" 
								name="mensaje" 
								rows="5" 
								maxlength="5000"
								placeholder={homeState.t('contact.form.message.placeholder')} 
								required
								aria-required="true"
							>{form?.fields?.mensaje || ''}</textarea>
						</div>
					</div>

					<div style="margin-top: 2rem; display: flex; justify-content: flex-end;">
						<button 
							type="submit" 
							class="page-cta-btn" 
							style="background-color: var(--bg-dark); color: var(--text-light); width: 100%; justify-content: center;"
							disabled={isSubmitting}
						>
							{isSubmitting ? homeState.t('contact.form.submitting') : homeState.t('contact.form.submit')}
						</button>
					</div>
				</form>
			{/if}

		</div>
	</section>

	<!-- Footer -->
	<Footer state={homeState} />
</div>

<style>
	/* Form Styling */
	.contact-form {
		background: rgba(255, 255, 255, 0.4);
		border: 1px solid rgba(0, 0, 0, 0.05);
		border-radius: 24px;
		padding: 3rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
		animation: pageHeroIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.8rem;
	}

	.form-field {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.form-field.full-width {
		grid-column: span 2;
	}

	.form-field label {
		font-size: 0.82rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-dark);
		opacity: 0.8;
	}

	.form-field label .required {
		color: #aa4433;
		margin-left: 0.1rem;
	}

	.form-field input,
	.form-field select,
	.form-field textarea {
		width: 100%;
		padding: 0.9rem 1.1rem;
		border-radius: 12px;
		border: 1.5px solid rgba(18, 18, 17, 0.1);
		background-color: rgba(255, 255, 255, 0.6);
		color: var(--text-dark);
		font-family: inherit;
		font-size: 0.95rem;
		transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
	}

	.form-field input:focus,
	.form-field select:focus,
	.form-field textarea:focus {
		outline: none;
		border-color: var(--text-dark);
		background-color: #ffffff;
		box-shadow: 0 0 0 3px rgba(18, 18, 17, 0.05);
	}

	.form-field select {
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23121211' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 1.1rem center;
		background-size: 0.85rem;
		padding-right: 2.5rem;
	}

	.form-field textarea {
		resize: vertical;
	}

	/* Success State Card */
	.contact-success-card {
		background: rgba(255, 255, 255, 0.5);
		border: 1px solid rgba(0, 0, 0, 0.05);
		border-radius: 24px;
		padding: 4rem 3rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.2rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
		animation: pageHeroIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
		outline: none;
	}

	.success-icon-wrap {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background-color: rgba(18, 28, 15, 0.06);
		color: #3b6d4c;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.contact-success-card h2 {
		font-family: var(--font-brand);
		font-size: 2rem;
		font-weight: 800;
		color: var(--text-dark);
		letter-spacing: -0.02em;
	}

	.contact-success-card p {
		font-size: 1.05rem;
		line-height: 1.6;
		color: var(--text-muted);
		max-width: 480px;
	}

	/* Error Banner styling */
	.contact-error-banner {
		background-color: rgba(170, 68, 51, 0.08);
		border: 1.5px solid rgba(170, 68, 51, 0.2);
		border-radius: 12px;
		color: #8c3223;
		padding: 1.2rem 1.5rem;
		margin-bottom: 2rem;
		display: flex;
		gap: 0.8rem;
		align-items: flex-start;
		font-size: 0.95rem;
		line-height: 1.45;
	}

	.error-message-content {
		font-weight: 500;
	}

	/* Responsive */
	@media (max-width: 640px) {
		.contact-form {
			padding: 2rem 1.5rem;
		}

		.form-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.form-field.full-width {
			grid-column: span 1;
		}

		.contact-success-card {
			padding: 3rem 1.5rem;
		}
	}
</style>

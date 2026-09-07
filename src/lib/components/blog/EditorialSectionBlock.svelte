<script lang="ts">
	interface Props {
		data: {
			number?: string;
			title?: string;
			description?: string;
			bgColor?: string;
			textColor?: string;
		};
	}

	let { data }: Props = $props();

	// Presets dictionary for fallback lookups
	const COLOR_PRESETS: Record<string, { bg: string; text: string }> = {
		clasico: { bg: '#F0E4D8', text: '#141413' },
		terracota: { bg: '#D97757', text: '#FFFFFF' },
		carbon: { bg: '#1F1E1D', text: '#F5F4ED' },
		salvia: { bg: '#E2E6DF', text: '#1E241B' },
		arena: { bg: '#FAF7F2', text: '#1A1A18' },
		arcilla: { bg: '#E8DDD7', text: '#2B1D19' }
	};

	let bgColor = $derived(data.bgColor || COLOR_PRESETS.clasico.bg);
	let textColor = $derived(data.textColor || COLOR_PRESETS.clasico.text);
	let num = $derived(data.number || '01');
	let title = $derived(data.title || '');
	let description = $derived(data.description || '');
</script>

<div
	class="editorial-section-card"
	style="background-color: {bgColor}; color: {textColor};"
>
	<div class="editorial-number">{num}</div>
	<div class="editorial-content">
		{#if title}
			<h3 class="editorial-title" style="color: {textColor};">{title}</h3>
		{/if}
		{#if description}
			<p class="editorial-desc" style="color: {textColor};">{description}</p>
		{/if}
	</div>
</div>

<style>
	.editorial-section-card {
		border-radius: 20px;
		padding: 2rem 2.25rem;
		margin: 2.25rem 0;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 1.75rem;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.editorial-number {
		font-family: var(--blog-font-sans, 'Inter', system-ui, sans-serif);
		font-size: 3.5rem;
		font-weight: 300;
		line-height: 1;
		opacity: 0.45;
		flex-shrink: 0;
		user-select: none;
	}

	.editorial-content {
		flex: 1;
	}

	.editorial-title {
		font-family: var(--blog-font-sans, 'Inter', system-ui, sans-serif);
		font-size: 1.35rem;
		font-weight: 700;
		line-height: 1.3;
		margin: 0 0 0.5rem 0;
	}

	.editorial-desc {
		font-family: var(--blog-font-sans, 'Inter', system-ui, sans-serif);
		font-size: 0.95rem;
		line-height: 1.6;
		margin: 0;
		opacity: 0.85;
	}

	@media (max-width: 520px) {
		.editorial-section-card {
			flex-direction: column;
			gap: 0.75rem;
			padding: 1.5rem 1.5rem;
		}

		.editorial-number {
			font-size: 2.75rem;
		}
	}
</style>

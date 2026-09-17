<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		client?: string;
		slot?: string;
		format?: string;
		responsive?: boolean;
		style?: string;
		class?: string;
	}

	let {
		client = 'ca-pub-8607542148607783',
		slot = '',
		format = 'auto',
		responsive = true,
		style = 'display:block;',
		class: className = ''
	}: Props = $props();

	onMount(() => {
		try {
			if (typeof window !== 'undefined') {
				((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
			}
		} catch (err) {
			console.warn('[AdSense] Error initializing ad unit:', err);
		}
	});
</script>

<div class="adsense-wrapper {className}">
	<ins
		class="adsbygoogle"
		style={style}
		data-ad-client={client}
		data-ad-slot={slot || undefined}
		data-ad-format={format}
		data-full-width-responsive={responsive ? 'true' : 'false'}
	></ins>
</div>

<style>
	.adsense-wrapper {
		width: 100%;
		margin: 1.5rem 0;
		overflow: hidden;
		text-align: center;
		min-height: 90px;
	}
</style>

<script lang="ts">
	import wylenLogoSvg from '$lib/images/app/WYLEN LOGO WEB SVG.svg';
	import '../app.css';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { initGA, trackPageView } from '$lib/analytics';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();

	onMount(() => {
		initGA();
	});

	afterNavigate((navigation) => {
		if (navigation.to?.url) {
			trackPageView(navigation.to.url.pathname);
		}
	});
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={wylenLogoSvg} />
</svelte:head>

{@render children()}


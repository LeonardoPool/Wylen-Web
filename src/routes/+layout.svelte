<script lang="ts">
	import rawFavicon from '$lib/images/app/ISOTIPO WILEN.png';
	import '../app.css';
	import { onMount } from 'svelte';

	let { children } = $props();
	let favicon = $state(rawFavicon);

	onMount(() => {
		const img = new Image();
		img.src = rawFavicon;
		img.onload = () => {
			const canvas = document.createElement('canvas');
			const size = Math.min(img.width, img.height);
			canvas.width = size;
			canvas.height = size;
			const ctx = canvas.getContext('2d');
			if (ctx) {
				// Create circular clip path
				ctx.beginPath();
				ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
				ctx.closePath();
				ctx.clip();

				// Draw the image centered
				const dx = (size - img.width) / 2;
				const dy = (size - img.height) / 2;
				ctx.drawImage(img, dx, dy, img.width, img.height);

				favicon = canvas.toDataURL('image/png');
			}
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}


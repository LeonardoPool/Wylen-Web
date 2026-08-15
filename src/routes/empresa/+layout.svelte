<script lang="ts">
	import { setContext, onMount } from 'svelte';
	import { HomeState } from '$lib/homeState.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '$lib/styles/home.css';
	import '$lib/styles/pages.css';

	let { children } = $props();
	const homeState = new HomeState();
	setContext('homeState', homeState);

	onMount(() => {
		homeState.initLanguage();
	});
</script>

<div class="page-container">
	<Navbar state={homeState} />
	{@render children()}
	<Footer state={homeState} />
</div>

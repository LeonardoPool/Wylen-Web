<script lang="ts">
	import { onMount } from 'svelte';

	// ─── Physics constants ────────────────────────────────────────────────────────

	/**
	 * Lerp factor per frame (rAF ~16ms).
	 * Lower = more inertia / fluid feel.
	 */
	const LERP_FACTOR = 0.065;

	/**
	 * Deadzone: fraction of the scroll range where the logo stays fully expanded.
	 * 0 – 28%  → logo is completely static (WYLEN).
	 * 28% – 100% → gradual compression to WN.
	 */
	const DEADZONE = 0.28;

	/**
	 * Multiplier applied to the hero height to extend the effective scroll range.
	 */
	const SCROLL_RANGE_MULTIPLIER = 2.8;
	const SCROLL_RANGE_MIN_PX = 1200;

	// ─── State ────────────────────────────────────────────────────────────────────

	/** Reactive display progress (0 = WYLEN, 1 = WN). Driven by rAF lerp. */
	let currentProgress = $state(0);

	/** Instant target derived from raw scroll. Never used directly for display. */
	let targetProgress = 0;

	/** rAF handle — null when the loop is idle. */
	let rafId: number | null = null;

	/** Set once on mount; disables lerp and uses binary jump for a11y. */
	let reducedMotion = $state(false);

	/** On mobile, the logo stays collapsed (no compression animation). */
	let isMobile = $state(false);

	// ─── Easing ───────────────────────────────────────────────────────────────────

	function smoothstep(t: number): number {
		const x = Math.min(1, Math.max(0, t));
		return x * x * (3 - 2 * x);
	}

	function easeOutSine(t: number): number {
		return 1 - Math.cos((t * Math.PI) / 2);
	}

	function easeCombined(t: number): number {
		const x = Math.min(1, Math.max(0, t));
		return 0.5 * smoothstep(x) + 0.5 * easeOutSine(x);
	}

	// ─── Scroll → progress mapping ────────────────────────────────────────────────

	function scrollToTarget(scrollY: number, threshold: number): number {
		const raw = Math.min(1, Math.max(0, scrollY / threshold));

		if (raw <= DEADZONE) return 0;

		const remapped = (raw - DEADZONE) / (1 - DEADZONE);
		return easeCombined(remapped);
	}

	// ─── rAF physics loop ─────────────────────────────────────────────────────────

	function tick(): void {
		const diff = targetProgress - currentProgress;

		if (Math.abs(diff) < 0.0005) {
			currentProgress = targetProgress;
			rafId = null;
			return;
		}

		currentProgress += diff * LERP_FACTOR;
		rafId = window.requestAnimationFrame(tick);
	}

	function scheduleTick(): void {
		if (!rafId) {
			rafId = window.requestAnimationFrame(tick);
		}
	}

	// ─── Mount ────────────────────────────────────────────────────────────────────

	onMount(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = mq.matches;
		const onMqChange = (e: MediaQueryListEvent) => { reducedMotion = e.matches; };
		mq.addEventListener('change', onMqChange);

		// Mobile detection: keep collapsed as WN on mobile screen sizes
		const mobileMq = window.matchMedia('(max-width: 767px)');
		isMobile = mobileMq.matches;
		const onMobileMqChange = (e: MediaQueryListEvent) => {
			isMobile = e.matches;
			if (isMobile) {
				currentProgress = 1;
				targetProgress = 1;
			}
		};
		mobileMq.addEventListener('change', onMobileMqChange);

		// Cache layout threshold and update only on window resize to avoid layout thrashing/reflow on scroll
		let threshold = SCROLL_RANGE_MIN_PX;
		const measureThreshold = () => {
			const hero = document.querySelector<HTMLElement>('.hero-section');
			const heroH = hero ? hero.offsetHeight : 800;
			threshold = Math.max(SCROLL_RANGE_MIN_PX, heroH * SCROLL_RANGE_MULTIPLIER);
		};

		measureThreshold();

		const onResize = () => {
			measureThreshold();
		};
		window.addEventListener('resize', onResize, { passive: true });

		// Throttle scroll events with requestAnimationFrame
		let scrollTicking = false;
		const onScroll = () => {
			if (isMobile) {
				currentProgress = 1;
				targetProgress = 1;
				return;
			}

			if (!scrollTicking) {
				window.requestAnimationFrame(() => {
					targetProgress = scrollToTarget(Math.max(0, window.scrollY), threshold);

					if (reducedMotion) {
						currentProgress = targetProgress >= 0.5 ? 1 : 0;
					} else {
						scheduleTick();
					}
					scrollTicking = false;
				});
				scrollTicking = true;
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
			mq.removeEventListener('change', onMqChange);
			mobileMq.removeEventListener('change', onMobileMqChange);
			if (rafId !== null) window.cancelAnimationFrame(rafId);
		};
	});

	// ─── Derived visual properties ────────────────────────────────────────────────

	let letterSpacing = $derived(
		`${(-0.02 - currentProgress * 0.01).toFixed(4)}em`
	);
</script>

<a
	href="/"
	class="logo-link"
	aria-label="WYLEN — inicio"
	style:letter-spacing={reducedMotion ? '-0.02em' : letterSpacing}
>
	<!-- W: fixed left anchor -->
	<span class="char char-w">W</span>

	<!-- YLE: collapsible characters segment -->
	<span class="yle-wrapper">
		{#each 'YLE' as char}
			<span
				class="yle-char"
				style:max-width={isMobile || reducedMotion ? (currentProgress >= 0.5 ? '0px' : '0.62em') : `${((1 - currentProgress) * 0.62).toFixed(3)}em`}
				style:opacity={isMobile || reducedMotion ? (currentProgress >= 0.5 ? '0' : '1') : `${(1 - currentProgress).toFixed(3)}`}
			>{char}</span>
		{/each}
	</span>

	<!-- N: fixed right anchor -->
	<span class="char char-n">N</span>
</a>

<style>
	/* ── Container ─────────────────────────────────────────────── */
	.logo-link {
		display: inline-flex;
		align-items: baseline;
		font-family: var(--font-brand, 'Switzer', sans-serif);
		font-weight: 700;
		font-size: 1.65rem;
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--text-dark, #0f0f0f);
		text-decoration: none;
		user-select: none;
		white-space: nowrap;
		cursor: pointer;
		transform: translateZ(0);
	}

	/* ── Fixed characters ──────────────────────────────────────── */
	.char {
		display: inline-block;
		transform: translateZ(0);
	}

	/* ── Collapsible wrapper segment ────────────────────────────── */
	.yle-wrapper {
		display: inline-flex;
		align-items: baseline;
		vertical-align: baseline;
		overflow: hidden;
		transform: translateZ(0);
	}

	/* ── Collapsible character blocks ───────────────────────────── */
	.yle-char {
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		vertical-align: baseline;
		transform-origin: left center;
		will-change: max-width, opacity;
		transform: translateZ(0);
	}

	/* ── Responsive ────────────────────────────────────────────── */
	@media (max-width: 767px) {
		.logo-link {
			font-size: 1.45rem;
		}
		.yle-wrapper {
			display: none !important; /* Pure CSS backup for SSR / instant loading */
		}
	}

	/* ── Reduced motion: no animations ────────────────────────── */
	@media (prefers-reduced-motion: reduce) {
		.yle-char {
			transition: none !important;
		}
	}
</style>

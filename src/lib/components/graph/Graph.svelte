<script lang="ts">
    import { onMount, onDestroy, tick } from 'svelte';
    import Node from './Node.svelte';
    import FlowImage from './FlowImage.svelte';
    import { initialNodes } from './graph';
    import { getBreakpoint, computePositions } from './layout';
    import type { ComputedNode, Breakpoint } from './types';

    // Receive state prop to trigger modals
    let { state: homeState }: { state: any } = $props();

    let container: HTMLDivElement | undefined = $state();
    let resizeObserver: ResizeObserver;
    let rafId: number;

    let currentBreakpoint: Breakpoint = $state('desktop');
    let computedNodes = $state<ComputedNode[]>([]);
    let nodeEls = $state<Record<string, HTMLDivElement>>({});
    
    // Responsive state (Safe SSR default: true)
    let isMobileOrTablet = $state(true);

    // Paths for SVG
    let paths = $state<string[]>([]);

    // Grouping questions dynamically for the mobile flow view (no hardcoding count)
    const questions = $derived(initialNodes
        .filter(node => node.type === 'text')
        .map(node => ({
            ...node,
            text: homeState.t(node.text || '')
        }))
    );
    const getImagesForQuestion = (qId: string) => initialNodes.filter(node => node.type === 'image' && node.parentId === qId);

    // Reactively translate desktop text nodes
    let translatedComputedNodes = $derived(computedNodes.map(node => {
        if (node.type === 'text') {
            return { ...node, text: homeState.t(node.text || '') };
        }
        return node;
    }));

    function updateLayout() {
        if (!container || isMobileOrTablet) return;
        const width = container.clientWidth;
        const newBreakpoint = getBreakpoint(width);

        if (newBreakpoint !== currentBreakpoint || computedNodes.length === 0) {
            currentBreakpoint = newBreakpoint;
            computedNodes = computePositions(initialNodes, currentBreakpoint);
        }
        
        recalcLines();
    }

    function recalcLines() {
        if (!container || isMobileOrTablet) return;
        const cRect = container.getBoundingClientRect();
        
        const newPaths: string[] = [];

        computedNodes.forEach(node => {
            if (node.type === 'image' && node.parentId) {
                const parentNode = computedNodes.find(n => n.id === node.parentId);
                if (parentNode) {
                    const fromEl = nodeEls[parentNode.id];
                    const toEl = nodeEls[node.id];

                    if (fromEl && toEl) {
                        const fromRect = fromEl.getBoundingClientRect();
                        const toRect = toEl.getBoundingClientRect();

                        const cx1 = fromRect.left + fromRect.width / 2 - cRect.left;
                        const cy1 = fromRect.top + fromRect.height / 2 - cRect.top;
                        const cx2 = toRect.left + toRect.width / 2 - cRect.left;
                        const cy2 = toRect.top + toRect.height / 2 - cRect.top;

                        const angle = Math.atan2(cy2 - cy1, cx2 - cx1);
                        
                        const a = fromRect.width / 2 + 15;
                        const b = fromRect.height / 2 + 15;
                        const r = (a * b) / Math.sqrt(Math.pow(b * Math.cos(angle), 2) + Math.pow(a * Math.sin(angle), 2));
                        
                        const x1 = cx1 + Math.cos(angle) * r;
                        const y1 = cy1 + Math.sin(angle) * r;
                        const x2 = cx2;
                        const y2 = cy2;

                        const pathDx = x2 - x1;
                        const pathDy = y2 - y1;
                        
                        const cp1x = x1 + pathDx * 0.4;
                        const cp1y = y1 - pathDy * 0.1;
                        const cp2x = x2 - pathDx * 0.4;
                        const cp2y = y2 + pathDy * 0.1;

                        newPaths.push(`M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`);
                    }
                }
            }
        });

        paths = newPaths;
    }

    function scheduleUpdate() {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            updateLayout();
        });
    }

    onMount(() => {
        // Handle responsive breakpoint in onMount for SSR safety
        const mediaQuery = window.matchMedia('(max-width: 1279px)');
        isMobileOrTablet = mediaQuery.matches;
        
        const handleMediaQueryChange = (e: MediaQueryListEvent) => {
            isMobileOrTablet = e.matches;
            if (!isMobileOrTablet) {
                tick().then(() => scheduleUpdate());
            }
        };
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        tick().then(() => {
            if (container) {
                resizeObserver = new ResizeObserver(() => scheduleUpdate());
                resizeObserver.observe(container);
                scheduleUpdate();
            }
        });

		return () => {
			mediaQuery.removeEventListener('change', handleMediaQueryChange);
			if (resizeObserver) resizeObserver.disconnect();
			if (typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(rafId);
		};
	});

	// Reactively recalculate lines when nodes are bound or layout state changes
	$effect(() => {
		if (!isMobileOrTablet && container && computedNodes.length > 0) {
			// Trigger dependency tracking on nodeEls mutations
			const keys = Object.keys(nodeEls);
			if (keys.length > 0) {
				recalcLines();
			}
		}
	});
</script>

{#if isMobileOrTablet}
    <!-- Flow Layout for Mobile & Tablet (Breakpoint < 1280px) -->
    <div class="graph-flow-container">
        <!-- Centered Header in Mobile Document Flow -->
        <div class="graph-flow-header">
            <h2 class="graph-flow-title">
                {homeState.t('La mejor ingeniería comienza comprendiendo a las personas')}
            </h2>
            <p class="graph-flow-subtitle">
                {homeState.t('Escuchamos antes de diseñar. Diseñamos antes de desarrollar.')}
            </p>
            <button class="btn graph-flow-btn" onclick={() => homeState.openModal('Discover App')}>
                {homeState.t('graph.mobile.btn')}
            </button>
        </div>

        <div class="graph-flow-questions">
            {#each questions as question (question.id)}
                <div class="graph-flow-section">
                    <h3 class="graph-flow-question-title">{question.text}</h3>
                    <div class="graph-flow-grid">
                        {#each getImagesForQuestion(question.id) as imgNode (imgNode.id)}
                            <FlowImage node={imgNode} />
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
{:else}
    <!-- Absolute Graph Layout for Desktop (Breakpoint >= 1280px) -->
    <div class="graph-container" bind:this={container}>
        <svg class="lines" preserveAspectRatio="none">
            {#each paths as path}
                <path
                    d={path}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.15)"
                    stroke-width="1"
                    class="smooth-path"
                />
            {/each}
        </svg>

        {#each translatedComputedNodes as node (node.id)}
            <Node {node} bind:el={nodeEls[node.id]} />
        {/each}

        <!-- Absolute Centered Overlay for Desktop -->
        <div class="graph-overlay-content">
            <h2 class="graph-overlay-title">
                {homeState.t('La mejor ingeniería comienza comprendiendo a las personas')}
            </h2>
            <p class="graph-overlay-subtitle">
                {homeState.t('Escuchamos antes de diseñar. Diseñamos antes de desarrollar.')}
            </p>
            <button class="btn graph-overlay-btn" onclick={() => homeState.openModal('Discover App')}>
                {homeState.t('graph.mobile.btn')}
            </button>
        </div>
    </div>
{/if}

<style>
    /* Absolute Grafo Desktop */
    .graph-container {
        position: relative;
        width: 100%;
        height: 90vh;
        min-height: 700px;
        background-color: var(--bg-dark, #121211);
        overflow: hidden;
        container-type: size;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .lines {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    }

    .smooth-path {
        transition: d 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    @media (prefers-reduced-motion: reduce) {
        .smooth-path {
            transition: none;
        }
    }

    /* Absolute Centered Overlay for Desktop */
    .graph-overlay-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 20;
        text-align: center;
        pointer-events: none;
        width: 90%;
        max-width: 700px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .graph-overlay-title {
        font-size: 2.8rem;
        font-family: Georgia, 'Times New Roman', serif;
        font-weight: 700;
        color: #F5F5F7;
        margin-bottom: 1.5rem;
        line-height: 1.15;
        letter-spacing: -0.02em;
    }

    .graph-overlay-subtitle {
        font-size: 1.2rem;
        color: #A1A1A6;
        margin-bottom: 2.5rem;
    }

    .graph-overlay-btn {
        background-color: #F5F5F7;
        color: #121211;
        pointer-events: auto;
        padding: 1rem 2.5rem;
        border-radius: 9999px;
        font-weight: 600;
        transition: transform 0.2s;
        border: none;
        cursor: pointer;
        width: auto;
    }

    /* Flow Layout Mobile/Tablet */
    .graph-flow-container {
        width: 100%;
        background-color: var(--bg-dark, #121211);
        padding: 6rem 1.5rem 8rem;
        color: #f5f5f7;
        box-sizing: border-box;
    }

    .graph-flow-header {
        text-align: center;
        max-width: 650px;
        margin: 0 auto 5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .graph-flow-title {
        font-size: 2.2rem;
        font-family: Georgia, 'Times New Roman', serif;
        font-weight: 700;
        color: #F5F5F7;
        margin-bottom: 1.2rem;
        line-height: 1.2;
        letter-spacing: -0.02em;
    }

    .graph-flow-subtitle {
        font-size: 1.1rem;
        color: #A1A1A6;
        margin-bottom: 2rem;
        line-height: 1.5;
    }

    .graph-flow-btn {
        background-color: #F5F5F7;
        color: #121211;
        padding: 0.9rem 2.2rem;
        border-radius: 9999px;
        font-weight: 600;
        transition: transform 0.2s;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        width: auto;
    }

    .graph-flow-questions {
        display: flex;
        flex-direction: column;
        gap: 4.5rem;
        max-width: 800px;
        margin: 0 auto;
        width: 100%;
    }

    .graph-flow-section {
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
    }

    .graph-flow-question-title {
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 1.4rem;
        font-weight: 500;
        color: #e8e6df;
        border-left: 3px solid rgba(232, 230, 223, 0.3);
        padding-left: 1rem;
        margin: 0;
        line-height: 1.3;
    }

    .graph-flow-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }

    @media (max-width: 480px) {
        .graph-flow-container {
            padding: 4rem 1.2rem 6rem;
        }

        .graph-flow-header {
            margin-bottom: 3.5rem;
        }

        .graph-flow-title {
            font-size: 1.8rem;
        }

        .graph-flow-subtitle {
            font-size: 0.95rem;
        }

        .graph-flow-question-title {
            font-size: 1.25rem;
        }

        .graph-flow-grid {
            gap: 1rem;
        }
    }

    @media (min-width: 768px) and (max-width: 1279px) {
        .graph-flow-questions {
            max-width: 1000px;
        }
        .graph-flow-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
        }
    }
</style>

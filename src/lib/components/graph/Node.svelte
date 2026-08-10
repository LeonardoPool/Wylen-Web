<script lang="ts">
    import { onMount } from 'svelte';
    import type { ComputedNode } from './types';
    import { getPhotoForNode, getBestImageUrl } from './pexels';
    import type { PexelsPhoto } from './pexels';

    let { node, el = $bindable() }: { node: ComputedNode, el?: HTMLDivElement } = $props();

    // Random rotation for images between -5 and 5 degrees
    const rotation = node.type === 'image' ? (Math.random() * 10 - 5).toFixed(1) : 0;

    // Pexels image state
    let photo = $state<PexelsPhoto | null>(null);
    let imageLoaded = $state(false);
    let imageUrl = $state('');

    onMount(() => {
        if (node.type === 'image' && node.queries && node.queries.length > 0) {
            getPhotoForNode(node.queries).then(p => {
                if (p) {
                    photo = p;
                    imageUrl = getBestImageUrl(p, node.size || 70);
                }
            });
        }
    });

    function onImageLoad() {
        imageLoaded = true;
    }
</script>

<div
    bind:this={el}
    class="graph-node"
    class:node-text={node.type === 'text'}
    class:node-image={node.type === 'image'}
    style="
        --x: {node.currentX};
        --y: {node.currentY};
        --rot: {rotation}deg;
        --size: {node.size ? `${node.size}px` : 'auto'};
        --bg-color: {node.color || 'transparent'};
    "
>
    {#if node.type === 'text'}
        <span class="label">{node.text}</span>
    {:else}
        <div class="thumb" class:has-image={imageLoaded}>
            {#if imageUrl}
                <img
                    src={imageUrl}
                    alt={photo?.alt || ''}
                    loading="lazy"
                    class="thumb-img"
                    class:loaded={imageLoaded}
                    onload={onImageLoad}
                />
            {/if}
        </div>
    {/if}
</div>

<style>
    .graph-node {
        position: absolute;
        top: 0;
        left: 0;
        /* Using container queries (cqw, cqh) for percentages of the parent graph container */
        transform: translate3d(calc(var(--x) * 1cqw - 50%), calc(var(--y) * 1cqh - 50%), 0) rotate(var(--rot));
        transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        z-index: 1;
        transform-origin: center center;
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
        .graph-node {
            transition: none;
        }
    }

    .node-image {
        cursor: pointer;
    }

    .node-image:hover {
        z-index: 10;
    }

    .node-image:hover .thumb {
        transform: scale(1.08);
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    }

    .thumb {
        width: var(--size, 50px);
        height: var(--size, 50px);
        border-radius: 8px;
        background: var(--bg-color);
        transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        overflow: hidden;
        position: relative;
    }

    .thumb-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0;
        transition: opacity 0.6s ease;
        border-radius: 8px;
    }

    .thumb-img.loaded {
        opacity: 1;
    }

    .node-text {
        pointer-events: none;
        z-index: 5;
    }

    .label {
        color: #e8e6df;
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 17px;
        white-space: nowrap;
        text-shadow: 0 2px 10px rgba(0,0,0,0.8);
        letter-spacing: 0.02em;
    }

    @media (max-width: 640px) {
        .label {
            font-size: 13px;
            white-space: normal;
            display: inline-block;
            max-width: 140px;
            text-align: center;
            line-height: 1.3;
        }
    }
</style>

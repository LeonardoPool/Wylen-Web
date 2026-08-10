<script lang="ts">
    import { onMount } from 'svelte';
    import type { GraphNode } from './types';
    import { getPhotoForNode, getBestImageUrl } from './pexels';
    import type { PexelsPhoto } from './pexels';

    let { node }: { node: GraphNode } = $props();

    let photo = $state<PexelsPhoto | null>(null);
    let imageUrl = $state('');
    let imageLoaded = $state(false);

    onMount(() => {
        if (node.queries && node.queries.length > 0) {
            getPhotoForNode(node.queries).then(p => {
                if (p) {
                    photo = p;
                    // Request 300px target size for grid layout sharpness
                    imageUrl = getBestImageUrl(p, 150);
                }
            });
        }
    });
</script>

<div class="flow-image-card" style="--bg-color: {node.color || '#333'}">
    {#if imageUrl}
        <img
            src={imageUrl}
            alt={photo?.alt || ''}
            loading="lazy"
            class="flow-img"
            class:loaded={imageLoaded}
            onload={() => imageLoaded = true}
        />
    {/if}
</div>

<style>
    .flow-image-card {
        width: 100%;
        aspect-ratio: 1 / 1;
        background: var(--bg-color);
        border-radius: 12px;
        overflow: hidden;
        position: relative;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .flow-image-card:hover {
        transform: scale(1.03);
    }

    .flow-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0;
        transition: opacity 0.6s ease;
        border-radius: 12px;
    }

    .flow-img.loaded {
        opacity: 1;
    }
</style>

/**
 * Pexels API Service for Graph Node Images
 * Fetches images dynamically based on conceptual search queries per node.
 */

const PEXELS_API_KEY = 'cxXI16SaeuxL1n78lx5BtOtDVoQJOfL2rW4QycWr57YnRcMA3rSdjxOf';
const PEXELS_BASE_URL = 'https://api.pexels.com/v1/search';

export interface PexelsPhoto {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    src: {
        original: string;
        large2x: string;
        large: string;
        medium: string;
        small: string;
        portrait: string;
        landscape: string;
        tiny: string;
    };
    alt: string;
}

interface PexelsResponse {
    total_results: number;
    page: number;
    per_page: number;
    photos: PexelsPhoto[];
}

// Track used photo IDs globally to avoid duplicates across nodes
const usedPhotoIds = new Set<number>();

// Cache fetched results to avoid redundant API calls
const queryCache = new Map<string, PexelsPhoto[]>();

/**
 * Fetch photos from Pexels for a given query.
 * Results are cached and filtered for duplicates.
 */
async function fetchPhotos(query: string, perPage: number = 15, page: number = 1): Promise<PexelsPhoto[]> {
    const cacheKey = `${query}_${perPage}_${page}`;

    if (queryCache.has(cacheKey)) {
        return queryCache.get(cacheKey)!;
    }

    try {
        const params = new URLSearchParams({
            query,
            per_page: String(perPage),
            page: String(page),
            orientation: 'square'
        });

        const response = await fetch(`${PEXELS_BASE_URL}?${params}`, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });

        if (!response.ok) {
            console.warn(`Pexels API returned ${response.status} for query: "${query}"`);
            return [];
        }

        const data: PexelsResponse = await response.json();
        queryCache.set(cacheKey, data.photos);
        return data.photos;
    } catch (error) {
        console.warn(`Failed to fetch from Pexels for query: "${query}"`, error);
        return [];
    }
}

/**
 * Get a unique photo for a node image, trying multiple queries if needed.
 * Ensures no photo is reused across nodes.
 */
export async function getPhotoForNode(queries: string[]): Promise<PexelsPhoto | null> {
    for (const query of queries) {
        const photos = await fetchPhotos(query);
        
        // Find first photo not already used
        const available = photos.filter(p => !usedPhotoIds.has(p.id));
        
        if (available.length > 0) {
            // Pick a random photo from available results for visual diversity
            const photo = available[Math.floor(Math.random() * Math.min(available.length, 5))];
            usedPhotoIds.add(photo.id);
            return photo;
        }
    }

    // If all queries exhausted, try with page 2
    for (const query of queries) {
        const photos = await fetchPhotos(query, 15, 2);
        const available = photos.filter(p => !usedPhotoIds.has(p.id));
        
        if (available.length > 0) {
            const photo = available[Math.floor(Math.random() * Math.min(available.length, 5))];
            usedPhotoIds.add(photo.id);
            return photo;
        }
    }

    return null;
}

/**
 * Get the best image URL for a given container size.
 * Picks the smallest resolution that still exceeds the container size for sharpness.
 */
export function getBestImageUrl(photo: PexelsPhoto, containerSize: number): string {
    // For retina displays, we want at least 2x the container size
    const targetSize = containerSize * 2;

    if (targetSize <= 200) return photo.src.small;
    if (targetSize <= 350) return photo.src.medium;
    if (targetSize <= 940) return photo.src.large;
    return photo.src.large2x;
}

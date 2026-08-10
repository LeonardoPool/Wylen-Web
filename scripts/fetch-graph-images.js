import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PEXELS_API_KEY = 'cxXI16SaeuxL1n78lx5BtOtDVoQJOfL2rW4QycWr57YnRcMA3rSdjxOf';

const queries = [
    { query: 'minimalist architecture', count: 5, category: 'editorial' },
    { query: 'nature macro', count: 5, category: 'editorial' },
    { query: 'kinfolk still life', count: 10, category: 'editorial' }, // 70% editorial (total 20)
    { query: 'stone texture macro', count: 3, category: 'texture' },
    { query: 'paper texture', count: 3, category: 'texture' }, // 20% texture (total 6)
    { query: 'abstract geometry', count: 4, category: 'abstract' } // 10% abstract (total 4)
]; // total ~30 images

async function fetchImages() {
    let allImages = [];

    for (const q of queries) {
        console.log(`Fetching ${q.count} images for query: "${q.query}"...`);
        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(q.query)}&per_page=${q.count}`, {
                headers: {
                    Authorization: PEXELS_API_KEY
                }
            });

            if (!response.ok) {
                console.error(`Error fetching ${q.query}: ${response.statusText}`);
                continue;
            }

            const data = await response.json();
            
            const processedImages = data.photos.map(photo => ({
                id: photo.id,
                url: photo.src.medium, // use medium size to avoid huge downloads
                largeUrl: photo.src.large,
                alt: photo.alt || `Pexels image ${photo.id}`,
                category: q.category
            }));

            allImages = allImages.concat(processedImages);
        } catch (error) {
            console.error(`Failed to fetch ${q.query}:`, error);
        }
    }

    // Shuffle the images to mix them up when reading
    allImages = allImages.sort(() => Math.random() - 0.5);

    const dataDir = path.resolve(__dirname, '../src/lib/data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    const outputPath = path.resolve(dataDir, 'graph-images.json');
    fs.writeFileSync(outputPath, JSON.stringify(allImages, null, 2));
    
    console.log(`Successfully fetched and saved ${allImages.length} images to ${outputPath}`);
}

fetchImages();

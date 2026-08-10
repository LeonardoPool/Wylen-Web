import type { GraphNode } from './types';

export const initialNodes: GraphNode[] = [
    // Question 1 (Top Left)
    {
        id: 'q1',
        type: 'text',
        text: '¿Qué vale la pena construir?',
        positions: {
            desktop: { x: 15, y: 45 },
            tablet: { x: 20, y: 20 },
            mobile: { x: 20, y: 20 }
        }
    },
    {
        id: 'i1_1',
        type: 'image',
        parentId: 'q1',
        size: 70,
        color: 'linear-gradient(135deg, #8B7355, #6B5B45)',
        queries: [
            'aerial view forest',
            'nature texture bark',
            'moss close up detail'
        ],
        positions: {
            desktop: { x: 5, y: 30 },
            tablet: { x: 10, y: 30 },
            mobile: { x: 10, y: 10 }
        }
    },
    {
        id: 'i1_2',
        type: 'image',
        parentId: 'q1',
        size: 50,
        color: 'linear-gradient(135deg, #5B7F5B, #3D5A3D)',
        queries: [
            'green leaves close up',
            'botanical detail macro',
            'plant texture'
        ],
        positions: {
            desktop: { x: 22, y: 20 },
            tablet: { x: 40, y: 30 },
            mobile: { x: 38, y: 15 }
        }
    },
    {
        id: 'i1_3',
        type: 'image',
        parentId: 'q1',
        size: 45,
        color: 'linear-gradient(135deg, #A08060, #806040)',
        queries: [
            'clay pottery hands',
            'ceramic craftsmanship',
            'handmade pottery detail'
        ],
        positions: {
            desktop: { x: 8, y: 60 },
            tablet: { x: 30, y: 10 },
            mobile: { x: 10, y: 30 }
        }
    },
    {
        id: 'i1_4',
        type: 'image',
        parentId: 'q1',
        size: 55,
        color: 'linear-gradient(135deg, #C4956A, #A07848)',
        queries: [
            'sand dunes aerial',
            'desert landscape texture',
            'earth terrain abstract'
        ],
        positions: {
            desktop: { x: 25, y: 65 },
            tablet: { x: 10, y: 45 },
            mobile: { x: 32, y: 32 }
        }
    },

    // Question 2 (Top Right)
    {
        id: 'q2',
        type: 'text',
        text: '¿Qué podríamos simplificar?',
        positions: {
            desktop: { x: 65, y: 15 },
            tablet: { x: 70, y: 15 },
            mobile: { x: 80, y: 22 }
        }
    },
    {
        id: 'i2_1',
        type: 'image',
        parentId: 'q2',
        size: 80,
        color: 'linear-gradient(135deg, #D4C4A0, #B8A880)',
        queries: [
            'wheat field golden',
            'golden grass field',
            'grain field close up'
        ],
        positions: {
            desktop: { x: 75, y: 28 },
            tablet: { x: 85, y: 25 },
            mobile: { x: 62, y: 16 }
        }
    },
    {
        id: 'i2_2',
        type: 'image',
        parentId: 'q2',
        size: 50,
        color: 'linear-gradient(135deg, #6B8E6B, #4A6B4A)',
        queries: [
            'minimal concrete architecture',
            'brutalist architecture detail',
            'concrete wall texture'
        ],
        positions: {
            desktop: { x: 52, y: 8 },
            tablet: { x: 55, y: 25 },
            mobile: { x: 90, y: 12 }
        }
    },
    {
        id: 'i2_3',
        type: 'image',
        parentId: 'q2',
        size: 60,
        color: 'linear-gradient(135deg, #7090A0, #506878)',
        queries: [
            'aerial ocean waves',
            'water surface texture',
            'sea foam aerial'
        ],
        positions: {
            desktop: { x: 70, y: 5 },
            tablet: { x: 85, y: 10 },
            mobile: { x: 88, y: 35 }
        }
    },

    // Question 3 (Bottom Left)
    {
        id: 'q3',
        type: 'text',
        text: '¿Qué debería suceder automáticamente?',
        positions: {
            desktop: { x: 88, y: 45 },
            tablet: { x: 80, y: 60 },
            mobile: { x: 20, y: 78 }
        }
    },
    {
        id: 'i3_1',
        type: 'image',
        parentId: 'q3',
        size: 60,
        color: 'linear-gradient(135deg, #8B6B4F, #6B4B30)',
        queries: [
            'woven textile close up',
            'fabric texture macro',
            'natural fiber weaving'
        ],
        positions: {
            desktop: { x: 78, y: 55 },
            tablet: { x: 65, y: 70 },
            mobile: { x: 8, y: 68 }
        }
    },
    {
        id: 'i3_2',
        type: 'image',
        parentId: 'q3',
        size: 75,
        color: 'linear-gradient(135deg, #607050, #405030)',
        queries: [
            'river aerial view',
            'winding river landscape',
            'mountain stream drone'
        ],
        positions: {
            desktop: { x: 96, y: 30 },
            tablet: { x: 90, y: 75 },
            mobile: { x: 36, y: 72 }
        }
    },
    {
        id: 'i3_3',
        type: 'image',
        parentId: 'q3',
        size: 45,
        color: 'linear-gradient(135deg, #90A0B0, #708090)',
        queries: [
            'abstract stone texture',
            'marble texture detail',
            'natural stone pattern'
        ],
        positions: {
            desktop: { x: 94, y: 65 },
            tablet: { x: 95, y: 50 },
            mobile: { x: 15, y: 90 }
        }
    },

    // Question 4 (Bottom Right)
    {
        id: 'q4',
        type: 'text',
        text: '¿Qué será posible mañana?',
        positions: {
            desktop: { x: 75, y: 85 },
            tablet: { x: 30, y: 85 },
            mobile: { x: 80, y: 80 }
        }
    },
    {
        id: 'i4_1',
        type: 'image',
        parentId: 'q4',
        size: 65,
        color: 'linear-gradient(135deg, #4A6880, #2E4A60)',
        queries: [
            'aurora borealis sky',
            'northern lights landscape',
            'starry night sky'
        ],
        positions: {
            desktop: { x: 65, y: 75 },
            tablet: { x: 15, y: 75 },
            mobile: { x: 62, y: 72 }
        }
    },
    {
        id: 'i4_2',
        type: 'image',
        parentId: 'q4',
        size: 55,
        color: 'linear-gradient(135deg, #C09060, #A07040)',
        queries: [
            'sunrise mountain landscape',
            'golden hour landscape',
            'dawn light mountain'
        ],
        positions: {
            desktop: { x: 85, y: 75 },
            tablet: { x: 45, y: 75 },
            mobile: { x: 92, y: 76 }
        }
    },
    {
        id: 'i4_3',
        type: 'image',
        parentId: 'q4',
        size: 50,
        color: 'linear-gradient(135deg, #6080A0, #405878)',
        queries: [
            'ice glacier detail',
            'frozen lake aerial',
            'crystal ice texture'
        ],
        positions: {
            desktop: { x: 85, y: 95 },
            tablet: { x: 25, y: 95 },
            mobile: { x: 65, y: 92 }
        }
    },
    {
        id: 'i4_4',
        type: 'image',
        parentId: 'q4',
        size: 40,
        color: 'linear-gradient(135deg, #907060, #705040)',
        queries: [
            'volcanic rock texture',
            'lava rock close up',
            'geological formation'
        ],
        positions: {
            desktop: { x: 65, y: 92 },
            tablet: { x: 10, y: 90 },
            mobile: { x: 88, y: 92 }
        }
    }
];

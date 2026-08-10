export type Breakpoint = 'desktop' | 'tablet' | 'mobile';

export interface Position {
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
}

export interface NodePositions {
    desktop: Position;
    tablet: Position;
    mobile: Position;
}

export interface GraphNode {
    id: string;
    type: 'text' | 'image';
    positions: NodePositions;
    // For text nodes
    text?: string;
    // For image nodes (children)
    parentId?: string; // ID of the parent text node it connects to
    size?: number; // Size in px
    color?: string; // Placeholder color (used as background while image loads)
    // Pexels search queries for this image node
    queries?: string[];
}

export interface ComputedNode extends GraphNode {
    currentX: number;
    currentY: number;
}

import type { Breakpoint, GraphNode, ComputedNode } from './types';

export function getBreakpoint(width: number): Breakpoint {
    if (width <= 640) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
}

export function computePositions(nodes: GraphNode[], breakpoint: Breakpoint): ComputedNode[] {
    return nodes.map(node => ({
        ...node,
        currentX: node.positions[breakpoint].x,
        currentY: node.positions[breakpoint].y
    }));
}

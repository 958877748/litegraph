import { LGraphNode } from "@gausszhou/litegraph-core";

export var InputConfig = {
    color_off: "#F44336",
}

export function findNextAvailableId<T extends LGraphNode>(
    context: T,
    type: { new(): T }
): number {
    const usedIds = new Set<number>();
    for (const node of context.graph._nodes) {
        if (node instanceof type) {
            usedIds.add(node.properties.id);
        }
    }
    let id = 1;
    while (usedIds.has(id)) id++;
    return id;
}
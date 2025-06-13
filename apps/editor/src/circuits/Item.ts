import { LGraphNode, LGraph } from "@gausszhou/litegraph-core";

function findNextAvailableId(graph: LGraph): number {

}

export default class Item extends LGraphNode {
    static title = "Item";
    static desc = "Item";
    static shape = 1;
    static title_color = "#012";
    static registerType = "rpg/item";
    static filter = "is_filter";

    constructor() {
        super();
        // 添加输出端口 名字是 item 类型为 "Item"
        this.addOutput("item", "Item");

        this.properties = {
            id: -1,
            name: '',
            description: '',
        };
    }

    findNextAvailableId(): number {
        const usedIds = new Set<number>();
        for (const node of this.graph._nodes) {
            if (node instanceof Item) {
                usedIds.add(node.properties.id);
            }
        }
        // 从1开始找未用的id
        let id = 1;
        while (usedIds.has(id)) id++;
        return id;
    }

    onAdded() {
        if (this.properties.id === -1) {
            // 如果id是-1，说明是新建的item，需要分配一个新的id
            this.properties.id = this.findNextAvailableId();
            console.log(`Assigned new ID: ${this.properties.id}`);
        }
    }
}

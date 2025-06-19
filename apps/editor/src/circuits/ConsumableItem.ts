import { LGraphNode } from "@gausszhou/litegraph-core";

enum ConsumableType {
    单体回复 = 0,
    全体回复 = 1,
    单体复活加回复 = 2,
}

/**
 * 消耗品
 */
export default class ConsumableItem extends LGraphNode {
    static title = "ConsumableItem";
    static desc = "ConsumableItem";
    static shape = 1;
    static title_color = "#012";
    static registerType = "rpg/ConsumableItem";
    static filter = "is_filter";

    properties = {
        id: -1,
        name: '',
        description: '',
        type: ConsumableType.单体回复,
        price: 0,
        hp: 0,
        mp: 0,
    };

    constructor() {
        super();

        this.addOutput("Output", "EquipItem");

        this.addWidget("text", "ID", this.properties.id, "id").disabled = true;
        this.addWidget("text", "name", this.properties.name, "name");
        this.addWidget("text", "desc", this.properties.description, "description");

        this.addWidget("combo", "type", ConsumableType[this.properties.type], "type", {
            values: Object.keys(ConsumableType).filter(key => isNaN(Number(key))),
            enum: ConsumableType,
        });

        this.addWidget("text", "price", this.properties.price, "price").options.text2int = true;
        this.addWidget("text", "hp", this.properties.hp, "hp").options.text2int = true;
        this.addWidget("text", "mp", this.properties.mp, "mp").options.text2int = true;
    }

    findNextAvailableId(): number {
        const usedIds = new Set<number>();
        for (const node of this.graph._nodes) {
            if (node instanceof ConsumableItem) {
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
            const newId = this.findNextAvailableId();
            this.setProperty('id', newId);
        }
    }

    onConfigure(info: any) {
        this.size = this.computeSize()
    }
}

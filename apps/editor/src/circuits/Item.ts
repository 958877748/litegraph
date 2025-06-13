import { LGraphNode, LGraph } from "@gausszhou/litegraph-core";

export default class Item extends LGraphNode {
    static title = "Item";
    static desc = "Item";
    static shape = 1;
    static title_color = "#012";
    static registerType = "rpg/item";
    static filter = "is_filter";

    properties = {
        id: -1,
        name: '',
        description: '',
    };

    constructor(id?: number, name?: string, description?: string) {
        super();
        if (id) {
            this.properties.id = id
        }
        if (name) {
            this.properties.name = name
        }
        if (description) {
            this.properties.description = description
        }

        // 添加输出端口 名字是 item 类型为 "Item"
        this.addOutput("item", "Item");

        this.addWidget(
            "text",         // 控件类型
            "name",           // 显示名称
            this.properties.name, // 初始值
            "name",           // 绑定到 properties.name
        );

        this.addWidget(
            "text",         // 控件类型
            "desc",           // 显示名称
            this.properties.description, // 初始值
            "description",           // 绑定到 properties.description
        );
    }

    onConfigure(info: any) {
        this.size = this.computeSize()
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
            console.log(`Item Assigned new ID: ${this.properties.id}`);
        }
    }
}

import { LGraphNode } from "@gausszhou/litegraph-core";

export default class TaskItem extends LGraphNode {
    static title = "TaskItem";
    static desc = "TaskItem";
    static shape = 1;
    static title_color = "#012";
    static registerType = "rpg/TaskItem";
    static filter = "is_filter";

    properties = {
        id: -1,
        name: '',
        description: '',
    };

    constructor() {
        super();

        // 添加输出端口 名字 类型
        this.addOutput("Output", "TaskItem");

        // 添加只读的ID显示控件
        this.addWidget(
            "text",         // 控件类型
            "ID",           // 显示名称
            this.properties.id, // 初始值
            "id",           // 绑定到 properties.id
        ).disabled = true;

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

    findNextAvailableId(): number {
        const usedIds = new Set<number>();
        for (const node of this.graph._nodes) {
            if (node instanceof TaskItem) {
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

import { LGraphNode } from "@gausszhou/litegraph-core";

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
        targetType: '单体目标'
    };

    constructor() {
        super();

        // 添加输出端口 名字 类型
        this.addOutput("Output", "EquipItem");

        // 添加只读的ID显示控件
        this.addWidget(
            "text",         // 控件类型
            "ID",           // 显示名称
            this.properties.id, // 初始值
            "id",           // 绑定到 properties.id
        );

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

        // 添加目标类型选择控件
        this.addWidget(
            "combo",         // 使用下拉框控件
            "target",      // 显示名称
            this.properties.targetType, // 初始值
            "targetType",    // 绑定到 properties.targetType
            {                // 配置选项
                values: [
                    "单体目标",
                    "全体我方目标"
                ]
            }
        );
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

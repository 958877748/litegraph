import { IComboWidget, LGraph, LGraphNode } from "@gausszhou/litegraph-core";

export enum EquipType {
    Weapon = 10,
    Helmet = 11,
    BodyArmour = 12,
    Shield = 13,
    Jewellery = 14
}

export default class EquipItem extends LGraphNode {
    static title = "EquipItem";
    static desc = "EquipItem";
    static shape = 1;
    static title_color = "#012";
    static registerType = "rpg/EquipItem";
    static filter = "is_filter";

    properties = {
        id: -1,
        name: '',
        description: '',
        type: EquipType.Weapon,
        price: 0,
    };

    type_widget: IComboWidget

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

        // 添加装备类型选择控件
        this.type_widget = this.addWidget(
            "combo",         // 使用下拉框控件
            "type",      // 显示名称
            EquipType[this.properties.type], // 初始值
            (value: string) => {
                this.properties.type = EquipType[value]
            },
            {   // 配置选项             
                values: Object.keys(EquipType).filter(key => isNaN(Number(key)))
            }
        );

        this.addWidget("number", "price", this.properties.price,
            (value: number) => {
                this.properties.price = Math.round(value)
            }, { precision: 0, step: 1, min: 0 });
    }

    findNextAvailableId(): number {
        const usedIds = new Set<number>();
        for (const node of this.graph._nodes) {
            if (node instanceof EquipItem) {
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
        this.type_widget.value = EquipType[info.properties.type]
        this.size = this.computeSize()
    }
}

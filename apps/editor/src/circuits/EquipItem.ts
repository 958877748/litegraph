import { IComboWidget, INumberWidget, ITextWidget, LGraph, LGraphCanvas, LGraphNode, Vector2 } from "@gausszhou/litegraph-core";

export enum EquipType {
    Weapon = 10,
    Helmet = 11,
    BodyArmour = 12,
    Shield = 13,
    Jewellery = 14
}

export enum CharClass {
    /**
     * 通用
     */
    Common = 0,
    /**
     * 剑士
     */
    Swordsman = 1,
    /**
     * 魔法师
     */
    Mage = 2,
    /**
     * 战士
     */
    Warrior = 3,
    /**
     * 箭手
     */
    Archer = 4
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
        class: CharClass.Common,
        hp: 0,
        mp: 0,
        attack: 0,
        defense: 0,
        speed: 0
    };

    type_widget: IComboWidget
    class_widget: IComboWidget

    constructor() {
        super();
        this.addOutput("Output", "EquipItem");
        this.addWidget("text", "ID", this.properties.id, "id").disabled = true;
        this.addWidget("text", "name", this.properties.name, "name");
        this.addWidget("text", "desc", this.properties.description, "description");

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

        this.class_widget = this.addWidget(
            "combo",         // 使用下拉框控件
            "class",      // 显示名称
            CharClass[this.properties.class], // 初始值
            (value: string) => {
                this.properties.class = CharClass[value]
            },
            {   // 配置选项             
                values: Object.keys(CharClass).filter(key => isNaN(Number(key)))
            }
        );
        this.addWidget('text', 'price', `${this.properties.price}`, 'price').options.text2int = true;
        this.addWidget('text', 'hp', this.properties.hp, 'hp').options.text2int = true;
        this.addWidget('text', 'mp', this.properties.mp, 'mp').options.text2int = true;
        this.addWidget('text', 'attack', this.properties.attack, 'attack').options.text2int = true;
        this.addWidget('text', 'defense', this.properties.defense, 'defense').options.text2int = true;
        this.addWidget('text', 'speed', this.properties.speed, 'speed').options.text2int = true;
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
        this.class_widget.value = CharClass[info.properties.class]
        this.size = this.computeSize()
    }
}

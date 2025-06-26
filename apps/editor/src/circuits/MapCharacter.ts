import { LGraphNode } from "@gausszhou/litegraph-core";

export enum SpriteType {
    玩家 = 0,
    NPC = 1,
    敌人 = 2,
    动物 = 3,
    其他 = 4
}

export default class MapCharacter extends LGraphNode {
    static title = "地图角色";
    static desc = "定义地图上的角色，包含精灵图片和类型";
    static shape = 1;
    static registerType = "rpg/MapCharacter";
    static filter = "is_filter";

    // 配色方案 - 青色系
    static title_color = "#006064";      // 深青色标题栏背景
    static title_text_color = "#FFFFFF";  // 白色标题文字
    static bgcolor = "#E0F7FA";          // 浅青色背景
    static color = "#00838F";            // 青色边框

    properties = {
        id: -1,              // 角色ID
        name: "新角色",      // 角色名称
        sprite: "",          // 精灵图片路径
        type: SpriteType.NPC // 精灵类型
    };

    constructor() {
        super();

        // 添加输出端口
        this.addOutput("MapCharacter", "MapCharacter");
        this.addOutput("OnInteractive");

        // 添加属性控件
        this.addWidget("text", "ID", this.properties.id, "id").disabled = true;
        this.addWidget("text", "名称", this.properties.name, "name");
        
        // 添加精灵图片选择器
        this.addWidget(
            "button",
            "选择精灵图片",
            "选择图片",
            () => this.selectSpriteImage()
        );
        
        // 添加精灵类型选择器
        this.addWidget(
            "combo", 
            "类型", 
            SpriteType[this.properties.type], 
            "type", 
            {
                values: Object.keys(SpriteType).filter(key => isNaN(Number(key))),
                enum: SpriteType
            }
        );
    }

    // 选择精灵图片的方法
    selectSpriteImage() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*'; // 限制只能选择图片文件

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.setProperty('sprite', e.target?.result as string);
                };
                reader.readAsDataURL(file);
            }
            input.remove();
        };

        input.click();
    }

    // 查找下一个可用的ID
    findNextAvailableId(): number {
        const usedIds = new Set<number>();
        for (const node of this.graph._nodes) {
            if (node instanceof MapCharacter) {
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
            // 如果id是-1，说明是新建的角色，需要分配一个新的id
            const newId = this.findNextAvailableId();
            this.setProperty('id', newId);
        }
    }
}

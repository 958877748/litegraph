import { LGraphNode } from "@gausszhou/litegraph-core";
import { findNextAvailableId } from "./NodeSoltConfig";

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

        this.addOutput("MapCharacter", "MapCharacter");
        this.addOutput("OnInteractive");

        this.addWidget(
            "text",
            "ID",
            this.properties.id,
            "id",
        ).disabled = true;

        this.addWidget(
            "text",
            "名称",
            this.properties.name,
            "name"
        );

        this.addWidget(
            "combo",
            "类型",
            SpriteType[this.properties.type],
            "type",
            { enum: SpriteType }
        );
    }

    onAdded() {
        if (this.properties.id === -1) {
            this.setProperty('id', findNextAvailableId(this, MapCharacter));
        }
    }
}

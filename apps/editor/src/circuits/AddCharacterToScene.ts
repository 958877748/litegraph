import { LGraphNode } from "@gausszhou/litegraph-core";

export default class AddCharacterToScene extends LGraphNode {
    static title = "添加角色到场景";
    static desc = "向游戏场景中添加一个新角色";
    static shape = 1;
    static registerType = "rpg/AddCharacterToScene";
    static filter = "is_filter";

    // 配色方案 - 橙色系
    static title_color = "#E65100";      // 深橙色标题栏背景
    static title_text_color = "#FFFFFF";  // 白色标题文字
    static bgcolor = "#FFF3E0";          // 浅橙色背景
    static color = "#BF360C";            // 深橙色边框

    properties = {
        x: 0,                  // X坐标
        y: 0,                  // Y坐标
        direction: "下",     // 初始朝向
    };

    constructor() {
        super();

        this.addInput("Start");
        this.addInput("MapCharacter", "MapCharacter");
        this.addInput("Scene", "Scene");

        this.addWidget("text", "X坐标", this.properties.x, "x").options.text2int = true;
        this.addWidget("text", "Y坐标", this.properties.y, "y").options.text2int = true;

        this.addWidget("combo", "初始朝向", this.properties.direction, "direction", {
            values: ["上", "下", "左", "右"]
        });
    }
}
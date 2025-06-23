import { LGraphNode } from "@gausszhou/litegraph-core";

export default class PositionTrigger extends LGraphNode {
    static title = "位置触发器";
    static desc = "当玩家进入指定区域时触发后续事件";
    static shape = 1;
    static registerType = "rpg/PositionTrigger";
    static filter = "is_filter";

    // 配色方案 - 橙色系
    static title_color = "#E65100";     // 深橙色标题栏背景
    static title_text_color = "#FFFFFF";  // 白色标题文字
    static bgcolor = "#FFF3E0";          // 浅橙色背景
    static color = "#F57C00";            // 橙色边框

    properties = {
        // 触发位置列表 用固定格式的字符串写 
        // 例如："x y|x y"
        positions: 'x y|x y',
    };

    constructor() {
        super();

        this.addInput("CheckPosition", "event");
        this.addOutput("OnEnterPosition", "event");
        this.addWidget("text", "触发位置", this.properties.positions, "positions");
    }
}

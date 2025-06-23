import { LGraphNode } from "@gausszhou/litegraph-core";

export default class ModifyGold extends LGraphNode {
    static title = "修改金币";
    static desc = "修改玩家的金币数量";
    static shape = 1;
    static registerType = "rpg/ModifyGold";
    static filter = "is_filter";

    // 配色方案 - 金色系
    static title_color = "#FFD700";      // 金色标题栏背景
    static title_text_color = "#000000";  // 黑色标题文字
    static bgcolor = "#FFFACD";          // 浅金色背景
    static color = "#FFC000";            // 深金色边框

    properties = {
        gold: 0,  // 默认金币数量
    };

    constructor() {
        super();

        // 添加输入端口
        this.addInput("执行");

        // 添加金币数量输入框
        this.addWidget("text", "金币数量", this.properties.gold, "gold").options.text2int = true;
    }
}

import { LGraphNode } from "@gausszhou/litegraph-core";

export default class RemoveItemFromInventory extends LGraphNode {
    static title = "移除物品";
    static desc = "从玩家背包中移除指定物品";
    static shape = 1;
    static registerType = "rpg/RemoveItemFromInventory";
    static filter = "is_filter";

    // 配色方案 - 红色系
    static title_color = "#D32F2F";        // 深红色标题栏背景
    static title_text_color = "#FFFFFF";    // 白色标题文字
    static bgcolor = "#FFCDD2";            // 浅红色背景
    static color = "#C62828";              // 深红色边框

    properties = {
        count: 1
    }

    constructor() {
        super()
        this.addInput('执行')
        this.addInput('物品', '物品')
        this.addWidget('text', '数量', this.properties.count, 'count').options.text2int = true
    }
}

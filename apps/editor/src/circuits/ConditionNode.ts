import { LGraphNode } from "@gausszhou/litegraph-core"

export default class ConditionNode extends LGraphNode {
    static title = "条件判断"
    static desc = "根据是否有事件标志执行分支逻辑"
    static shape = 1
    static registerType = "rpg/ConditionNode"
    static filter = "is_filter"

    // 配色方案 - 蓝色系
    static title_color = "#1976D2"      // 深蓝色标题栏背景
    static title_text_color = "#FFFFFF"  // 白色标题文字
    static bgcolor = "#E3F2FD"          // 浅蓝色背景
    static color = "#1565C0"            // 深蓝色边框

    properties = {
        expression: '',
    }

    constructor() {
        super();
        this.addInput("Start", "Event");
        this.addOutput("OnYes");
        this.addOutput("OnNo");

        this.addWidget("text", "表达式", this.properties.expression, "expression");
    }
}

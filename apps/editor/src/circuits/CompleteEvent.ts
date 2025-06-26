import { LGraphNode } from "@gausszhou/litegraph-core";

export default class CompleteEvent extends LGraphNode {
    static title = "完成事件"
    static desc = "标记指定事件为已完成状态"
    static shape = 1
    static registerType = "rpg/CompleteEvent"
    static filter = "is_filter"

    // 配色方案 - 绿色系
    static title_color = "#2E7D32"      // 深绿色标题栏背景
    static title_text_color = "#FFFFFF"  // 白色标题文字
    static bgcolor = "#E8F5E9"          // 浅绿色背景
    static color = "#1B5E20"            // 深绿色边框

    properties = {
        eventId: ""  // 事件ID
    }

    constructor() {
        super()

        this.addInput("Start")
        this.addWidget("text", "事件ID", this.properties.eventId, "eventId").options.text2int = true
    }
}
import { LGraphNode } from "@gausszhou/litegraph-core";

export default class ShowNotification extends LGraphNode {
    static title = "显示通知"
    static desc = "在屏幕上显示一条提示信息"
    static shape = 1
    static registerType = "rpg/ShowNotification"
    static filter = "is_filter"

    // 配色方案 - 蓝色系
    static title_color = "#1976D2"      // 深蓝色标题栏背景
    static title_text_color = "#FFFFFF"  // 白色标题文字
    static bgcolor = "#E3F2FD"          // 浅蓝色背景
    static color = "#1565C0"            // 深蓝色边框

    properties = {
        context: '',
        black: false,
        time: 1
    }

    constructor() {
        super()
        this.addInput('Start')
        this.addOutput('OnEnd')

        this.addWidget('text', '内容', this.properties.context, 'context')
        // 添加切换按钮
        this.addWidget("toggle", "黑色背景", this.properties.black, "black");
        this.addWidget('text', '时间', this.properties.time, 'time').options.text2int = true
        
    }
}

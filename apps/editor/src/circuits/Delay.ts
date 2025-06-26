import { LGraphNode } from "@gausszhou/litegraph-core";

export default class DelayNode extends LGraphNode {
    static title = "延迟"
    static desc = "等待指定的时间后继续执行"
    static shape = 1
    static registerType = "rpg/Delay"
    static filter = "is_filter"

    // 配色方案 - 青色系
    static title_color = "#00838F"      // 深青色标题栏背景
    static title_text_color = "#FFFFFF"  // 白色标题文字
    static bgcolor = "#E0F7FA"          // 浅青色背景
    static color = "#006064"            // 深青色边框

    properties = {
        time: 1
    }

    constructor() {
        super()
        this.addInput('Start')
        this.addOutput('OnEnd')

        this.addWidget('text', '时间', this.properties.time, 'time').options.text2int = true
    }
}
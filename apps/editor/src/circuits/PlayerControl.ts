import { LGraphNode } from "@gausszhou/litegraph-core"

export default class PlayerControl extends LGraphNode {
    static title = "锁定或解锁玩家控制"
    static desc = "剧情中锁定或解锁玩家控制权"
    static shape = 1
    static registerType = "rpg/PlayerControl"
    static filter = "is_filter"

    // 配色方案 - 红色系
    static title_color = "#B71C1C"      // 深红色标题栏背景
    static title_text_color = "#FFFFFF"  // 白色标题文字
    static bgcolor = "#FFCDD2"          // 浅红色背景
    static color = "#8B0000"            // 深红色边框

    properties = {
        lock: true
    };

    getTitle(): string {
        return this.properties.lock ? '锁定玩家控制' : '解锁玩家控制';
    }

    constructor() {
        super();
        this.addInput("执行", "event");
        this.addOutput("完成", "event");

        // 添加切换按钮
        this.addWidget("toggle", "锁定/解锁", this.properties.lock, (value) => {
            this.properties.lock = value;
            this.setDirtyCanvas(true);
        });
    }
}

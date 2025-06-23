import { LGraphNode } from "@gausszhou/litegraph-core";

export default class SceneSwitch extends LGraphNode {
    static title = "切换场景";
    static desc = "切换到指定的游戏场景";
    static shape = 1;
    static registerType = "rpg/SceneSwitch";
    static filter = "is_filter";

    // 配色方案 - 紫色系
    static title_color = "#6A1B9A";     // 深紫色标题栏背景
    static title_text_color = "#FFFFFF";  // 白色标题文字
    static bgcolor = "#F3E5F5";          // 浅紫色背景
    static color = "#7B1FA2";            // 紫色边框

    properties = {
        sceneId: 1,         // 目标场景ID
        fadeInTime: 1.0,     // 淡入时间(秒)
        fadeOutTime: 1.0,   // 淡出时间(秒)
    };


    constructor() {
        super();

        // 添加输入端口
        this.addInput("执行");  // 触发场景切换
        this.addInput("场景", "场景"); // 可选的场景ID输入
    }

    // 当节点被执行时调用
    async onAction(action: any, param: any) {
        try {
            // 触发"切换前"事件
            this.triggerSlot(0, null);

            // 获取场景ID（优先使用输入端口的值）
            const inputSceneId = this.getInputData(1);
            const targetSceneId = inputSceneId !== undefined ? inputSceneId : this.properties.sceneId;

            // 这里应该是实际的场景切换逻辑
            console.log(`正在切换到场景 ${targetSceneId}，淡出时间: ${this.properties.fadeOutTime}s, 淡入时间: ${this.properties.fadeInTime}s`);

            // 模拟异步加载场景
            await new Promise(resolve => setTimeout(resolve, this.properties.fadeOutTime * 1000));

            // 场景加载完成，触发"切换后"事件
            this.triggerSlot(1, { sceneId: targetSceneId });

        } catch (error) {
            console.error("场景切换失败:", error);
        }
    }

    // 当节点被点击时调用
    onExecute() {
        // 如果有连接到场景ID输入端口，则使用输入值更新属性
        const inputSceneId = this.getInputData(1);
        if (inputSceneId !== undefined) {
            this.properties.sceneId = inputSceneId;
        }
    }
}

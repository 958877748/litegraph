import { LGraphNode } from "@gausszhou/litegraph-core";

export default class MoveCharacter extends LGraphNode {
    static title = "移动角色";
    static desc = "控制角色在地图上移动";
    static shape = 1;
    static registerType = "rpg/MoveCharacter";
    static filter = "is_filter";

    // 配色方案 - 紫色系
    static title_color = "#6A1B9A";      // 深紫色标题栏背景
    static title_text_color = "#FFFFFF";  // 白色标题文字
    static bgcolor = "#F3E5F5";          // 浅紫色背景
    static color = "#4A148C";            // 深紫色边框

    properties = {
        axis: "x",  // 默认方向
        distance: 1,         // 默认移动距离
    };

    constructor() {
        super();

        // 添加输入端口
        this.addInput("执行", "event");
        this.addInput("角色", "object");  // 角色对象

        // 添加输出端口
        this.addOutput("结束时");

        // 添加方向选择器
        this.addWidget("combo", "轴", this.properties.axis, "axis", {
            values: [
                "x", "y"
            ]
        });

        // 添加距离输入框
        this.addWidget("text", "距离", this.properties.distance, "distance").options.text2int = true;
    }
}
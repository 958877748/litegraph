import { LGraphNode } from "@gausszhou/litegraph-core";

export default class Say extends LGraphNode {
  static title = "说话";
  static desc = "显示对话内容";
  static shape = 1;
  static registerType = "rpg/Say";
  static filter = "is_filter";

  // 配色方案 - 蓝色系
  static title_color = "#1565C0";      // 深蓝色标题栏背景
  static title_text_color = "#FFFFFF";  // 白色标题文字
  static bgcolor = "#E3F2FD";          // 浅蓝色背景
  static color = "#0D47A1";            // 深蓝色边框

  properties = {
    content: '你好！',  // 默认说话内容
  };

  constructor() {
    super();

    this.addInput("Start");
    this.addInput("MapCharacter", "MapCharacter");

    this.addOutput("OnEnd");

    this.addWidget("text", "内容", this.properties.content, "content", {
      property: "content",
      multiline: true,  // 启用多行
      inputStyle: {      // 自定义输入框样式
        height: '100px',
        minHeight: '100px',
        maxHeight: '200px',
        overflowY: 'auto'
      }
    });
  }
}

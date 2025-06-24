import { LGraphNode } from "@gausszhou/litegraph-core";

export default class ModifyItem extends LGraphNode {
  static title = "修改玩家物品";
  static desc = "添加或删除玩家物品";
  static shape = 1;
  static registerType = "rpg/ModifyItem";
  static filter = "is_filter";

  // 配色方案
  static title_color = "#2E7D32";        // 深绿色标题栏背景
  static title_text_color = "#FFFFFF";    // 白色标题文字
  static bgcolor = "#E8F5E9";            // 浅绿色背景
  static color = "#1B5E20";              // 深绿色边框

  properties = {
    count: 1,        // 数量
  };

  constructor() {
    super();
    this.addInput("Start", "Event");
    this.addInput("物品", "物品");

    this.addWidget("text", "数量", this.properties.count, "count").options.text2int = true;
  }
}
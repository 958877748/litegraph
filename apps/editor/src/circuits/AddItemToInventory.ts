import { LGraphNode } from "@gausszhou/litegraph-core";

export default class AddItemToInventory extends LGraphNode {
  static title = "添加物品到背包";
  static desc = "向玩家背包添加指定物品";
  static shape = 1;
  static registerType = "rpg/AddItemToInventory";
  static filter = "is_filter";

  // 配色方案
  static title_color = "#2E7D32";        // 深绿色标题栏背景
  static title_text_color = "#FFFFFF";    // 白色标题文字
  static bgcolor = "#E8F5E9";            // 浅绿色背景
  static color = "#1B5E20";              // 深绿色边框

  properties = {
    itemId: "",      // 物品ID
    amount: 1,        // 数量
  };

  constructor() {
    super();

    // 添加输入端口
    this.addInput("执行", "event");
    this.addInput("玩家", "object"); // 玩家对象
    this.addInput("物品ID", "string");
    this.addInput("数量", "number");
  }
}
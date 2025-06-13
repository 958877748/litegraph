import { LGraphNode, LGraph } from "@gausszhou/litegraph-core";
import Item from "./Item";

export default class Json2Item extends LGraphNode {
    static title = "Json2Item";
    static desc = "Json2Item";
    static shape = 1;
    static title_color = "#012";
    static registerType = "rpg/json2item";
    static filter = "is_filter";

    constructor() {
        super();

        // 添加文件选择按钮
        this.addWidget(
            "button",         // 控件类型
            "选择JSON文件",      // 显示名称
            "选择文件",          // 按钮文本
            (button) => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json'; // 限制只能选择json文件

                // 创建一个处理文件选择的函数
                const handleFileSelect = (e: Event) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            try {
                                const json = JSON.parse(e.target?.result as string);
                                console.log('选择的JSON文件内容:', json);
                                this.newItems(json.items)
                            } catch (error) {
                                console.error('解析JSON文件失败:', error);
                            }
                        };
                        reader.readAsText(file);
                    }
                    // 清理input元素
                    input.remove();
                };

                // 设置事件处理器
                input.onchange = handleFileSelect;
                input.onerror = () => {
                    console.error('文件选择失败');
                    input.remove();
                };

                // 触发文件选择
                input.click();
            }
        );
    }

    newItems(items: Array<{ id: number, type: number, name: string, description: string }>) {
        items.forEach(v => {
            if (v.type === 30 && v.name && v.description) {
                this.newItem(v.id, v.name, v.description)
            }
        })
    }

    private static nextXPosition = 0; // 用于记录下一个节点的x位置
    private static nodeSpacing = 200; // 节点之间的间距

    newItem(id: number, name: string, description: string) {
        // 创建新的Item节点
        const item = new Item(id, name, description);

        // 设置节点位置
        const x = Json2Item.nextXPosition;
        const y = 200; // 所有节点都放在y=0的位置
        item.pos = [x, y];

        // 更新下一个节点的位置
        Json2Item.nextXPosition += Json2Item.nodeSpacing;

        // 将节点添加到当前画布
        if (this.graph) {
            this.graph.add(item);
        }
    }
}

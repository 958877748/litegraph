import { LGraphNode, LGraph, LiteGraph } from "@gausszhou/litegraph-core";
import TaskItem from "./TaskItem";
import EquipItem from "./EquipItem";

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
        const pos = { x: 0, y: 500 }
        const dt = { x: 220, y: 0 }
        items.forEach(v => {
            // if (v.type === 30 && v.name && v.description) {
            //     this.newTaskItem(v.id, v.name, v.description)
            // }
            if (v.type === 10) {
                this.newEquipItem(v, pos, dt)
            }
        })
    }

    newTaskItem(data: any, pos: { x: number, y: number }, dt: { x: number, y: number }) {
        // 创建新的Item节点
        const item = LiteGraph.createNode(TaskItem)
        item.setProperty('name', data.name)
        item.setProperty('description', data.description)

        // 设置节点位置
        item.pos = [pos.x, pos.y]

        // 更新下一个节点的位置
        pos.x += dt.x
        pos.y += dt.y

        // 将节点添加到当前画布
        this.graph.add(item)
    }

    newEquipItem(data: any, pos: { x: number, y: number }, dt: { x: number, y: number }) {
        const node = LiteGraph.createNode(EquipItem)
        node.setProperty('name', data.name)
        node.setProperty('description', data.description)
        node.setProperty('price', data.price)
        node.setProperty('class', data.requirements[1])
        let index = 2
        do {
            let type = data.requirements[index]
            let value = data.requirements[index + 1]
            switch (type) {
                case 2:
                    node.setProperty('hp', value)
                    break;
                case 4:
                    node.setProperty('mp', value)
                    break;
                case 6:
                    node.setProperty('attack', value)
                    break;
                case 7:
                    node.setProperty('defense', value)
                    break;
                case 8:
                    node.setProperty('speed', value)
                    break;
                default:
                    console.error('unkonw type', type)
                    break;
            }
            index += 3
        } while (data.requirements.length > index);
        node.pos = [pos.x, pos.y]
        pos.x += dt.x
        pos.y += dt.y
        this.graph.add(node)
    }
}

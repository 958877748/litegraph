import { LGraphNode } from "@gausszhou/litegraph-core"

export default class TaskItem extends LGraphNode {
    static title = "任务物品"
    static desc = "定义游戏中的任务物品"
    static shape = 1
    static registerType = "rpg/TaskItem"
    static filter = "is_filter"

    // 配色方案 - 橙色系
    static title_color = "#E65100"      // 深橙色标题栏背景
    static title_text_color = "#FFFFFF"  // 白色标题文字
    static bgcolor = "#FFF3E0"          // 浅橙色背景
    static color = "#BF360C"            // 深橙色边框

    properties = {
        id: -1,
        name: '',
        description: ''
    }

    constructor() {
        super()
        this.addOutput("配置", "物品,任务物品")
        this.addWidget("text", "ID", this.properties.id, "id").disabled = true
        this.addWidget("text", "名称", this.properties.name, "name")
        this.addWidget("text", "描述", this.properties.description, "description", {
            multiline: true,
            inputStyle: {
                height: '60px'
            }
        })
    }

    findNextAvailableId(): number {
        const usedIds = new Set<number>();
        for (const node of this.graph._nodes) {
            if (node instanceof TaskItem) {
                usedIds.add(node.properties.id)
            }
        }
        // 从1开始找未用的id
        let id = 1
        while (usedIds.has(id)) id++
        return id
    }

    onAdded() {
        if (this.properties.id === -1) {
            // 如果id是-1，说明是新建的item，需要分配一个新的id
            const newId = this.findNextAvailableId()
            this.setProperty('id', newId)
        }
    }

    onConfigure() {
        this.size = this.computeSize()
    }
}

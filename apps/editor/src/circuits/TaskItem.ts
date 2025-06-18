import { LGraphNode } from "@gausszhou/litegraph-core"

export default class TaskItem extends LGraphNode {
    static title = "TaskItem"
    static desc = "TaskItem"
    static shape = 1
    static title_color = "#012"
    static registerType = "rpg/TaskItem"
    static filter = "is_filter"

    properties = {
        id: -1,
        name: '',
        description: ''
    }

    constructor() {
        super()
        this.addOutput("Output", "TaskItem")
        this.addWidget("text", "ID", this.properties.id, "id",).disabled = true
        this.addWidget("text", "name", this.properties.name, "name")
        this.addWidget("text", "desc", this.properties.description, "description")
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

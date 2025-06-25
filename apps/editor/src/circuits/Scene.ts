import { LGraphNode, SerializedLGraphNode } from "@gausszhou/litegraph-core";

export default class Scene extends LGraphNode {
    static title = "场景";
    static desc = "游戏场景节点，管理场景初始化和配置";
    static shape = 1;
    static registerType = "rpg/Scene";
    static filter = "is_filter";

    // 配色方案 - 蓝色系
    static title_color = "#0D47A1";      // 深蓝色标题栏背景
    static title_text_color = "#FFFFFF";  // 白色标题文字
    static bgcolor = "#E3F2FD";          // 浅蓝色背景
    static color = "#1565C0";            // 深蓝色边框

    properties = {
        id: -1,              // 场景ID
        name: "新场景",      // 场景名称
    };

    constructor() {
        super();

        // 添加输入端口
        this.addInput("地图", "object");  // 地图对象

        // 添加输出端口
        this.addOutput("OnStart", "event");
        this.addOutput("OnUpdate");  // 游戏开发中的update循环

        // 添加属性控件
        this.addWidget("text", "ID", this.properties.id, "id").disabled = true;
        this.addWidget("text", "名称", this.properties.name, "name");
    }

    // 查找下一个可用的场景ID
    findNextAvailableId(): number {
        const usedIds = new Set<number>();
        for (const node of this.graph._nodes) {
            if (node instanceof Scene) {
                usedIds.add(node.properties.id);
            }
        }
        // 从1开始找未用的id
        let id = 1;
        while (usedIds.has(id)) id++;
        return id;
    }

    onAdded() {
        if (this.properties.id === -1) {
            // 如果id是-1，说明是新建的场景，需要分配一个新的id
            const newId = this.findNextAvailableId();
            this.setProperty('id', newId);
        }
    }

    onConfigure(o: SerializedLGraphNode): void {
        this.size = this.computeSize();
    }
}
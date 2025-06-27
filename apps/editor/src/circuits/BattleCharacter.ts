import { LGraphNode } from "@gausszhou/litegraph-core";

export enum CharacterClass {
    通用 = 0,
    剑士 = 1,
    魔法师 = 2,
    战士 = 3,
    弓箭手 = 4
}

export default class BattleCharacter extends LGraphNode {
    static title = "战斗角色";
    static desc = "定义战斗角色的属性";
    static shape = 1;
    static registerType = "rpg/BattleCharacter";

    static title_color = "#4A148C";      // 紫色标题栏背景
    static title_text_color = "#FFFFFF";  // 白色标题文字
    static bgcolor = "#E8EAF6";          // 浅紫色背景
    static color = "#5E35B1";            // 紫色边框

    properties = {
        spriteId: 60,        // 精灵/模型ID
        classId: CharacterClass.剑士, // 职业ID
        level: 1,           // 等级
        baseExp: 0,         // 基础经验值
        maxHp: 25,          // 最大生命值
        currentHp: 25,      // 当前生命值
        maxMp: 9,           // 最大魔法值
        currentMp: 9,       // 当前魔法值
        attack: 15,         // 攻击力
        defense: 12,        // 防御力
        speed: 9,           // 速度
        skills: '',         // 技能
    };

    constructor() {
        super();

        this.addOutput("BattleCharacter", "BattleCharacter");

        this.addWidget(
            "number",
            "精灵ID",
            this.properties.spriteId,
            "spriteId"
        );

        this.addWidget(
            "combo",
            "职业",
            CharacterClass[this.properties.classId],
            "classId",
            { enum: CharacterClass }
        );

        this.addWidget(
            "number",
            "等级",
            this.properties.level,
            "level"
        );

        this.addWidget(
            "number",
            "经验值",
            this.properties.baseExp,
            "baseExp"
        );

        this.addWidget(
            "number",
            "最大生命",
            this.properties.maxHp,
            "maxHp"
        );

        this.addWidget(
            "number",
            "当前生命",
            this.properties.currentHp,
            "currentHp"
        );

        this.addWidget(
            "number",
            "最大魔法",
            this.properties.maxMp,
            "maxMp"
        );

        this.addWidget(
            "number",
            "当前魔法",
            this.properties.currentMp,
            "currentMp"
        );

        this.addWidget(
            "number",
            "攻击力",
            this.properties.attack,
            "attack"
        );

        this.addWidget(
            "number",
            "防御力",
            this.properties.defense,
            "defense"
        );

        this.addWidget(
            "number",
            "速度",
            this.properties.speed,
            "speed"
        );
    }
}
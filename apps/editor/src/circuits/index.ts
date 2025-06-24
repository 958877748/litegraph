import LED from "./LED";
import Oscillator from "./Oscillator";
import TaskItem from "./TaskItem";
import Json2Item from "./Json2Item";
import ConsumableItem from "./ConsumableItem";
import EquipItem from "./EquipItem";
import Say from "./Say";
import ModifyItem from "./ModifyItem";
import MoveCharacter from "./MoveCharacter";
import AddCharacterToScene from "./AddCharacterToScene";
import Scene from "./Scene";
import SceneSwitch from "./SceneSwitch";
import PositionTrigger from "./PositionTrigger";
import ShowNotification from "./ShowNotification";
import MapCharacter from "./MapCharacter";
import ModifyGold from "./ModifyGold";
import ConditionNode from "./ConditionNode";
import PlayerControl from "./PlayerControl";

const install = (LiteGraph) => {
  const registerList = [
    Oscillator,
    LED,
    TaskItem,
    Json2Item,
    EquipItem,
    ConsumableItem,
    Say,
    ModifyItem,
    MoveCharacter,
    AddCharacterToScene,
    Scene,
    SceneSwitch,
    PositionTrigger,
    MapCharacter,
    ShowNotification,
    ModifyGold,
    ConditionNode,
    PlayerControl,
  ];
  registerList.forEach(node => {
    LiteGraph.registerNodeType({
      type: node.registerType,
      class: node,
      title: node.title,
      name: node.title,
      desc: node.desc
    });
  });
}
export default { install };
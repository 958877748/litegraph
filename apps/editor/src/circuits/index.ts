import LED from "./LED";
import Oscillator from "./Oscillator";
import TaskItem from "./TaskItem";
import Json2Item from "./Json2Item";
import ConsumableItem from "./ConsumableItem";
import EquipItem from "./EquipItem";
import Say from "./Say";
import AddItemToInventory from "./AddItemToInventory";
import MoveCharacter from "./MoveCharacter";
import AddCharacterToScene from "./AddCharacterToScene";
import Scene from "./Scene";
import SceneSwitch from "./SceneSwitch";
import PositionTrigger from "./PositionTrigger";
import ShowNotification from "./ShowNotification";
import MapCharacter from "./MapCharacter";
import RemoveItemFromInventory from "./RemoveItemFromInventory";
import ModifyGold from "./ModifyGold";

const install = (LiteGraph) => {
  const registerList = [
    Oscillator,
    LED,
    TaskItem,
    Json2Item,
    EquipItem,
    ConsumableItem,
    Say,
    AddItemToInventory,
    RemoveItemFromInventory,
    MoveCharacter,
    AddCharacterToScene,
    Scene,
    SceneSwitch,
    PositionTrigger,
    MapCharacter,
    ShowNotification,
    ModifyGold,
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
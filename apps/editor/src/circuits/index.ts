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
import SceneNode from "./SceneNode";
import ShowNotification from "./ShowNotification";
import MapCharacter from "./MapCharacter";
import RemoveItemFromInventory from "./RemoveItemFromInventory";

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
    SceneNode,
    MapCharacter,
    ShowNotification,
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
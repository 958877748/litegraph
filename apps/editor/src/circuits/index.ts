import LED from "./LED";
import Oscillator from "./Oscillator";
import TaskItem from "./TaskItem";
import Json2Item from "./Json2Item";
import ConsumableItem from "./ConsumableItem";
import EquipItem from "./EquipItem";

const install = (LiteGraph) => {
  const registerList = [Oscillator, LED, TaskItem, Json2Item, EquipItem, ConsumableItem];
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
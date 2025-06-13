import LED from "./LED";
import Oscillator from "./Oscillator";
import Item from "./Item";
import Json2Item from "./Json2Item";

const install = (LiteGraph) => {
  const registerList = [Oscillator, LED, Item, Json2Item];
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
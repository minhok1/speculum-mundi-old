import NavHeader from "../../NavHeader/NavHeader";
import "./TimelineView.css";

import CreateEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { useState, useEffect } from "react";
import { Abstract } from "../../types";
import TimelineSearch from "./TimelineSearch";

export default function TimelineView() {
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);

  const engine = CreateEngine();

  const node1 = new DefaultNodeModel({
    name: "Node1",
    color: "rgb(0,192,255)",
  });
  node1.setPosition(100, 100);
  let port1 = node1.addOutPort("Out");

  const node2 = new DefaultNodeModel({
    name: "Node2",
    color: "rgb(0,92,55)",
  });
  node2.setPosition(200, 200);
  let port2 = node2.addOutPort("Out");

  const link = port1.link<DefaultLinkModel>(port2);

  const model = new DiagramModel();
  model.addAll(node1, node2, link);
  engine.setModel(model);

  return (
    <div>
      <NavHeader />
      <TimelineSearch state={abstracts} stateChanger={setAbstracts} />
      <CanvasWidget className="timeline-canvas" engine={engine} />
    </div>
  );
}

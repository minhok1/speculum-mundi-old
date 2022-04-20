import NavHeader from "../../NavHeader/NavHeader";
import "./TimelineView.css";

import CreateEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { useState, useEffect } from "react";
import { Abstract, TimelineEvent } from "../../types";
import TimelineSearch from "./TimelineSearch";

export default function TimelineView() {
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);
  const [engine, setEngine] = useState(CreateEngine());
  const initialModel = new DiagramModel();
  engine.setModel(initialModel);

  const configureTimelines = (
    timelines: TimelineEvent[],
    absIndex: number,
    model: any
  ) => {
    timelines.forEach((te, teIndex) => {
      const node = new DefaultNodeModel({
        name: `${te.title}`,
        color: "rgb(0,192,255)",
      });
      node.setPosition(100 * teIndex, 100 * absIndex);
      // let port2 = node2.addOutPort("Out");
      model.addAll(node);
    });
    // const link = port1.link<DefaultLinkModel>(port2);
  };

  const configureAbstracts = () => {
    const model = new DiagramModel();
    abstracts.forEach((abs, absIndex) => {
      fetch(`http://localhost:8000/api/timeline_events/context=${abs.id}`)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          configureTimelines(response, absIndex, model);
          engine.setModel(model);
        });
    });
  };

  useEffect(() => {
    configureAbstracts();
  }, [abstracts]);

  return (
    <div>
      <NavHeader />
      <TimelineSearch state={abstracts} stateChanger={setAbstracts} />
      <div className="canvas-container">
        <CanvasWidget className="timeline-canvas" engine={engine} />
      </div>
    </div>
  );
}

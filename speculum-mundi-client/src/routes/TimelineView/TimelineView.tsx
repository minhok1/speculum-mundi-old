import NavHeader from "../../NavHeader/NavHeader";
import "./TimelineView.css";
import { TimelineNodeFactory } from "./TimelineNode/TimelineNodeFactory";
import { TimelineNodeModel } from "./TimelineNode/TimelineNodeModel";

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
  engine.getNodeFactories().registerFactory(new TimelineNodeFactory());
  engine.setModel(initialModel);

  const randomRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };

  const configureTimelines = (
    timelines: TimelineEvent[],
    absIndex: number,
    model: any,
    abstractColor: string
  ) => {
    timelines.forEach((te, teIndex) => {
      const node = new TimelineNodeModel({
        color: abstractColor,
        title: te.title,
      });
      node.setPosition(200 + 350 * teIndex, 200 * absIndex);
      model.addAll(node);
    });
  };

  const configureAbstracts = () => {
    const model = new DiagramModel();
    abstracts.forEach((abs, absIndex) => {
      fetch(`http://localhost:8000/api/timeline_events/context=${abs.id}`)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          const abstractColor = randomRGB();
          configureTimelines(response, absIndex, model, abstractColor);
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

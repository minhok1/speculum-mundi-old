import NavHeader from "../../NavHeader/NavHeader";
import "./TimelineView.css";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Abstract, TimelineEvent } from "../../types";
import TimelineSearch from "./TimelineSearch";
import {
  Network,
  Options,
  Data,
  Edge,
  Node,
} from "vis-network/standalone/esm/vis-network";

export default function TimelineView() {
  const options: Options = {};

  const [abstracts, setAbstracts] = useState<Abstract[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [network, addNetwork] = useState<Network | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const storeAbstractNodes = (timelineEvents: TimelineEvent[]) => {
    const tempNodes = timelineEvents.map((timelineEvent: TimelineEvent) => {
      const node = {
        id: timelineEvent.id,
        label: "test",
        title: timelineEvent.title,
        shape: "circle",
      };
      return node;
    });
    setNodes(tempNodes);
  };

  const configureAbstracts = () => {
    abstracts.forEach((abs, absIndex) => {
      fetch(`http://localhost:8000/api/timeline_events/context=${abs.id}`)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          storeAbstractNodes(response);
        });
    });
  };

  useEffect(() => {
    configureAbstracts();
  }, [abstracts]);

  useLayoutEffect(() => {
    const data: Data = { nodes, edges };
    if (ref.current) {
      const instance = new Network(ref.current, data, options);
      addNetwork(instance);
    }
    return () => network?.destroy();
  }, [nodes]);

  return (
    <div>
      <NavHeader />
      <TimelineSearch state={abstracts} stateChanger={setAbstracts} />
      <div className="timeline-canvas" ref={ref} />
    </div>
  );
}

import NavHeader from "../../NavHeader/NavHeader";
import "./TimelineView.css";

import { useState, useEffect } from "react";
import { Abstract, TimelineEvent } from "../../types";
import TimelineSearch from "./TimelineSearch";
import { Options, Edge, Node } from "vis-network/standalone/esm/vis-network";
import useVisNetwork from "./UseVisNetwork";

export default function TimelineView() {
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // const nodes: Node[] = [
  //   {
  //     id: 1,
  //     label: "test",
  //     title: "ПАО Т Плюс",
  //     // level: 1,
  //     group: "struct",
  //   },
  // ]

  // const edges: Edge[] = [
  //   { from: 1, to: 2, id: 1 },
  //   { from: 1, to: 3, id: 6 },
  // ];
  const options: Options = {};

  const { ref, network } = useVisNetwork({
    options,
    edges,
    nodes,
  });

  const configureAbstracts = () => {
    abstracts.forEach((abs, absIndex) => {
      fetch(`http://localhost:8000/api/timeline_events/context=${abs.id}`)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        });
    });
  };

  useEffect(() => {
    if (abstracts) {
      configureAbstracts();
    }
  }, [abstracts]);

  return (
    <div>
      <NavHeader />
      <TimelineSearch state={abstracts} stateChanger={setAbstracts} />
      <div className="timeline-canvas" ref={ref} />
    </div>
  );
}

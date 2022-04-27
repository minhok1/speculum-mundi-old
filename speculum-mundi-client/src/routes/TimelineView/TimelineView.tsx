import NavHeader from "../../NavHeader/NavHeader";
import "./TimelineView.css";
import { getRandomColor } from "../../Helper";

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
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
  const [reset, setReset] = useState<boolean>(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [network, addNetwork] = useState<Network | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const configureAbstractNodes = (timelineEvents: TimelineEvent[]) => {
    let prevNode: any;
    let tempNodes: any = [];
    let tempEdges: any = [];
    const abstractColor = getRandomColor();

    timelineEvents.map((timelineEvent: TimelineEvent, index: number) => {
      const duplicateNode = nodes.find((n) => n.id === timelineEvent.id);
      if (!duplicateNode) {
        //prevents nodes from existing abstracts being added again
        const newNode = {
          id: timelineEvent.id,
          label: "TE",
          title: timelineEvent.title,
          shape: "circle",
          color: { border: abstractColor, background: "white" },
          borderWidth: 3,
        };
        tempNodes.push(newNode);
      }
      if (index) {
        const duplicateEdge = edges.find(
          (e) => e.id === prevNode.id + "to" + timelineEvent.id
        );
        if (!duplicateEdge) {
          const newEdge = {
            from: timelineEvent.id,
            to: prevNode.id,
            id: prevNode.id + "to" + timelineEvent.id,
            color: abstractColor,
          };
          tempEdges.push(newEdge);
        }
      }
      prevNode = timelineEvent;
    });
    setNodes([...nodes, ...tempNodes]);
    setEdges([...edges, ...tempEdges]);
  };

  const configureAbstracts = async () => {
    const responses: any[] = [];
    let i = 0;
    for (i; i < abstracts.length; i++) {
      const response = await fetch(
        `http://localhost:8000/api/timeline_events/context=${abstracts[i].id}`
      );
      const json = await response.json();
      responses.push(json);
    }

    responses.forEach((response: TimelineEvent[], absIndex) => {
      configureAbstractNodes(response);
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
  }, [nodes, edges]);

  return (
    <div>
      <NavHeader />
      <TimelineSearch state={abstracts} stateChanger={setAbstracts} />
      <div className="timeline-canvas" ref={ref} />
    </div>
  );
}

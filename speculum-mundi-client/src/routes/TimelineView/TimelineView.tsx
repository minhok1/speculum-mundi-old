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
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [network, addNetwork] = useState<Network | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const configureAbstractNodes = (
    timelineEvents: TimelineEvent[],
    tempNodes: any[],
    tempEdges: any[],
    absIndex: number
  ) => {
    let prevNode: any;
    const abstractColor = getRandomColor();

    timelineEvents.map((timelineEvent: TimelineEvent, index: number) => {
      const duplicateNode = tempNodes.find(
        (n: any) => n.id === timelineEvent.id
      );
      if (!duplicateNode) {
        //now this condition only for actual nodes shared between two abstracts
        const newNode = {
          id: timelineEvent.id,
          label: "TE",
          title: timelineEvent.title,
          shape: "circle",
          color: { border: abstractColor, background: "white" },
          x: 100 * index,
          y: 100 * absIndex,
          fixed: true,
          borderWidth: 3,
        };
        tempNodes.push(newNode);
      } else {
        tempNodes[
          tempNodes.findIndex((element) => element === duplicateNode)
        ].color.border = "black";
      }
      if (index) {
        const newEdge = {
          to: timelineEvent.id,
          from: prevNode.id,
          id: prevNode.id + "to" + timelineEvent.id,
          color: abstractColor,
        };
        tempEdges.push(newEdge);
        // }
      }
      prevNode = timelineEvent;
    });
  };

  const configureAbstracts = async () => {
    let tempNodes: any[] = [];
    let tempEdges: any[] = [];
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
      configureAbstractNodes(response, tempNodes, tempEdges, absIndex);
    });
    setNodes([...tempNodes]);
    setEdges([...tempEdges]);
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

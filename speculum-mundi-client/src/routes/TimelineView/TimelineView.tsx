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
  const [causeEffectEdges, setCauseEffectEdges] = useState<Edge[]>([]);
  const [locationShiftEdges, setLocationShiftEdges] = useState<Edge[]>([]);
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
          size: 4,
          color: { border: abstractColor, background: "white" },
          x: timelineEvent.event_year * 50,
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
          arrows: { to: { enabled: true, scaleFactor: 0.5 } },
          smooth: false,
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

  const configureCauseEffects = async () => {
    let i = 0;
    let causeEffects: any[] = [];
    for (i; i < nodes.length; i++) {
      //when in production, find intersection between cause and effect for nodes
      const response = await fetch(
        `http://localhost:8000/api/cause_effects/cause=${nodes[i].id}/`
      );
      const json = await response.json();
      causeEffects = [...causeEffects, ...json];
    }
    const ceEdges = causeEffects.map((ce) => {
      return {
        to: ce.effect,
        from: ce.cause,
        id: "causeeffect" + ce.cause + "to" + ce.effect,
        arrows: { to: { enabled: true, scaleFactor: 0.5 } },
        color: "black",
        dashes: true,
        smooth: {
          enabled: true,
          type: "curvedCW",
          roundness: 0.3,
        },
      };
    });
    setCauseEffectEdges(ceEdges);
  };

  const configureLocationShifts = async () => {
    let i = 0;
    let locationShifts: any[] = [];
    for (i; i < nodes.length; i++) {
      //when in production, find intersection between cause and effect for nodes
      const response = await fetch(
        `http://localhost:8000/api/location_shifts/origin_timeline_event=${nodes[i].id}/`
      );
      const json = await response.json();
      locationShifts = [...locationShifts, ...json];
    }
    const lsEdges = locationShifts.map((ls) => {
      return {
        to: ls.destination_timeline_event,
        from: ls.origin_timeline_event,
        id:
          "locationshift" +
          ls.origin_timeline_event +
          "to" +
          ls.destination_timeline_event,
        arrows: { to: { enabled: true, scaleFactor: 0.5 } },
        color: "black",
        smooth: {
          enabled: true,
          type: "curvedCCW",
          roundness: 0.1,
        },
      };
    });
    console.log(lsEdges);
    setLocationShiftEdges(lsEdges);
  };

  useEffect(() => {
    configureAbstracts();
  }, [abstracts]);

  useEffect(() => {
    configureCauseEffects();
    configureLocationShifts();
  }, [nodes, edges]);

  useLayoutEffect(() => {
    const combinedEdges = [
      ...edges,
      ...causeEffectEdges,
      ...locationShiftEdges,
    ];
    const data: Data = { nodes: nodes, edges: combinedEdges };
    if (ref.current) {
      const instance = new Network(ref.current, data, options);
      addNetwork(instance);
    }
    return () => network?.destroy();
  }, [nodes, edges, causeEffectEdges, locationShiftEdges]);

  return (
    <div>
      <NavHeader />
      <TimelineSearch state={abstracts} stateChanger={setAbstracts} />
      <div className="timeline-canvas" ref={ref} />
    </div>
  );
}

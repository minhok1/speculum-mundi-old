import {
  createDefaultCE,
  createDefaultConnection,
  createDefaultLS,
  createDefaultNode,
  DateToBarNumber,
  getRandomColor,
  setDateRange,
} from "../../Utils";
import {
  Abstract,
  CauseEffect,
  LocationShift,
  TimelineEvent,
} from "../../types";
import "./TimelineDiagram.css";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  Network,
  Options,
  Data,
  Edge,
  Node,
} from "vis-network/standalone/esm/vis-network";
import { Color } from "vis";

export default function TimelineDiagram(props: any) {
  const ref = useRef<HTMLDivElement>(null);
  const options: Options = {
    physics: {
      enabled: true,
      stabilization: {
        enabled: true,
        iterations: 200,
      },
    },
  };
  const [network, addNetwork] = useState<Network | null>(null);

  const configureAbstractInfo = (
    timelineEvents: TimelineEvent[],
    tempNodes: Node[],
    tempEdges: Edge[],
    absIndex: number
  ) => {
    let prevTimelineEvent: TimelineEvent;
    const abstractColor = getRandomColor();

    timelineEvents.map((timelineEvent: TimelineEvent, index: number) => {
      const duplicateNode = tempNodes.findIndex(
        (n: Node) => n.id === timelineEvent.id
      );
      if (!duplicateNode) {
        tempNodes.push(
          createDefaultNode(
            timelineEvent,
            abstractColor,
            props.startDate,
            props.endDate,
            absIndex
          )
        );
      } else {
        (tempNodes[duplicateNode].color as Color).border = "black";
      }
      if (index) {
        const newEdge = createDefaultConnection(
          timelineEvent,
          prevTimelineEvent,
          abstractColor
        );
        tempEdges.push(newEdge);
      }
      prevTimelineEvent = timelineEvent;
    });
  };

  const configureAbstracts = async () => {
    let abstractStartDate: number = Infinity;
    let abstractEndDate: number = -Infinity;

    const tempNodes: Node[] = [];
    const tempEdges: Edge[] = [];
    const responses: TimelineEvent[][] = [];
    let i = 0;
    for (i; i < props.abstracts.length; i++) {
      const response = await fetch(
        `http://localhost:8000/api/timeline_events/context=${props.abstracts[i].id}`
      );
      const json = await response.json();
      responses.push(json);
    }

    responses.forEach((response: TimelineEvent[]) => {
      const [tempStartDate, tempEndDate] = setDateRange(response);
      abstractStartDate = Math.min(abstractStartDate, tempStartDate);
      abstractEndDate = Math.max(abstractEndDate, tempEndDate);
    });
    props.setStartDate(abstractStartDate);
    props.setEndDate(abstractEndDate);

    responses.forEach((response: TimelineEvent[], absIndex) => {
      configureAbstractInfo(response, tempNodes, tempEdges, absIndex);
    });
    props.setNodes([...tempNodes]);
    props.setEdges([...tempEdges]);
  };

  const configureCauseEffects = async () => {
    let i = 0;
    let causeEffects: CauseEffect[] = [];
    for (i; i < props.nodes.length; i++) {
      const response = await fetch(
        `http://localhost:8000/api/cause_effects/cause=${props.nodes[i].id}/`
      );
      const json = await response.json();
      causeEffects = [...causeEffects, ...json];
    }
    const ceEdges = causeEffects.map((ce) => {
      createDefaultCE(ce);
    });
    props.setCauseEffectEdges(ceEdges);
  };

  const configureLocationShifts = async () => {
    let i = 0;
    let locationShifts: LocationShift[] = [];
    for (i; i < props.nodes.length; i++) {
      const response = await fetch(
        `http://localhost:8000/api/location_shifts/origin_timeline_event=${props.nodes[i].id}/`
      );
      const json = await response.json();
      locationShifts = [...locationShifts, ...json];
    }
    const lsEdges = locationShifts.map((ls) => {
      return createDefaultLS(ls);
    });
    props.setLocationShiftEdges(lsEdges);
  };

  useEffect(() => {
    configureAbstracts();
  }, [props.abstracts, props.startDate, props.endDate]);

  useEffect(() => {
    configureCauseEffects();
    configureLocationShifts();
  }, [props.nodes, props.edges]);

  useLayoutEffect(() => {
    const combinedEdges = [
      ...props.edges,
      ...props.causeEffectEdges,
      ...props.locationShiftEdges,
    ];
    const data: Data = { nodes: props.nodes, edges: combinedEdges };
    if (ref.current) {
      const instance = new Network(ref.current, data, options);
      instance.on("selectNode", (obj) => {
        props.setDetail(obj.nodes[0]);
        props.setShowDetail("node");
      });
      instance.on("deselectNode", () => {
        props.setShowDetail("");
      });
      instance.on("selectEdge", (obj) => {
        props.setDetail(obj.edges[0]);
        props.setShowDetail("edge");
      });
      instance.on("deselectEdge", () => {
        props.setShowDetail("");
      });
      addNetwork(instance);
    }
    return () => network?.destroy();
  }, [
    props.nodes,
    props.edges,
    props.causeEffectEdges,
    props.locationShiftEdges,
    props.startDate,
    props.endDate,
  ]);

  return <div className="timeline-canvas" ref={ref} />;
}

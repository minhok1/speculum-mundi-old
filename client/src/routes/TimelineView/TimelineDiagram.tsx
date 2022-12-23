import {
  createDefaultCE,
  createDefaultLS,
  createDefaultNode,
  DateToBarNumber,
  extractCurrentDate,
  getRandomColor,
} from "../../Utils";
import { Abstract, TimelineEvent } from "../../types";
import "./TimelineDiagram.css";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  Network,
  Options,
  Data,
  Edge,
  Node,
} from "vis-network/standalone/esm/vis-network";

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
      }
      prevNode = timelineEvent;
    });
  };

  const configureAbstracts = async () => {
    let abstractStartDate: number = Infinity;
    let abstractEndDate: number = -Infinity;

    let tempNodes: any[] = [];
    let tempEdges: any[] = [];
    const responses: any[] = [];
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
    let causeEffects: any[] = [];
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
    let locationShifts: any[] = [];
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

  const setDateRange = (timelineEvents: TimelineEvent[]) => {
    let start = Infinity;
    let end = -Infinity;
    timelineEvents.forEach((timelineEvent: TimelineEvent, i: number) => {
      start = Math.min(
        start,
        DateToBarNumber({
          year: timelineEvent.event_year,
          month: timelineEvent.event_month,
          day: timelineEvent.event_date,
        })
      );
      end = Math.max(
        end,
        DateToBarNumber({
          year: timelineEvent.event_year,
          month: timelineEvent.event_month,
          day: timelineEvent.event_date,
        })
      );
    });
    return [start, end];
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

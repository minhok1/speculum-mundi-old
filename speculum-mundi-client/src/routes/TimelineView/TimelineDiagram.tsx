import {
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
  const [startDate, setStartDate] = useState(DateToBarNumber({ year: -2600 }));
  const [endDate, setEndDate] = useState(DateToBarNumber(extractCurrentDate()));
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
        //now this condition only for actual nodes shared between two abstracts
        const newNode = {
          id: timelineEvent.id,
          // label: "TE",
          title: timelineEvent.title,
          shape: "circle",
          size: 1,
          color: { border: abstractColor, background: "white" },
          x:
            (1000 *
              DateToBarNumber({
                year: timelineEvent.event_year,
                month: timelineEvent.event_month,
                day: timelineEvent.event_date,
              })) /
            (endDate - startDate),
          y: -200 * (absIndex + 1),
          fixed: true,
          borderWidth: 1,
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
      }
      prevNode = timelineEvent;
    });
  };

  const configureAbstracts = async () => {
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
    props.setLocationShiftEdges(lsEdges);
  };

  const configureTimelineBar = () => {
    // const startNode = {
    //   id: "start",
    //   // label: "Start",
    //   // title: timelineEvent.title,
    //   shape: "diamond",
    //   size: 5,
    //   color: { border: "brown", background: "brown" },
    //   x: 0,
    //   y: 0,
    //   fixed: true,
    //   // borderWidth: 3,
    // };
    // const endNode = {
    //   id: "end",
    //   // label: "End",
    //   // title: timelineEvent.title,
    //   shape: "diamond",
    //   size: 5,
    //   color: { border: "brown", background: "brown" },
    //   x: 1000,
    //   y: 0,
    //   fixed: true,
    //   // borderWidth: 3,
    // };
    // setTimelineBarNodes([startNode, endNode]);
  };

  useEffect(() => {
    console.log("initial: ", startDate, " and ", endDate);
    configureAbstracts();
    configureTimelineBar();
  }, [props.abstracts]);

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
    // const combinedNodes = [...props.nodes, ...timelineBarNodes];
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
      instance.on("stabilized", () => {
        instance.moveTo({
          scale: 1.3,
          animation: true,
        });
      });
      addNetwork(instance);
    }
    return () => network?.destroy();
  }, [
    props.nodes,
    props.edges,
    props.causeEffectEdges,
    props.locationShiftEdges,
  ]);

  return <div className="timeline-canvas" ref={ref} />;
}

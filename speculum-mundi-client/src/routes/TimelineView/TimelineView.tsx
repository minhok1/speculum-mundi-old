import NavSidebar from "../../NavSidebar/NavSidebar";
import DetailWidget from "./DetailWidget";
import "./TimelineView.css";
import { getRandomColor } from "../../Helper";

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
import axios from "axios";
import ProfileHeader from "../../ProfileHeader/ProfileHeader";
import SearchBar from "../../Shared/SearchBar/SearchBar";
import TimelineSearchList from "./TimelineSearchList";
import AbstractDisplay from "./AbstractDisplay";
import TimelineDiagram from "./TimelineDiagram";

export default function TimelineView() {
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);
  const [searchList, setSearchList] = useState<Abstract[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [causeEffectEdges, setCauseEffectEdges] = useState<Edge[]>([]);
  const [locationShiftEdges, setLocationShiftEdges] = useState<Edge[]>([]);
  const [showDetail, setShowDetail] = useState<string>("");
  const [detail, setDetail] = useState<string | null>(null); //stores id

  // const getSelectedNode = async (nodeId: string) => {
  //   const timelineEventsResponse = await fetch(
  //     `http://localhost:8000/api/timeline_events/id=${nodeId}`
  //   );
  //   const timelineEventsjson = await timelineEventsResponse.json();
  //   const discussionsResponse = await fetch(
  //     `http://localhost:8000/api/discussions/timeline_event_context=${nodeId}`
  //   );
  //   const discussionsjson = await discussionsResponse.json();
  //   const opinionsResponse = discussionsjson.length
  //     ? await fetch(
  //         `http://localhost:8000/api/opinions/thread=${discussionsjson[0].id}`
  //       )
  //     : undefined;
  //   const opinionsjson = opinionsResponse
  //     ? await opinionsResponse.json()
  //     : undefined;
  //   const display = {
  //     title: timelineEventsjson[0].title,
  //     content: timelineEventsjson[0].content,
  //     time: timelineEventsjson[0].event_year,
  //     discussions: discussionsjson.length ? discussionsjson[0].title : null,
  //     opinions: opinionsjson
  //       ? opinionsjson.map((op: any) => {
  //           return {
  //             title: op.title,
  //             id: op.id,
  //             content: op.content,
  //             user: op.user,
  //             time: op.timestamp,
  //             upvotes: op.upvotes,
  //           };
  //         })
  //       : null,
  //   };
  //   setDetail(display);
  //   setShowDetail(true);
  // };

  // const getSelectedEdge = async (edgeId: string) => {
  //   let queryUrl: string = "";
  //   let isCauseEffect = false;
  //   if (edgeId.includes("locationshift")) {
  //     queryUrl = `http://localhost:8000/api/location_shifts/origin_to_destination=${edgeId.replace(
  //       "locationshift",
  //       ""
  //     )}`;
  //   } else if (edgeId.includes("causeeffect")) {
  //     queryUrl = `http://localhost:8000/api/cause_effects/cause_to_effect=${edgeId.replace(
  //       "causeeffect",
  //       ""
  //     )}`;
  //     isCauseEffect = true;
  //   } else {
  //     return;
  //   }
  //   const edgeResponse = await fetch(queryUrl);
  //   const edgejson = await edgeResponse.json();

  //   const discussionsResponse = await fetch(
  //     `http://localhost:8000/api/discussions/${
  //       isCauseEffect ? "cause_effect" : "location_shift"
  //     }_context=${edgejson[0].id}`
  //   );

  //   const discussionsjson = await discussionsResponse.json();

  //   const opinionsResponse = discussionsjson.length
  //     ? await fetch(
  //         `http://localhost:8000/api/opinions/thread=${discussionsjson[0].id}`
  //       )
  //     : undefined;
  //   const opinionsjson = opinionsResponse
  //     ? await opinionsResponse.json()
  //     : undefined;

  //   const display = {
  //     title: edgejson[0].title,
  //     discussions: discussionsjson.length ? discussionsjson[0].title : null,
  //     opinions: opinionsjson
  //       ? opinionsjson.map((op: any) => {
  //           return {
  //             title: op.title,
  //             id: op.id,
  //             content: op.content,
  //             user: op.user,
  //             time: op.timestamp,
  //             upvotes: op.upvotes,
  //           };
  //         })
  //       : null,
  //   };
  //   setDetail(display);
  //   setShowDetail(true);
  // };

  // const onNodeSubmit = (e: any) => {
  //   e.preventDefault();
  //   const submitData = {
  //     title: e.target[0].value,
  //     content: e.target[1].value,
  //   };
  //   console.log(submitData);
  //   axios
  //     .post(`http://localhost:8000/api/timeline_events/create/`, submitData)
  //     .then(() => {
  //       console.log("done");
  //     });
  // };

  return (
    <div className="page-container">
      <NavSidebar />
      <div className="contents-container">
        <ProfileHeader pageTitle="Timeline" />
        <SearchBar setSearchList={setSearchList} />
        <div className="dashboard-container timeline-contents">
          <div className="timeline-left-container">
            <TimelineSearchList
              searchList={searchList}
              abstracts={abstracts}
              setAbstracts={setAbstracts}
            />
            <AbstractDisplay
              abstracts={abstracts}
              setAbstracts={setAbstracts}
            />
          </div>
          <div className="timeline-right-container">
            <TimelineDiagram
              abstracts={abstracts}
              nodes={nodes}
              setNodes={setNodes}
              edges={edges}
              setEdges={setEdges}
              causeEffectEdges={causeEffectEdges}
              setCauseEffectEdges={setCauseEffectEdges}
              locationShiftEdges={locationShiftEdges}
              setLocationShiftEdges={setLocationShiftEdges}
              setDetail={setDetail}
              setShowDetail={setShowDetail}
            />
            {showDetail && <DetailWidget detail={detail} />}
          </div>
        </div>
        {/* <div>
        <form onSubmit={onNodeSubmit}>
          <input name="title"></input>
          <input name="content"></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div> */}
      </div>
    </div>
  );
}

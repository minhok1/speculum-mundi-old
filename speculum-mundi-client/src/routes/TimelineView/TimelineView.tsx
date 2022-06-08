import NavSidebar from "../../NavSidebar/NavSidebar";
import DetailWidget from "./DetailWidget";
import "./TimelineView.css";

import { useState } from "react";
import { Abstract, TimelineEvent } from "../../types";
import { Edge, Node } from "vis-network/standalone/esm/vis-network";
import ProfileHeader from "../../ProfileHeader/ProfileHeader";
import SearchBar from "../../Shared/SearchBar/SearchBar";
import TimelineSearchList from "./TimelineSearchList";
import AbstractDisplay from "./AbstractDisplay";
import TimelineDiagram from "./TimelineDiagram";
import TimelineOptionsWidget from "./TimelineOptionsWidget";

export default function TimelineView() {
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);
  const [searchList, setSearchList] = useState<Abstract[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [causeEffectEdges, setCauseEffectEdges] = useState<Edge[]>([]);
  const [locationShiftEdges, setLocationShiftEdges] = useState<Edge[]>([]);
  const [showDetail, setShowDetail] = useState<string>("");
  const [detail, setDetail] = useState<string | null>(null); //stores id

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
            <TimelineOptionsWidget />
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

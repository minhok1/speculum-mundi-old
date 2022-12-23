import "./GeoView.css";
import NavSidebar from "../../NavSidebar/NavSidebar";
import ProfileHeader from "../../ProfileHeader/ProfileHeader";
import { Abstract, TimelineEvent } from "../../types";
import TimelineSearchList from "../TimelineView/TimelineSearchList";
import AbstractDisplay from "../TimelineView/AbstractDisplay";
import AccessError from "../../Shared/AccessError/AccessError";

import { useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../../Shared/SearchBar/SearchBar";
import MapDiagram from "./MapDiagram";

export default function GeoView() {
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);
  const [searchList, setSearchList] = useState<Abstract[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);

  const currState = useSelector((state: any) => state);

  return (
    <div className="page-container">
      <NavSidebar />
      <div className="contents-container">
        <ProfileHeader pageTitle="Map" />
        <SearchBar setSearchList={setSearchList} />
        {currState.auth.account ? (
          <div className="dashboard-container map-contents">
            <div className="map-left-container">
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
            <div className="map-right-container">
              <MapDiagram
                abstracts={abstracts}
                timelineEvents={timelineEvents}
                setTimelineEvents={setTimelineEvents}
              />
            </div>
          </div>
        ) : (
          <AccessError />
        )}
      </div>
    </div>
  );
}

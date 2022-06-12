import "./GeoView.css";
import NavSidebar from "../../NavSidebar/NavSidebar";
import ProfileHeader from "../../ProfileHeader/ProfileHeader";
import { Abstract } from "../../types";
import TimelineSearchList from "../TimelineView/TimelineSearchList";
import AbstractDisplay from "../TimelineView/AbstractDisplay";

import { useState } from "react";
import SearchBar from "../../Shared/SearchBar/SearchBar";
import MapDiagram from "./MapDiagram";

export default function GeoView() {
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);
  const [searchList, setSearchList] = useState<Abstract[]>([]);

  return (
    <div className="page-container">
      <NavSidebar />
      <div className="contents-container">
        <ProfileHeader pageTitle="Map" />
        <SearchBar setSearchList={setSearchList} />
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
            <MapDiagram />
          </div>
        </div>
      </div>
    </div>
  );
}

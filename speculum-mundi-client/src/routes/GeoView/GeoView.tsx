import "./GeoView.css";
import NavSidebar from "../../NavSidebar/NavSidebar";
import ProfileHeader from "../../ProfileHeader/ProfileHeader";
import { Abstract } from "../../types";
import TimelineSearchList from "../TimelineView/TimelineSearchList";
import AbstractDisplay from "../TimelineView/AbstractDisplay";

import GoogleMapReact from "google-map-react";
import { useState } from "react";
import SearchBar from "../../Shared/SearchBar/SearchBar";

export default function GeoView() {
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);
  const [searchList, setSearchList] = useState<Abstract[]>([]);
  const apiKey = "AIzaSyD759inzfhgp_XQWSUQgsXRdpvOgb24gFk";

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
            <GoogleMapReact
              bootstrapURLKeys={{ key: apiKey }}
              defaultCenter={{
                lat: 59.95,
                lng: 30.33,
              }}
              defaultZoom={11}
            ></GoogleMapReact>
          </div>
        </div>
      </div>
    </div>
  );
}

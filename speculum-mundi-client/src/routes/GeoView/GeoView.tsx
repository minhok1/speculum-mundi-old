import "./GeoView.css";
import NavSidebar from "../../NavSidebar/NavSidebar";
import ProfileHeader from "../../ProfileHeader/ProfileHeader";

import GoogleMapReact from "google-map-react";

export default function GeoView() {
  const apiKey = "AIzaSyD759inzfhgp_XQWSUQgsXRdpvOgb24gFk";

  return (
    <div className="page-container">
      <NavSidebar />
      <div className="contents-container">
        <ProfileHeader pageTitle="Map" />
        <div className="dashboard-container map-contents">
          <div className="map-left-container">hewwo</div>
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

import "./MapDiagram.css";

import GoogleMapReact from "google-map-react";
// import { apiKey } from "../../Assets/apiKeys";

export default function MapDiagram() {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: apiKey }}
      defaultCenter={{
        lat: 59.95,
        lng: 30.33,
      }}
      defaultZoom={11}
    ></GoogleMapReact>
  );
}

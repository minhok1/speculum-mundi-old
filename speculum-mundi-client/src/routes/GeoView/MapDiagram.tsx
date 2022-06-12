import "./MapDiagram.css";
import { apiKey } from "../../Assets/apiKeys";
import MapPoint from "./MapPoint";
import { TimelineEvent } from "../../types";

import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";

interface MapMarker {
  nodeNumber: number;
  timelineEventId: string;
  xCoordinate: number;
  yCoordinate: number;
}

export default function MapDiagram(props: any) {
  const [markers, setMarkers] = useState<any>([]);

  const configurePins = async () => {
    const response = await fetch(
      `http://localhost:8000/api/timeline_events/context=${props.abstracts[0].id}`
    );
    const json = await response.json();

    const timelineEventLocationInfo = await Promise.all(
      json.map(async (timelineEvent: any) => {
        const locationInfoResponse = await fetch(
          `http://localhost:8000/api/location_infos/location=${timelineEvent.location}`
        );
        const locationInfoJson = await locationInfoResponse.json();
        return locationInfoJson[0];
      })
    );

    const tempMarkers = timelineEventLocationInfo.map((info, index: number) => {
      return {
        nodeNumber: index,
        timelineEventId: info.location,
        xCoordinate: info.x_coordinate,
        yCoordinate: info.y_coordinate,
      };
    });
    setMarkers(tempMarkers);
  };

  useEffect(() => {
    if (props.abstracts.length) {
      configurePins();
    }
  }, [props.abstracts]);

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: apiKey }}
      defaultCenter={{
        lat: 59.95,
        lng: 30.33,
      }}
      defaultZoom={11}
    >
      {markers.length &&
        markers.map((marker: any) => (
          <MapPoint
            key={marker.timelineEventId}
            lat={marker.xCoordinate}
            lng={marker.yCoordinate}
            text={marker.nodeNumber + 1}
          />
        ))}
    </GoogleMapReact>
  );
}

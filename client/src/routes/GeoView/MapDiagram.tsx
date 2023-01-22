import "./MapDiagram.css";
import { apiKey } from "../../Assets/apiKeys";
import MapPoint from "./MapPoint";
import { TimelineEvent } from "../../types";

import {
  GoogleMap,
  Marker,
  LoadScript,
  Polyline,
} from "@react-google-maps/api";
import { useEffect, useState, Fragment } from "react";

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
    } else {
      setMarkers([]);
    }
  }, [props.abstracts]);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: 59.95,
          lng: 30.33,
        }}
        zoom={8}
      >
        {markers.length &&
          markers.map((marker: any, ind: number) => {
            const drawPolyline = markers[ind + 1] !== undefined;
            return (
              <Fragment key={marker.timelineEventId}>
                <Marker
                  position={{
                    lat: marker.xCoordinate,
                    lng: marker.yCoordinate,
                  }}
                  label={(marker.nodeNumber + 1).toString()}
                />

                {drawPolyline && (
                  <Polyline
                    path={[
                      { lat: marker.xCoordinate, lng: marker.yCoordinate },
                      {
                        lat: markers[ind + 1].xCoordinate,
                        lng: markers[ind + 1].yCoordinate,
                      },
                    ]}
                  />
                )}
              </Fragment>
            );
          })}
      </GoogleMap>
    </LoadScript>
  );
}

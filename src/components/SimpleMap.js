import React from "react";
import GoogleMapReact from "google-map-react";
import Pin from "./Pin";

function SimpleMap(props) {
  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAEK-o3vsxmirB3hjD019Zpew9O7X1xoHQ" }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <Pin lat={44.7956} lng={-91.5039} name={"Main Cell Phone"} />
        <Pin lat={44.8716} lng={-91.9267} name={"Secondary Cell Phone"} />
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap;

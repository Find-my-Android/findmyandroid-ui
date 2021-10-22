import React from "react";
import GoogleMapReact from "google-map-react";
import Pin from "./Pin";
import { useSelector } from "react-redux";

function SimpleMap(props) {
  //const users = useSelector((state) => state.users);
  const phones = useSelector((state) => state.phones);
  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

  const createPins = () => {
    return phones.map((phone) => (
      <Pin
        key={phone.phone_id}
        lat={phone.latitude}
        lng={phone.longitude}
        name={phone.name}
        tracking={phone.tracking}
        status={phone.status}
      />
    ));
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
        {phones ? createPins() : <></>}
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap;

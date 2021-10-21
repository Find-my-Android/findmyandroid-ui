import React from "react";
import GoogleMapReact from "google-map-react";
import Pin from "./Pin";

function SimpleMap(props) {
  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

  let phones = [
    {
      phone_id: 1,
      user_id: 1,
      name: "Main Cell Phone",
      phone_number: "715-382-6526",
      latitude: 44.7956,
      longitude: -91.5039,
      tracking: "active",
      status: "",
    },
    {
      phone_id: 2,
      user_id: 1,
      name: "Secondary Cell Phone",
      phone_number: "715-555-1234",
      latitude: 44.8716,
      longitude: -91.9267,
      tracking: "not",
      status: "",
    },
    {
      phone_id: 3,
      user_id: 1,
      name: "Wifi Phone Back Home",
      phone_number: "715-555-5433",
      latitude: 20.5937,
      longitude: 78.9629,
      tracking: "not",
      status: "stolen",
    },
  ];

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

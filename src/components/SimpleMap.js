import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Pin from "./Pin";
import { useDispatch, useSelector } from "react-redux";
import { startGettingAllPhones, startGettingPhones } from "../actions";

function SimpleMap(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const jwt = useSelector((state) => state.jwt);
  const admin = useSelector((state) => state.admin);
  //const users = useSelector((state) => state.users);
  const phones = useSelector((state) => state.phones);
  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

  useEffect(() => {
    if (admin) {
      dispatch(startGettingAllPhones(jwt));
    } else {
      dispatch(startGettingPhones(user.user_id, jwt));
    }
  }, [dispatch, user.user_id, jwt]);

  const createPins = () => {
    return phones.map((phone) => (
      <Pin
        key={phone.imei}
        lat={phone.latitude}
        lng={phone.longitude}
        name={phone.name}
        tracking_state={phone.tracking_state}
        stolen_state={phone.stolen_state}
        sim_removed={phone.sim_removed}
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

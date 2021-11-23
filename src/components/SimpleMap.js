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
      dispatch(startGettingPhones(jwt));
    }
  }, [dispatch, jwt]);

  const createPins = () => {
    return phones.map((phone) => (
      <Pin
        key={phone.software_id}
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
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyAn6jfxtR9I6LfkxtDyeQH_vn6cT52oKU0" }}
      defaultCenter={props.center}
      defaultZoom={props.zoom}
      options={function (maps) {
        return { mapTypeId: "hybrid" };
      }}
    >
      {phones ? createPins() : <></>}
    </GoogleMapReact>
  );
}

export default SimpleMap;

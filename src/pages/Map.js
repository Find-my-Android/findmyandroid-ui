import React, { useEffect } from "react";
import SideBar from "../components/SideBar";

import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import SimpleMap from "../components/SimpleMap";

function Map({ history }) {
  const authenticated = useSelector((state) => state.authenticated);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  });

  return (
    <>
      <SideBar history={history} active="map" />
      <SimpleMap center={{ lat: 30, lng: 0 }} zoom={1} />
    </>
  );
}

export default withRouter(Map);

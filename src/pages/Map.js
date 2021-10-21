import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import SimpleMap from "../components/SimpleMap";

function Map({ history }) {
  const authenticated = useSelector((state) => state.authenticated);
  const lat = parseFloat(useParams().lat);
  const lng = parseFloat(useParams().lng);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  });

  return (
    <>
      <SideBar history={history} active="map" />
      <SimpleMap center={{ lat: lat, lng: lng }} zoom={11} />
    </>
  );
}

export default withRouter(Map);

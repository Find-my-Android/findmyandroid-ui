import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import AdminComponent from "../components/AdminComponent";

import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

function Admin({ history }) {
  const authenticated = useSelector((state) => state.authenticated);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  });

  return (
    <>
      <SideBar history={history} active="admin" />
      <AdminComponent history={history} />
    </>
  );
}

export default withRouter(Admin);

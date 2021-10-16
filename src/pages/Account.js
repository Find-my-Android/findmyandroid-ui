import React, { useEffect } from "react";
import SideBar from "../components/SideBar";

import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import "../styles/account.css"

function Account({ history }) {
  const authenticated = useSelector((state) => state.authenticated);
  const user = useSelector((state) => state.user);


  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  });

  return (
    <>
      <SideBar history={history} active="account" />
      <div className="a">
        <div className = "a1">
        {user.first_name} {user.last_name}
          <div className="a2">
            Name:  {user.first_name} {user.last_name}
          </div>
          <p className="change">Change Name</p>
          <div className="a2">
            Email: jsmith@gmail.com
          </div>
          <p className="change">Change email</p>
          <div className="a2">
            Password: *************
          </div>
          <p className="change">Change password</p>
        </div>
      </div>
      </>
  );
}

export default withRouter(Account);

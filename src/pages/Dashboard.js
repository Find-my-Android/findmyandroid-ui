import "../styles/dashboard.css";
import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";

import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

function Dashboard({ history }) {
  const authenticated = useSelector((state) => state.authenticated);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  });

  return (
    <>
      <SideBar history={history} active="dashboard" />
      <div className="d">
        <div className="safe">
          <div className="phone">
            <div className="phonename">
              Main Cell Phone {/* {user_phonename} */}
            </div>
            <div className="phonenum">715-382-6526 {/* {user_phonenum} */}</div>
            <div className="position">
              Latitude: 44.7956 &nbsp;&nbsp;&nbsp;&nbsp;{" "}
              {/* {phone_latitude} */}
              Longitude： -91.5039 &nbsp;&nbsp;&nbsp;&nbsp;{" "}
              {/* {phone_lngitude} */}
              Active Tracking {/* {phone_state} */}
            </div>
          </div>
        </div>
        <div className="safe">
          <div className="phone">
            <div className="phonename">
              Secondary Cell Phone {/* {user_phonename} */}
            </div>
            <div className="phonenum">715-555-1234 {/* {user_phonenum} */}</div>
            <div className="position">
              Latitude: 34.545 &nbsp;&nbsp;&nbsp;&nbsp; {/* {phone_latitude} */}
              Longitude： 23.32432 &nbsp;&nbsp;&nbsp;&nbsp;{" "}
              {/* {phone_lngitude} */}
              Not Tracking {/* {phone_state} */}
            </div>
          </div>
        </div>
        <div className="stolen">
          <div className="phone">
            <div className="phonename">
              Wifi Phone Back Home {/* {user_phonename} */}
            </div>
            <div className="phonenum">715-555-5433 {/* {user_phonenum} */}</div>
            <div className="position">
              Latitude: 20.5937 &nbsp;&nbsp;&nbsp;&nbsp;{" "}
              {/* {phone_latitude} */}
              Longitude：78.9629 &nbsp;&nbsp;&nbsp;&nbsp;{" "}
              {/* {phone_lngitude} */}
              Stolen! {/* {phone_state} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(Dashboard);

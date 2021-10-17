import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";


import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import "../styles/dashboard.css"

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
              Personal Phone 1    {/* {user_phonename} */}
            </div>
            <div className="phonenum">
              715-555-1234      {/* {user_phonenum} */}
            </div>
            <div className="position">
              Latitude: 39.48573 &nbsp;&nbsp;&nbsp;&nbsp; {/* {phone_latitude} */}
              Longitude： -84.374753 &nbsp;&nbsp;&nbsp;&nbsp; {/* {phone_lngitude} */}
              Active Tracking {/* {phone_state} */}
            </div>
          </div>
        </div>
        <div className="safe">
          <div className="phone">
          <div className="phonename">
              Personal Phone 2    {/* {user_phonename} */}
            </div>
            <div className="phonenum">
              715-555-4323      {/* {user_phonenum} */}
            </div>
            <div className="position">
              Latitude: 34.545 &nbsp;&nbsp;&nbsp;&nbsp; {/* {phone_latitude} */}
              Longitude： 23.32432 &nbsp;&nbsp;&nbsp;&nbsp; {/* {phone_lngitude} */}
              Not Tracking {/* {phone_state} */}
            </div>
          </div>
        </div>
        <div className="stolen">
          <div className="phone">
          <div className="phonename">
              Personal Phone 3    {/* {user_phonename} */}
            </div>
            <div className="phonenum">
              715-555-5433      {/* {user_phonenum} */}
            </div>
            <div className="position">
              Latitude: 120.44723 &nbsp;&nbsp;&nbsp;&nbsp; {/* {phone_latitude} */}
              Longitude： 99.27543 &nbsp;&nbsp;&nbsp;&nbsp; {/* {phone_lngitude} */}
              Not Tracking {/* {phone_state} */}
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}



export default withRouter(Dashboard);

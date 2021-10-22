import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { startLoggingOutUser } from "../actions";

function SideBar(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(startLoggingOutUser(props.history));
  };

  return (
    <div className="nav">
      <div className="nav-content">
        <h3 className="p-2">
          {user.first_name} {user.last_name}
        </h3>

        <div className="d-flex flex-column mt-2">
          {user.type === "admin" && (
            <Link
              to="/admin"
              className={`aLink ${props.active === "admin" ? "active" : ""}`}
            >
              Admin Dashboard
            </Link>
          )}
          <Link
            to="/dashboard"
            className={`aLink ${props.active === "dashboard" ? "active" : ""}`}
          >
            Dashboard
          </Link>
          <Link
            to="/map/44.7956/-91.5039"
            className={`aLink ${props.active === "map" ? "active" : ""}`}
          >
            Map
          </Link>
          <Link
            to="/account"
            className={`aLink ${props.active === "account" ? "active" : ""}`}
          >
            Account
          </Link>
        </div>
      </div>
      <Button className="logout" variant="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default SideBar;

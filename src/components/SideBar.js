import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { startLoggingOutUser } from "../actions";

function SideBar(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const phones = useSelector((state) => state.phones);
  const admin = useSelector((state) => state.admin);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(startLoggingOutUser(props.history));
  };

  const centerMap = () => {
    let validPhones = phones.filter(
      (phone) => phone.latitude !== -1 && phone.longitude !== -1
    );
    let phone = validPhones[0];

    return phone !== undefined
      ? phone.latitude + "/" + phone.longitude
      : "40/-100";
  };

  return (
    <div className="nav">
      <div className="nav-content">
        <h3 className="p-2">
          {user.first_name} {user.last_name}
        </h3>

        <div className="d-flex flex-column mt-2">
          {admin && (
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
            to={"/map/" + centerMap()}
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

import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import "../styles/phone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faMap } from "@fortawesome/free-regular-svg-icons";

function PhoneComponent(props) {
  const phone = props.phone;

  const handleDelete = (e) => {
    e.preventDefault();
    props.handleDelete(phone.phone_id);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    props.handleEdit(phone);
  };

  const handleMap = (e) => {
    props.history.push(`map/${phone.latitude}/${phone.longitude}`);
  };

  return (
    <div className={phone.status !== "" ? "stolen" : "safe"}>
      <div className="phone">
        <div className="phonename">
          {phone.name}
          <FontAwesomeIcon
            icon={faEdit}
            className="icon"
            onClick={handleEdit}
          />
        </div>
        <div className="phonenum">
          {phone.phone_number}{" "}
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="icon"
            onClick={handleDelete}
          />
        </div>
        <div className="position">
          Latitude: {phone.latitude} &nbsp;&nbsp;&nbsp;&nbsp; Longitude：
          {phone.longitude}&nbsp;&nbsp;&nbsp;&nbsp;
          {phone.tracking} Tracking &nbsp;&nbsp;&nbsp;&nbsp;
          {phone.status}&nbsp;&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faMap} className="icon" onClick={handleMap} />
        </div>
      </div>
    </div>
  );
}

export default withRouter(PhoneComponent);

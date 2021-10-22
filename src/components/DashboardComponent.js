import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import Notification from "./Notification";
import PhoneComponent from "./PhoneComponent";

function DashboardComponent(props) {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.jwt);
  const phones = useSelector((state) => state.phones);

  const handleEditUserClick = () => {};

  const handleDeleteUserClick = () => {};

  const handleEditPhoneClick = () => {};

  const handleDeletePhoneClick = () => {};

  const createPhones = () => {
    return phones.map((phone) => (
      <PhoneComponent
        key={phone.phone_id}
        phone={phone}
        handleDelete={handleDeletePhoneClick}
        handleEdit={handleEditPhoneClick}
        history={props.history}
      />
    ));
  };

  return (
    <div className="container mainContainer">
      <Notification></Notification>
      {phones ? createPhones() : <></>}
    </div>
  );
}

export default withRouter(DashboardComponent);

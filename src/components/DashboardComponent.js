import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { startGettingPhones } from "../actions";

import Notification from "./Notification";
import PhoneComponent from "./PhoneComponent";

function DashboardComponent(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const phones = useSelector((state) => state.phones);
  const jwt = useSelector((state) => state.jwt);

  useEffect(() => {
    dispatch(startGettingPhones(user.user_id, jwt));
  }, [dispatch, user.user_id, jwt]);

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

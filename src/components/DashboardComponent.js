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
    dispatch(startGettingPhones(jwt));
  }, [dispatch, jwt]);

  const handleEditUserClick = () => {};

  const handleDeleteUserClick = () => {};

  const handleEditPhoneClick = () => {};

  const handleDeletePhoneClick = () => {};

  const createPhones = () => {
    return phones.map((phone) => (
      <PhoneComponent
        key={phone.software_id}
        phone={phone}
        handleDelete={handleDeletePhoneClick}
        handleEdit={handleEditPhoneClick}
        history={props.history}
      />
    ));
  };

  return (
    <div className="admin">
      <div className="container">
        <Notification></Notification>
        <div className="scroll">
         {phones ? createPhones() : <></>}
        </div>
      </div>
    </div>
  );
}

export default withRouter(DashboardComponent);

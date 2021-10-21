import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import Notification from "./Notification";
import PhoneComponent from "./PhoneComponent";

function DashboardComponent(props) {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.jwt);

  let phones = [
    {
      phone_id: 1,
      user_id: 1,
      name: "Main Cell Phone",
      phone_number: "715-382-6526",
      latitude: "44.7956",
      longitude: "-91.5039",
      tracking: "Active",
      status: "",
    },
    {
      phone_id: 2,
      user_id: 1,
      name: "Secondary Cell Phone",
      phone_number: "715-555-1234",
      latitude: "44.8716",
      longitude: "-91.9267",
      tracking: "None",
      status: "",
    },
    {
      phone_id: 3,
      user_id: 1,
      name: "Wifi Phone Back Home",
      phone_number: "715-555-5433",
      latitude: "20.5937",
      longitude: "78.9629",
      tracking: "None",
      status: "Stolen!",
    },
  ];

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
      <div className="flex justify-content-between align-items-center my-2">
        {phones ? createPhones() : <></>}
      </div>
    </div>
  );
}

export default withRouter(DashboardComponent);

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {
  startGettingPhones,
  startEditingPhone,
  startDeletingPhone,
} from "../actions";

import Notification from "./Notification";
import PhoneComponent from "./PhoneComponent";
import ErrorModal from "./ErrorModal";
import ConfirmModal from "./ConfirmModal";
import PhoneModal from "./PhoneModal";

function DashboardComponent(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const phones = useSelector((state) => state.phones);
  const jwt = useSelector((state) => state.jwt);
  const [errorMessage, setErrorMessage] = useState("");
  const [deletePhoneMessage, setDeletePhoneMessage] = useState("");
  const [displayErrorOpen, setDisplayErrorOpen] = useState(false);
  const [editPhoneOpen, setEditPhoneOpen] = useState(false);
  const [deletePhoneOpen, setDeletePhoneOpen] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState({
    software_id: "",
    user_id: -1,
    name: "",
    phone_num: "",
    latitude: -1,
    longitude: -1,
    tracking_state: -1,
    last_tracked: -1,
    stolen_state: -1,
    sim_removed: -1,
  });

  useEffect(() => {
    dispatch(startGettingPhones(jwt));
  }, [dispatch, jwt]);

  const handleLocatePhoneClick = (phone) => {
    setSelectedPhone(phone);
    if (phone.latitude === -1 && phone.longitude === -1) {
      setErrorMessage(
        "This phone has not been tracked yet. Please enable tracking on the website or enable location services on your device."
      );
      setDisplayErrorOpen(true);
    } else if (phone.software_id !== "") {
      props.history.push(`map/${phone.latitude}/${phone.longitude}`);
    } else {
      setErrorMessage("Please select a phone to locate.");
      setDisplayErrorOpen(true);
    }
  };

  const handleEditPhoneClick = (phone) => {
    setSelectedPhone(phone);
    if (phone.software_id !== "") {
      setEditPhoneOpen(true);
    } else {
      setErrorMessage("Please select a phone to edit.");
      setDisplayErrorOpen(true);
    }
  };

  const handleEditPhoneClose = () => {
    setEditPhoneOpen(false);
  };

  const handleEditPhone = (
    software_id,
    name,
    phone_num,
    latitude,
    longitude,
    tracking_state,
    last_tracked,
    stolen_state,
    sim_removed
  ) => {
    dispatch(
      startEditingPhone(
        software_id,
        name,
        phone_num,
        latitude,
        longitude,
        tracking_state,
        last_tracked,
        stolen_state,
        sim_removed,
        jwt
      )
    );
    setSelectedPhone({
      software_id: "",
      user_id: -1,
      name: "",
      phone_num: "",
      latitude: -1,
      longitude: -1,
      tracking_state: -1,
      last_tracked: -1,
      stolen_state: -1,
      sim_removed: -1,
    });
    setEditPhoneOpen(false);
  };

  const handleDeletePhoneClick = (phone) => {
    setSelectedPhone(phone);
    if (phone.software_id !== "") {
      setDeletePhoneMessage("Are use sure you want to delete this phone?");
      setDeletePhoneOpen(true);
    } else {
      setErrorMessage("Please select a phone to delete.");
      setDisplayErrorOpen(true);
    }
  };

  const handleDeletePhoneClose = () => {
    setDeletePhoneOpen(false);
  };

  const handleDeletePhone = () => {
    dispatch(startDeletingPhone(selectedPhone.software_id, jwt));
    setSelectedPhone({
      software_id: "",
      user_id: -1,
      name: "",
      phone_num: "",
      latitude: -1,
      longitude: -1,
      tracking_state: -1,
      last_tracked: -1,
      stolen_state: -1,
      sim_removed: -1,
    });
    setDeletePhoneOpen(false);
  };

  const handleDisplayErrorClose = () => {
    setDisplayErrorOpen(false);
  };

  const createPhones = () => {
    return phones.map((phone) => (
      <PhoneComponent
        key={phone.software_id}
        phone={phone}
        handleDelete={handleDeletePhoneClick}
        handleEdit={handleEditPhoneClick}
        handleMap={handleLocatePhoneClick}
      />
    ));
  };

  return (
    <>
      <ErrorModal
        open={displayErrorOpen}
        onClose={handleDisplayErrorClose}
        onSubmit={handleDisplayErrorClose}
        title="Warning!"
        message={errorMessage}
      />

      <ConfirmModal
        open={deletePhoneOpen}
        onClose={handleDeletePhoneClose}
        onSubmit={handleDeletePhone}
        title={"Confirm Phone Deletion"}
        message={deletePhoneMessage}
      />

      <PhoneModal
        phone={selectedPhone}
        open={editPhoneOpen}
        onClose={handleEditPhoneClose}
        onSubmit={handleEditPhone}
        title="Edit Phone"
      />
      <div className="admin">
        <div className="container">
          <Notification></Notification>
          <div className="scroll">
            {phones.length > 0 ? (
              createPhones()
            ) : (
              <>
                <h1>No phones found!</h1>
                <h3>
                  To add a phone, download the android app and login to your
                  account.
                  <a href="/files/fmya.apk">
                    <span className="link">Download here!</span>
                  </a>
                </h3>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(DashboardComponent);

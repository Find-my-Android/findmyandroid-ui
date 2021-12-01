import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../styles/modal.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";

import { startEditingPhoneAdmin, startDeletingPhoneAdmin } from "../actions";

import ErrorModal from "./ErrorModal";
import ConfirmModal from "./ConfirmModal";
import PhoneModal from "./PhoneModal";

function PhoneTableModal(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(props.open);
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

  const phoneColumns = [
    // { dataField: "software_id", text: "software_id" },
    { dataField: "name", text: "Name", sort: true },
    { dataField: "phone_num", text: "Number" },
    { dataField: "latitude", text: "Latitude" },
    { dataField: "longitude", text: "Longitude" },
    {
      dataField: "tracking_state",
      text: "Tracking",
      formatter: (cell, row) => (cell === 1 ? "On" : "Off"),
    },
    {
      dataField: "last_tracked",
      text: "Last Tracked",
      sort: true,
      formatter: (cell, row) => new Date(cell).toLocaleString(),
    },
    {
      dataField: "stolen_state",
      text: "Stolen",
      formatter: (cell, row) => (cell === 1 ? "Yes" : "No"),
    },
    {
      dataField: "sim_removed",
      text: "Sim Card Removed",
      formatter: (cell, row) => (cell === 1 ? "Yes" : "No"),
    },
  ];

  const phoneSelect = {
    mode: "radio",
    classes: "selectedRow",
    hideSelectColumn: true,
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setSelectedPhone(row);
    },
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit();
  };

  const handleLocatePhoneClick = () => {
    if (selectedPhone.software_id !== "") {
      props.history.push(
        `map/${selectedPhone.latitude}/${selectedPhone.longitude}`
      );
    } else {
      setErrorMessage("Please select a phone to locate.");
      setDisplayErrorOpen(true);
    }
  };

  const handleEditPhoneClick = () => {
    if (selectedPhone.software_id !== "") {
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
      startEditingPhoneAdmin(
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

  const handleDeletePhoneClick = () => {
    if (selectedPhone.software_id !== "") {
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
    dispatch(startDeletingPhoneAdmin(selectedPhone.software_id, jwt));
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

      <Modal
        show={open}
        onHide={handleClose}
        size="lg"
        aria-labelledby="category-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="camera-modal">{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BootstrapTable
            bootstrap4
            keyField="software_id"
            data={props.phones}
            columns={phoneColumns}
            noDataIndication="No phones found"
            selectRow={phoneSelect}
            rowClasses="tableRow"
          />
          <div>
            <span className="mr-2">
              <Button
                type="button"
                className="btn btn-info"
                onClick={handleLocatePhoneClick}
              >
                Show Phone Location
              </Button>
            </span>
            <span className="mr-2">
              <Button
                type="button"
                className="btn btn-warning"
                onClick={handleEditPhoneClick}
              >
                Edit Phone
              </Button>
            </span>
            <span className="mr-2">
              <Button
                type="button"
                className="btn btn-danger"
                onClick={handleDeletePhoneClick}
              >
                Delete Phone
              </Button>
            </span>
            <span className="float-right">
              <Button
                type="button"
                className="btn btn-danger"
                onClick={handleClose}
              >
                Close
              </Button>
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PhoneTableModal;

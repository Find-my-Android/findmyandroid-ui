import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../styles/modal.css";
import BootstrapTable from "react-bootstrap-table-next";

function PhoneTableModal(props) {
  const [open, setOpen] = useState(props.open);
  const [selectedPhone, setSelectedPhone] = useState({
    imei: "",
    user_id: -1,
    phone_num: "",
    latitude: -1,
    longitude: -1,
    tracking_state: -1,
    last_tracked: -1,
    stolen_state: -1,
    sim_removed: -1,
  });

  const phoneColumns = [
    // { dataField: "imei", text: "IMEI" },
    { dataField: "name", text: "Name", sort: true },
    { dataField: "phone_num", text: "Number" },
    { dataField: "latitude", text: "Latitude" },
    { dataField: "longitude", text: "Longitude" },
    {
      dataField: "tracking_state",
      text: "Tracking",
      formatter: (cell, row) => (cell === 1 ? "Yes" : "No"),
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

  return (
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
          keyField="imei"
          data={props.phones}
          columns={phoneColumns}
          noDataIndication="No phones found"
          selectRow={phoneSelect}
          rowClasses="tableRow"
        />
        <div>
          <Button
            className="float-right"
            type="submit"
            variant="danger"
            onClick={handleSubmit}
          >
            Close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PhoneTableModal;

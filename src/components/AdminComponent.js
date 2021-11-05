import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGettingUsers, startGettingPhones } from "../actions";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "../styles/table.css";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faMap } from "@fortawesome/free-regular-svg-icons";
import Notification from "./Notification";

function AdminComponent(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const phones = useSelector((state) => state.phones);
  const jwt = useSelector((state) => state.jwt);
  const user = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState({
    user_id: -1,
    first_name: "",
    last_name: "",
    primary_num: "",
    secondary_num: "",
    email: "",
    account_type: -1,
  });

  const phoneOptions = {
    sizePerPage: 8,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };

  const userColumns = [
    { dataField: "user_id", text: "Id", sort: true },
    { dataField: "first_name", text: "First Name", sort: true },
    { dataField: "last_name", text: "Last Name", sort: true },
    { dataField: "primary_num", text: "Primary Number" },
    { dataField: "secondary_num", text: "Secondary Number" },
    { dataField: "email", text: "Email" },
    {
      dataField: "account_type",
      text: "Account Type",
      sort: true,
      formatter: (cell, row) => (cell === 1 ? "Admin" : "User"),
    },
  ];

  const userSelect = {
    mode: "radio",
    classes: "selectedRow",
    hideSelectColumn: true,
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setSelectedUser(row);
    },
  };

  const phoneColumns = [
    // { dataField: "imei", text: "IMEI" },
    { dataField: "name", text: "Name" },
    { dataField: "phone_num", text: "Number" },
    { dataField: "latitude", text: "Latitude" },
    { dataField: "longitude", text: "Longitude" },
    {
      dataField: "tracking_state",
      text: "Tracking",
      formatter: (cell, row) => (cell === 1 ? "Yes" : "No"),
    },
    { dataField: "last_tracked", text: "Last Tracked" },
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
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => (
        <FontAwesomeIcon icon={faMap} className="icon" onClick={handleMap} />
      ),
    },
  ];

  useEffect(() => {
    dispatch(startGettingUsers(jwt));
    dispatch(startGettingPhones(selectedUser.user_id, jwt));
  }, [dispatch, selectedUser.user_id, jwt]);

  const handleMap = (latitude, longitude) => {};

  const getPhoneTableStatus = () => {
    return selectedUser.user_id === -1
      ? "Please select a user"
      : "User does not own any phones";
  };

  return (
    <div className="container mainContainer">
      <Notification></Notification>
      <div className="flex justify-content-between align-items-center my-2">
        <h1>Users</h1>
        <BootstrapTable
          bootstrap4
          keyField="user_id"
          data={users}
          columns={userColumns}
          noDataIndication="No users found"
          selectRow={userSelect}
          rowClasses="tableRow"
        />
        <span>
          <Button type="submit">Display Phones</Button>
        </span>
        <span>
          <Button type="submit">Edit User</Button>
        </span>
        <span>
          <Button type="submit">Delete User</Button>
        </span>
      </div>
      {/* <div className="flex justify-content-between align-items-center my-2">
        <h1>Phones</h1>
        <BootstrapTable
          keyField="imei"
          data={phones}
          columns={phoneColumns}
          pagination={paginationFactory(phoneOptions)}
          noDataIndication={getPhoneTableStatus()}
        />
      </div> */}
    </div>
  );
}

export default AdminComponent;

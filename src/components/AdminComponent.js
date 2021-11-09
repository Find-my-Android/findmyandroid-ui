import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startGettingUsers,
  startGettingPhones,
  startEditingUserAdmin,
} from "../actions";
import BootstrapTable from "react-bootstrap-table-next";
import "../styles/table.css";
import Button from "react-bootstrap/Button";
import Notification from "./Notification";
import UserModal from "./UserModal";
import ErrorModal from "./ErrorModal";
import PhoneTableModal from "./PhoneTableModal";

function AdminComponent(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const phones = useSelector((state) => state.phones);
  const jwt = useSelector((state) => state.jwt);
  const user = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorOpen, setDisplayErrorOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [displayPhonesOpen, setDisplayPhonesOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    user_id: -1,
    first_name: "",
    last_name: "",
    primary_num: "",
    secondary_num: "",
    email: "",
    account_type: -1,
    last_used: "",
  });

  const userColumns = [
    { dataField: "user_id", text: "Id", sort: true },
    { dataField: "first_name", text: "First Name", sort: true },
    { dataField: "last_name", text: "Last Name", sort: true },
    { dataField: "email", text: "Email" },
    { dataField: "primary_num", text: "Primary Number" },
    { dataField: "secondary_num", text: "Secondary Number" },
    {
      dataField: "account_type",
      text: "Account Type",
      sort: true,
      formatter: (cell, row) => (cell === 1 ? "Admin" : "User"),
    },
    {
      dataField: "last_used",
      text: "Last Used",
      sort: true,
      formatter: (cell, row) => new Date(cell).toLocaleString(),
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

  useEffect(() => {
    dispatch(startGettingUsers(jwt));
  }, [dispatch, jwt]);

  const handleDisplayErrorClose = () => {
    setDisplayErrorOpen(false);
  };

  const handleDisplayPhonesClick = () => {
    if (selectedUser.user_id !== -1) {
      dispatch(startGettingPhones(selectedUser.user_id, jwt));
      setDisplayPhonesOpen(true);
    } else {
      setErrorMessage("Please select a user to view phones.");
      setDisplayErrorOpen(true);
    }
  };

  const handleDisplayPhonesClose = () => {
    setDisplayPhonesOpen(false);
  };

  const handleEditUserClick = () => {
    if (selectedUser.user_id !== -1) {
      setEditUserOpen(true);
    } else {
      setErrorMessage("Please select a user to edit.");
      setDisplayErrorOpen(true);
    }
  };

  const handleEditUserClose = () => {
    setEditUserOpen(false);
  };

  const handleEditUser = (
    user_id,
    first_name,
    last_name,
    email,
    primary_num,
    secondary_num,
    account_type,
    last_used
  ) => {
    dispatch(
      startEditingUserAdmin(
        user_id,
        first_name,
        last_name,
        email,
        primary_num,
        secondary_num,
        account_type,
        last_used,
        jwt
      )
    );
    setSelectedUser({
      user_id: user_id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      primary_num: primary_num,
      secondary_num: secondary_num,
      account_type: account_type,
      last_used: last_used,
    });
    setEditUserOpen(false);
  };

  return (
    <div className="a">
      <div className="container">
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

          <ErrorModal
            open={displayErrorOpen}
            onClose={handleDisplayErrorClose}
            onSubmit={handleDisplayErrorClose}
            title="Warning!"
            message={errorMessage}
          />

          <UserModal
            user={selectedUser}
            open={editUserOpen}
            onClose={handleEditUserClose}
            onSubmit={handleEditUser}
            title="Edit User"
          />

          <PhoneTableModal
            phones={phones}
            open={displayPhonesOpen}
            onClose={handleDisplayPhonesClose}
            onSubmit={handleDisplayPhonesClose}
            title={
              selectedUser.first_name +
              " " +
              selectedUser.last_name +
              "'s Phones"
            }
          />

          <div className="buttonRow">
            <span className="mr-2">
              <Button
                type="button"
                className="btn btn-info"
                onClick={handleDisplayPhonesClick}
              >
                Display Phones
              </Button>
            </span>
            <span className="mr-2">
              <Button
                type="button"
                className="btn btn-warning"
                onClick={handleEditUserClick}
              >
                Edit User
              </Button>
            </span>
            <span>
              <Button type="button" className="btn btn-danger">
                Delete User
              </Button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminComponent;

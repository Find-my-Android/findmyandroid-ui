import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { startGettingUsers, startGettingPhones } from "../actions";

import Notification from "./Notification";
import UserRow from "./UserRow";
import PhoneRow from "./PhoneRow";

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
    email: "",
    primary: "",
    secondary: "",
    type: "",
    password: "",
  });

  const [selectedPhone, setSelectedPhone] = useState({
    phone_id: -1,
    user_id: -1,
    phone_number: "",
    latitude: "",
    longitude: "",
  });

  const [editUserOpen, setEditUserOpen] = useState(false);
  const [editPhoneOpen, setEditPhoneOpen] = useState(false);

  useEffect(() => {
    dispatch(startGettingUsers(jwt));
    dispatch(startGettingPhones(selectedUser.user_id, jwt));
  }, [dispatch, user.user_id, jwt]);

  const handleEditUserClick = () => {};

  const handleDeleteUserClick = () => {};

  const handleEditPhoneClick = () => {};

  const handleDeletePhoneClick = () => {};

  const createUserRows = () => {
    return users.map((user) => (
      <UserRow
        key={user.user_id}
        user={user}
        handleDelete={handleDeleteUserClick}
        handleEdit={handleEditUserClick}
      />
    ));
  };

  const createPhoneRows = () => {
    return phones.map((phone) => (
      <PhoneRow
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
        <h1>Users</h1>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Primary Number</th>
              <th>Secondary Number</th>
              <th>Email</th>
              <th>Account Type</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{users ? createUserRows() : <></>}</tbody>
        </Table>
      </div>
      <div className="flex justify-content-between align-items-center my-2">
        <h1>User's Phones</h1>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Phone Id</th>
              <th>Phone Name</th>
              <th>Phone Number</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Tracking</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{phones ? createPhoneRows() : <></>}</tbody>
        </Table>
      </div>
    </div>
  );
}

export default AdminComponent;

import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import Notification from "./Notification";
import UserRow from "./UserRow";
import PhoneRow from "./PhoneRow";

function AdminComponent(props) {
  const dispatch = useDispatch();
  //const users = useSelector((state) => state.users);
  //const phones = useSelector((state) => state.phones);
  const jwt = useSelector((state) => state.jwt);
  //const user = useSelector((state) => state.user);

  let users = [
    {
      user_id: 1,
      first_name: "Jonas",
      last_name: "Kohls",
      email: "kohlsjw3656@uwec.edu",
      primary_number: "715-382-6526",
      type: "Admin",
      password: "C00lP@ssWord",
    },
    {
      user_id: 2,
      first_name: "Madison",
      last_name: "Deleon",
      email: "deleonmp7478@uwec.edu",
      primary_number: "715-555-1234",
      type: "User",
      password: "987654321",
    },
    {
      user_id: 3,
      first_name: "Nuo",
      last_name: "Xu",
      email: "xun9991@uwec.edu",
      primary_number: "715-555-5555",
      type: "Admin",
      password: "123456",
    },
  ];

  let phones = [
    {
      phone_id: 1,
      user_id: 1,
      name: "Main Cell Phone",
      phone_number: "715-382-6526",
      secondary_number: "715-874-6448",
      latitude: "44.7956° N",
      longitude: "91.5039° W",
      status: "Stolen",
    },
    {
      phone_id: 2,
      user_id: 1,
      name: "Secondary Cell Phone",
      phone_number: "715-555-1234",
      secondary_number: "715-874-6448",
      latitude: "44.8716° N",
      longitude: "91.9267° W",
      stable: "Normal",
    },
  ];

  const [selectedUser, setSelectedUser] = useState({
    user_id: -1,
    first_name: "",
    last_name: "",
    email: "",
    primary_number: "",
    type: "",
    password: "",
  });

  const [selectedPhone, setSelectedPhone] = useState({
    phone_id: -1,
    user_id: -1,
    phone_number: "",
    secondary_number: "",
    latitude: "",
    longitude: "",
  });

  const [editUserOpen, setEditUserOpen] = useState(false);
  const [editPhoneOpen, setEditPhoneOpen] = useState(false);

  // useEffect(() => {
  //   dispatch(startGettingUsers(jwt));
  //   dispatch(startGettingPhones(user.user_id, jwt));
  // }, [dispatch, user.user_id, jwt]);

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
              <th>Email</th>
              <th>Primary Number</th>
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
              <th>Secondary Number</th>
              <th>Latitude</th>
              <th>Longitude</th>
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

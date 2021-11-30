import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

import { startEditingUser, AddNotification } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import "../styles/account.css";

function Account({ history }) {
  const authenticated = useSelector((state) => state.authenticated);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [user_firstname, changeFirstName] = useState("");
  const [user_lastname, changeLastName] = useState("");
  const [primary, changeprimary] = useState("");
  const [secondary, changesecondary] = useState("");
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");

  const onChange = (event) => {
    event.preventDefault();
    dispatch(
      startEditingUser(
        user_firstname,
        user_lastname,
        primary,
        secondary,
        email,
        password,
        history
      )
    );
  };


  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  });

  return (
    <>
      <SideBar history={history} active="account" />
      <div className="admin">
        <div className="a2">
            <Form onSubmit={onChange} className="inline">
              <Form.Group controlId="changeFirstName">
                <Form.Label className="inline">First name : </Form.Label>
                <Form.Control
                  className="textbar-a"
                  required
                  type="text"
                  value={user_firstname}
                  placeholder={user.first_name}
                  onChange={(e) => changeFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="changeLastName">
                <Form.Label className="inline">Last name : </Form.Label>
                <Form.Control
                  className="textbar-b"
                  required
                  type="text"
                  value={user_lastname}
                  placeholder={user.last_name}
                  onChange={(e) => changeLastName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="changeprimary">
                <Form.Label className="inline">Primary number : </Form.Label>
                <Form.Control
                  className="textbar-c"
                  required
                  type="text"
                  value={primary}
                  placeholder={user.primary_num}
                  onChange={(e) => changeprimary(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="changesecondary">
                <Form.Label className="inline">Secondary number : </Form.Label>
                <Form.Control
                  required
                  className="textbar-d"
                  type="text"
                  value={secondary}
                  placeholder={user.secondary_num}
                  onChange={(e) => changesecondary(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="changeEmail">
                <Form.Label className="inline">Email : </Form.Label>
                <Form.Control
                  className="textbar-e"
                  required
                  type="email"
                  value={email}
                  placeholder={user.email}
                  onChaneg={(e) => changeEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="changePassword">
                <Form.Label className="inline">Password : </Form.Label>
                <Form.Control
                  className="textbar"
                  required
                  type="password"
                  value={password}
                  placeholder={password}
                  onChange={(e) => changePassword(e.target.value)}
                />
              </Form.Group>
              <div>
                <Button type="submit">Edit information</Button>
              </div>

            </Form>
          </div>
      </div>
    </>
  );
}

export default withRouter(Account);

import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Form from "react-bootstrap/Form";

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
  const [primary_number, changePrimary_number] = useState("");
  const [secondary_number, changeSecondary_number] = useState("");
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");

  const onChange = (event) => {
    event.preventDefault();
    dispatch(startEditingUser(user_firstname, user_lastname, primary_number, secondary_number, email, password, history));
  };

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  });

  return (
    <>
      <SideBar history={history} active="account" />
      <div className="a">
        <div className="a1">
          {user.first_name} {user.last_name}
          <div className="a2">
            <Form onChange={onChange} className="inline">
              <Form.Group controlId="changeFirstName">
                <Form.Label className="inline">First name : </Form.Label>
                <Form.Control
                  className="textbar"
                  required
                  type="text"
                  value="Jonas" // {user_firstName}
                  onChange={(e) => changeFirstName(e.target.value)}
                />
              </Form.Group>
              <onClick type="submit" className="change">
                Change First name
              </onClick>
              <Form.Group controlId="changeLastName">
                <Form.Label className="inline">Last name : </Form.Label>
                <Form.Control
                  className="textbar"
                  required
                  type="text"
                  value="Kohls" // {user_lastName}
                  onChange={(e) => changeLastName(e.target.value)}
                />
              </Form.Group>
              <onClick type="submit" className="change">
                Change Last name
              </onClick>
              <Form.Group controlId="changePrimary_number">
                <Form.Label className="inline">Primary number : </Form.Label>
                <Form.Control
                  className="textbar"
                  required
                  type="text"
                  value="715-382-6526" // {primary_number}
                  onChange={(e) => changePrimary_number(e.target.value)}
                />
              </Form.Group>
              <onClick type="submit" className="change">
                Change Primary number
              </onClick>
              <Form.Group controlId="changeSecondary_number">
                <Form.Label className="inline">Secondary number : </Form.Label>
                <Form.Control
                  className="textbar"
                  required
                  type="text"
                  value="715-874-6448" // {secondary_number}
                  onChange={(e) => changeSecondary_number(e.target.value)}
                />
              </Form.Group>
              <onClick type="submit" className="change">
                Change Secondary number
              </onClick>
              <Form.Group controlId="changeEmail">
                <Form.Label className="inline">Email : </Form.Label>
                <Form.Control
                  className="textbar"
                  required
                  type="email"
                  value="kohlsjw3656@uwec.edu" // {email}
                  onChaneg={(e) => changeEmail(e.target.value)}
                />
              </Form.Group>
              <onClick type="submit" className="change">
                Change Email
              </onClick>
              <Form.Group controlId="changePassword">
                <Form.Label className="inline">Password : </Form.Label>
                <Form.Control
                  className="textbar"
                  required
                  type="password"
                  value="*************" // {password}
                  onChange={(e) => changePassword(e.target.value)}
                />
              </Form.Group>
              <onClick type="submit" className="change">
                Change Password
              </onClick>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(Account);

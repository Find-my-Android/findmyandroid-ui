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
  const [userName, changeName] = useState("");
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");

  const onChange = (event) => {
    event.preventDefault();
    dispatch(startEditingUser(userName, email, password, history));
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
              <Form.Group controlId="changeName">
                <Form.Label className="inline">Name : </Form.Label>
                <Form.Control
                  className="textbar"
                  required
                  type="text"
                  value="John Smith" // {userName}
                  onChange={(e) => changeName(e.target.value)}
                />
              </Form.Group>
              <onClick type="submit" className="change">
                Change Name
              </onClick>
              <Form.Group controlId="changeEmail">
                <Form.Label className="inline">Email : </Form.Label>
                <Form.Control
                  className="textbar"
                  required
                  type="email"
                  value="jsmith@gmail.com" // {email}
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

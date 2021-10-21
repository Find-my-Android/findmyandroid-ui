import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { startLoggingInUser } from "../actions";
import Notification from "../components/Notification";

import "../styles/home.css"

function Home({ history }) {
  console.log(history);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (event) => {
    event.preventDefault();
    dispatch(startLoggingInUser(email, password, history));
  };

  return (
    <div className="home">
      <Notification></Notification>
      <h1>
        F<span class="logoText">ind</span> M<span class="logoText">y</span> A
        <span class="logoText">ndroid Login</span>
      </h1>
      <Form onSubmit={onLogin}>
        <Form.Group controlId="loginEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="loginPassword">
          <Form.Label>
            Password
            <Link to="/forgotpassword">
              <span className="link">(Forgot Password)</span>
            </Link>
          </Form.Label>
          <Form.Control
            required
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

      <div>
      <p className="inline">
        Don't have an account?
        <Link to="/signup">
          <span className="link">Sign up here!</span>
        </Link>
      </p>
      <div className="c">
      <Button type="submit">Login</Button>
      </div>
      </div>
      </Form>
    </div>
  );
}

export default withRouter(Home);

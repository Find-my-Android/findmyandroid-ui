import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { startLoggingInUser } from "../actions";
import Notification from "../components/Notification";

function Home({ history }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (event) => {
    event.preventDefault();
    dispatch(startLoggingInUser(email, password, history));
  };

  return (
    <div id="homeRoot">
      <Notification></Notification>
      <h1>
        F<span class="logoText">ind</span> M<span class="logoText">y</span> A
        <span class="logoText">ndroid Login</span>
      </h1>
      <Form onSubmit={onLogin}>
        <Form.Group controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Login</Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/signup">
          <span className="logoText">Sign up here!</span>
        </Link>
      </p>
    </div>
  );
}

export default withRouter(Home);

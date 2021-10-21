import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startAddingUser, AddNotification } from "../actions";
import { Link, withRouter } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Notification from "../components/Notification";

function Signup({ history }) {
  const dispatch = useDispatch();
  const recaptchaRef = React.createRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const validatePasswords = (e) => {
    if (password1 !== e.target.value) {
      e.target.setCustomValidity("Passwords do not match");
    } else {
      e.target.setCustomValidity("");
    }
  };

  const onSignup = (event) => {
    event.preventDefault();
    const recaptchaValue = recaptchaRef.current.getValue();
    if (recaptchaValue === "") {
      dispatch(
        AddNotification({
          type: "danger",
          message: "Please verify you are not a robot.",
        })
      );
    } else {
      dispatch(startAddingUser(firstName, lastName, email, password2, history));
    }
  };

  return (
    <div>
      <Notification></Notification>
      <h1>
        F<span class="logoText">ind</span> M<span class="logoText">y</span> A
        <span class="logoText">ndroid Sign up</span>
      </h1>
      <Form onSubmit={onSignup}>
        <Form.Group controlId="signupFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="signupLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="signupPhone1">
          <Form.Label>Primary Phone Number</Form.Label>
          <Form.Control
            required
            type="text"
            value={phone1}
            onChange={(e) => setPhone1(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="signupPhone2">
          <Form.Label>Secondary Phone Number</Form.Label>
          <Form.Control
            type="text"
            value={phone2}
            onChange={(e) => setPhone2(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="signupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="signupPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="signupPassword2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
              validatePasswords(e);
            }}
          />
        </Form.Group>
        <ReCAPTCHA
          required
          ref={recaptchaRef}
          sitekey="6LeXDMgcAAAAAPjWUEhJ0ioTXQhwDV9WlRzfJBA3"
        />
        <Button type="submit">Signup</Button>
      </Form>
      <p>
        Have an account?
        <Link to="/">
          <span className="logoText">Login here!</span>
        </Link>
      </p>
    </div>
  );
}

export default withRouter(Signup);

import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Notification from "../components/Notification";
import { startSendingEmail } from "../actions";

function Forgotpassword({ history }) {
  console.log(history);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const onForgotPassword = (event) => {
    event.preventDefault();
    //dispatch(startSendingEmail(email, history));
    history.push("/resetpassword");
  };

  return (
    <div>
      <Notification></Notification>
      <h1>Forgot Password</h1>
      <Form onSubmit={onForgotPassword}>
        <Form.Group controlId="Enter Email Address">
          <Form.Label>Enter Your Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Continue</Button>
      </Form>
      <p>
        Remember your password?
        <Link to="/">
          <span className="link">Login here!</span>
        </Link>
      </p>
    </div>
  );
}

export default withRouter(Forgotpassword);

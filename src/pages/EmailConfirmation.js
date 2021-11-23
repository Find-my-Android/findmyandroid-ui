import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  useParams,
  withRouter,
} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Notification from "../components/Notification";

import "../styles/home.css";

function EmailConfirmation({ history }) {
  return (
    <>
      <Notification></Notification>
      <div className="home">
        <h1>An email has been sent!</h1>
        <p>Check your spam folder</p>
        <p className="inline">
          <Link to="/">
            <span className="logoText">Return to homepage</span>
          </Link>
        </p>
      </div>
    </>
  );
}

export default withRouter(EmailConfirmation);

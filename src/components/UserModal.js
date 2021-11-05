import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/modal.css";

function UserModal(props) {
  const [open, setOpen] = useState(props.open);
  const [firstName, setFirstName] = useState(props.user.first_name);
  const [lastName, setLastName] = useState(props.user.last_name);
  const [email, setEmail] = useState(props.user.email);
  const [primaryNum, setPrimaryNum] = useState(props.user.primary_num);
  const [secondaryNum, setSecondaryNum] = useState(props.user.secondary_num);
  const [accountType, setAccountType] = useState(props.user.account_type);

  useEffect(() => {
    setOpen(props.open);
    setFirstName(props.user.first_name);
    setLastName(props.user.last_name);
    setEmail(props.user.email);
    setPrimaryNum(props.user.primary_num);
    setSecondaryNum(props.user.secondary_num);
    setAccountType(props.user.account_type);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(
      props.user.user_id,
      firstName,
      lastName,
      email,
      primaryNum,
      secondaryNum,
      accountType
    );
  };

  return (
    <Modal
      show={open}
      onHide={handleClose}
      size="lg"
      aria-labelledby="category-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="camera-modal">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Primary Phone Number</Form.Label>
            <Form.Control
              required
              type="text"
              value={primaryNum}
              onChange={(e) => setPrimaryNum(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Secondary Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={secondaryNum}
              onChange={(e) => setSecondaryNum(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Account Type</Form.Label>
            <Form.Control
              required
              as="select"
              value={accountType}
              onChange={(e) => setAccountType(parseInt(e.target.value))}
            >
              <option value="0">User</option>
              <option value="1">Admin</option>
            </Form.Control>
          </Form.Group>
          <Button className="float-right" type="submit" variant="primary">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UserModal;

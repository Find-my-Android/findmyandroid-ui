import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/modal.css";

function PhoneModal(props) {
  const [open, setOpen] = useState(props.open);
  const [name, setName] = useState(props.phone.name);
  const [tracking, setTracking] = useState(props.phone.tracking_state);
  const [stolen, setStolen] = useState(props.phone.stolen_state);

  useEffect(() => {
    setOpen(props.open);
    setName(props.phone.name);
    setTracking(props.phone.tracking_state);
    setStolen(props.phone.stolen_state);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(
      props.phone.software_id,
      name,
      props.phone.phone_num,
      props.phone.latitude,
      props.phone.longitude,
      tracking,
      props.phone.last_tracked,
      stolen,
      props.phone.sim_removed
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
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tracking</Form.Label>
            <Form.Control
              required
              as="select"
              value={tracking}
              onChange={(e) => setTracking(parseInt(e.target.value))}
            >
              <option value="0">Off</option>
              <option value="1">On</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Stolen</Form.Label>
            <Form.Control
              required
              as="select"
              value={stolen}
              onChange={(e) => setStolen(parseInt(e.target.value))}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
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

export default PhoneModal;

import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../styles/modal.css";

function ConfirmModal(props) {
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit();
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
        <h4>{props.message}</h4>
        <div>
          <Button
            className="float-right"
            type="submit"
            variant="danger"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            className="float-right"
            type="submit"
            variant="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmModal;

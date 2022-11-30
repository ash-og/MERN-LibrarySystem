import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteUser = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   Credit @ https://react-bootstrap.github.io/components/modal/

  return (
    <>
      <Button variant="dark md" onClick={handleShow}>
        Delete Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are about to delete your profile. Are you sure you want to continue?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;
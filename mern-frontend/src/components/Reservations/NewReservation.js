import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Message from '../Message';
import { useNavigate } from 'react-router-dom';

const NewReservation = (book) => {
  const [show, setShow] = useState(false);
  const [bookId, setBookId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  const handleClose = () => {
    setBookId('')
    setShow(false);
};
  const handleShow = (book) => {
    setBookId(book._id)
    setShow(true)};

  const handleNewReservation = (bookId) => {

    try {
        fetch(`/reserve/new/${bookId}`, {
            method: "POST",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setStatusMessage('Book reserved');
                setShow(false);
                navigate('/reservations');
            });
    } catch (err) {
        // Remediation logic
        setStatusMessage('There was an error deleting this profile');
        setShow(false);
    }

  }

  //   Credit @ https://react-bootstrap.github.io/components/modal/

  return (
    <>
      <Button variant="btn btn-outline-primary waves-effect px-2" onClick={(event)=>handleShow(event, book)}>
        <i className="bi bi-clock" aria-hidden="true"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are about to delete your profile. Are you sure you want to continue?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleNewReservation}>
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

export default NewReservation;
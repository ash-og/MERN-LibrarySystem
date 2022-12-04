import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Message from '../Message';
import { useNavigate } from 'react-router-dom';
import SearchBooks from '../Searchbar/SearchBooks';

const NewReservation = props => {
  const [show, setShow] = useState(false);
  const [bookId, setBookId] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [resDate, setResDate] = useState(new Date());
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  const current = new Date();
  const today = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  useEffect(()=>{
    if (props.book.copies === 0)
      setIsAvailable(false);
  })

  const handleClose = () => {
    setBookId('');
    setBookTitle('');
    setShow(false);
};
  const handleShow = () => {
    setShow(true);
    setBookId(props.book._id);
    setBookTitle(props.book.title);
};

  const handleDateChange = (event) => {
    event.preventDefault();
    setResDate(event.target.value);
  };

  const handleNewReservation = () => {

    let reservationDate = {
      date: resDate,
    }

    try {
        fetch(`/reserve/new/${bookId}`, {
          method: "POST",
          headers: {
              'Content-Type': "application/json"
          },
          body: JSON.stringify(reservationDate)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setStatusMessage('Book reserved');
                setBookId('');
                setBookTitle('');
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
      <Button variant="btn btn-outline-primary waves-effect px-2"  onClick={handleShow} disabled={!isAvailable}>
        <i className="bi bi-clock" aria-hidden="true"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reserve Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="md-form mb-5">
            <label>Book</label>
            <input className="form-control-plaintext" type="text" value={bookTitle} readOnly={true}/>
            <br/>
            <label data-error="wrong" data-success="right">Pick Up Date</label>
            <br/>
            <input type="date" 
                    id="reservation-date" 
                    className="form-control validate"
                    onChange={handleDateChange}
                    min={today}/>        
          </div>
          <div>
            {statusMessage ? <Message message={statusMessage} /> : null }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleNewReservation}>
            Confirm
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
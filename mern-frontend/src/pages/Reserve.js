import React, {useState,useEffect} from 'react';
import Message from '../components/Message';
import ReserveService from '../Services/ReserveService';
import ReservationItem from '../components/Reservations/ReservationItem';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';

// Credit @ https://github.com/noobcoder1137/MERN-Stack-Authentication-Authorization-JWT/blob/master/client/src/Components/Reservations.js

const Reserve = props =>{
    const [reservations,setReservations] = useState([]);
    const [message,setMessage] = useState(null);
    
    useEffect(()=>{
        ReserveService.getReservations().then(data =>{
            setReservations(data.reservations);
            setMessage(data.message);
        });
    },[]);

    return(        
        <Container>
            <Row>
                <h1>Reserved Books:</h1>
            </Row>
                {
                    reservations.map(reservation =>{
                        console.log(reservation)
                        return <ReservationItem key={reservation._id} reservation={reservation} setReservations={setReservations}/>
                    })
                }
            <br/>
            {message ? <Message message={message}/> : null}
        </Container>
    );

}

export default Reserve;



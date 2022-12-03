import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

const ReservationItem = props =>{

    const handleCancel = (event, reservation) => {
        event.preventDefault();

		let resId = reservation._id;

		try {
			fetch(`/reserve/cancel/${resId}`,{
				method : "DELETE",
			}).then(response=>{
				if(response.status !== 401){
					return response.json().then(data => data);
				}
				else
					return {message : {msgBody : "UnAuthorized"},msgError : true};
			});

		} catch (err) {
			console.log(err);
		} 
        window.location.reload(false); 
    };

    return (
        <>  
            <hr/>
            <Row>
                <Col sm="6">
                    <p className="card-text" >Book </p>
                </Col>
                <Col>
                    <p className="card-text" >Pick-up Date </p>   
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <p className="card-text text-muted">{props.reservation.book.title}</p>                    
                </Col>
                <Col>
                    <p className="card-text text-muted">{props.reservation.date}</p>
                </Col>
                <Col className="text-center">
                    <button type="button" className="btn btn-dark btn-md" onClick={(event)=> handleCancel(event, props.reservation)}>Cancel</button>
                </Col>
            </Row>
            <hr/>
        </>
    )
}

export default ReservationItem;
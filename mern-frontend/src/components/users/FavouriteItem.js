import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

const FavouriteItem = props =>{

    const handleRemove = (event, favourite) => {
        event.preventDefault();

		let faveId = favourite._id;

		try {
			fetch(`/user/favourite/${faveId}`,{
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
                    <p className="card-text" >Title </p>
                </Col>
                <Col>
                    <p className="card-text" >Author </p>   
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <p className="card-text text-muted">{props.favourite.title}</p>                    
                </Col>
                <Col>
                    <p className="card-text text-muted">{props.favourite.author}</p>
                </Col>
                <Col className="text-center">
                    <button type="button" className="btn btn-dark btn-md" onClick={(event)=> handleRemove(event, props.favourite)}>Remove</button>
                </Col>
            </Row>
            <hr/>
        </>
    )
}

export default FavouriteItem;
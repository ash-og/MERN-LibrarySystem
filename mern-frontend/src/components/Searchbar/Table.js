import React, { useContext } from "react";
import styles from './styles.module.css'
import {AuthContext} from "../../Context/AuthContext";
import NewReservation from "../Reservations/NewReservation";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Credit @ https://www.youtube.com/watch?v=_i4Wi43NTDo 

const Table = ({ books }) => {
	const {isAuthenticated} = useContext(AuthContext);

	const handleHeartClick = (event, book) => {
		event.preventDefault();

		let bookId = book._id;

		try {
			fetch(`/user/favourite/${bookId}`,{
				method : "post",
			}).then(response=>{
				if(response.status !== 401){
					return response.json().then(data => data);
				}
				else
					return {message : {msgBody : "UnAuthorized"},msgError : true};
			});

		} catch (err) {
			console.log(err);
		}};

	return (
		<Container>
			<Row className={styles.headingTable}>
				<Col className={styles.title_tab}>Title</Col>
                <Col className={styles.genre_tab}>Author</Col>
				<Col className={styles.genre_tab}>Genre</Col>
				{ !isAuthenticated ?
				null : (
				<>
					<Col className={styles.icon_tab}>Fave</Col>
					<Col className={styles.icon_tab}>Reserve</Col>
				</>
				)}
			</Row>
			{books.map((book) => (
				<Row className={styles.book} key={book._id}>
					<Col className={styles.title_container}>
						<p className={styles.book_title}>
							{book.title} ({book.year})
						</p>
					</Col>
                    <div className={styles.genre_container}>
						{book.author}
					</div>
					<div className={styles.genre_container}>
						{book.genre}
					</div>
					{ !isAuthenticated ? 
					null :	(
					<>
						<div className={styles.icon_container}>
							<button type="button" className="btn btn-outline-primary waves-effect px-2" onClick={(event)=> handleHeartClick(event, book)}><i className="bi bi-heart" aria-hidden="true"></i></button>
						</div>
						{/* <div className={styles.icon_container}>
							<button type="button" className="btn btn-outline-secondary waves-effect px-2"><i className="bi bi-clock" aria-hidden="true"></i></button>
						</div>	 */}
						<div className={styles.icon_container}>
							<NewReservation book={book} />
						</div>
					</>				
					)}
				</Row>
			))}
		</Container>
	);
};

export default Table;
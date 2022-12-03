import React, { useContext } from "react";
import styles from './styles.module.css'
import {AuthContext} from "../../Context/AuthContext";
import NewReservation from "../Reservations/NewReservation";

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
		<div className={styles.container}>
			<div className={styles.headingTable}>
				<p className={styles.title_tab}>Title</p>
                <p className={styles.genre_tab}>Author</p>
				<p className={styles.genre_tab}>Genre</p>
				{ !isAuthenticated ?
				null : (
				<>
					<p className={styles.icon_tab}>Fave</p>
					<p className={styles.icon_tab}>Reserve</p>
				</>
				)}
			</div>
			{books.map((book) => (
				<div className={styles.book} key={book._id}>
					<div className={styles.title_container}>
						<p className={styles.book_title}>
							{book.title} ({book.year})
						</p>
					</div>
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
				</div>
			))}
		</div>
	);
};

export default Table;
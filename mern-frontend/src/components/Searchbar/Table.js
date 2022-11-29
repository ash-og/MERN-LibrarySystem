import styles from './styles.module.css'
import faveImg from '../../assets/heart.svg'

// Credit @ https://www.youtube.com/watch?v=_i4Wi43NTDo 

const Table = ({ books }) => {
	return (
		<div className={styles.container}>
			<div className={styles.headingTable}>
				<p className={styles.title_tab}>Title</p>
                <p className={styles.genre_tab}>Author</p>
				<p className={styles.genre_tab}>Genre</p>
                <p className={styles.genre_tab}>Favourite</p>
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
                    <div className={styles.genre_container}>
						<img src={faveImg} alt="Heart Icon for favourites"/>
					</div>
				</div>
			))}
		</div>
	);
};

export default Table;
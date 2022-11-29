import styles from "./styles.module.css";

// Credit @ https://www.youtube.com/watch?v=_i4Wi43NTDo

const Genre = ({ genres, filterGenre, setFilterGenre }) => {
	const onChange = ({ currentTarget: input }) => {
		if (input.checked) {
			const state = [...filterGenre, input.value];
			setFilterGenre(state);
		} else {
			const state = filterGenre.filter((val) => val !== input.value);
			setFilterGenre(state);
		}
	};

	return (
		<div className={styles.containerGenre}>
			<h1 className={styles.headingGenre}>Filter By Genre</h1>
			<div className={styles.genres_container}>
				{genres.map((genre) => (
					<div className={styles.genre} key={genre}>
						<input
							className={styles.genre_input}
							type="checkbox"
							value={genre}
							onChange={onChange}
						/>
						<p className={styles.genre_label}>{genre}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Genre;
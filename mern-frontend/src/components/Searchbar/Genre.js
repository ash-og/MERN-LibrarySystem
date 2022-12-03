import styles from "./styles.module.css";

// Credit @ https://www.youtube.com/watch?v=_i4Wi43NTDo

const Genre = ({ genres, filterGenre, setFilterGenre }) => {
	const onChange = ({ currentTarget: input }) => {
		setFilterGenre([input.value]);
	};

	return (
		<div className={styles.containerGenre}>
			<p className={styles.sort_by}>Filter By Genre :</p>	
			<div>
				<select
					className="form-select form-select-sm" 
					aria-label=".form-select-sm example"
					onChange={onChange}
					defaultValue={filterGenre}
				>
					<option value={[]}>All</option>
					{genres.map((genre) => (
					<option  key={genre} value={genre}>{genre}</option>
					))}
				</select>
			</div>
		</div>
	)};



export default Genre;
import styles from "./styles.module.css";

// Credit @ https://www.youtube.com/watch?v=_i4Wi43NTDo

const Sort = ({ sort, setSort }) => {
	const onSelectChange = ({ currentTarget: input }) => {
		setSort({ sort: input.value, order: sort.order });
	};

	const onArrowChange = () => {
		if (sort.order === "asc") {
			setSort({ sort: sort.sort, order: "desc" });
		} else {
			setSort({ sort: sort.sort, order: "asc" });
		}
	};

	return (
		<div className={styles.containerSort}>
			<p className={styles.sort_by}>Sort By :</p>
			<select
				className="form-select form-select-sm" 
				aria-label=".form-select-sm example"
				onChange={onSelectChange}
				defaultValue={sort.sort}
			>
				<option value="year">Year</option>
				<option value="author">Author</option>
			</select>
			<button className="btn btn-outline-dark" onClick={onArrowChange}>
				<i className="bi bi-arrow-down-up"></i>
				<i className="bi bi-arrow-up-down"></i>
			</button>
		</div>
	);
};

export default Sort;
import React, {useState, useEffect} from 'react';
import axios from "axios";
import styles from './styles.module.css';
import Message from '../../components/Message';
import Table from './Table';


const SearchBooks = () => {
    const [obj, setObj] = useState({});
    const [sort, setSort] = useState({sort: "author", order: "desc"});
    const [filterGenre, setFilterGenre] = useState([]);
	const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const base_url = `http://localhost:3100/books`

    // useEffect credit @ https://www.youtube.com/watch?v=_i4Wi43NTDo

    useEffect(() => {
        const getAllBooks = async () => {
            try {
                const url = `${base_url}?page=${page}&sort=${sort.sort},${
					sort.order
				}&genre=${filterGenre.toString()}&search=${searchQuery}`;
				const { data } = await axios.get(url);
				setObj(data);
			} catch (err) {
				console.log(err);
                setErrorMessage('There was an error searching for the book');
			}
		};

		getAllBooks();
	}, [sort, filterGenre, page, searchQuery]);

            
    const handleSearchQueryChange = (event) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
    }

    const onClickPage = (newPage) => {
        const totalPages = Math.ceil(obj.total / obj.limit);

		if (newPage < 1) {
            newPage = totalPages;
        } else if (newPage > totalPages) {
            newPage = 1;
        }
        setPage(newPage);
	};

    return(
        <div className="wrapper">
            <div className="container">
                <div className="head">
                    <input type="text" className={styles.search} placeholder="Search..." value={searchQuery} onChange={handleSearchQueryChange}>
                    </input>
                </div>
                <div className="body">
					<div className="table_container">
						<Table books={obj.books ? obj.books : []} />
                        <div className={styles.paginationContainer}>
                            <button className={styles.page_btn}
                                onClick={() => {
                                    onClickPage(page - 1);
                                }}
                            >
                                Prev
                            </button>
                            <button className={styles.page_btn}
                                onClick={() => {
                                    onClickPage(page + 1);
                                }}
                            >
                                Next
                            </button>
                        </div>
					</div>
					<div className="filter_container">
						{/* <Sort sort={sort} setSort={(sort) => setSort(sort)} />
						<Genre
							filterGenre={filterGenre}
							genres={obj.genres ? obj.genres : []}
							setFilterGenre={(genre) => setFilterGenre(genre)}
						/> */}
					</div>
				</div>
                <div>
                    {errorMessage ? <Message message={errorMessage}/> : null}
                </div>
            </div>
        </div>
    );
};

export default SearchBooks;

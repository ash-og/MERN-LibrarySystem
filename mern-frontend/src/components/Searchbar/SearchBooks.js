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
    const [searchResults, setSearchResults] = useState([]);
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

    async function handleSearchBooks(event) {
        event.preventDefault();
        setErrorMessage('');    

        try {
            setSearchResults(obj.books);
        } catch (err) {
            // Remediation logic
            setErrorMessage('There was an error searching for the book');
        }
    }

    return(
        <div className="flex items-center justify-center ">
            <div className="grid grid-flow-row auto-rows-max">
                <div className="flex border-2 border-gray-200 rounded">
                    <input type="text" className={styles.search} placeholder="Search..." value={searchQuery} onChange={handleSearchQueryChange}>
                    </input>
                    <button className="btn btn-primary" onClick={handleSearchBooks}>
                        Search
                    </button>

                </div>
                <div className="body">
					<div className="table_container">
						<Table books={searchResults ? searchResults : []} />
						{/* <Pagination
							page={page}
							limit={obj.limit ? obj.limit : 0}
							total={obj.total ? obj.total : 0}
							setPage={(page) => setPage(page)}
						/> */}
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

import React, {useState} from 'react';
import Message from '../../components/Message';


const SearchBooks = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleSearchQueryChange = (event) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
    }

    async function handleSearchBooks(event) {
        event.preventDefault();
        setErrorMessage('');   
        

        try {
            fetch(`http://localhost:3100/books?search=${searchQuery}`)
                .then(response => response.json())
                .then(data => {
                    setSearchResults(data.books);
                });
        } catch (err) {
            // Remediation logic
            setErrorMessage('There was an error searching for the book');
        }
    }

    return(
        <div className="flex items-center justify-center ">
            <div className="grid grid-flow-row auto-rows-max">
                <div className="flex border-2 border-gray-200 rounded">
                    <input type="text" className="px-4 py-2 w-80" placeholder="Search..." value={searchQuery} onChange={handleSearchQueryChange}>
                    </input>
                    <button className="px-4 text-white bg-gray-600" onClick={handleSearchBooks}>
                        Search
                    </button>

                </div>
                <div>
                    <form>
                        <table className="table table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Genre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((book) => (
                                    <tr>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.genre}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </form>
                    {errorMessage ? <Message message={errorMessage}/> : null}
                </div>
            </div>
        </div>
    );
};

export default SearchBooks;

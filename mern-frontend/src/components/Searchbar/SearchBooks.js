import React, {useState} from 'react';


const SearchUser = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleSearchQueryChange = (event) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
    }

    async function handleSearchUser(event) {
        event.preventDefault();
        setErrorMessage('');   
        

        try {
            fetch(`http://localhost:3100/books?title=${searchQuery}`)
                .then(response => response.json())
                .then(data => {
                    setSearchResults(data);
                });
        } catch (err) {
            // Remediation logic
            setErrorMessage('There was an error searching for the book');
        }
    }

    // Function to handle my edit event. Sets EditUserId to the user from the edit click

    return(
        <div className="flex items-center justify-center ">
            <div className="grid grid-flow-row auto-rows-max">
                <div className="flex border-2 border-gray-200 rounded">
                    <input type="text" className="px-4 py-2 w-80" placeholder="Search..." value={searchQuery} onChange={handleSearchQueryChange}>
                    </input>
                    <button className="px-4 text-white bg-gray-600" onClick={handleSearchUser}>
                        Search
                    </button>

                </div>
                <div>
                    <form>
                        <table className="table-auto">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                            </tr>
                            </thead>
                            <tbody>
                            {searchResults.map((book) => (
                                <tr>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SearchUser;

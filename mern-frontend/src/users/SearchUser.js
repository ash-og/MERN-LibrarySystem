import React, {Fragment, useState} from 'react';
import EditUser from './EditUser';
import ListUser from './ListUser';


const SearchUser = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [editUserId, setEditUserId] = useState(null);
    const [updateUserData, setUpdateUserData] = useState({
        name: "",
        age: "",
    })
    
    const handleSearchQueryChange = (event) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
    }

    async function handleSearchUser(event) {
        event.preventDefault();
        setErrorMessage('');   
        

        try {
            fetch(`http://localhost:3100/users?name=${searchQuery}`)
                .then(response => response.json())
                .then(data => {
                    setSearchResults(data);
                });
        } catch (err) {
            // Remediation logic
            setErrorMessage('There was an error searching for the user');
        }
    }

    // Function to handle my edit event. Sets EditUserId to the user from the edit click

    const handleEditClick = (event, user) => {
        event.preventDefault();
        setEditUserId(user._id);

        const formValues = {
            name: user.name,
            age: user.age
        }

        setUpdateUserData(formValues);
    };

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
                                <th>Name</th>
                                <th>Age</th>
                            </tr>
                            </thead>
                            <tbody>
                            {searchResults.map((user) => (
                                <Fragment>
                                    { editUserId === user._id ? (
                                        <EditUser editUserId={editUserId}
                                         
                                        setEditUserId={setEditUserId} 
                                        updateUserData={updateUserData} 
                                        setUpdateUserData={setUpdateUserData}                                         
                                        /> 
                                    ) : (
                                        <ListUser 
                                        user={user} 
                                        handleEditClick={handleEditClick}
                                        />
                                    )}                                       
                                </Fragment>
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

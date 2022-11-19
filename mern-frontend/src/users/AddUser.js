import React, {useState} from 'react';

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');

    const handleUsernameFieldChange = (event) => {
        event.preventDefault();
        setUsername(event.target.value);
    }

    const handleEmailFieldChange = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
    }

    const handleCreateUser = async (event) => {
        event.preventDefault();
        setStatusMessage('');

        let user = {
            'username': username,
            'email': email
        };

        try {
            fetch("http://localhost:3100/users", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(user)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setStatusMessage('User ' + user.username + ' created');
                });
        } catch (err) {
            // Remediation logic
            setStatusMessage('There was an error creating the user');
        }
    }

    return(
        <div className="flex flex-col items-center justify-center">
            <div className="lg:w-1/5 md:w-2/5 w-2/5">
                <label className="mt-6">Username</label>
                <input
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                    placeholder=""
                    value={username}
                    onChange={(e) => handleUsernameFieldChange(e)}
                />
                <label className="mt-6">Email</label>
                <input
                    type="text"
                    className="mt-1 w-full rounded-xl border-gray-300 shadow-sm"
                    placeholder=""
                    value={email}
                    onChange={(e) => handleEmailFieldChange(e)}
                />
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCreateUser}>
                    Register
                </button>
                <p className="text-red-900">
                    { statusMessage }
                </p>
            </div>

        </div>
    );
};

export default AddUser

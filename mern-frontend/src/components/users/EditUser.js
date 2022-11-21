import React, {useState} from 'react';

// Returns editable inputs for the selected user 

const EditUser = ({editUserId, setEditUserId, updateUserData, setUpdateUserData}) => {
    const [statusMessage, setStatusMessage] = useState('');

    const handleUpdateUserChange = (event) => {
        event.preventDefault();
        setStatusMessage('');

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value

        const newFormData = { ...updateUserData };
        newFormData[fieldName] = fieldValue

        setUpdateUserData(newFormData);

    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const updatedUser = {
            name: updateUserData.name,
            age: updateUserData.age
        }

        try {
            fetch(`http://localhost:3100/updateuser/${editUserId}`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(updatedUser)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setStatusMessage('User ' + updatedUser.name + ' updated');
                });
        } catch (err) {
            // Remediation logic
            setStatusMessage('There was an error creating the user');
        }

        setEditUserId(null);
    };

    const handleCancelClick = () => {
        setEditUserId(null);
    };

    return (
        <tr>
            <td>
                <input
                    type="text"
                    name="name"
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                    placeholder=""
                    value={updateUserData.name}
                    onChange={handleUpdateUserChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="age"
                    className="mt-1 w-full rounded-xl border-gray-300 shadow-sm"
                    placeholder=""
                    value={updateUserData.age}
                    onChange={handleUpdateUserChange}
                />
            </td>
            <td>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleEditFormSubmit}>
                    Save
                </button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='button' onClick={handleCancelClick}>Cancel</button>
                <p className="text-red-900">
                    { statusMessage }
                </p>
            </td>
        </tr>

    );
};

export default EditUser
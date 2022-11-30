import React from "react";

// Returns read only list of users with an edit button

const UserDetails = ({ user, handleEditToggle }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(event)=> handleEditToggle (event, user)}>Edit</button></td>
        </tr>
    );
};

export default UserDetails
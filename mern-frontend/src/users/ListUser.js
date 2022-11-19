import React from "react";

// Returns read only list of users with an edit button

const ListUser = ({ user, handleEditClick }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(event)=> handleEditClick(event, user)}>Edit</button></td>
        </tr>
    );
};

export default ListUser
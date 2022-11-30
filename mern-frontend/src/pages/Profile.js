import React, {useState,useContext,useEffect} from 'react';
// import Message from '../components/Message';
import { AuthContext } from '../Context/AuthContext';
import UserService from '../Services/UserService';
import EditUser from '../components/users/EditUser';
import UserDetails from '../components/users/UserDetails';

const Profile = props =>{
    const [ user, setUser ] = useState({username: "", email: "", image: ""});
    const [ editing, setEditing ] = useState(false);
    // const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(()=>{
        UserService.getUser().then(data =>{
            console.log(data)
            setUser({username: data.username, email: data.email, image: data.image});
        });
    },[]);
    

    // const onSubmit = e =>{
    //     e.preventDefault();
    //     TodoService.postTodo(todo).then(data =>{
    //         const { message } = data;
    //         resetForm();
    //         if(!message.msgError){
    //             TodoService.getTodos().then(getData =>{
    //                 setTodos(getData.todos);
    //                 setMessage(message);
    //             });
    //         }
    //         else if(message.msgBody === "UnAuthorized"){
    //             setMessage(message);
    //             authContext.setUser({username : "", role : ""});
    //             authContext.setIsAuthenticated(false);
    //         }
    //         else{
    //             setMessage(message);
    //         }
    //     });
    // }

    // const onChange = e =>{
    //     setTodo({name : e.target.value});
    // }

    // const resetForm = ()=>{
    //     setTodo({name : ""});
    // }

    const handleEditToggle = (event) => {
        event.preventDefault();
        setEditing(true);
    };

    return(      
        <>
            <br/>
            <h1 className="text-center">Welcome to your profile, {`${user.username}`}! </h1>
            <br/>
            { editing ? (
                <EditUser
                user={user} 
                setUser={setUser}  
                setEditing={setEditing}                                       
                /> 
            ) : (
                <UserDetails 
                user={user} 
                handleEditToggle={handleEditToggle}
                />
            )}                                
        </>
    );
}

export default Profile;
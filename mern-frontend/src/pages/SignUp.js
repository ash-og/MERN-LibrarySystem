import React, {useState,useRef,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import Message from '../components/Message';

// Credit @ https://youtu.be/7_fo3nrqiY8

const Register = props=>{
    const [user,setUser] = useState({username: "", email : "", password : ""});
    const [message,setMessage] = useState("");
    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setUser({username : "", email : "",password : ""});
    }

    const navigate = useNavigate()

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.register(user).then(data=>{
            const { message } = data;
            setMessage(message);
            resetForm();
            
            // if there's no error, show msg for 2seconds and move on to login page
            if(!message.msgError){
                timerID = setTimeout(()=>{
                    navigate('/login');
                },2000)
            }
        });
    }



    return(
        <div>
            <form onSubmit={onSubmit}>
                <h3>Please Register</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                       name="username" 
                       value={user.username}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Username"/>
                <label htmlFor="email" className="sr-only">Email: </label>
                <input type="text" 
                       name="email"
                       value={user.email}  
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter email"/>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password"
                       value={user.password} 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Password"/>
                {/* <input type="text" 
                       name="role"
                       value={user.role}  
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter role (admin/user)"/> */}
                <button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Sign Up</button>
            </form>
            {message ? <Message message={message}/> : null}
        </div>
    )
}

export default Register;
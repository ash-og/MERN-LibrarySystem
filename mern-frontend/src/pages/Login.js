import React, {useState,useContext} from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import Message from '../components/Message';
import {AuthContext} from '../Context/AuthContext';

// Credit @ https://www.youtube.com/watch?v=7_fo3nrqiY8

const Login = props => {
    const [user,setUser] = useState({username: "", password : ""});
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = event =>{
        event.preventDefault()
        setUser({...user,[event.target.name] : event.target.value});
    }

    const navigate = useNavigate()

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.login(user).then(data=>{
            console.log(data);
            const { isAuthenticated,user,message} = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                navigate('/profile')
            // add faves here
            }
            else
                setMessage(message);
        });
    }



    return(
        <div>
            <form onSubmit={onSubmit}>
                <h3>Please sign in</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                       name="username" 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Please enter username"/>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password" 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Please enter password"/>
                 <Button variant="primary" className="btn-primary" 
                        type="submit">Login </Button>
            </form>
            <div>{message ? <Message message={message}/> : null}</div>            
        </div>
    )
}

export default Login;
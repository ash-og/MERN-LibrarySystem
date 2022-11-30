import React, {useState,useContext,useEffect} from 'react';
import FavouriteItem from './FavouriteItem';
import UserService from '../../Services/UserService';
import Message from '../Message';
import { AuthContext } from '../../Context/AuthContext';

// Credit @ https://github.com/noobcoder1137/MERN-Stack-Authentication-Authorization-JWT/blob/master/client/src/Components/faves.js

const Favourites = props =>{
    const [fave,setFave] = useState({name : ""});
    const [faves,setFaves] = useState([]);
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    
    useEffect(()=>{
        UserService.getFaves().then(data =>{
            setFaves(data.favourites);
        });
    },[]);

    // const onSubmit = e =>{
    //     e.preventDefault();
    //     UserService.postfave(fave).then(data =>{
    //         const { message } = data;
    //         resetForm();
    //         if(!message.msgError){
    //             faveService.getfaves().then(getData =>{
    //                 setFaves(getData.faves);
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
    //     setFave({name : e.target.value});
    // }

    // const resetForm = ()=>{
    //     setFave({name : ""});
    // }

    return(
        <div>
                {
                    faves.map(favourite =>{
                        return <FavouriteItem key={favourite._id} favourite={favourite}/>
                    })
                }
            <br/>
            {message ? <Message message={message}/> : null}
        </div>
    );

}

export default Favourites;



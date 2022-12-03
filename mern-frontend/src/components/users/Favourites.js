import React, {useState,useContext,useEffect} from 'react';
import FavouriteItem from './FavouriteItem';
import UserService from '../../Services/UserService';
import Message from '../Message';
import { AuthContext } from '../../Context/AuthContext';

// Credit @ https://github.com/noobcoder1137/MERN-Stack-Authentication-Authorization-JWT/blob/master/client/src/Components/faves.js

const Favourites = props =>{
    const [faves,setFaves] = useState([]);
    const [message,setMessage] = useState(null);
    
    useEffect(()=>{
        UserService.getFaves().then(data =>{
            setFaves(data.favourites);
            setMessage(data.message)
        });
    },[]);

    return(
        <div>
                {
                    faves.map(favourite =>{
                        return <FavouriteItem key={favourite._id} favourite={favourite} setFaves={setFaves}/>
                    })
                }
            <br/>
            {message ? <Message message={message}/> : null}
        </div>
    );

}

export default Favourites;



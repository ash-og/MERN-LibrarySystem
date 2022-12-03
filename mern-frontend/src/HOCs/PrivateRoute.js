import React, {useContext} from 'react';
import {Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

// Credit @ https://www.youtube.com/watch?v=tw2qZEN_Lqw&list=PLvTjg4siRgU0HS3cANo7KZ52Wkud083TL&index=9

const PrivateRoute = ({component : Component, roles, ...rest})=>{
    const { isAuthenticated, user} = useContext(AuthContext);
    return(
        <Route {...rest} render={props =>{
            if(!isAuthenticated)
                return <Navigate to='/login'/>
            
            // if(!roles.includes(user.role))
            //     return <Navigate to={{ pathname: '/', 
            //                      state : {from : props.location}}}/>
            return <Component {...props}/>
        }}/>
    )
}

export default PrivateRoute;
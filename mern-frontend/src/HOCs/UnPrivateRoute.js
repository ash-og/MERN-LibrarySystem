import React, {useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

// Credit @ https://www.youtube.com/watch?v=tw2qZEN_Lqw&list=PLvTjg4siRgU0HS3cANo7KZ52Wkud083TL&index=9


const UnPrivateRoute = ({component : Component,...rest})=>{
    const { isAuthenticated } = useContext(AuthContext);
    return(
        <Route {...rest} render={props =>{
            if(isAuthenticated)
                return <Redirect to={{ pathname: '/', 
                                       state : {from : props.location}}}/>
                                       
            return <Component {...props}/>
        }}/>
    )
}

export default UnPrivateRoute;
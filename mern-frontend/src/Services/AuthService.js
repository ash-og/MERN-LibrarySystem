// Auth services connecting front end to back end

// Credit @ https://www.youtube.com/watch?v=uWVx6Jt4Rqw
export default {
    login : user =>{
        return fetch('user/login',{
            method : 'post',
            body : JSON.stringify(user),
            headers : {
                'Content-type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },
    register : user =>{
        return fetch('user/register',{
            method : 'post',
            body : JSON.stringify(user),
            headers : {
                'Content-type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);    
    }, 
    logout : () => {
        return fetch('user/logout')
                .then(res=>res.json())
                .then(data => data);
    },
    isAuthenticated : () => {
        return fetch('user/authenticated')
                .then(res=>{
                    if(res.status !== 401)
                        return res.json().then(data => data);
                    else
                        return { isAuthenticated : false, user : {username : "", email : ""}};
                });
    }}; 

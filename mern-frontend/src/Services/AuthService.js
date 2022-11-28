// Auth services connecting front end to back end

// Credit @ https://www.youtube.com/watch?v=uWVx6Jt4Rqw and https://github.com/bradtraversy/mern-tutorial/blob/main/frontend/src/features/auth/authService.js



// Register user

const register = user => {
    return fetch('user/register',{
        method : 'post',
        body : JSON.stringify(user),
        headers : {
            'Content-type' : 'application/json'
        }
    }).then(res => res.json())
      .then(data => data);
}


// Login user

const login = user =>{
    return fetch('user/login',{
        method : 'post',
        body : JSON.stringify(user),
        headers : {
            'Content-type' : 'application/json'
        }
    }).then(res => {
        if(res.status !== 401)
            return res.json().then(data => data);
        else
            return { isAuthenticated : false, user : {username : "", email : ""}};
    })
}


// Logout user

const logout = () => {
    return fetch('user/logout')
            .then(res=>res.json())
            .then(data => data);
}

// Auth check

const isAuthenticated = () => {
    return fetch('user/authenticated')
            .then(res=>{
                if(res.status !== 401)
                    return res.json().then(data => data);
                else
                    return { isAuthenticated : false, user : {username : "", email : ""}};
            });
}

const AuthService = {
    register,
    login,
    logout,
    isAuthenticated,
}

export default AuthService;

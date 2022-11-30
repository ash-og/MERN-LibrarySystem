const getUser = ()=>{
    return fetch('/user/profile')
            .then(response=>{
                if(response.status !== 401){
                    return response.json().then(data => data);
                }
                else
                    return {message : {msgBody : "UnAuthorized",msgError : true}};
            });
}

const UserService = {getUser};

export default UserService;
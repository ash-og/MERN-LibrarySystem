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

const getFaves = ()=>{
    return fetch('/user/profile/favourites')
            .then(response=>{
                if(response.status !== 401){
                    return response.json().then(data => data);
                }
                else
                    return {message : {msgBody : "UnAuthorized",msgError : true}};
            });
}

// const postFave = todo=>{
//     return fetch('/user/todo',{
//         method : "post",
//         body : JSON.stringify(todo),
//         headers:{
//             'Content-Type' : 'application/json'
//         }
//     }).then(response=>{
//         if(response.status !== 401){
//             return response.json().then(data => data);
//         }
//         else
//             return {message : {msgBody : "UnAuthorized"},msgError : true};
//     });
// }

const UserService = {getUser, getFaves};

export default UserService;
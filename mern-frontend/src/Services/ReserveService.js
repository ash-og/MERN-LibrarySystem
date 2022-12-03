

const getReservations = ()=>{
    return fetch('/reserve/view')
            .then(response=>{
                if(response.status !== 401){
                    return response.json().then(data => data);
                }
                else
                    return {message : {msgBody : "UnAuthorized",msgError : true}};
            });
}


const ReserveService = {getReservations};

export default ReserveService;
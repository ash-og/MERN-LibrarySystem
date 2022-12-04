, function (err, docs) {
    if (err){
        res.status(500).json({message : {msgBody : "Error has occurred", msgError : true}});
    }
    else{
        req.user.favourites.push(favourite);
        req.user.save(err=>{
            if (err)
                res.status(500).json({message : {msgBody : "Error has occurred", msgError : true}});
            else
                res.status(200).json({message : {msgBody : "Successfully added favourite", msgError : false}});
        });
    }
})
});

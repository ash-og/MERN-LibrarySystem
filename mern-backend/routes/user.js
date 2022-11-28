const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../model/User');
const Book = require('../model/Book');

// Credit @ https://www.youtube.com/watch?v=uw1c4Cfl9iU

const signToken = userID => {
    return JWT.sign({
        iss : "NoobCoder",
        sub : userID
    }, "NoobCoder", {expiresIn: "1h"});
};

// Resgister new user

userRouter.post('/register',(req, res)=>{
    const { username, email, password } = req.body;
    User.findOne({username},(err,user)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occurred", msgError: true}});
        if(user)
            res.status(400).json({message : {msgBody : "User already exists", msgError: true}});
        else{
            const newUser = new User({username, email, password});
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occurred", msgError: true}});
                else   
                    res.status(201).json({message : {msgBody : "Profile created", msgError: false}});
            });
        }
    });
});


// User logon

userRouter.post('/login',passport.authenticate('local', {session : false}), (req, res)=>{
    if(req.isAuthenticated()){
        const {_id, username, email} = req.user;
        const token = signToken(_id);
        res.cookie('access_token',token,{httpOnly: true, sameSite: true}); // prevent JS and site forgery attacks
        res.status(200).json({isAuthenticated: true,user: {username,email}});
    }
});

// User logout

userRouter.get('/logout',passport.authenticate('jwt', {session : false}), (req, res)=>{
    res.clearCookie('access_token');
    res.json({user :{username : "", email : ""}, success : true});
});

userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username,role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username,role}});
});
// // Favourites

// userRouter.post('/favourite/:id',passport.authenticate('jwt', {session : false}), async (req, res)=>{
//     let id = req.params.id
//     const favourite = await Book.findById(id);
//     req.user.favourites.push(favourite);
//     req.user.save(err=>{
//         if (err)
//             res.status(500).json({message : {msgBody : "Error has occurred", msgError : true}});
//         else
//             res.status(200).json({message : {msgBody : "Successfully added favourite", msgError : false}});
//     });
// });

module.exports = userRouter;


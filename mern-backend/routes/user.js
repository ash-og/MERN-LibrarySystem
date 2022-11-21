const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../model/User');
const Book = require('../model/Book');

// Credit @ https://www.youtube.com/watch?v=uw1c4Cfl9iU

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

module.exports = userRouter;


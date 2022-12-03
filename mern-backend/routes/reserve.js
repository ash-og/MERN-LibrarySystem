const express = require('express');
const reserveRouter = express.Router();
const passport = require('passport');
const JWT = require('jsonwebtoken');
const User = require('../model/User');
const Book = require('../model/Book');
const Reservation = require('../model/Reservation');


// View reservations

reserveRouter.get('/view',passport.authenticate('jwt',{session : false}),(req,res)=>{
    User.findById({_id : req.user._id}).populate({path: 'reservations', populate: {path: 'book'}}).exec((err,document)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            res.status(200).json({reservations : document.reservations, authenticated : true});
        }
    });
});

// reserveRouter.get('/viewc',passport.authenticate('jwt',{session : false}), async (req,res)=>{

//     try{
//         const user = await req.user.populate('reservations').exec();
//         console.log(user);
//         res.status(200).json({user : user, authenticated : true});
//     } catch(err) {
//             res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
//             }});

// reserveRouter.get('/viewb',passport.authenticate('jwt',{session : false}), async (req,res)=>{

//     try {
//         const reservations = await Reservation.find({user : req.user._id})
//         console.log(reservations);

//         const books = 

//         const response = {
//             reservations,
//         };

//         res.status(200).json(response);

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: true, message: "Internal Server Error" });
//     }});

// Make a new reservation

reserveRouter.post('/new/:id',passport.authenticate('jwt',{session : false}), async (req,res)=>{

    let id = req.params.id
    const book = await Book.findById(id);
    const user = req.user;
    const date = req.body.date;

    const reservation = new Reservation({
        book: book,
        user: user,
        date: date,
    });

    reservation.save(err=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            req.user.reservations.push(reservation);
            req.user.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else
                    res.status(200).json({message : {msgBody : "Successfully created reservation", msgError : false}});
            });
        }
    })
});





// Cancel a reservation

reserveRouter.delete('/cancel/:id',passport.authenticate('jwt',{session : false}), async (req,res)=>{

    let id = req.params.id
    const reservation = await Reservation.findById(id);
    req.user.reservations.pull(reservation);
    req.user.save(err=>{
        if (err)
            res.status(500).json({message : {msgBody : "Error has occurred", msgError : true}});
        else
            res.status(200).json({message : {msgBody : "Successfully cancelled reservation", msgError : false}});
    });
});


module.exports = reserveRouter;
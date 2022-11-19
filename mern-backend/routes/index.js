var express = require('express');
var User = require('../model/user');
var mongoose = require('mongoose');

var router = express.Router();

router.get('/users', function(req, res, next) {
  let searchQuery = {};

  if(req.query.name)
    searchQuery = { name: req.query.name };

  User.find(searchQuery, function(err, users){
    if (err) {
      res.status(400);      
      res.send();
    }

    if (!users) {
      res.status(404);
      res.send("Cannot find user");
    }

    console.log("returning the user.");
    res.send(users);
  })
});

router.get('/books', function(req, res, next) {
  let searchQuery = {};

  if(req.query.name)
    searchQuery = { name: req.query.name };

  User.find(searchQuery, function(err, users){
    if (err) {
      res.status(400);      
      res.send();
    }

    if (!users) {
      res.status(404);
      res.send("Cannot find user");
    }

    console.log("returning the user.");
    res.send(users);
  })
});

router.post('/users', function(req, res, next) {
  let newUser = new User(req.body);
  newUser._id = mongoose.Types.ObjectId();

  newUser.save(function(err) {
    if (err) {
      console.log("not saved!");
      res.status(400);
      res.send();
    } else {
      console.log("saved!");
      res.send({ id : newUser._id });
    }

  });
});


router.post('/updateuser/:id',function(req, res) {

  let id = req.params.id
  let updatedUser = new User(req.body);
  User.findByIdAndUpdate(id,
      {
        name:updatedUser.name,
        age:updatedUser.age
      }, function (err, docs) {
        if (err) {
          console.log("not saved!");
          res.status(400);
          res.send();
        } else {
          res.status(200).json({'users': 'user updated successfully'});
          }
      })
});


module.exports = router;

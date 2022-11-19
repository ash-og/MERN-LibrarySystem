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

// router.put('/users/:id', async(req, res) => {
//   const update = {name: req.body.name, age: req.body.age}
//   const filter = {id: req.params.id}

//   const updatedDocument = await User.findOneAndUpdate(filter, update, { new: true });

//     return res.status(200).send(updatedDocument);
// });


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

// router.post('/updateuser/:id',function(req, res) {
//   User.findById(req.params.id, function(err, user) {
//     if (!user) {
//       console.log("data not found");
//       res.status(404);
//       res.send();
//     } else {
//       user.user_name = req.body.user_name;
//       user.user_age = req.body.user_age;
        
//       user.save().then(user => {
//         console.log("saved!");
//         res.send({ id : user._id });
//       })
//       .catch(err => {
//         console.log("not saved!");
//         res.status(400);
//         res.send();
//       })};
// });
// });



module.exports = router;

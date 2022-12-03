var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Define a schema.
var userSchema = new Schema({
  username: { type: String, required: true, min: 6, max: 15 },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    "Please fill a valid email address",
], },
  password: { type: String, required: true, min: 6, max: 15 },
  image: { type: String },
  favourites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
  reservations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reservation'}]
}, {timestamps: true});


// Credit @ https://www.youtube.com/watch?v=ffDvXrnnbxU

userSchema.pre('save', function(next){
  if (!this.isModified('password'))
    return next();
  bcrypt.hash(this.password,10,(err,passwordHash)=>{
    if(err)
      return next(err);
    this.password = passwordHash;
    next();
  });
});

userSchema.methods.comparePassword = function(password, cb){
  bcrypt.compare(password, this.password, (err, isMatch)=>{
    if(err)
      return cb(err);
    else {
      if(!isMatch)
        return cb(null,isMatch);
      return cb(null,this);
    }
  })
}


// Create a model.
var User = mongoose.model('User', userSchema);

module.exports = User;
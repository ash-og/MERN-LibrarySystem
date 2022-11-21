var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Define a schema.
var userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  borrowed: [{type: mongoose.Schema.Types.ObjectId, ref: 'bookInstance'}]
  // image: String,
  // hash: String,
  // salt: String
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
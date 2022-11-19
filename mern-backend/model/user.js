var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define a schema.
var userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  bio: String,
  image: String,
  hash: { type: String, required: true },
  salt: String
}, {timestamps: true});

// Create a model.
var User = mongoose.model('User', userSchema);

module.exports = User;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define a schema.
var userSchema = new Schema({
  username: String,
  email: String,
  // image: String,
  // hash: String,
  // salt: String
}, {timestamps: true});

// Create a model.
var User = mongoose.model('User', userSchema);

module.exports = User;
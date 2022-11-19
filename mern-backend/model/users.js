// // User model as per Lab4 and https://thinkster.io/tutorials/node-json-api/creating-the-user-model

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// // Define a schema.
// const UserSchema = new Schema({
//     username: { type: String, required: true },
//     email: { type: String, required: true },
//     bio: String,
//     image: String,
//     hash: { type: String, required: true },
//     salt: String
//   }, {timestamps: true});

// // Virtual for bookinstance's URL
// UserSchema.virtual("url").get(function () {
//     // We don't use an arrow function as we'll need the this object
//     return `/catalog/user/${this._id}`;
//   });
  
// // Export model
// const User = mongoose.model('User', UserSchema);
// module.exports = User;
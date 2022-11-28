// Modelled after Lab 4 & https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a schema.
const BookSchema = new Schema({
  title: { type: String, required: true },
  author: {  type: String , required: true },
  genre: { type: String },
  publisher: { type: String },
  year: { type: Number }
});

// Virtual for book's URL
BookSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/book/${this._id}`;
});

// Export model
const Book = mongoose.model("Book", BookSchema);
module.exports = Book;

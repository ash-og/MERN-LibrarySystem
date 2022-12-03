const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a schema.
const BookSchema = new Schema({
  title: { type: String, required: true },
  author: {  type: String , required: true },
  genre: { type: String },
  publisher: { type: String },
  year: { type: Number },
  copies: { type: Number },
});

// Export model
const Book = mongoose.model("Book", BookSchema);
module.exports = Book;

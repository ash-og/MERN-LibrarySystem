const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    book: {type: mongoose.Types.ObjectId, required: true, ref: 'Book'},
    user: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    date: { type: String, required: true },
  }, {timestamps: true});
  
  const Reservation = mongoose.model("Reservation", ReservationSchema);
  module.exports = Reservation;
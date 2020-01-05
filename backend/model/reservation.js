const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    id: Number,
    showingId: Number,
    firstName: String,
    lastName: String,
    seat: String
});

module.exports = mongoose.model("Reservation", reservationSchema);

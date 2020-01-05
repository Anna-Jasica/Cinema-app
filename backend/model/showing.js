const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const showingSchema = new Schema({
  id: Number,
  movieName: String,
  movieDescription: String,
  date: String
});

module.exports = mongoose.model("Showing", showingSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    id: Number,
    name: String,
    description: String
});

module.exports = mongoose.model("Movie", movieSchema);

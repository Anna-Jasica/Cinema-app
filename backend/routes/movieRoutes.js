const express = require("express");
const Router = express.Router();
const MovieController = require("../controllers/movieController");

Router.get("/getMovies", MovieController.getMovies);
Router.post("/createMovie", MovieController.createMovie);
Router.delete("/deleteMovie", MovieController.deleteMovie);
module.exports = Router;

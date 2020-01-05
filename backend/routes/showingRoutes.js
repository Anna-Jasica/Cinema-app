const express = require("express");
const Router = express.Router();
const ShowingController = require("../controllers/showingController");

Router.get("/getShowings", ShowingController.getShowings);
Router.post("/createShowing", ShowingController.createShowing);
Router.delete("/deleteShowing", ShowingController.deleteShowing);
module.exports = Router;

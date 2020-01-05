const express = require("express");
const Router = express.Router();
const ReservationController = require("../controllers/reservationController");

Router.get("/getReservations", ReservationController.getReservations);
Router.post("/createReservation", ReservationController.createReservation);
Router.delete("/deleteReservation", ReservationController.deleteReservation);
module.exports = Router;

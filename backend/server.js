const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const reservationRoutes = require("./routes/reservationRoutes.js");
const movieRoutes = require("./routes/movieRoutes.js");
const showingRoutes = require("./routes/showingRoutes.js");

const dbRoute =
  "mongodb+srv://ajasica:97x5h4N45kxIWzQC@cinemaappcluster-dxzjk.mongodb.net/test?retryWrites=true&w=majority";

mongoose.set("useUnifiedTopology", true);
mongoose.connect(dbRoute, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", () => console.log("Connected to the database"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", reservationRoutes);
app.use("/", movieRoutes);
app.use("/", showingRoutes);

const API_PORT = 3001;
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

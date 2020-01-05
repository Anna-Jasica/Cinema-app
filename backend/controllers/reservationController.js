const Reservation = require("../model/reservation.js");

// async function getReservations(req, res) {
//     Reservation.find((err, data) => {
//         if (err) return res.json({ success: false, error: err });
//         return res.json({ success: true, data: data });
//     });
// }

async function getReservations(req, res) {
  const showingId = req.query.showingId;
  if (showingId) {
    Reservation.find({ showingId }, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  } else {
    Reservation.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  }
}

async function createReservation(req, res) {
  const { showingId, firstName, lastName, seat } = req.body;
  if (!showingId || !firstName || !lastName || !seat) {
    return res.json({
      success: false,
      error: "invalid inputs"
    });
  }

  await Reservation.find({ showingId, seat }, (err, data) => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    if (data.length > 0) {
      return res.json({
        success: false,
        error: "This seat is already taken"
      });
    } else {
      const reservation = new Reservation();

      reservation.showingId = showingId;
      reservation.firstName = firstName;
      reservation.lastName = lastName;
      reservation.seat = seat;
      reservation.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
    }
  });
}

async function deleteReservation(req, res) {
  const { id } = req.body;
  console.log(req.body);
  Reservation.findByIdAndRemove(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
}

exports.getReservations = getReservations;
exports.createReservation = createReservation;
exports.deleteReservation = deleteReservation;

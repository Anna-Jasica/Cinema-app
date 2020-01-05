const Showing = require("../model/showing.js");

async function getShowings(req, res) {
  const date = req.query.date;
  Showing.find({ date }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
}

async function createShowing(req, res) {
  let showing = new Showing();

  const { id, movieName, movieDescription, date } = req.body;

  if (!id || !movieName || !movieDescription || !date) {
    return res.json({
      success: false,
      error: "invalid inputs"
    });
  }
  showing.id = id;
  showing.movieName = movieName;
  showing.movieDescription = movieDescription;
  showing.date = date;
  showing.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
}

async function deleteShowing(req, res) {
  const { id } = req.body;
  Showing.findByIdAndRemove(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
}

exports.getShowings = getShowings;
exports.createShowing = createShowing;
exports.deleteShowing = deleteShowing;

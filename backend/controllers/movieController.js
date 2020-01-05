const Movie = require("../model/movie.js");

async function getMovies(req, res) {
    Movie.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
}

async function createMovie(req, res) {
    let movie = new Movie();

    const { id, name, description } = req.body;

    if (!id || !name || !description) {
        return res.json({
            success: false,
            error: "invalid inputs"
        });
    }
    movie.id = id;
    movie.name = name;
    movie.description = description;
    movie.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
}

async function deleteMovie(req, res) {
    const { id } = req.body;
    Movie.findByIdAndRemove(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
}

exports.getMovies = getMovies;
exports.createMovie = createMovie;
exports.deleteMovie = deleteMovie;

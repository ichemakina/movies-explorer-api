const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail()
    .then(() => {
      Movie
        .findByIdAndDelete(movieId)
        .orFail();
    })
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => {
      console.log(err);
    });
};

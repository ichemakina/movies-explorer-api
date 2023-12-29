const mongoose = require('mongoose');
const Movie = require('../models/movie');

const NotFoundError = require('../utils/erros/notFoundError');
const ValidationError = require('../utils/erros/validationError');
const ForbiddenError = require('../utils/erros/forbiddenError');

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
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return Promise.reject(new ForbiddenError('Недостаточно прав'));
      }
      return Movie
        .findByIdAndDelete(movieId);
    })
    .then(() => res.send({ message: 'Фильм удален' }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Фильм не найден'));
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new ValidationError('Передан некорректный id'));
      }
      return next(err);
    });
};

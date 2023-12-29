const mongoose = require('mongoose');
const User = require('../models/user');

const NotFoundError = require('../utils/erros.js/notFoundError');
const ValidationError = require('../utils/erros.js/validationError');

module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new ValidationError('Пользователь не найден'));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "Страна" должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле "Режиссёр" должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "Длительность" должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле "Год выпуска" должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле "Описание" должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле "Ссылка на постер" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле "Ссылка на трейлер" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "Ссылка на миниатюрный постер" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "Название фильма на русском языке" должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "Название фильма на английском языке" должно быть заполнено'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);

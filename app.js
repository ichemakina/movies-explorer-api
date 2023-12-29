const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/users');
const movies = require('./routes/movies');
const handleError = require('./middlewares/handleError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use((req, res, next) => {
  req.user = {
    _id: '658e94ffbd7f160026df2c64',

  };

  next();
});

app.use('/users', users);
app.use('/movies', movies);

app.use(handleError);

app.listen(PORT);

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const users = require('./routes/users');
const movies = require('./routes/movies');
const { signup, signin } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');
const { validateSignin, validateSignup } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.post('/signup', validateSignup, signup);
app.post('/signin', validateSignin, signin);

app.use(auth);

app.use('/users', users);
app.use('/movies', movies);

app.use(errors());
app.use(handleError);

app.listen(PORT);

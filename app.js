require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const users = require('./routes/users');
const movies = require('./routes/movies');
const { signup, signin } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');
const { validateSignin, validateSignup } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { NODE_ENV, PORT, DATABASE } = process.env;

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? DATABASE : 'mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(requestLogger);

app.post('/signup', validateSignup, signup);
app.post('/signin', validateSignin, signin);

app.use(auth);

app.use('/users', users);
app.use('/movies', movies);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT);

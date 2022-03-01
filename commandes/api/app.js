const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hateoasLinker = require('express-hateoas-links');
const indexRouter = require('./routes/index');
const commandesRouter = require('./routes/commandes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(hateoasLinker);


app.use('/', indexRouter);
app.use('/commandes', commandesRouter);

app.get('/favicon.ico', (req, res) => res.status(204));



module.exports = app;

import createError from 'http-errors';
import express = require('express');
import path = require('path');
import cookieParser = require('cookie-parser');
import logger = require('morgan');

import indexRouter = require('./routes/index');
import usersRouter = require('./routes/users');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req: any, res: any, next: (arg0: any) => any) => next(createError(404)));

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

export default app;
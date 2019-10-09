const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const ejs = require('ejs');

const indexRouter = require('./server/routes/index');
const signUpRouter = require('./server/routes/signUp');
const signInRouter = require('./server/routes/signIn');
const adminRouter = require('./server/routes/admin');
const todoRouter = require('./server/routes/todo');
const app = express();

const passport = require('./server/middlewares/passport');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);

const client = redis.createClient(6379,'localhost');

app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'client/stylesheets/scss'),
  dest: path.join(__dirname, 'client/stylesheets/css'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
  response: true,
  outputStyle: 'compressed',
  prefix: '/style',
}));

app.use(session(
  {
      secret: 'secret_key',
      cookie: {
        secure: false
      },
      store: new redisStore({
        client : client,
        ttl : 260
      }),
      saveUninitialized: false, 
      resave: false
  }
));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'client')));

app.use('/', indexRouter);
app.use('/signUp', signUpRouter);
app.use('/signIn', signInRouter);
app.use('/admin', adminRouter);
app.use('/todo', todoRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var ejs = require('ejs');

var indexRouter = require('./server/routes/index');
var signUpRouter = require('./server/routes/signUp');
var signInRouter = require('./server/routes/signIn');
var adminRouter = require('./server/routes/admin');
var todoRouter = require('./server/routes/todo');
var app = express();

const passport = require('./server/middlewares/passport');
var session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(session);

var client = redis.createClient(6379,'localhost');

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;

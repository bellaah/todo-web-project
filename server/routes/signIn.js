var express = require('express');
var router = express.Router();
const user = require('../database/userTable');
const passport = require('../middlewares/passport');
var session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(session);

var client = redis.createClient(6379,'localhost');

router.use(session(
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

router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res, next) => {
  res.redirect('/');
});

router.post('/submit',
    passport.authenticate('local',{
        successRedirect: '/signIn/fail',
        failureRedirect: '/signIn/success'
    })
);

router.get('/fail', (req,res) => {
    res.send(true);
});

router.get('/success', (req,res) => {
    res.send(false);
});


module.exports = router;

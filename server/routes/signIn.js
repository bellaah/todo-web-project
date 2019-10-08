var express = require('express');
var router = express.Router();
const user = require('../models/users');
const passport = require('../middlewares/passport');

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

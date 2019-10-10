const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');

router.get('/', (req, res, next) => {
  res.redirect('/');
});

router.post('/submit',
    passport.authenticate('local',{
        successRedirect: '/signIn/success',
        failureRedirect: '/signIn/fail'
    })
);

router.get('/fail', (req,res) => {
    res.send(false);
});

router.get('/success', (req,res) => {
    res.send(true);
});


module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');

router.get('/', (req, res, next) => {
    if(req.isAuthenticated()){
      res.redirect(`/todo/${req.session.passport.user.id}`);
    }else{
      res.render('signIn');
    }
});

router.get('/logout', (req, res, next) => {
  req.logOut();
  res.clearCookie('connect.sid');
  req.session.save(() => {
    res.redirect('/');
  });
});

module.exports = router;

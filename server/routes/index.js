var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res, next) {
  req.logOut();
  res.clearCookie('connect.sid');
  req.session.save(function(){
    res.redirect('/');
  });
});

router.get('/board', function(req, res, next) {
  res.render('board');
});


module.exports = router;

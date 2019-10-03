var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res, next) {
  req.logOut();
  res.clearCookie('connect.sid');
  req.session.save(function(){
    res.redirect('/');
  });
});

module.exports = router;

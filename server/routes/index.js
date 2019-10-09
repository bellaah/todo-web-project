const express = require('express');
const router = express.Router();

router.get('/logout', (req, res, next) => {
  req.logOut();
  res.clearCookie('connect.sid');
  req.session.save(() => {
    res.redirect('/');
  });
});

router.get('/board', (req, res, next) => {
  res.render('board');
});

module.exports = router;

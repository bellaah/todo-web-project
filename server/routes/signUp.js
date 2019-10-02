var express = require('express');
var router = express.Router();
const user = require('../models/userTable');

router.get('/', (req, res, next) => {
  res.render('signUp');
});

router.get('/submit', async(req, res, next) => {
    res.send(await user.getAllUsers());
});

module.exports = router;

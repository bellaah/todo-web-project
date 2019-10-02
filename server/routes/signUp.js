var express = require('express');
var router = express.Router();
const user = require('../database/userTable');

router.get('/', (req, res, next) => {
  res.render('signUp');
});

router.post('/submit', async(req, res, next) => {
    await user.insertUserData(req.body.id,req.body.name,req.body.password);
    res.send(await user.getAllUsers());
});

module.exports = router;

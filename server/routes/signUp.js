var express = require('express');
var router = express.Router();
const user = require('../models/userTable');

router.get('/', (req, res, next) => {
  res.render('signUp');
});

router.post('/submit', async(req, res, next) => {
    console.log(req.body.id);
    console.log(req.body.name);
    console.log(req.body.password);
    await user.insertUserData(req.body.id,req.body.name,req.body.password);
    res.send(await user.getAllUsers());
});

module.exports = router;

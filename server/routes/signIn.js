var express = require('express');
var router = express.Router();
const user = require('../database/userTable');

router.get('/', (req, res, next) => {
  res.redirect('/');
});

router.post('/submit', async(req, res, next) => {
    let isUser = await user.getUser(req.body.id,req.body.password);
    res.send(isUser);
});

module.exports = router;

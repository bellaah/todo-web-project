const express = require('express');
const router = express.Router();
const user = require('../models/users');

router.get('/', (req, res, next) => {
  res.render('signUp');
});

router.post('/submit', async(req, res, next) => {
    await user.insertUserData(req.body.id,req.body.name,req.body.password);
    res.send(await user.getAllUsers());
});

router.post('/duplicateCheck', async(req, res, next) => {
  let isUser = await user.getUserId(req.body.userId);
  res.send(isUser);
});


module.exports = router;

var express = require('express');
var router = express.Router();
const user = require('../database/userTable');

router.get('/', (req, res, next) => {
  res.render('adminAuthority');
});

router.get('/authority', (req, res, next) => {
    res.render('adminAuthority');
  });

router.post('/submit', async(req, res, next) => {
    let isUser = await user.getUser(req.body.id,req.body.password);
    res.send(isUser);
});

router.get('/userList', async(req, res, next) => {
    let userList = await user.getAllUsers();
    res.send(userList);
}); 

router.post('/updateAuth', async(req, res, next) => {
    await user.updateAuth(eval(req.body));
    res.send("secess");
});

module.exports = router;

var express = require('express');
var router = express.Router();
const user = require('../database/userTable');

router.get('/', (req, res, next) => {
    console.log(req.session.passport);
    if(req.isAuthenticated() && req.session.passport.user.auth >= 10){
        res.render('adminAuthority');
      }else{
        res.redirect('/');
      }
});

router.get('/authority', (req, res, next) => {
    if(req.isAuthenticated() && req.session.passport.user.auth >= 10){
        res.render('adminAuthority');
      }else{
        res.redirect('/');
      }
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

const express = require('express');
const router = express.Router();
const user = require('../models/users');
const checkAuth = require('../middlewares/isAdmin');

router.use(checkAuth);

router.get('/', (req, res, next) => {
    res.render('adminAuthority');
});

router.get('/authority', (req, res, next) => {
    res.render('adminAuthority');
}); 

router.get('/userList', async(req, res, next) => {
    let userList = await user.getAllUsers();
    res.send(userList);
}); 

router.post('/updateAuth', async(req, res, next) => {
    await user.updateAuth(eval(req.body));
    res.send(true);
});

module.exports = router;

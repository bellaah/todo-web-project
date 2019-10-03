const isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.session.passport.user.auth >= 10){
        res.render('adminAuthority');
    }else{
        return next();
    }
};

module.exports = isAdmin;
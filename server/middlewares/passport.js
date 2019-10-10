const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require('../models/users');

passport.serializeUser(function(user, done) {
    done(null, user);   
});

passport.deserializeUser(function(user, done) {
    done(null , user);
});

passport.use(new LocalStrategy(
  {
    usernameField: 'id',
    passwordField: 'password',
    session: true
  },
  async(username, password, done) => {
    let isUser = await user.getUser(username,password);
    if(isUser){
        console.log("OK");
        return done(null,{ "id" :isUser.ID, "auth" :isUser.AUTHORITY});
    }else{
        console.log("x");
        return done(null, false);
    }
  }
));

module.exports = passport;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require('../database/userTable');

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
    if(!isUser){
        return done(null, false);
    }else{
        return done(null,{ "id" :isUser.id, "auth" :isUser.auth});
    }
  }
));

module.exports = passport;
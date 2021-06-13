const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;


passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  User.findById(jwt_payload.id)
    .then(user => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch(err => console.log(err));
})
);

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  callbackURL: process.env.CBURL
},
  function (accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
  clientID: '378915159425595',//process.env['FACEBOOK_CLIENT_ID'],
  clientSecret: '7bd791932eaf12fbb75d0166721c0e02',//process.env['FACEBOOK_CLIENT_SECRET'],
  callbackURL: "http://localhost:5000/facebookRedirect", // relative or absolute path
  profileFields: ['id', 'displayName', 'email', 'picture']
},
  function (accessToken, refreshToken, profile, cb) {
    console.log(profile)
    console.log("FACEBOOK BASED OAUTH VALIDATION GETTING CALLED")
    return cb(null, profile);
  }));

passport.serializeUser(function (user, cb) {
  console.log('I should have jack ')
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  console.log('I wont have jack shit')
  cb(null, obj);
});

module.exports = passport;
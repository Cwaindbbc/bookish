const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const credentials = require("./credentials.js");
const db = require("./repository.js");

const passportConfiguration = () => {
  var opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = credentials.privateKey;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      db.any(
        `SELECT EXISTS (SELECT username FROM member WHERE username = '${jwt_payload}')`
      ).then(function (data) {
        if (data) {
          done(null, true);
        } else {
          done(null, false);
        }
      });
    })
  );
};

module.exports = passportConfiguration;

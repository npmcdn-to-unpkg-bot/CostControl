/* global require */
/* global module */

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../models/user');
var config = require('./database');

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    //opts.issuer = "accounts.examplesoft.com";
    //opts.audience = "yoursite.net";
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.id }, function (err, usuario) {
            if (err) {
                return done(err, false);
            }
            if (usuario) {
                done(null, usuario);
            } else {
                done(null, false);
            }
        });
    }));
};
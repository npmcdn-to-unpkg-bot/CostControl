/* global module */
/* global require */

var express = require('express');
var jwt = require('jwt-simple');
var passport = require('passport');
var Usuario = require('../models/user.js');
var config = require('../config/database');
var usuarioController = require('../controllers/user.js');
var route = express.Router();


route.post('/signup', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, msg: 'Please pass name and password.' });
    } else {
        usuarioController.registerUser(req, res);
    }
});

route.post('/authenticate', function (req, res) {
    usuarioController.getUser(req, res);
});

route.get('/memberinfo', passport.authenticate('jwt', { session: false }), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        Usuario.findOne({
            username: decoded.username
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                res.json({ success: true, msg: 'Welcome in the member area ' + user.username + '!' });
            }
        });
    } else {
        return res.status(403).send({ success: false, msg: 'No token provided.' });
    }
});

var getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = route;
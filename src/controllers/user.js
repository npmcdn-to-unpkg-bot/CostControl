/* global require */
/* global exports */

var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config/database');

exports.registrarUsuario = function (req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err) {
        if (err) {
            return res.json({ success: false, msg: err + 'username exists!' });
        }
        res.json({ success: true, msg: 'new user has created with sucess!' });
    });
};

exports.getUser = function (req, res) {
    User.findOne({
        username: req.body.username
    },
        function (err, user) {
            if (err)
                throw err;

            if (!user) {
                res.send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                // check if password matches
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.encode(user, config.secret);
                        // return the information including token as JSON
                        res.json({ success: true, token: 'JWT ' + token });
                    } else {
                        res.send({ success: false, msg: 'Authentication failed. Wrong password.' });
                    }
                });
            }
        });
};
/* global module */
/* global require */

var express = require('express');
var passport = require('passport');
var Bank = require('../models/bank.js');
var bankController = require('../controllers/user.js');
var route = express.Router();

route.get('/bank', passport.authenticate('jwt', { session: false }), function (req, res) {
    Bank.find({}, function (err, banks) {
        if (err) throw err;

        res.json(banks);
    });
});

route.post('/bank', passport.authenticate('jwt', { session: false }), function (req, res) {
    if (!req.body.name) {
        res.json({ success: false, msg: 'Please pass name.' });
    } else {
        var bank = new Bank(req.body);
        bank.save(function (err) {
            if (err) {
                return res.send(err);
            }
            return res.send({ message: 'Bank inserted!' });
        });
    }
});

module.exports = route;
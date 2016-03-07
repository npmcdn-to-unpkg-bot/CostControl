/* global require */
/* global module */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bankModel = new Schema({
    name: { type: String }
});

module.exports = mongoose.model('Bank', bankModel);
  
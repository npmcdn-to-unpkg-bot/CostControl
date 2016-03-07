/* global require */
/* global module */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bankAccountModel = new Schema({
    name: { type: String },
    agency: { type: String },
    account: { type: String },
    bank: { type: Schema.ObjectId, ref: 'Bank' }
});

module.exports = mongoose.model('BankAccount', bankAccountModel);
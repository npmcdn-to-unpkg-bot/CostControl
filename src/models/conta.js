/* global require */
/* global module */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var contaModel = new Schema({
    nome: { type: String },
    agencia: { type: String },
    conta: { type: String },
    banco: { type: Schema.ObjectId, ref: 'Banco' }
});

module.exports = mongoose.model('Conta', contaModel);
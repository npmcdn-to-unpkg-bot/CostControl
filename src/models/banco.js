/* global require */
/* global module */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bancoModel = new Schema({
    nome: { type: String }
});

module.exports = mongoose.model('Banco', bancoModel);
  
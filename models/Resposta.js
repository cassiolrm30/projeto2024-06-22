const mongoose = require("mongoose");

const SCHEMA = new mongoose.Schema
({
  idQuestao: String,
  opcao: String,
  descricao: String
},
{ timestamps: true, versionKey: false });

module.exports = mongoose.model("Resposta", SCHEMA);
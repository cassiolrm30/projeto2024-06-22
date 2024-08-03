const mongoose = require("mongoose");

const SCHEMA = new mongoose.Schema
({
  id: Number,
  descricao: String,
  rgbFonte: String,
  rgbFundo: String,
  iniciais: String
},
{ timestamps: true, versionKey: false });

module.exports = mongoose.model("TipoSimulado", SCHEMA);
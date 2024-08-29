const mongoose = require("mongoose");

const SCHEMA = new mongoose.Schema
({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  descricao: { type: String, required: true },
  rgbFonte: { type: String, required: true },
  rgbFundo: { type: String, required: true },
  iniciais: { type: String, required: true }
},
{ timestamps: true, versionKey: false });

module.exports = mongoose.model("TipoSimulado", SCHEMA);
const mongoose = require("mongoose");
const { Schema } = mongoose;

const SCHEMA = new mongoose.Schema
({
  enunciado: String,
  tipoSimulado: { type: Schema.Types.ObjectId, ref: 'TipoSimulado' },
  gabarito: String,
  respostas: [{ type: Schema.Types.ObjectId, ref: 'Resposta' }]
},
{ timestamps: true, versionKey: false });

module.exports = mongoose.model("Questao", SCHEMA);
const mongoose       = require("mongoose");
const { Schema }     = mongoose;

const SCHEMA = new mongoose.Schema
({
  _id: mongoose.Types.ObjectId,
  enunciado: { type: String, required: true },
  tipoSimulado: { type: Schema.Types.ObjectId, ref: 'TipoSimulado', required: true },
  gabarito: { type: String, required: true },
  respostas: [{ type: Schema.Types.ObjectId, ref: 'Resposta' }]
},
{ timestamps: true, versionKey: false });

module.exports = mongoose.model("Questao", SCHEMA);
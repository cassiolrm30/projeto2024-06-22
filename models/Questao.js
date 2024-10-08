const mongoose   = require("mongoose");
//const { Schema } = mongoose;

const SCHEMA = new mongoose.Schema
({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  //_id:          { type: Number, required: true },
  enunciado:    { type: String, required: true },
  tipoSimulado: { type: Object, required: true },
  gabarito:     { type: String, required: true },
  respostas:    [{ type: Object, ref: 'Resposta' }]
},
{ timestamps: true, versionKey: false });

module.exports = mongoose.model("Questoes", SCHEMA);
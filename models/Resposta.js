const mongoose = require("mongoose");
const { Schema } = mongoose;

const SCHEMA = new mongoose.Schema
({
  //idQuestao: { type: Schema.Types.ObjectId, ref: 'Questao' },
  idQuestao: { type: Object, ref: 'Questao', required: true },
  opcao: String,
  descricao: String
},
{ timestamps: true, versionKey: false });

module.exports = mongoose.model("Respostas", SCHEMA);
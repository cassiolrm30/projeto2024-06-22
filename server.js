const express            = require('express');
const cors               = require('cors');
const mongoose           = require('mongoose');
const bodyParser         = require('body-parser');
const usuarioRouter      = require('./routes/usuario');
const tipoSimuladoRouter = require('./routes/tipoSimulado');
const questaoRouter      = require('./routes/questao');
const respostaRouter     = require('./routes/resposta');
const app                = express();
const port               = 1234;

// Conectando ao MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/projeto2024-06-22")
    .then(() => { console.log("Conectado ao MongoDB"); })
    .catch(err => { console.error("Erro ao conectar ao MongoDB", err); });

// Middleware
app.use(bodyParser.json());
app.use(cors())

// Rotas
app.use('/usuarios', usuarioRouter);
app.use('/tiposSimulado', tipoSimuladoRouter);
app.use('/questoes', questaoRouter);
app.use('/respostas', respostaRouter);

// Rota inicial
app.get('/', (req, res) => { res.send('Bem-vindo ao CRUD de exemplo!'); });

app.listen(port, () => { console.log(`Servidor rodando em http://localhost:${port}`); });
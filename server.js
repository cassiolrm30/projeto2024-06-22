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

/*
mongoose.connect("mongodb://127.0.0.1:27017/projeto2024-06-22");
const minhaColecaoSchema = new mongoose.Schema({ campo1: String, campo2: Number });
const MinhaColecao = mongoose.model('MinhaColecao', minhaColecaoSchema);
const novoDocumento = new MinhaColecao({ campo1: 'valor1', campo2: 123 });
novoDocumento.save((err) => { if (err) throw err; console.log('Documento salvo!'); });
*/

/*
const mysql = require('mysql');
const connection = mysql.createConnection({ host: 'localhost:3306', user: 'root', password: '', database: 'simulados' });
connection.connect();
const sql = 'INSERT INTO minhaTabela (coluna1, coluna2, coluna3) VALUES (?, ?, ?)';
const values = ['valor1', 'valor2', '123'];
connection.query(sql, values, (err, result) => { if (err) throw err; console.log('Dados inseridos!'); });
connection.end();
*/

// Rotas
app.use('/usuarios', usuarioRouter);
app.use('/tiposSimulado', tipoSimuladoRouter);
app.use('/questoes', questaoRouter);
app.use('/respostas', respostaRouter);

/*
const fs = require('fs');
const path = require('path');

// Diretório específico onde o arquivo será salvo
const dirPath = path.join(__dirname, '..', '..', '..', 'Minha Estante (HTML 5)', 'carga');

// Verifica se o diretório existe, se não, cria-o
if (!fs.existsSync(dirPath)) { fs.mkdirSync(dirPath, { recursive: true }); }

// Caminho completo do arquivo
const filePath = path.join(dirPath, 'meuArquivo.js');

// Dados a serem gravados no arquivo
let conteudo = "";
conteudo += "var tipos_simulado = [];\n";
conteudo += "\ntipos_simulado.push( {\"cod_tipo_simulado\": \"1\", \"dsc_cor_fonte\": \"#006400\", \"cod_cor_fundo\": \"#BAFFBA\", \"dsc_iniciais\": \"D.S.      \", \"dsc_tipo_simulado\": \"Desenvolvimento de Sistemas                       \"} );";
conteudo += "\ntipos_simulado.push( {\"cod_tipo_simulado\": \"2\", \"dsc_cor_fonte\": \"#DDDD00\", \"cod_cor_fundo\": \"#FFFFC0\", \"dsc_iniciais\": \"M.B.D.    \", \"dsc_tipo_simulado\": \"Modelagem e Banco de Dados                        \"} );";
conteudo += "\ntipos_simulado.push( {\"cod_tipo_simulado\": \"3\", \"dsc_cor_fonte\": \"#00008B\", \"cod_cor_fundo\": \"#B0C4DE\", \"dsc_iniciais\": \"S.O.R.    \", \"dsc_tipo_simulado\": \"Sistemas Operacionais e Redes                     \"} );";
conteudo += "\ntipos_simulado.push( {\"cod_tipo_simulado\": \"4\", \"dsc_cor_fonte\": \"#8B0000\", \"cod_cor_fundo\": \"#FFA07A\", \"dsc_iniciais\": \"O.O.      \", \"dsc_tipo_simulado\": \"Orientação a Objetos                              \"} );";
conteudo += "\ntipos_simulado.push( {\"cod_tipo_simulado\": \"5\", \"dsc_cor_fonte\": \"#FF5500\", \"cod_cor_fundo\": \"#FFE4B5\", \"dsc_iniciais\": \"C.NET     \", \"dsc_tipo_simulado\": \"Certificação .NET                                 \"} );";
conteudo += "\ntipos_simulado.push( {\"cod_tipo_simulado\": \"11\", \"dsc_cor_fonte\": \"#8B4513\", \"cod_cor_fundo\": \"#D2B48C\", \"dsc_iniciais\": \"L.A.E.D.  \", \"dsc_tipo_simulado\": \"Lógica, Algoritmos e Estrutura de Dados           \"} );";
conteudo += "\ntipos_simulado.push( {\"cod_tipo_simulado\": \"12\", \"dsc_cor_fonte\": \"#008B8B\", \"cod_cor_fundo\": \"#7FFFD4\", \"dsc_iniciais\": \"L.P.      \", \"dsc_tipo_simulado\": \"Linguagens de Programação                         \"} );";
conteudo += "\ntipos_simulado.push( {\"cod_tipo_simulado\": \"13\", \"dsc_cor_fonte\": \"#B8860B\", \"cod_cor_fundo\": \"#DCC870\", \"dsc_iniciais\": \"E.S.      \", \"dsc_tipo_simulado\": \"Engenharia de Software                            \"} );";
conteudo += "\ntipos_simulado.push( {\"cod_tipo_simulado\": \"14\", \"dsc_cor_fonte\": \"#00BDD1\", \"cod_cor_fundo\": \"#E0FFFF\", \"dsc_iniciais\": \"I.S.      \", \"dsc_tipo_simulado\": \"Interoperabilidade de Sistemas                    \"} );";
conteudo += "\ntipos_simulado.push( {\"cod_tipo_simulado\": \"15\", \"dsc_cor_fonte\": \"#8B008B\", \"cod_cor_fundo\": \"#DDA0DD\", \"dsc_iniciais\": \"S.I.      \", \"dsc_tipo_simulado\": \"Segurança da Informação                           \"} );";
conteudo += "\ntipos_simulado.push( {\"cod_tipo_simulado\": \"16\", \"dsc_cor_fonte\": \"#808080\", \"cod_cor_fundo\": \"#D3D3D3\", \"dsc_iniciais\": \"E.R.      \", \"dsc_tipo_simulado\": \"Engenharia de Requisitos                          \"} );";
conteudo += "\ntipos_simulado.push( {\"cod_tipo_simulado\": \"17\", \"dsc_cor_fonte\": \"#FF00FF\", \"cod_cor_fundo\": \"#FFB6C1\", \"dsc_iniciais\": \"G.P.      \", \"dsc_tipo_simulado\": \"Gerência de Projetos                              \"} );";

conteudo += "\n\nvar carga_questoes = [];\n";

// Grava o arquivo no diretório especificado
fs.writeFile(filePath, conteudo, (err) =>
{
    if (err) throw err;
    console.log('O arquivo foi salvo no diretório especificado!');
});
*/

// Rota inicial
app.get('/', (req, res) => { res.send('Bem-vindo ao CRUD de exemplo!'); });

app.listen(port, () => { console.log(`Servidor rodando em http://localhost:${port}`); });
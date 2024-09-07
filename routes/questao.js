const express          = require('express');
const router           = express.Router();
const TipoSimulado     = require('../models/TipoSimulado');
const Questao          = require('../models/Questao');
const Resposta         = require('../models/Resposta');
const mongoose         = require('mongoose');
const mensagemNotFound = "Registro não encontrado.";
const mensagemSucess   = "Dados salvos com sucesso.";
const conteudo =
[
    { _id: "11111111-1111-1111-a111-111111111111", rgbFonte: "#006400", rgbFundo: "#BAFFBA", iniciais: "D.S.",     descricao: "Desenvolvimento de Sistemas" },
    { _id: "22222222-2222-1222-a222-222222222222", rgbFonte: "#DDDD00", rgbFundo: "#FFFFC0", iniciais: "M.B.D.",   descricao: "Modelagem e Banco de Dados" },
    { _id: "33333333-3333-1333-a333-333333333333", rgbFonte: "#00008B", rgbFundo: "#B0C4DE", iniciais: "S.O.R.",   descricao: "Sistemas Operacionais e Redes" },
    { _id: "44444444-4444-1444-a444-444444444444", rgbFonte: "#8B0000", rgbFundo: "#FFA07A", iniciais: "O.O.",     descricao: "Orientação a Objetos" },
    { _id: "55555555-5555-1555-a555-555555555555", rgbFonte: "#FF5500", rgbFundo: "#FFE4B5", iniciais: "C.NET ",   descricao: "Certificação .NET " },
    { _id: "66666666-6666-1666-a666-666666666666", rgbFonte: "#8B4513", rgbFundo: "#D2B48C", iniciais: "L.A.E.D.", descricao: "Lógica, Algoritmos e Estrutura de Dados" },
    { _id: "77777777-7777-1777-a777-777777777777", rgbFonte: "#008B8B", rgbFundo: "#7FFFD4", iniciais: "L.P.",     descricao: "Linguagens de Programação " },
    { _id: "88888888-8888-1888-a888-888888888888", rgbFonte: "#B8860B", rgbFundo: "#DCC870", iniciais: "E.S.",     descricao: "Engenharia de Software" },
    { _id: "99999999-9999-1999-a999-999999999999", rgbFonte: "#00BDD1", rgbFundo: "#E0FFFF", iniciais: "I.S.",     descricao: "Interoperabilidade de Sistemas" },
    { _id: "10101010-1010-1010-a010-101010101010", rgbFonte: "#8B008B", rgbFundo: "#DDA0DD", iniciais: "S.I.",     descricao: "Segurança da Informação " },
    { _id: "11111111-1111-1111-a111-111111111111", rgbFonte: "#808080", rgbFundo: "#D3D3D3", iniciais: "E.R.",     descricao: "Engenharia de Requisitos" },
    { _id: "12121212-1212-1212-a212-121212121212", rgbFonte: "#FF00FF", rgbFundo: "#FFB6C1", iniciais: "G.P.",     descricao: "Gerência de Projetos" }
];

// GET
router.get('/', async (req, res) =>
{
    try
    {
        const registros = await Questao.find();
        res.json(registros);
    }
    catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

// GET/:id
router.get('/:id', async (req, res) =>
{
    try
    {
        const registro = await Questao.findById(req.params.id);
        if (registro == null)
            return res.status(404).json({ message: mensagemNotFound });
        res.json(registro);
    }
    catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

// POST
router.post('/', async (req, res) =>
{
    try
    {
        //const x = await TipoSimulado.findById(new mongoose.Types.ObjectId(req.body.tipoSimulado._id));
        let x = new TipoSimulado();
        for (let i = 0; i < conteudo.length; i++)
        {
            if (conteudo[i]._id == req.body.tipoSimulado)
            {
                x = conteudo[i];
                break;
            }
        }
        let registro = new Questao();
        registro.enunciado = req.body.enunciado;
        registro.gabarito = req.body.gabarito;
        registro.tipoSimulado = new TipoSimulado({  _id: "11111111-1111-1111-a111-111111111111", 
                                                    "rgbFonte": "#006400", 
                                                    rgbFundo: "#BAFFBA", 
                                                    iniciais: "D.S.", 
                                                    descricao: "Desenvolvimento de Sistemas" });
        let chr    = 65;
        for (let i = 0; i < req.body.opcoes_resposta.length; i++)
        {
            let resposta = new Resposta();
            resposta.idQuestao = null;
            resposta.opcao = String.fromCharCode(chr + i);
            resposta.descricao = req.body.opcoes_resposta[i];
            registro.respostas.push(resposta);
        }
        registro = await Questao.create(req.body);
        //for (let i = 0; i < registro.respostas.length; i++) { resposta.idQuestao = null; }
        //mongoose.connection.close(); // Fechando a conexão após salvar
        console.log(registro.respostas.length);
        res.status(201).json({ message: mensagemSucess, register: registro });
    }
    catch (err)
    {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

// PATCH (PUT)/:id
router.patch('/:id', async (req, res) =>
{
    try
    {
        const registro = await Questao.findById(req.params.id);

        if (registro == null) { return res.status(404).json({ message: mensagemNotFound }); }
        if (req.body.enunciado != null)    { registro.enunciado = req.body.enunciado; }
        if (req.body.tipoSimulado != null) { registro.tipoSimulado = req.body.tipoSimulado; }
        if (req.body.gabarito != null)     { registro.gabarito = req.body.gabarito; }

        const atual = await registro.save();
        res.json({ message: mensagemSucess, register: atual });
    }
    catch (err)
    {
        res.status(400).json({ message: err.message });
    }
});

// DELETE/:id
router.delete('/:id', async (req, res) =>
{
    try
    {
        const registro = await Questao.findById(req.params.id);
        if (registro == null) { return res.status(404).json({ message: mensagemNotFound }); }
        await registro.deleteOne({ _id: req.params.id });
        res.json({ message: "Dados excluídos com sucesso.", register: registro });
    }
    catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
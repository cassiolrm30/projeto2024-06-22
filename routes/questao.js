
const express          = require('express');
const router           = express.Router();
const TipoSimulado     = require('../models/TipoSimulado');
const Questao          = require('../models/Questao');
const Resposta         = require('../models/Resposta');
const mongoose         = require('mongoose');
const mensagemNotFound = "Registro não encontrado.";
const mensagemSucess   = "Dados salvos com sucesso.";

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
        let registro = new Questao();
        //const registro = await Questao.findById(req.params.id);
        registro = req.body.enunciado;
        registro = req.body.gabarito;
        registro = req.body.tipoSimulado = new TipoSimulado({ "_id": "99999999-9999-1999-a999-999999999999", "rgbFonte": "#00BDD1", "rgbFundo": "#E0FFFF", "iniciais": "I.S.", "descricao": "Interoperabilidade de Sistemas" });
        registro.respostas = [];
        let chr    = 65;
        for (let i = 0; i < req.body.opcoes_resposta.length; i++)
        {
            const opcao = String.fromCharCode(chr + i);
            let resposta = new Resposta();
            resposta.idQuestao = registro._id;
            resposta.opcao = opcao;
            resposta.descricao = req.body.opcoes_resposta[i];
            registro.respostas.push(resposta);
        } 
        req.body.respostas = registro.respostas;
        console.log(req.body);
        registro = await Questao.create(req.body);
        mongoose.connection.close(); // Fechando a conexão após salvar
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
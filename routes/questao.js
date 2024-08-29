
const express          = require('express');
const router           = express.Router();
const Questao          = require('../models/Questao');
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
    const registro = new Questao(req.body);
    try
    {
        //registro._id = "60d5f6c49d1b2c001cfed2b9";
        /*for (let i = 0; i < registro.respostas.length; i++)
        {
            registro.respostas[i].idQuestao = registro._id;
        }*/
        const novo = await registro.save();
        //mongoose.connection.close(); // Fechando a conexão após salvar
        res.status(201).json({ message: mensagemSucess, register: novo });
    }
    catch (err)
    {
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
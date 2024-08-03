const express  = require('express');
const router   = express.Router();
const Resposta = require('../models/Resposta');

// POST
router.post('/', async (req, res) => 
{
    const registro = new Resposta(req.body);
    try
    {
        const novo = await registro.save();
        //mongoose.connection.close(); // Fechando a conexão após salvar
        res.status(201).json({ result: 201 });
    }
    catch (err)
    {
        res.status(400).json({ result: 400 });
    }
});

// PATCH (PUT)/:id
router.patch('/:id', async (req, res) =>
{
    try
    {
        const registro = await Resposta.findById(req.params.id);

        if (registro == null) { return res.status(404).json({ result: 404 }); }
        if (req.body.idQuestao != null) { registro.idQuestao = req.body.idQuestao; }
        if (req.body.descricao != null) { registro.descricao = req.body.descricao; }
        if (req.body.opcao != null)     { registro.opcao = req.body.opcao; }

        const atual = await registro.save();
        res.json({ result: 204 });
    }
    catch (err)
    {
        res.status(400).json({ result: 400 });
    }
});

// DELETE/:id
router.delete('/:id', async (req, res) =>
{
    try
    {
        const registro = await Resposta.findById(req.params.id);
        if (registro == null) { return res.status(404).json({ result: 404 }); }
        await registro.deleteOne({ _id: req.params.id });
        res.json({ result: 204 });
    }
    catch (err)
    {
        res.status(500).json({ result: 500 });
    }
});

module.exports = router;
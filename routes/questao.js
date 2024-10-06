const express          = require('express');
const router           = express.Router();
const TipoSimulado     = require('../models/TipoSimulado');
const Questao          = require('../models/Questao');
const Resposta         = require('../models/Resposta');
const mongoose         = require('mongoose');
const mensagemNotFound = "Registro não encontrado.";
const mensagemSucess   = "Dados salvos com sucesso.";
const chr              = 65;

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

// GET/:id
router.get('/?getByTipoSimulado/:tipoSimuladoId', async (req, res) =>
{
    try
    {
        const registros = await Questao.find();
        let resultado = [];
        for (let i = 0; i < registros.length; i++)
        {
            if (registros[i].tipoSimulado._id == req.params.tipoSimuladoId)
            {
                resultado.push({ cod_questao: registros[i]._id, cod_tipo_simulado: req.params.tipoSimuladoId,
                                 dsc_gabarito: registros[i].gabarito, dsc_enunciado: registros[i].enunciado });                    
            }
        }
        res.json(resultado);
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
        const registro = new Questao();
        if (req.body.gabarito != null)     { registro.gabarito = req.body.gabarito; }
        if (req.body.enunciado != null)    { registro.enunciado = req.body.enunciado; }
        if (req.body.tipoSimuladoId != null)
            registro.tipoSimulado = await TipoSimulado.findById(req.body.tipoSimuladoId);
        registro._id = new mongoose.Types.ObjectId();
        registro.respostas = [];
        for (let i = 0; i < req.body.opcoesRespostas.length; i++)
        {
            let resposta = new Resposta();
            resposta.idQuestao = registro._id;
            resposta.opcao = String.fromCharCode(chr + i);
            resposta.descricao = req.body.opcoesRespostas[i];
            registro.respostas.push(resposta);
        }
        const resultado = await registro.save();
        res.status(201).json({ message: mensagemSucess, resultado });
    }
    catch (err)
    {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

// PATCH (PUT)/:id
router.patch('/', async (req, res) =>
{
    try
    {
        const registro = await Questao.findById(req.body.id);
        if (registro == null)              { return res.status(404).json({ message: mensagemNotFound }); }

        if (req.body.gabarito != null)     { registro.gabarito = req.body.gabarito; }
        if (req.body.enunciado != null)    { registro.enunciado = req.body.enunciado; }
        if (req.body.tipoSimuladoId != null)
            registro.tipoSimulado = await TipoSimulado.findById(req.body.tipoSimuladoId);
        registro._id = new mongoose.Types.ObjectId(req.body.id);
        registro.respostas = [];
        for (let i = 0; i < req.body.opcoesRespostas.length; i++)
        {
            let resposta = new Resposta();
            resposta.idQuestao = registro._id;
            resposta.opcao = String.fromCharCode(chr + i);
            resposta.descricao = req.body.opcoesRespostas[i];
            registro.respostas.push(resposta);
        }
        const resultado = await registro.save();
        res.json({ message: mensagemSucess, resultado });
    }
    catch (err)
    {
        res.status(400).json({ message: err.message });
    }
});

// PATCH (PUT)/:id
router.post('excel/:id', async (req, res) =>
{
    try
    {
        const registro = new Questao();
        const extensaoArquivo = "xlsx";
        const nomeArquivo = "carga_teste." + extensaoArquivo;
        const XLSX = require(extensaoArquivo);

        // Lê o arquivo Excel existente
        const workbook = XLSX.readFile(nomeArquivo);
        const worksheetQuestions = "Questões de Concursos";
        const worksheetQuestionAnswers = "Opções de Resposta de Questões";
        //["cod_questao", "cod_resposta", "dsc_opcao_resposta"]

        if (req.body.id != null)           { registro._id = req.body.id; }
        if (req.body.gabarito != null)     { registro.gabarito = req.body.gabarito; }
        if (req.body.enunciado != null)    { registro.enunciado = req.body.enunciado; }
        if (req.body.tipoSimulado != null)
            registro.tipoSimulado = new TipoSimulado({ _id: req.body.tipoSimulado, rgbFonte: null, rgbFundo: null, 
                                                        iniciais: null, descricao: null });
        registro.respostas = (req.body.respostas != null) ? req.body.respostas : [];

        for (let i = 0; i < workbook.SheetNames.length; i++)
        {
            const worksheet = workbook.Sheets[worksheetQuestions];
            if (workbook.SheetNames[i] == worksheetQuestions && worksheet)
            {
                const rows = XLSX.utils.sheet_to_row_object_array(worksheet);
                let data_in_json = XLSX.utils.sheet_to_json(worksheet);
                data_in_json = rows;
                data_in_json.push({ cod_questao: registro._id, cod_tipo_simulado: registro.tipoSimulado._id,
                                    dsc_gabarito: registro.gabarito, dsc_enunciado: registro.enunciado });

                // Atualiza a planilha com os novos dados
                workbook.Sheets[workbook.SheetNames[i]] = XLSX.utils.json_to_sheet(data_in_json);              
            }
        }

        //const data2 = [
        //    ['Nome', 'Idade', 'Cidade'],
        //    ['João Silva', 28, 'São Paulo'],
        //    ['Maria Oliveira', 32, 'Rio de Janeiro'],
        //    ['Carlos Pereira', 45, 'Belo Horizonte']
        //  ];
        // XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(data2), "Minha Planilha 4");

        // Salva o arquivo Excel com as alterações
        XLSX.writeFile(workbook, nomeArquivo);
        console.log('Dados inseridos e arquivo atualizado com sucesso!');

        res.json({ message: mensagemSucess, resultado });
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
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
    { _id: "11111111-1111-1111-a011-111111111111", rgbFonte: "#808080", rgbFundo: "#D3D3D3", iniciais: "E.R.",     descricao: "Engenharia de Requisitos" },
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
    /*
    req.body.id = "1";
    req.body.tipoSimulado = "1";
    req.body.gabarito = "A";
    req.body.enunciado = "Isto é mais um teste de enunciado:";
    req.body.respostas = ["xxxxxxxxxxxxx", "pppppppppppppp", "qqqqqqqqqqqqqq", "kkkkkkkkkkkkk", "iiiiiiiiiiiii"];
    */
    try
    {
        const registro = new Questao();
        if (req.body.gabarito != null)     { registro.gabarito = req.body.gabarito; }
        if (req.body.enunciado != null)    { registro.enunciado = req.body.enunciado; }
        if (req.body.tipoSimuladoId != null)
            registro.tipoSimulado = await TipoSimulado.findById(req.body.tipoSimuladoId);
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
router.patch('/:id', async (req, res) =>
{
    try
    {
        const registro = await Questao.findById(req.params.id);
        if (registro == null)              { return res.status(404).json({ message: mensagemNotFound }); }

        if (req.body.gabarito != null)     { registro.gabarito = req.body.gabarito; }
        if (req.body.enunciado != null)    { registro.enunciado = req.body.enunciado; }
        if (req.body.tipoSimuladoId != null)
            registro.tipoSimulado = await TipoSimulado.findById(req.body.tipoSimuladoId);
        const resultado = await registro.save();

        /*const registro = new Questao();
        const extensaoArquivo = "xlsx";
        const nomeArquivo = "carga_teste." + extensaoArquivo;
        const XLSX = require(extensaoArquivo);
        const chr  = 65;

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
        console.log('Dados inseridos e arquivo atualizado com sucesso!');*/

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
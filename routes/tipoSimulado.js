const express  = require('express');
const router   = express.Router();
const conteudo = 
[
    { id: 1,  rgbFonte: "#006400", rgbFundo: "#BAFFBA", iniciais: "D.S.",     descricao: "Desenvolvimento de Sistemas" },
    { id: 2,  rgbFonte: "#DDDD00", rgbFundo: "#FFFFC0", iniciais: "M.B.D.",   descricao: "Modelagem e Banco de Dados" },
    { id: 3,  rgbFonte: "#00008B", rgbFundo: "#B0C4DE", iniciais: "S.O.R.",   descricao: "Sistemas Operacionais e Redes" },
    { id: 4,  rgbFonte: "#8B0000", rgbFundo: "#FFA07A", iniciais: "O.O.",     descricao: "Orientação a Objetos" },
    { id: 5,  rgbFonte: "#FF5500", rgbFundo: "#FFE4B5", iniciais: "C.NET ",   descricao: "Certificação .NET " },
    { id: 6,  rgbFonte: "#8B4513", rgbFundo: "#D2B48C", iniciais: "L.A.E.D.", descricao: "Lógica, Algoritmos e Estrutura de Dados" },
    { id: 7,  rgbFonte: "#008B8B", rgbFundo: "#7FFFD4", iniciais: "L.P.",     descricao: "Linguagens de Programação " },
    { id: 8,  rgbFonte: "#B8860B", rgbFundo: "#DCC870", iniciais: "E.S.",     descricao: "Engenharia de Software" },
    { id: 9,  rgbFonte: "#00BDD1", rgbFundo: "#E0FFFF", iniciais: "I.S.",     descricao: "Interoperabilidade de Sistemas" },
    { id: 10, rgbFonte: "#8B008B", rgbFundo: "#DDA0DD", iniciais: "S.I.",     descricao: "Segurança da Informação " },
    { id: 11, rgbFonte: "#808080", rgbFundo: "#D3D3D3", iniciais: "E.R.",     descricao: "Engenharia de Requisitos" },
    { id: 12, rgbFonte: "#FF00FF", rgbFundo: "#FFB6C1", iniciais: "G.P.",     descricao: "Gerência de Projetos" }
]

// GET
router.get('/', async (req, res) =>
{
    try
    {
        res.json(conteudo);
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
        const registro = await conteudo.findById(req.params.id);
        res.json(registro);
    }
    catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
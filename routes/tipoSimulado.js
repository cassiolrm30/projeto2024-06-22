const express  = require('express');
const router   = express.Router();
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
var express = require('express');
var router = express.Router();

var filamentos = [
  { id: 1, marca: 'Voolt3D', material: 'PLA', cor: 'Preto', peso: 1000, preco: 89.90 },
  { id: 2, marca: '3D Fila', material: 'PETG', cor: 'Branco', peso: 1000, preco: 99.90 },
  { id: 3, marca: 'Sethi3D', material: 'ABS', cor: 'Vermelho', peso: 500, preco: 54.90 }
];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Estoque de Filamentos 3D', filamentos: filamentos });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.get('/', function(req, res, next) {
  db.query('SELECT * FROM filamentos ORDER BY id')
    .then(function([filamentos]) {
      res.render('index', { title: 'Estoque de Filamentos 3D', filamentos: filamentos, erro: null });
    })
    .catch(function(err) {
      next(err);
    });
});

router.post('/itens', function(req, res, next) {
  var marca = req.body.marca;
  var material = req.body.material;
  var cor = req.body.cor;
  var peso = req.body.peso;
  var preco = req.body.preco;

  if (!marca || !material || !cor || !peso || !preco || Number(peso) < 0 || Number(preco) < 0) {
    db.query('SELECT * FROM filamentos ORDER BY id')
      .then(function([filamentos]) {
        res.render('index', { title: 'Estoque de Filamentos 3D', filamentos: filamentos, erro: 'Preencha todos os campos. Peso e preço não podem ser negativos.' });
      })
      .catch(function(err) {
        next(err);
      });
    return;
  }

  db.query('INSERT INTO filamentos (marca, material, cor, peso, preco) VALUES (?, ?, ?, ?, ?)', [marca, material, cor, peso, preco])
    .then(function() {
      res.redirect('/');
    })
    .catch(function(err) {
      next(err);
    });
});

module.exports = router;

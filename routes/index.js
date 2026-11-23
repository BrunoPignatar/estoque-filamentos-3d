var express = require('express');
var router = express.Router();
var db = require('../config/db');

function validar(f) {
  if (!f.marca || !f.material || !f.cor || !f.peso || !f.preco) {
    return 'Preencha todos os campos.';
  }
  if (Number(f.peso) < 0 || Number(f.preco) < 0) {
    return 'Peso e preço não podem ser negativos.';
  }
  return null;
}

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

  var erro = validar(req.body);
  if (erro) {
    db.query('SELECT * FROM filamentos ORDER BY id')
      .then(function([filamentos]) {
        res.render('index', { title: 'Estoque de Filamentos 3D', filamentos: filamentos, erro: erro });
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

router.get('/itens/:id/editar', function(req, res, next) {
  db.query('SELECT * FROM filamentos WHERE id = ?', [req.params.id])
    .then(function([linhas]) {
      if (linhas.length == 0) {
        res.redirect('/');
        return;
      }
      res.render('editar', { title: 'Editar filamento', filamento: linhas[0], erro: null });
    })
    .catch(function(err) {
      next(err);
    });
});

router.post('/itens/:id/editar', function(req, res, next) {
  var id = req.params.id;
  var marca = req.body.marca;
  var material = req.body.material;
  var cor = req.body.cor;
  var peso = req.body.peso;
  var preco = req.body.preco;

  var erro = validar(req.body);
  if (erro) {
    var filamento = { id: id, marca: marca, material: material, cor: cor, peso: peso, preco: preco };
    res.render('editar', { title: 'Editar filamento', filamento: filamento, erro: erro });
    return;
  }

  db.query('UPDATE filamentos SET marca = ?, material = ?, cor = ?, peso = ?, preco = ? WHERE id = ?', [marca, material, cor, peso, preco, id])
    .then(function() {
      res.redirect('/');
    })
    .catch(function(err) {
      next(err);
    });
});

module.exports = router;

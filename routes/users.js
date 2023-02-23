var express = require('express');
var router = express.Router();
var User = require('../models/user');

// GET del listado de usuarios ordenados por fecha de creación
router.get('/', function(req, res, next) {
  User.find().sort('-creationdate').exec(function(err, users) {
    if (err) res.status(500).send(err);
    else res.status(200).json(users);
  });
});

// GET de un único usuario por su Id
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, userinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(userinfo);
  });
});
  

// POST de un nuevo usuario
router.post('/', function(req, res, next) {
  User.create(req.body, function(err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
    });
});


// PUT (actualizar) de un usuario existente identificado por su Id
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});


// DELETE de un usuario existente identificado por su Id
router.delete('/:id', function(req, res, next) {
  User.findByIdAndDelete(req.params.id, function(err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});


// Comprueba si el usuario existe
router.post('/signin', function(req, res, next) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) res.status(500).send('¡Error comprobando el usuario!');
    // Si el usuario existe...
    if (user != null) {
      user.comparePassword(req.body.password, function(err, isMatch) {
      if (err) return next(err);
  
      // Si el password es correcto...
      if (isMatch)
        res.status(200).send({ message: 'ok', role:user.role, id: user._id });
      else
        res.status(200).send({ message: 'la password nocoincide' });
      });
    } else res.status(401).send({ message: 'usuario no registrado'});
  });
});

module.exports = router;
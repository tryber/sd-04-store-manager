// const vendasModel = require('../models/vendasModels');

const addVenda = (req, res) => res.send({ data: req.body });

const listaVendas = (req, res) => res.send({ data: req.body });

const vendaById = (req, res) => res.send({ data: req.body });

const atualizaVenda = (req, res) => res.send({ data: req.body });

const deletaVenda = (req, res) => res.send({ data: req.body });

module.exports = {
  addVenda,
  listaVendas,
  vendaById,
  atualizaVenda,
  deletaVenda,
};

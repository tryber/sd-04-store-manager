const { Router } = require('express');
const rescue = require('express-rescue');

const { vendasController } = require('../controllers');

const sales = Router();

sales.get('/', rescue(vendasController.getAllVendas));
sales.get('/:id', rescue(vendasController.findVendaById));

module.exports = sales;

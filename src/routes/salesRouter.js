const { Router } = require('express');
const { salesController } = require('../controller');
const { validationsSales } = require('../service');

const router = Router();

router.post(
  '/',
  validationsSales.validationQuantity,
  validationsSales.validationProd,
  salesController.registerSalesController,
);

router.get('/', salesController.getAllSalesController);

router.get('/:id', salesController.getSaleByIdController);

router.put('/:id', validationsSales.validationQuantity, salesController.updateSaleController);

module.exports = router;

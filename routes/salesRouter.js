const { Router } = require('express');
const { salesController } = require('../controllers');
const { salesValidations } = require('../services');

const router = Router();

router.post(
  '/',
  salesValidations.validationQuantity,
  salesValidations.validationProd,
  salesController.registerSalesController,
);

router.get('/', salesController.getAllSalesController);

module.exports = router;

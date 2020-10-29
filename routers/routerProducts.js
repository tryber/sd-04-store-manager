const express = require('express');
const productVerify = require('../middlewares/productsVerify');
const productsController = require('../controllers/productsController');

const router = express.Router();

const { nameExistsVerify, nameLengthVerify, quantityVerify, numberQuantityVerify } = productVerify;
const {
  postProductsController,
  putProductsDetailsController,
  deleteProductsController,
  getProductsController,
  getProductsDetailsController,
} = productsController;

router.post(
  '/',
  nameLengthVerify,
  nameExistsVerify,
  quantityVerify,
  numberQuantityVerify,
  postProductsController,
);

router.put(
  '/:id',
  nameLengthVerify,
  quantityVerify,
  numberQuantityVerify,
  putProductsDetailsController,
);

router.delete('/:id', deleteProductsController);

router.get('/', getProductsController);

router.get('/:id', getProductsDetailsController);

module.exports = router;

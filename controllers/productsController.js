const express = require('express');
const rescue = require('express-rescue');
const productsModel = require('../models/productsModel');
const productsValidations = require('../middlewares/productsValidation');

const router = express.Router();

router.post(
  '/',
  productsValidations.nameLengthValidation,
  productsValidations.nameExistenceValidation,
  productsValidations.quantityValidation,
  productsValidations.isNumberValidation,
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const product = await productsModel.addProduct(name, quantity);

    res.status(201).json(product);
  }),
);

router.get('/', rescue(async (_req, res) => {
    const products = await productsModel.findAll();

    res.status(200).json({ products });
}));

router.get('/:id', productsValidations.idExistsValidation, rescue(async (req, res) => {
  try {
    const product = req.product;

    res.status(200).json(product);
  } catch (_e) {
    res.status(501).json({ message: 'Sorry, something went wrong :(' });
  }
}));

router.put(
  '/:id',
  productsValidations.nameLengthValidation,
  productsValidations.quantityValidation,
  productsValidations.isNumberValidation,
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;

    await productsModel.updateProduct(id, name, quantity);

    const updatedProduct = await productsModel.findById(id);

    res.status(200).json(updatedProduct);
  }),
);

router.delete('/:id', productsValidations.idExistsValidation, rescue(async (req, res) => {
  const { id } = req.params;

  await productsModel.deleteProduct(id);

  const deletedProduct = req.product;

  res.status(200).json(deletedProduct);
}));

module.exports = router;

const express = require('express');
const productValidations = require('../middlewares/productValidations');
const productModel = require('../model/productModel');

const router = express.Router();

router.post(
  '/',
  productValidations.validationPresenceOfName,
  productValidations.validationLengthOfName,
  productValidations.validationProductExistsByName,
  productValidations.validationQuantityOfProduct,
  productValidations.validationStringOfProduct,
  async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const product = await productModel.add(name, quantity);
      res.status(201).json(product.ops[0]);
    } catch (_e) {
      res.status(501).json({ message: 'Falha ao cadastrar Produto' });
    }
  },
);

router.get('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const list = await productModel.listProducts();
    res.status(200).json({ products: list });
  } catch (_e) {
    res.status(404).json({ message: 'Falha ao carregar listagem de produtos' });
  }
});

router.get('/:id', productValidations.validationReturnProduct, async (req, res) => {
  res.status(200).json(req.product);
});

// const products = await productsModel.findAll();
// res.status(200).json();

module.exports = router;

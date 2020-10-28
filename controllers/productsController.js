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
    const list = await productModel.listProducts();
    res.status(200).json({ products: list });
  } catch (_e) {
    res.status(404).json({ message: 'Falha ao carregar listagem de produtos' });
  }
});

router.get('/:id', productValidations.validationReturnProduct, async (req, res) => {
  res.status(200).json(req.product);
});

router.put(
  '/:id',
  productValidations.validationPresenceOfName,
  productValidations.validationLengthOfName,
  productValidations.validationQuantityOfProduct,
  productValidations.validationStringOfProduct,
  async (req, res) => {
    const { name, quantity } = req.body;

    await productModel.updateProduct(req.params.id, name, quantity);
    const newProduct = await productModel.findProductById(req.params.id, 'products');

    res.status(200).json(newProduct);
  },
);

router.delete('/:id', productValidations.validationReturnProduct, async (req, res) => {
  const removedProduct = await productModel.findProductById(req.params.id, 'products');
  await productModel.deleteProduct(req.params.id);

  res.status(200).json(removedProduct);
});

module.exports = router;

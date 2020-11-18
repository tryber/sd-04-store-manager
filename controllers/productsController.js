const express = require('express');
const productsModel = require('../model/productsModel');
const validationProcucts = require('../middlewares/validationProducts');

const router = express.Router();

router.post(
  '/',
  validationProcucts.verifyEmpetyName,
  validationProcucts.lengthNameVerify,
  validationProcucts.existNameOfProduct,
  validationProcucts.validationNameProduct,
  validationProcucts.quantityOfProduct,
  validationProcucts.stringOfProduct,
  async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const product = await productsModel.addProd(name, quantity);
      res.status(201).json(product);
    } catch (_e) {
      res.status(501).json({ message: 'Falha ao cadastrar o Produto' });
    }
  },
);

router.get('/', async (req, res) => {
  const products = await productsModel.getAllProducts();
  return res.status(200).json({ products: products })});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const getId = await productsModel.getProductById(id);
  if (!getId) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  return res.status(200).json(getId);
});

module.exports = router;

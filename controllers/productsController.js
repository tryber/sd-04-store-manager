const express = require('express');
const productsModel = require('../model/productsModel');
const validationProcucts = require('../middlewares/validationProducts');
// const { deleteProduct } = require('../model/productsModel');

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
  return res.status(200).json({ products });
});

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

router.put(
  '/:id',
  validationProcucts.verifyEmpetyName,
  validationProcucts.lengthNameVerify,
  validationProcucts.validationNameProduct,
  validationProcucts.quantityOfProduct,
  validationProcucts.stringOfProduct,
  async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const { id } = req.params;
      await productsModel.updateProduct(id, name, quantity);
      const product = await productsModel.getProductById(req.params.id);
      req.product = product;
      console.log('updateProdct',product)
      res.status(200).json(product);
    } catch (_e) {
      console.log(_e.message);
    }
  },
);

router.delete('/:id', validationProcucts.verifyDeleteProduct, async (req, res) => {
  try {
    const deleteProduct = await productsModel.getProductById(req.params.id);
    await productsModel.deleteProduct(req.params.id);
    res.status(200).json(deleteProduct);
  } catch (_e) {
    console.log(_e.message);
  }
});

module.exports = router;

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

module.exports = router;

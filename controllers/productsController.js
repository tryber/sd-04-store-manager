const express = require('express');
const productsValidations = require('../middlewares/productsValidations');
const productsModel = require('../models/productsModel');

const router = express.Router();

router.post(
  '/',
  productsValidations.validateLengthOfName,
  productsValidations.validateProductExistsByName,
  productsValidations.validateQuantityIsMoreThanZero,
  productsValidations.validateQuantityIsNumber,
  async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const product = await productsModel.add(name, quantity);
      res.status(201).json(product);
    } catch (_error) {
      console.log(_error.message);
      res.status(501).json({ message: 'Falha ao cadastrar produto' });
    }
  },
);

module.exports = router;

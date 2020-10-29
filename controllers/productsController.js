const express = require('express');
const productsValidations = require('../middlewares/productsValidations');
const productsModel = require('../models/productsModel');

const router = express.Router();

// Req. 2 - Lista todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await productsModel.getAll();
    res.status(200).json({ products });
  } catch (_error) {
    console.log(_error.message);
    res.status(500).json({ message: 'Falha ao listar produtos' });
  }
});

// 1 - Cadastro de produtos
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

// Req. 2 - Lista produto por Id
router.get('/:id', productsValidations.validateProductExistsById, async (req, res) => {
  try {
    res.status(200).json(req.product);
  } catch (_error) {
    console.log(_error.message);
    res.status(500).json({ message: 'Falha ao listar produto por id' });
  }
});

// 3 - Crie um endpoint para atualizar um produto
router.put(
  '/:id',
  productsValidations.validateLengthOfName,
  //  productsValidations.validateProductExistsByName,
  productsValidations.validateQuantityIsMoreThanZero,
  productsValidations.validateQuantityIsNumber,
  //  productsValidations.validateProductExistsById,
  async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const { id } = req.params;

      await productsModel.update(id, name, quantity);
      const product = await productsModel.findById(id);

      res.status(200).json(product);
    } catch (_error) {
      console.log(_error.message);
      res.status(500).json({ message: 'Falha ao atualizar produto' });
    }
  },
);

module.exports = router;

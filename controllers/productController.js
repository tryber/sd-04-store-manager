const express = require('express');
const productModel = require('../models/productModel');
const router = express.Router();

router.get('/products', async (req, res) => {
  const productsArray = await productModel.getAll();
  const products = { products: productsArray };
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await productModel.getById(req.params.id);

  if (!product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  res.status(200).json({ person });
});

router.post('/products', async (req, res) => {
  const { name, quantity } = req.body;
  if (name.length < 5) {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }

  // const productName = await productModel.getByName(name);

  // if (!productName) {
  //   return res.status(422).json({
  //     err: {
  //       code: 'invalid_data',
  //       message: 'Product already exists',
  //     },
  //   });
  // }
  try {
    const product = await productModel.add(name, quantity);

    res.status(200).json({ message: 'Cadastrado com sucesso', product });
  } catch (_e) {
    console.log(_e.message);
    res.status(500).json({ message: 'Erro ao cadastrar do product!' });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const result = await productModel.remove(req.params.id);

    if (result) {
      res.status(200).json({ message: 'Removido com sucesso' });
    } else {
      res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }
  } catch (_e) {
    console.log(_e.message);
    res.status(500).json({ message: 'Erro ao deletar pessoa!' });
  }
});

module.exports = router;

const express = require('express');
const productModel = require('../models/productModel');

const router = express.Router();

router.get('/products', async (req, res) => {
  const productsArray = await productModel.getAll();
  const products = { products: productsArray };
  res.json(products);
});

router.get('/products/:id', async (req, res) => {
  // console.log('getById', req.params.id);
  const product = await productModel.getById(req.params.id);
  // console.log('product', product);

  if (!product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  res.status(200).json({
    name: product.name,
    quantity: product.quantity,
  });
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

  if (quantity < 1) {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  if (typeof quantity === 'string') {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  const products = await productModel.getAll();
  if (products.some((product) => product.name === name)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }

  try {
    const product = await productModel.add(name, quantity);
    res.status(201).json({
      _id: product.id,
      name,
      quantity,
    });
  } catch (_e) {
    // res.status(500).json({ message: 'Erro ao cadastrar do product!' });
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
    res.status(500).json({ message: 'Erro ao deletar pessoa!' });
  }
});

router.put('/products/:id', async (req, res) => {
  const { name, quantity } = req.body;
  console.log('const update', name, quantity);
  if (name.length < 5) {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }

  if (quantity < 1) {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  if (typeof quantity === 'string') {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  const products = await productModel.getAll();
  if (products.some((product) => product.name === name)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }

  try {
    await productModel.update(req.params.id, name, quantity);
    res.status(200).json({
      _id: req.params.id,
      name,
      quantity,
    });
  } catch (_e) {
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

module.exports = router;

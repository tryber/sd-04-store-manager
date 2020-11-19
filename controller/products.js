const express = require('express');
const validate = require('../middleware/validate');
const crud = require('../model');

const router = express.Router();

router.post(
  '/',
  validate.nameLongerThan5,
  validate.quantityIsNumber,
  validate.quantityIsNot0OrLess,
  async (req, res) => {
    const { name, quantity } = req.body;
    try {
      const alreadyInDBProduct = await crud.read('name', name, 'products');

      if (alreadyInDBProduct) {
        return res
          .status(422)
          .json({ err: { code: 'invalid_data', message: 'Product already exists' } });
      }

      const insertedProduct = await crud.create('products', { name, quantity });
      return res.status(201).json(insertedProduct);
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
);

router.get('/', async (_req, res) => {
  const products = await crud.read('all', null, 'products');
  return res.status(200).json({ products });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const product = await crud.read('id', id, 'products');

  if (!product) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }

  return res.status(200).json(product);
});

router.put(
  '/:id',
  validate.nameLongerThan5,
  validate.quantityIsNumber,
  validate.quantityIsNot0OrLess,
  async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;
    try {
      const product = await crud.read('id', id, 'products');

      if (!product) {
        return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
      }
      await crud.update('products', id, { name, quantity });

      const updatedProduct = await crud.read('id', id, 'products');

      return res.status(200).json(updatedProduct);
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await crud.read('id', id, 'products');

  if (!product) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }

  await crud.delete('products', id);
  return res.status(200).json(product);
});

module.exports = router;

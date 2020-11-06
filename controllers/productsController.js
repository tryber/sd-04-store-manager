const express = require('express');
const crud = require('../models/crud');
const middlewares = require('../middlewares');

const router = express.Router();

router.post(
  '/',
  middlewares.verifyIfProductExistsByName,
  middlewares.validateQuantity,
  middlewares.validateNameLength,
  async ({ body: { name, quantity } }, res) =>
    crud
      .create('products', { name, quantity })
      .then((insertedProduct) => res.status(201).json(insertedProduct))
      .catch((err) => res.status(500).json({ err })),
);

router.get('/', async (_req, res) =>
  crud.readAll('products').then((products) => res.status(200).json({ products })),
);

router.get('/:id', middlewares.verifyIfProductExistsById, async (req, res) =>
  crud.readById('products', req.params.id).then((product) => res.status(200).json(product)),
);

router.put('/:id',
  middlewares.validateNameLength,
  middlewares.validateQuantity,
  middlewares.verifyIfProductExistsById,
  async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;
    try {
      await crud.updateById('products', id, { name, quantity });
      const product = await crud.readById('products', id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ err });
    }
  });

router.delete('/:id',
  middlewares.verifyIfProductExistsById,
  async (req, res) => {
    const { id } = req.params;
    await crud.deleteById('products', id);
    res.status(200).json(req.product);
  });

module.exports = router;

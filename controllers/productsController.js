const router = require('express').Router();
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const { validateProduct, addNewProduct, getAll, getById } = require('../models/productsModel');

router.post('/', rescue(async ({ body: { name, quantity } = {} }, res) => {
  try {
    const message = await validateProduct({ name, quantity });
    if (message) throw Boom.badData(message);

    const newProduct = await addNewProduct(name, quantity);
    res.status(201).json(newProduct);
  } catch (err) {
    if (Boom.isBoom(err)) throw err;
    throw Boom.badRequest(err);
  }
}));

router.get('/', rescue(async (_req, res) => {
  try {
    const products = await getAll();
    res.json({ products });
  } catch (err) {
    throw Boom.badRequest(err);
  }
}));

router.get('/:id', rescue(async ({ params: { id } }, res) => {
  try {
    const product = await getById(id);
    res.json(product);
  } catch (err) {
    throw Boom.badData(err);
  }
}));

module.exports = router;

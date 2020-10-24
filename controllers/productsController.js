const router = require('express').Router();
const rescue = require('express-rescue');
const validateProduct = require('../middlewares/validateProduct');
const {
  addNew,
  getAll,
  getById,
  update,
  products: { deleteProduct },
} = require('../models');

router.post('/', validateProduct(), rescue(async ({ body: { name, quantity } }, res) => {
  const newProduct = await addNew('products', { name, quantity });
  res.status(201).json(newProduct);
}));

router.get('/', rescue(async (_req, res) => {
  const products = await getAll('products');
  res.json({ products });
}));

router.put('/:id', validateProduct(false),
  rescue(async ({ body: { name, quantity }, params: { id } }, res) => {
    await update('products', id, { name, quantity });
    res.json({ _id: id, name, quantity });
  }));

router.delete('/:id', rescue(async ({ params: { id } }, res) => {
  const result = await deleteProduct(id);
  res.json(result);
}));

router.get('/:id', rescue(async ({ params: { id } }, res) => {
  const product = await getById('products', id);
  res.json(product);
}));

module.exports = router;

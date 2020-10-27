const express = require('express');

const router = express.Router();

const ProductsServices = require('../services/productsServices');

// CRIA NOVO PRODUTO---------------------------------------------------------------------
router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductsServices.createProduct(name, quantity);

  if (product.error) return res.status(422).json({ err: product.err });
  return res.status(201).json(product);
});

// RETORNA TODOS OS PRODUTOS-------------------------------------------------------------------
router.get('/', async (_req, res) => {
  const products = await ProductsServices.getAllProducts();
  res.status(200).json(products);
});

// RETORNA OS PRODUTOS POR ID------------------------------------------------------------------
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await ProductsServices.getProductById(id);

  if (product.error) return res.status(422).json({ err: product.err });
  res.status(200).json(product);
});

// ATUALIZA O PRODUTO -------------------------------------------------------------------------
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await ProductsServices.updateProduct(id, name, quantity);

  if (product.error) return res.status(422).json({ err: product.err });
  return res.status(200).json(product);
});

// DELETA O PRODUTO -------------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await ProductsServices.deleteProduct(id);

  if (product.error) return res.status(422).json({ err: product.err });
  res.status(200).json(product);
});

module.exports = router;

const express = require('express');

const router = express.Router();

const ProductsServices = require('../services/productsServices');

// CRIA NOVO PRODUTO---------------------------------------------------------------------
router.post('/', async (req, res) => {
  // try {
  const { name, quantity } = req.body;
  const product = await ProductsServices.createProduct(name, quantity);
  // console.log(product);

  if (product.error) return res.status(422).json({ err: product.err });
  return res.status(201).json(product);
  // } catch (err) {
  //   // console.error(err);
  //   process.exit(1);
  // }
});

// RETORNA TODOS OS PRODUTOS-------------------------------------------------------------------
router.get('/', async (_req, res) => {
  const products = await ProductsServices.getAllProducts();
  // console.log(products);
  res.status(200).json(products);
});

// RETORNA OS PRODUTOS POR ID------------------------------------------------------------------
router.get('/:id', async (req, res) => {
  // try {
  const { id } = req.params;
  const product = await ProductsServices.getProductById(id);

  if (product.error) return res.status(422).json({ err: product.err });
  // console.log(product);
  res.status(200).json(product);
  // } catch (err) {
  //   process.exit(1);
  // }
});

// ATUALIZA O PRODUTO -------------------------------------------------------------------------
router.put('/:id', async (req, res) => {
  // try {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await ProductsServices.updateProduct(id, name, quantity);

  if (product.error) return res.status(422).json({ err: product.err });
  return res.status(200).json(product);
  // } catch (err) {
  //   process.exit(1);
  // }
});

// DELETA O PRODUTO -------------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
  // try {
  const { id } = req.params;
  const product = await ProductsServices.deleteProduct(id);

  if (product.error) return res.status(422).json({ err: product.err });
  res.status(200).json(product);
  // } catch (err) {
  //   process.exit(1);
  // }
});

module.exports = router;

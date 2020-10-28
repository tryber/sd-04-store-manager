const { Router } = require('express');
const { ObjectId } = require('mongodb');

const produtoModel = require('../models/produtosModels');
const validador = require('../service/validador');

const product = Router();

// rota para adicionar produto
product.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const nomeProduto = await produtoModel.podutoPorNome(name);
  // console.log('nome', nomeProduto);
  try {
    // console.log('oi');
    const result = await validador.schemaAdd.validate({ name, quantity, nomeProduto });
    // console.log('resultado', result);
    if (result) {
      const produto = await produtoModel.addProduto(name, quantity);
      res.status(201).json({ ...produto });
    }
  } catch (error) {
    // console.log('errorrr', error.path, error.errors[0]);
    return res.status(422).json({ err: { code: 'invalid_data', message: `${error.errors[0]}` } });
  }
});

// rota para listar todos os produtos
product.get('/', async (_req, res) => {
  try {
    const products = await produtoModel.listaProdutos();
    res.status(200).json({ products });
  } catch (error) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'wrong data' } });
  }
});

// rota para listar produto por id
product.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (ObjectId.isValid(id)) {
    try {
      // console.log('testinho');
      const produto = await produtoModel.produtoPorId(id);
      // console.log('depois');
      // console.log('produto', produto);
      res.status(200).json({ ...produto });
    } catch (error) {
      // console.log('erro', error);
      return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
    }
  }
  return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
});

// rota para atualizar produto
product.put('/:id', async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  if (ObjectId.isValid(id)) {
    try {
      const result = await validador.schemaEdit.validate({ name, quantity });
      if (result) {
        const products = await produtoModel.atualizarProduto(id, name, quantity);
        res.status(200).json({ ...products });
      }
    } catch (error) {
      return res.status(422).json({ err: { code: 'invalid_data', message: `${error.errors[0]}` } });
    }
  }
  return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
});

// rota para deletar produto
product.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (ObjectId.isValid(id)) {
    try {
      const produtoId = await produtoModel.produtoPorId(id);
      if (produtoId) {
        await produtoModel.deletaProduto(id);
        // console.log('deletado', deletado);
        return res.status(200).json({ ...produtoId });
      }
    } catch (error) {
      return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
    }
  }
  return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
});
module.exports = product;

// app.get('/products', produtoController.listaProdutos);
// app.get('/products/:id', produtoController.produtoById);
// app.put('/products/:id', produtoController.atualizaProduto);
// app.delete('/products/:id', produtoController.deletaProduto);

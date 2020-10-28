const { Router } = require('express');
const { ObjectId } = require('mongodb');

const vendasService = require('../service/vendasService');
const vendasModels = require('../models/vendasModels');
const validador = require('../service/validador');

const Sales = Router();

// rota para adicionar venda
Sales.post('/', async (req, res) => {
  const lista = req.body;
  const vendasS = await vendasService.addVendasService(lista);
  // console.log('dentro do try', vendasS[0]);
  if (vendasS) {
    const { itensSold, _id } = vendasS[0];
    return res.status(200).json({ _id, itensSold });
  }
  return res
    .status(422)
    .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
});

// rota para listar todas as vendas
Sales.get('/', async (_req, res) => {
  try {
    // console.log('listando vendas');
    const sales = await vendasModels.listaVendas();
    // console.log('olala', sales);
    res.status(200).json({ sales });
  } catch (error) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'wrong data' } });
  }
});

// rota para listar Venda por id
Sales.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (ObjectId.isValid(id)) {
    const vendaId = await vendasModels.vendaPorId(id);
    if (vendaId) {
      return res.status(200).json({ ...vendaId });
    }
    return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
});

// rota para atualizar venda
Sales.put('/:id', async (req, res) => {
  const { productId, quantity } = req.body[0];
  // console.log('body', req.body[0]);
  // console.log('produto id controller', productId);
  // console.log('quantidade controller', quantity);
  const { id } = req.params;
  // console.log('id', id);
  if (ObjectId.isValid(id)) {
    try {
      const result = await validador.schemaVenda.validate({ quantity });
      // console.log('results controller', result);
      if (result) {
        const vendaAtualizada = await vendasService.atualizaVendaService(id, productId, quantity);
        // console.log('venda atualizada????', vendaAtualizada);
        return res.status(200).json({ ...vendaAtualizada });
      }
    } catch (error) {
      // console.log('error', error);
      return res
        .status(422)
        .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
    }
  }
  return res
    .status(422)
    .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
});

// rota para deletar venda
Sales.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (ObjectId.isValid(id)) {
    try {
      const vendaId = await vendasModels.vendaPorId(id);
      // console.log('teste vendaid', vendaId.itensSold);
      if (vendaId) {
        await vendasModels.deletaVenda(id);
        // console.log('deletado', deletado);
        return res.status(200).json({ ...vendaId });
      }
    } catch (error) {
      return res
        .status(422)
        .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
    }
  }
  return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
});

module.exports = Sales;

const express = require('express');
const productModel = require('../models/productModel');
const sharedModel = require('../models/sharedModel');
const saleModel = require('../models/saleModel');

const router = express.Router();

router.get('/', async (req, res) => {
  const productsArray = await sharedModel.getAll('sales');
  const sales = { sales: productsArray };
  console.log('sales get', sales, productsArray);
  res.json(sales);
});

router.get('/:id', async (req, res) => {
  // console.log('getById', req.params.id);
  const sale = await saleModel.getById(req.params.id);
  // console.log('sale', sale);

  if (!sale) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  res.status(200).json({
    itenSolde,
  });
});

const validation = (productId, quantity, sales) => {
  console.log('inside validation', productId, quantity, sales);
  let message = 'ok';
  if (quantity < 1) {
    message = 'Wrong product ID or invalid quantity';
  }
  if (typeof quantity === 'string') {
    message = 'Wrong product ID or invalid quantity';
  }

  return message;
};

router.post('/', async (req, res) => {
  const { productId, quantity } = req.body[0];
  const sales = await sharedModel.getAll('sale');
  let itensSold =[];
  req.body.map((sale) => {
    const { productId, quantity } = sale;
    console.log('inside post Sales map', sale, productId, quantity);
    itensSold.push({ productId,quantity,});

    const validationMessage = validation(productId, quantity, sales);
    // console.log('validationMessage', validationMessage);
    
    if (validationMessage !== 'ok') {
      res.status(422).json({
        err: {
          message: validationMessage,
          code: 'invalid_data',
        },
      });
    }
    
  });

  console.log('itensSold', itensSold);
  try {
    // const product = await saleModel.add(productId, quantity);
    const product = await saleModel.add(itensSold);
    res.status(200).json({
      _id: product.id,
      itensSold: itensSold
    });
  } catch (_e) {
    // res.status(500).json({ message: 'Erro ao cadastrar do product!' });
  }
  
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await saleModel.remove(req.params.id);
  const deletedSale = [result]
console.log('delete', result, deletedSale);
    if (result) {
      console.log('bingo deleted');
      // res.status(200).json({ message: 'Removido com sucesso' });
      res.status(200).json(deletedSale);
    } else {
      res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        },
      });
    }
  } catch (_e) {
    res.status(500).json({ message: 'Erro ao deletar pessoa!' });
  }
});

// router.put('/products/:id', async (req, res) => {
//   const { name, quantity } = req.body;
//   console.log('const update', name, quantity);
//   if (name.length < 5) {
//     res.status(422).json({
//       err: {
//         code: 'invalid_data',
//         message: '"name" length must be at least 5 characters long',
//       },
//     });
//   }

//   if (quantity < 1) {
//     res.status(422).json({
//       err: {
//         code: 'invalid_data',
//         message: '"quantity" must be larger than or equal to 1',
//       },
//     });
//   }

//   if (typeof quantity === 'string') {
//     res.status(422).json({
//       err: {
//         code: 'invalid_data',
//         message: '"quantity" must be a number',
//       },
//     });
//   }

//   const products = await productModel.getAll('products');
//   if (products.some((product) => product.name === name)) {
//     return res.status(422).json({
//       err: {
//         code: 'invalid_data',
//         message: 'Product already exists',
//       },
//     });
//   }

//   try {
//     await productModel.update(req.params.id, name, quantity);
//     res.status(200).json({
//       _id: req.params.id,
//       name,
//       quantity,
//     });
//   } catch (_e) {
//     res.status(500).send({ message: 'Algo deu errado' });
//   }
// });

module.exports = router;

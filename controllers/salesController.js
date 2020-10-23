const productsModel = require('../models/producstModel');
const salesModel = require('../models/salesModel');

const existProdutc = async (req, res, next) => {
  /*  const { itensSold } = req.body;
   const productId = itensSold[0].productId;
   const product = await productsModel.getById(productId);
   if (!product) {
     res.status(422).send({
       err: {
         message: 'Produto não encontrado',
       },
     });
   } */
  return next();
};

const invalidInput = (req, res, next) => {
  const { itensSold } = req.body;
  let inputNumber = true;

  if (!inputNumber) {
    return res.status(422).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  return next();
};

const add = async (req, res) => {
  const { itensSold } = req.body;
  const addSales = await salesModel.add(itensSold);
  
  if (addSales) {
    return res.status(200).json(addSales);
  }
  return res.status(422).send({
    err: {
      message: 'Não foi possível cadastrar a venda',
    },
  });
};

module.exports = {
  existProdutc,
  invalidInput,
  add,
};

const produModel = require('../models/productModel');
const saleModel = require('../models/salesModel');

const maxQuantity = async (req, res, next) => {
  let actProduct = 0;
  let quantSolded = 0;
  const { body } = req;
  for (let ordem = 0; ordem < body.length; ordem += 1) {
    quantSolded = body[ordem].quantity;
    actProduct = await produModel.getOneProductId(body[ordem].productId);
    if (quantSolded > actProduct.quantity) {
      return res
        .status(404)
        .json({ err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' } });
    } else {
      await produModel.update(actProduct._id, actProduct.name, actProduct.quantity - quantSolded);
    }
  }
  return next();
};

const returnQuant = async (id, obj) => {
  let actProduct = 0;
  let quantBack = 0;

  quantBack = obj;//await saleModel.getOneSaleId(id);
  actProduct = await produModel.getOneProductId(id);
  console.log("back: " + quantBack + " act: " + actProduct);
  /*await produModel.update(
    actProduct._id,
    actProduct.name,
    actProduct.quantity + quantBack.quantity,
  );*/

};

module.exports = { maxQuantity, returnQuant };

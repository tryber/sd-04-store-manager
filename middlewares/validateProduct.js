const {
  validateName,
  validateIsNumber,
  validateQuantity,
  validateExistProd,
/*   validateID, */
} = require('../services/productsServices');

const validateProd = async (req, res, next) => {
  const { name, quantity } = req.body;
  const validateExisteProduct = await validateExistProd(name);
  const validateQuant = await validateQuantity(quantity);
  const validateIsNumb = await validateIsNumber(quantity);
  const validateNameSize = await validateName(name);

  if (validateExisteProduct) {
    return res.status(422).json(validateExisteProduct);
  }

  if (validateQuant) {
    return res.status(422).json(validateQuant);
  }

  if (validateIsNumb) {
    return res.status(422).json(validateIsNumb);
  }

  if (validateNameSize) {
    return res.status(422).json(validateNameSize);
  }

  next();
};

// const validatProductId = async (req, res, next) => {
//   const { id } = req.body;

//   const validateProdID = await validateID(id);

//   if (!validateProdID) {
//     return res.status(422).json(validateProdID);
//   }

//   next();
// };

module.exports = { validateProd/* , validatProductId */ };

// Valida Nome do produto
const validaName = async (name) => {
  if (typeof name === 'string' && name.length > 5) {
    return true;
  }
  return ({ err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } });
};

// Valida Quantidade do produto
const validaQuantity = (quantity) => {
  if (typeof quantity === 'number') {
    if (quantity > 0) {
      return true;
    }
    return ({ err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } });
  }
  return ({ err: { code: 'invalid_data', message: '"quantity" must be a number' } });
};

// Valida produto
const validaProduto = async (name, quantity) => {
  const validaNameProduto = await validaName(name);
  const validaQtyProduto = validaQuantity(quantity);

  if (validaNameProduto.err) return validaNameProduto;

  if (validaQtyProduto.err) return validaQtyProduto;

  return true;
};

module.exports = {
  validaProduto,
  validaName,
  validaQuantity,
};

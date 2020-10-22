const validateNameLength = (name) => {
  if (name.length < 5) {
    return false;
  }
  return true;
};

const validateQuantity = (quantity) => {
  if (quantity <= 0 || String(quantity).includes('.')) {
    return false;
  }
  return true;
};

const validateQuantityType = (quantity) => {
  if (typeof quantity !== 'number') {
    return false;
  }
  return true;
};

module.exports = {
  validateNameLength,
  validateQuantity,
  validateQuantityType,
};
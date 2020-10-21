const { registerProdServ, listAllProdServ } = require('../services/productsServices');

const addProdCont = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const result = await registerProdServ(name, quantity);
    return res.status(201).json(result.ops[0]);
  } catch (e) {
    next(e);
  }
};

const listAllProdCont = async (_req, res, next) => {
  const result = await listAllProdServ();
  try {
    return res.status(200).json({ products: result });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  addProdCont,
  listAllProdCont,
};

const { registerProdServ, listAllProdServ } = require('../services/productsServices');

const addProdCont = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await registerProdServ(name, quantity);
    return res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar produtos!' });
  }
};

const listAllProdCont = async (_req, res) => {
  const result = await listAllProdServ();
  try {
    return res.status(200).json({ products: result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar produtos!' });
  }
};

module.exports = {
  addProdCont,
  listAllProdCont,
};

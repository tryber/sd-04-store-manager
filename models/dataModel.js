const connection = require('./connection');

const cadastraProduto = async (name, quantity) => {
  const teste = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  console.log(teste.ops);
  return teste.ops;
};

module.exports = {
  cadastraProduto,
};

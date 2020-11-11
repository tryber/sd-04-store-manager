const connection = require('./connection');

const addProduct = async () => connection().then((db) => db.collection('products').find().toArray());

module.exports = { addProduct };

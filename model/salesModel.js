const connection = require('./connection');
const { ObjectId } = require('mongodb');

// add produto no db de vendas
const addSale = async (itensSold) =>{
    const itens = connection().then((db) => db.collection('sales').insertOne({itensSold}))
    return itens
};

module.exports = {
    addSale
}
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const dbCollection = 'products';

const addProduct = async (name, quantity) => {
  try {
    const db = await connection();
    const addItem = await db.collection(dbCollection).insertOne({ name, quantity });
    return {
      _id: addItem.insertedId,
      name: addItem.ops[0].name,
      quantity: addItem.ops[0].quantity,
    };
  } catch (error) {
    return process.exit(1);
  }
};

const findAll = async () => {
  try {
    const db = await connection();
    const findAllItem = await db.collection(dbCollection).find().toArray();
    return { products: findAllItem };
  } catch (error) {
    return process.exit(1);
  }
};

const findById = async (productId) => {
  try {
    if (!ObjectId.isValid(productId)) {
      return null;
    }
    const db = await connection();
    const findByIdItem = await db.collection(dbCollection).findOne(ObjectId(productId));
    return findByIdItem;
  } catch (error) {
    return process.exit(1);
  }
};

const findByName = async (name) => {
  try {
    const db = await connection();
    const findItem = await db.collection(dbCollection).findOne({ name });
    return findItem;
  } catch (error) {
    return process.exit(1);
  }
};

const updateValues = async (id, name, quantity) => {
  try {
    const db = await connection();
    await db
      .collection(dbCollection)
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
    return {
      _id: id,
      name,
      quantity,
    };
  } catch (error) {
    return process.exit(1);
  }
};

const deleteById = async (id) => {
  try {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    const db = await connection();
    const productBeforeDelete = await findById(id);
    await db.collection(dbCollection).deleteOne({ _id: ObjectId(id) });
    return productBeforeDelete;
  } catch (error) {
    return process.exit(1);
  }
};

module.exports = {
  addProduct,
  findAll,
  findById,
  findByName,
  updateValues,
  deleteById,
};

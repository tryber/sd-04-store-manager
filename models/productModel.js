const connection = require('./connection');

module.findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  try {
    const db = await connection();
    const result = await db.collection(collection).findOne(ObjectId(id));
    return result;
  } catch (e) {
    console.log(e);
  }
};

module.findAll = async (collection) => {
  try {
    const db = await connection();
    const results = await db.collection(collection).find({}).toArray();
    return results;
  } catch (e) {
    console.log(e);
  }
};

module.findByName = async (collection, name) => {
  try {
    const db = await connection();
    const result = await db.collection(collection).findOne({ name });
    return result;
  } catch (e) {
    console.log(e);
  }
};

module.createOne = async (collection, name, quantity) => {
  try {
    const db = await connection();
    const result = await db.collection(collection).insertOne({ name, quantity });
    return result.ops[0];
  } catch (e) {
    console.log(e);
  }
};

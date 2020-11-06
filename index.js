const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const validaçao = require('./middlewares/validaçoes');
const express = require('express');
// const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.post(
  '/products',
  validaçao.exist,
  validaçao.nameTest,
  validaçao.quantityTest,
  productController.addProduct,
);

app.get('/products', productController.showProducts);
app.get('/products/:id', validaçao.idTest, productController.findByIdParams);

app.put(
  '/products/:id',
  validaçao.nameTest,
  validaçao.quantityTest,
  productController.updateByIdParams,
);

app.delete('/products/:id', validaçao.idTest, productController.deleteByIdParams);

app.post('/sales', validaçao.quantitySales, salesController.create);

app.get('/sales', validaçao.existSales, salesController.getAll);

app.get('/sales/:id', validaçao.existSales, salesController.getByIdSales);

app.listen(3000, () => console.log('Listening on 3000'));

const productController = require('./controllers/productController');
const validaçao = require('./middlewares/validaçoes');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.post('/products', validaçao.nameTest, validaçao.quantityTest, productController.addProduct);

app.listen(port, () => console.log(`Example app listening on port port!`));

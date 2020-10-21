const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/products', productController.getProducts);
app.post('/products', productController.registerProduct);

app.listen(3000, () => console.log('Conectado'));

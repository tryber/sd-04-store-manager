const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const productController = require('./controllers/productController');

const saleController = require('./controllers/saleController');

app.use('/products', productController);
app.use('/sales', saleController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('=-----> Server running on port 3000 <-----='));

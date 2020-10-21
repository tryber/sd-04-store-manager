const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const productController = require('./controllers/productController');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/products', productController);
app.get('/products/:id', productController);

app.listen(3000, () => console.log('=-----> Server running on port 3000 <-----='));

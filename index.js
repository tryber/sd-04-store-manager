const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('./controllers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/products', controllers.productsController.getAll);

app.post('/products',
  controllers.productsController.nameLength,
  controllers.productsController.nameExists,
  controllers.productsController.quantityLessThanZero,
  controllers.productsController.quantityNotANumber,
  controllers.productsController.add,
);

app.listen(3000, () => console.log('Listening on 3000'));

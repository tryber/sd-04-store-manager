const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('./controllers');

const middlewares = require('./middlewares');

const productsModel = require('./models/producstModel');

const salesModel = require('./models/salesModel');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/products', middlewares.controllers.getAll(productsModel,
  'products',
  422,
  'invalid_data',
  'Wrong id format',
));

app.get('/products/:id', middlewares.controllers.getById(
  productsModel,
  422,
  'invalid_data',
  'Wrong id format',
));

app.put('/products/:id',
  controllers.productsController.nameLength,
  controllers.productsController.quantityLessThanZero,
  controllers.productsController.quantityNotANumber,
  controllers.productsController.update,
);

app.delete('/products/:id', middlewares.controllers.exclude('Wrong id format', productsModel));

app.post('/products',
  controllers.productsController.nameLength,
  controllers.productsController.nameExists,
  controllers.productsController.quantityLessThanZero,
  controllers.productsController.quantityNotANumber,
  controllers.productsController.add,
);

app.post('/sales',
  controllers.salesController.invalidInput,
  controllers.salesController.add,
);

app.get('/sales', middlewares.controllers.getAll(
  salesModel,
  'sales',
  404,
  'not_found',
  'Sale not found',
));

app.get('/sales/:id', middlewares.controllers.getById(
  salesModel,
  404,
  'not_found',
  'Sale not found',
));

app.put('/sales/:id',
  controllers.salesController.invalidInput,
  controllers.salesController.update,
);

app.delete('/sales/:id', middlewares.controllers.exclude('Wrong sale ID format', salesModel));

app.listen(3000, () => console.log('Listening on 3000'));

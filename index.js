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

app.get('/products/:id', controllers.productsController.getById);

app.put('/products/:id',
  controllers.productsController.nameLength,
  controllers.productsController.quantityLessThanZero,
  controllers.productsController.quantityNotANumber,
  controllers.productsController.update,
);

app.delete('/products/:id', controllers.productsController.exclude);

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

app.get('/sales', controllers.salesController.getAll);

app.get('/sales/:id', controllers.salesController.getById);

app.put('/sales/:id',
  controllers.salesController.invalidInput,
  controllers.salesController.update,
);

app.delete('/sales/:id', controllers.salesController.exclude);

app.listen(3000, () => console.log('Listening on 3000'));

const express = require('express');
const app = express ();
const bodyParser = require('body-parser');
const produController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const port = 3000;

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/products', produController);

app.use('/sales', salesController);

app.listen(port, () => console.log(`Port 3000 on Call`));

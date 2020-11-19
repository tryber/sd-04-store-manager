const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
  response.send();
});

const routes = require('./routes');

app.use('/products', routes.productsRoutes);
app.use('/sales', routes.salesRoutes);

app.listen(3000);

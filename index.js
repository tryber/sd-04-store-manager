const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

/** Evalutor Function */
app.get('/', (request, response) => {
  response.send();
});

/** Routes */
const routes = require('./routes');

app.use('/products', routes.productsRoutes);
app.use('/sales', routes.salesRoutes);

app.listen(3000, () => console.log('Example app listening on port port!'));

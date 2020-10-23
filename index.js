const express = require('express');
const bodyParser = require('body-parser');
const { port } = require('./src/config');
const routes = require('./src/routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', routes.productRouter);
app.use('/sales', routes.salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const portServer = port || 3000;
app.listen(portServer, () => console.log(`Server listening on ${port}!!`));

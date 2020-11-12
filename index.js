const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

const PORT = 3000;
app.use(bodyParser.json());

app.use('/products', routes.productRouter);
app.use('/sales', routes.salesRouter);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Listen on ${PORT}`));

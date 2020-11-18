const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routers');

const app = express();

const PORT = 3000 || process.env;
app.use(bodyParser.json());

app.use('/products', routes.produtoRouter);
app.use('/sales', routes.vendasRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

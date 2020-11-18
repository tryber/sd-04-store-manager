const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routers/index');

const app = express();

const PORT = 3000 || process.env;
app.use(bodyParser.json());

app.use('/products', routes.produtoRouter);
app.use('/sales', routes.vendasRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

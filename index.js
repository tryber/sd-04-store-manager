require('dotenv/config');
const { notFound, internalError } = require('./middlewares');

     const express = require('express'),
               app = express(),
productsController = require('./controllers/productsController'),
              port = process.env.SERVER_PORT;

app.use(express.json());

// Não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);

// Tratamento de erros de rotas inexistentes e internos
app.use('*', notFound);
app.use(internalError);

app.listen(port, () => console.log(`Server running on port ${port}!`));

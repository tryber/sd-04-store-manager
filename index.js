const { notFound, internalError } = require('./middlewares');
const express = require('express');
const productsRoutes = require('./controllers/productsRoutes');

const app = express();
const port = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productsRoutes);

// Tratamento de erros de rotas inexistentes e internos
app.use('*', notFound);
app.use(internalError);

app.listen(port, () => console.log(`Server running on port ${port}!`));

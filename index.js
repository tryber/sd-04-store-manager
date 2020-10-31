const { notFound, internalError } = require('./middlewares');
const express = require('express');
const productsRoutes = require('./controllers/productsRoutes');
const salesRoutes = require('./controllers/salesRoutes');

const app = express();
const port = 3000;

app.use(express.json());

// Não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

// Tratamento de erros de rotas inexistentes e internos
app.use('*', notFound);
app.use(internalError);

app.listen(port, () => console.log(`Server running on port ${port}!`));

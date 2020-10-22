const express = require('express');
const controllers = require('./controllers');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/products', controllers.products);

app.use(({ output: { statusCode, payload: { message } } }, _req, res, _next) =>
  res.status(statusCode).json({ err: { code: 'invalid_data', message } }));

app.listen(3000, () => console.log('só alegria'));

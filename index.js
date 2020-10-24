const Boom = require('@hapi/boom');
const express = require('express');
const controllers = require('./controllers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
  response.send();
});

app.use('/products', controllers.products);

app.use('/sales', controllers.sales);

app.use((err, _req, res, _next) => {
  const error = Boom.isBoom(err) ? err : Boom.badData(err);
  const { output: { statusCode, payload: { message } } } = error;
  res.status(statusCode).json({ err: { code: 'invalid_data', message } });
});

app.listen(3000, () => console.log('só alegria'));

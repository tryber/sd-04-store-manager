const express = require('express')
const productsController = require('./controllers/productsController');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use('/products', productsController);

/* app.get('/', (request, response) => {
    response.send();
}); */

app.listen(port, () => console.log(`Example app listening on port port!`))


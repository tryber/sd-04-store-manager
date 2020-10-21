const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
    response.send();
});

//app.use('/products', require('./controllers/productController'));

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json);

app.get('/', (request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Listening on ${port}`));

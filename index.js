const express = require('express');

const app = express();
app.use(express.json);

app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Listening on 3000'));

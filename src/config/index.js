const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  HTTPStatus: {
    OK: 200,
    INTERN_ERROR: 500,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    CREATED: 201,
  },
};

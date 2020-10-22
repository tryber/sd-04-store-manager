const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  HTTPStatus: {
    OK: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_ERROR: 500,
  },
};

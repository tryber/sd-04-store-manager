const yup = require('yup');

const schemaAdd = yup.object().shape({
  name: yup
    .string('must be a string')
    .required('must be completed')
    .min(5, '"name" length must be at least 5 characters long'),
  quantity: yup
    .number()
    .typeError('"quantity" must be a number')
    .moreThan(0, '"quantity" must be larger than or equal to 1')
    .required(),
  nomeProduto: yup.array().max(0, 'Product already exists'),
});

const schemaEdit = yup.object().shape({
  name: yup
    .string('must be a string')
    .required('must be completed')
    .min(5, '"name" length must be at least 5 characters long'),
  quantity: yup
    .number()
    .typeError('"quantity" must be a number')
    .moreThan(0, '"quantity" must be larger than or equal to 1')
    .required(),
});

const schemaVenda = yup.object().shape({
  quantity: yup
    .number()
    .typeError('"quantity" must be a number')
    .moreThan(0, '"quantity" must be larger than or equal to 1')
    .required(),
});
module.exports = {
  schemaAdd,
  schemaEdit,
  schemaVenda,
};
